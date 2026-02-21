import { motion, AnimatePresence } from "framer-motion";
import { Star, Flame, SlidersHorizontal, Tag, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFoodItems } from "../../Services/FoodItems/FoodThunk";
import { Link } from "react-router";
import { AddingCart } from "../../Services/Cart/CartThunk";
import { addToCart } from "../../redux/Slices/CartSlice";
import { Heart, GitCompare } from "lucide-react";
import { AddingWishlist } from "../../Services/Wishlist/WishlistThunk";
import { addToWishlist } from "../../redux/Slices/WishlistSlice";
import { AddingCompare } from "../../Services/Compare/CompareThunk";
import { addToCompare } from "../../redux/Slices/CompareSlice";
import LazyImage from "../../UI/LazyImage/LazyImage";

const MenuPage = ({ filteredItems }) => {

    const [selectSort, setSelectSort] = useState("select-sort");
    const [selectedCategories, setSelectedCategories] = useState([]);

    const dispatch = useDispatch();
    const { foodItems = [] } = useSelector((state) => state.food);
    const wishlistItems = useSelector((state) => state.wishlistLocal.wishlistItems);
    const compareItems = useSelector((state) => state.compareLocal.compareItems);
    const { menuData } = useSelector((state) => state.menu);

    const [currentPage, setCurrentPage] = useState(1);
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchFoodItems());
    }, [dispatch]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [currentPage]);

    const maxPrice = useMemo(() => {
        return Math.max(...foodItems.map(item => Number(item.strMealPrice) || 0));
    }, [foodItems]);

    const [priceRange, setPriceRange] = useState(0);

    useEffect(() => {
        if (maxPrice > 0) {
            setPriceRange(maxPrice);
        }
    }, [maxPrice]);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategories, priceRange, selectSort]);

    const cartItems = useSelector((state) => state.cartLocal.cartItems);

    const AddProductHandler = (product) => {
        dispatch(AddingCart(product)).unwrap().then(() => {
            alert("Product Added To Cart");
            dispatch(addToCart(product));
        }).catch((error) => {
            alert(error);
        })
    };

    const groupedCategory = useMemo(() => {
        return filteredItems.reduce((acc, item) => {
            const category = item.strCategory;

            if (!acc[category]) {
                acc[category] = 0;
            };

            acc[category] += 1;
            return acc;
        }, {});
    }, [filteredItems]);

    const handleCategoryToggle = (category) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((item) => item !== category)
                : [...prev, category]
        );
    };

    const filteredProducts = useMemo(() => {
        let items = [...filteredItems];

        if (selectedCategories.length > 0) {
            items = items.filter(item =>
                selectedCategories.includes(item.strCategory)
            );
        }

        items = items.filter(item =>
            Number(String(item.strMealPrice).replace(/[^0-9]/g, "")) <= priceRange
        );

        return items;
    }, [filteredItems, selectedCategories, priceRange]);


    const sortProducts = useMemo(() => {
        const items = [...filteredProducts];

        if (selectSort === "asc-a-z") {
            return items.sort((a, b) => a.strMeal.localeCompare(b.strMeal));
        } else if (selectSort === "desc-z-a") {
            return items.sort((a, b) => b.strMeal.localeCompare(a.strMeal));
        };

        return items;
    }, [filteredProducts, selectSort]);

    const itemsPerPage = 9;
    const totalPages = Math.ceil(sortProducts.length / itemsPerPage);

    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const paginatedProducts = sortProducts.slice(indexOfFirst, indexOfLast);

    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    const addWishlistHandler = (product) => {
        dispatch(AddingWishlist(product))
            .unwrap()
            .then(() => {
                alert("Adding Product To Your Wishlist");
                dispatch(addToWishlist(product));
            }).catch((error) => {
                alert(error);
            })
    };

    const addCompareHandler = (product) => {
        dispatch(AddingCompare(product))
            .unwrap()
            .then(() => {
                alert("Product Added To Compare List");
                dispatch(addToCompare(product));
            }).catch((error) => {
                alert(error);
            })
    };

    const FilterContent = () => (
        <>
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 dark:text-slate-100">
                    <SlidersHorizontal size={20} />
                    <h2 className="text-xl font-semibold">{menuData?.filterSection?.title}</h2>
                </div>
                <button
                    onClick={() => setMobileFilterOpen(false)}
                    className="lg:hidden"
                >
                    <X />
                </button>
            </div>

            <div className="mb-6">
                <h3 className="font-medium mb-3 text-slate-700">Category</h3>
                <div className="space-y-2 text-sm dark:text-slate-100">
                    {Object.entries(groupedCategory).map(([category, count]) => (
                        <label key={category} className="flex gap-2 items-center">
                            <input
                                type="checkbox"
                                checked={selectedCategories.includes(category)}
                                onChange={() => handleCategoryToggle(category)}
                                className="accent-indigo-600"
                            />
                            {category}
                            <span className="text-slate-400 text-xs dark:text-slate-100">({count})</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="mb-6">
                <h3 className="font-medium mb-3 text-slate-700">Price Range</h3>
                <input
                    type="range"
                    min="0"
                    max={maxPrice}
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full accent-indigo-600 dark:accent-red-500"
                />
                <div className="flex justify-between text-sm text-slate-500 mt-2 dark:text-slate-50">
                    <span>$0</span>
                    <span>${priceRange}</span>
                </div>
            </div>

            <div>
                <h3 className="font-medium mb-3 text-slate-700">Ratings</h3>
                <div className="space-y-2 text-sm dark:text-slate-50">
                    {
                        menuData?.filterSection?.ratingOptions?.map((item) => (
                            <div
                                key={item.label}
                                className="flex items-center gap-2">
                                <Star size={16} className="text-yellow-400" />
                                {item.label}
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">

            {/* HERO */}
            <section className="pt-20 pb-14 px-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white text-center">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl md:text-5xl font-bold"
                >
                    {menuData?.heroSection?.title}
                </motion.h1>

                <p className="mt-4 text-base md:text-lg opacity-90">
                    {menuData?.heroSection?.subtitle}
                </p>
            </section>

            {/* MAIN */}
            <div className="max-w-7xl mx-auto px-4 py-12 dark:bg-slate-800">

                {/* Mobile Filter Button */}
                <div className="lg:hidden mb-6">
                    <button
                        onClick={() => setMobileFilterOpen(true)}
                        className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl"
                    >
                        <SlidersHorizontal size={18} />
                        {menuData?.filterSection?.title}
                    </button>
                </div>

                <div className="flex gap-10">

                    {/* Desktop Sidebar */}
                    <aside className="hidden lg:block w-1/4 bg-white p-6 rounded-2xl shadow-md border border-slate-200 h-fit sticky top-24 dark:bg-slate-700 dark:border-slate-500">
                        <FilterContent />
                    </aside>

                    {/* Products */}
                    <div className="flex-1">
                        <div className="filter-select-block pb-[1rem] flex justify-end pr-2">
                            <select
                                value={selectSort}
                                onChange={(e) => setSelectSort(e.target.value)}
                                className="py-1 px-3 rounded-[5px] text-[1rem]" name="sort" id="sort">
                                <option value="select-sort" hidden>Select Sort</option>
                                <option value="asc-a-z">Ascending A-Z</option>
                                <option value="desc-z-a">Descending Z-A</option>
                            </select>
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {
                                paginatedProducts.length === 0 ? (
                                    <div className="col-span-full flex justify-center items-center py-20">
                                        <p className="capitalize tracking-wide font-[500] text-[0.9rem] text-center dark:text-slate-50">{menuData?.emptyState?.message}</p>
                                    </div>
                                ) : (
                                    paginatedProducts.map((item , index) => {
                                        const isInCart = cartItems.some((cartItem) => cartItem.idMeal === item.idMeal);
                                        const isInWishlist = wishlistItems.some((wishlistItem) => wishlistItem.idMeal === item.idMeal);
                                        const isInCompare = compareItems.some((compareItem) => compareItem.idMeal === item.idMeal);
                                        return (
                                            <motion.div
                                                whileHover={{ y: -6 }}
                                                key={`${item.idMeal} - ${index}`}
                                                className="bg-white rounded-2xl shadow-md relative border border-slate-200 dark:border-slate-500/50 pb-[1.3rem] group hover:cursor-pointer dark:bg-slate-600/70"
                                            >
                                                <div className="relative">
                                                    <div className="product-cta-block">
                                                        <button
                                                            type="button"
                                                            onClick={() => addWishlistHandler(item)}
                                                            className={`cta-wishlist -left-[2.5rem] group-hover:left-0 opacity-0 z-50 group-hover:opacity-100 invisible group-hover:visible transition-all duration-500 absolute top-14 border border-[#ccc] shadow-sm shadow-[#ccc] p-2 max-w-[3rem] max-h-[2.5rem] cursor-pointer hover:from-red-500 hover:to-red-600 ${isInWishlist ? "bg-green-600 text-white" : "bg-gradient-to-b from-indigo-600 to-purple-600 text-white"}`}>
                                                            <Heart className="size-[1.15rem]" />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => addCompareHandler(item)}
                                                            className={`cta-wishlist -left-[2.5rem] group-hover:left-0 opacity-0 z-50 group-hover:opacity-100 invisible group-hover:visible transition-all duration-500 absolute top-[6.2rem] border border-[#ccc] shadow-sm shadow-[#ccc] p-2 max-w-[3rem] max-h-[2.5rem] cursor-pointer hover:from-red-500 hover:to-red-600 
                                                            ${isInCompare ? "bg-green-700 text-white" : "bg-gradient-to-b from-indigo-600 to-purple-600 text-white"}`}>
                                                            <GitCompare className="size-[1.15rem]" />
                                                        </button>
                                                    </div>
                                                    <LazyImage
                                                        src={item.strMealThumb}
                                                        alt={item.strMeal}
                                                        className="w-full h-52 object-cover"
                                                    />
                                                    <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
                                                        <Flame size={14} />
                                                        Trending
                                                    </span>
                                                    <span className="absolute top-3 right-3 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
                                                        <Tag size={14} />
                                                        20% OFF
                                                    </span>
                                                </div>

                                                <div className="p-5 flex flex-col justify-between h-[200px]">
                                                    <div>
                                                        <h3 className="text-lg font-semibold mb-1 dark:text-slate-100">
                                                            {item.strMeal}
                                                        </h3>
                                                        <p className="text-sm text-slate-500 line-clamp-3 dark:text-slate-100">
                                                            {item.strInstructions}
                                                        </p>
                                                    </div>

                                                    <div className="view-food-block mt-4">
                                                        <Link to={item.id}>
                                                            <span className="pl-1 capitalize rounded-[7px] tracking-wide font-[500] text-[0.9rem] hover:underline dark:text-slate-100">view details</span>
                                                        </Link>
                                                    </div>

                                                    <div className="flex justify-between items-center mt-4">
                                                        <span className="text-indigo-600 font-bold text-lg dark:text-slate-100">
                                                            ${item.strMealPrice}
                                                        </span>
                                                        <button
                                                            onClick={() => AddProductHandler(item)}
                                                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm transition dark:bg-red-500">
                                                            {isInCart ? "Added" : "Add"}
                                                        </button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )
                                    }
                                    ))}
                        </motion.div>

                        {/* Pagination */}
                        <div className="flex justify-center mt-12">
                            <div className="flex items-center gap-2 flex-wrap">

                                <button
                                    onClick={() => setCurrentPage((prev) => prev - 1)}
                                    disabled={currentPage === 1}
                                    className={`px-4 py-2 rounded-xl text-sm font-medium transition
                                    ${currentPage === 1
                                            ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                                            : "bg-white dark:bg-indigo-200 border border-slate-300 hover:bg-indigo-600 hover:text-white dark:hover:text-indigo-800"
                                        }`}
                                >
                                    Prev
                                </button>

                                {pageNumbers.map((num) => (
                                    <button
                                        key={num}
                                        onClick={() => setCurrentPage(num)}
                                        className={`px-4 py-2 rounded-xl text-sm font-medium transition
                                        ${currentPage === num
                                                ? "bg-indigo-600 dark:bg-red-600 text-white shadow-md"
                                                : "bg-white dark:bg-indigo-200 border border-slate-300 hover:bg-indigo-100"
                                            }`}
                                    >
                                        {num}
                                    </button>
                                ))}

                                <button
                                    onClick={() => setCurrentPage((prev) => prev + 1)}
                                    disabled={currentPage === totalPages}
                                    className={`px-4 py-2 rounded-xl text-sm font-medium transition 
                                    ${currentPage === totalPages
                                            ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                                            : "bg-white dark:bg-indigo-200 border border-slate-300 hover:bg-indigo-600 hover:text-white dark:hover:text-indigo-800"
                                        }`}
                                >
                                    Next
                                </button>

                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Mobile Filter Sidebar */}
            <AnimatePresence>
                {mobileFilterOpen && (
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        className="fixed inset-0 z-50 bg-black/40 lg:hidden"
                    >
                        <div className="w-72 bg-white h-full p-6 shadow-xl">
                            <FilterContent />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
};

export default MenuPage;
