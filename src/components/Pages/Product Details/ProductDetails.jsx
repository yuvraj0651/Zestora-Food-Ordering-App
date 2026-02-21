import {
    Star,
    Clock,
    MapPin,
    Heart,
    ShoppingCart,
    Tag,
    Leaf,
    Truck,
    ShieldCheck,
    ChevronRight
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { addToCart, decreaseCartQuantity, increaseCartQuantity } from "../../redux/Slices/CartSlice";
import { AddingCart } from "../../Services/Cart/CartThunk";
import { useEffect, useState } from "react";
import LazyImage from "../../UI/LazyImage/LazyImage";

const ProductDetails = () => {

    const { foodItems, isLoading, error } = useSelector((state) => state.food);
    const { productDetailData } = useSelector((state) => state.productDetail);
    console.log(productDetailData);

    const [activeTab, setActiveTab] = useState("Description");

    const dispatch = useDispatch();


    const { id } = useParams();
    // console.log(id);

    const product = foodItems.find((item) => item.id === String(id));
    // console.log(product);

    useEffect(() => {
        const viewed = JSON.parse(localStorage.getItem("recent") || "[]");

        const updated = [
            product,
            ...viewed.filter((item) => item?.idMeal !== product?.idMeal)
        ];

        localStorage.setItem("recent", JSON.stringify(updated));
    }, [product]);

    const relatedProduct = foodItems.filter((item) => item?.strCategory === product?.strCategory && item.id !== product.id).slice(0, 4);

    const cartItems = useSelector((state) => state.cartLocal.cartItems);
    console.log(cartItems);

    const isInCart = cartItems.some((item) => item?.idMeal === product?.idMeal);

    const handleIncrementItem = (id) => {
        dispatch(increaseCartQuantity({ id }));
    };

    const handleDecrementItem = (id) => {
        dispatch(decreaseCartQuantity({ id }));
    };

    const addCartHandler = async (product) => {
        try {
            await dispatch(AddingCart(product)).unwrap();
            dispatch(addToCart(product));
            alert("Product Added To Cart");
        } catch (error) {
            alert(error?.message || "Failed to add product");
        }
    };

    const rating = (Math.random() * 1 + 4).toFixed();
    const reviews = Math.floor(Math.random() * 2000);

    const iconMap = {
        Truck: Truck,
        ShieldCheck: ShieldCheck,
    }

    if (!product) {
        return (
            <p className="p-10 text-center text-red-700">
                {productDetailData?.states?.notFoundText}
            </p>
        );
    }

    if (isLoading) {
        return (
            <p className="p-10 text-center text-red-700 tracking-wide capitalize font-[500]">{productDetailData?.states?.loadingText}</p>
        )
    }

    if (error) {
        return (
            <p className="p-10 text-center text-red-700 tracking-wide capitalize font-[500]">{error || "Something went wrong"}</p>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:bg-none dark:bg-slate-800 dark:text-slate-50">

            {/* BREADCRUMB */}
            <div className="max-w-7xl mx-auto px-4 pt-6 text-sm text-slate-500 flex items-center gap-2 dark:text-slate-50">
                {productDetailData?.breadcrumb?.homeLabel} <ChevronRight size={16} /> {productDetailData?.breadcrumb?.menuLabel} <ChevronRight size={16} />
                <span className="text-slate-800 font-medium">{product.strMeal || "N/A"}</span>
            </div>

            {/* MAIN SECTION */}
            <div className="max-w-7xl mx-auto px-4 py-10 grid lg:grid-cols-2 gap-12">

                {/* LEFT - IMAGE GALLERY */}
                <div className="space-y-4">

                    <div className="relative rounded-3xl overflow-hidden shadow-xl">
                        <LazyImage
                            src={product.strMealThumb || "No Image"}
                            alt="Product"
                            className="w-full h-[400px] object-cover"
                        />

                        {/* Badges */}
                        <span className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1 text-xs font-medium">
                            <Leaf size={14} className="text-green-600" />
                            Veg
                        </span>

                        <button className="absolute top-4 right-4 bg-white/90 backdrop-blur p-3 rounded-full hover:scale-110 transition">
                            <Heart size={18} className="text-rose-500" />
                        </button>

                        <span className="absolute bottom-4 right-4 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                            <Tag size={14} />
                            25% OFF
                        </span>
                    </div>

                    {/* Thumbnail Row */}
                    <div className="flex gap-4 overflow-x-auto">
                        {[1, 2, 3, 4].map((i) => (
                            <LazyImage
                                key={i}
                                src={product.strMealThumb}
                                alt="thumb"
                                className="w-24 h-24 object-cover rounded-xl cursor-pointer border-2 border-transparent hover:border-indigo-500 transition"
                            />
                        ))}
                    </div>
                </div>

                {/* RIGHT - PRODUCT INFO */}
                <div className="space-y-6">

                    {/* Title */}
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-50">
                            {product.strMeal || "N/A"}
                        </h1>

                        <div className="flex items-center gap-4 mt-3 text-sm text-slate-500">
                            <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-md">
                                <Star size={14} className="fill-green-600 text-green-600" />
                                {rating} ({reviews} reviews)
                            </div>

                            <div className="flex items-center gap-1 dark:text-slate-50">
                                <Clock size={16} />
                                30-40 mins
                            </div>

                            <div className="flex items-center gap-1 dark:text-slate-50">
                                <MapPin size={16} />
                                2.5 km
                            </div>
                        </div>
                    </div>

                    {/* Price Section */}
                    <div className="flex items-center gap-4">
                        <span className="text-3xl font-bold text-indigo-600 dark:text-slate-50">
                            ${product.strMealPrice}
                        </span>
                        <span className="text-lg text-slate-400 line-through dark:text-slate-50">
                            ${(Math.random() * 250).toFixed(2)}
                        </span>
                        <span className="bg-red-100 text-red-600 text-sm px-3 py-1 rounded-full">
                            Save 25%
                        </span>
                    </div>

                    {/* Description */}
                    <p className="text-slate-600 leading-relaxed line-clamp-6 dark:text-slate-50">
                        {product.strInstructions}.
                    </p>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => handleDecrementItem(product.idMeal)}
                            className="px-4 py-2 border rounded-lg hover:border hover:border-indigo-700 transition-all duration-300 hover:text-indigo-700"
                        >
                            -
                        </button>

                        <span className="text-lg font-medium">{product.quantity}</span>

                        <button
                            onClick={() => handleIncrementItem(product.idMeal)}
                            className="px-4 py-2 border rounded-lg hover:border hover:border-indigo-700 transition-all duration-300 hover:text-indigo-700"
                        >
                            +
                        </button>
                    </div>

                    {/* Offer Cards */}
                    <div className="grid sm:grid-cols-2 gap-4">
                        {
                            productDetailData?.offerCards?.map((item) => {
                                const Icon = iconMap[item.icon]
                                return (
                                    <div className="flex items-center gap-3 bg-white p-4 rounded-2xl shadow border dark:bg-slate-600 dark:border-slate-500">
                                        {
                                            Icon && (
                                                <Icon className="text-indigo-600 dark:text-slate-50" />
                                            )
                                        }
                                        <div>
                                            <p className="font-medium text-sm">{item.title}</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-50">{item.description}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                    {/* Customization Section */}
                    <div className="bg-white p-6 rounded-2xl shadow border space-y-4 dark:bg-slate-600 dark:border-slate-500">
                        <h3 className="font-semibold text-lg">{productDetailData?.sizeOptions?.title}</h3>

                        <div className="grid grid-cols-3 gap-3">
                            {
                                productDetailData?.sizeOptions?.options?.map((item) => (
                                    <button className="border rounded-xl py-2 hover:border-indigo-600 dark:hover:border-red-600 hover:text-indigo-600 dark:hover:text-red-600 transition">
                                        {item.label}
                                    </button>
                                ))
                            }
                        </div>
                    </div>

                    {/* Add to Cart */}
                    <div className="flex items-center gap-4 pt-4">
                        <button
                            onClick={() => addCartHandler(product)}
                            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl text-lg font-medium flex items-center justify-center gap-2 shadow-lg transition dark:bg-red-600 dark:hover:bg-red-700">
                            <ShoppingCart size={20} />
                            {isInCart ? "Added To Cart" : "Add To Cart"}
                        </button>
                    </div>

                </div>
            </div>

            {/* DESCRIPTION + REVIEWS TABS (STATIC) */}
            <div className="max-w-7xl mx-auto px-4 py-12">

                <div className="flex gap-8 border-b mb-8">
                    {productDetailData?.tabsSection?.tabs?.map((tab) => (
                        <button
                            key={tab.label}
                            onClick={() => setActiveTab(tab.label)}
                            className={`pb-3 font-medium transition ${activeTab === tab.label
                                ? "border-b-2 border-indigo-600 dark:border-red-600"
                                : "text-slate-500"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="text-slate-600 leading-relaxed max-w-3xl dark:text-slate-50 mt-6">

                    {activeTab === "Description" && (
                        <p>{product.strInstructions}</p>
                    )}

                    {activeTab === "Ingredients" && product && (
                        <ul className="list-disc pl-5 space-y-2">
                            {Object.keys(product)
                                .filter(key => key.startsWith("strIngredient") && product[key])
                                .map((key, index) => (
                                    <li key={index}>{product[key]}</li>
                                ))}
                        </ul>
                    )}

                    {activeTab === "Reviews" && (
                        <div className="space-y-4">
                            <p>⭐ {rating} Rating</p>
                            <p>{reviews} Customer Reviews</p>
                        </div>
                    )}

                </div>

            </div>

            {/* RELATED PRODUCTS */}
            <div className="max-w-7xl mx-auto px-4 pb-20">
                <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {relatedProduct.map((item) => (
                        <div
                            key={item.idMeal}
                            className="bg-white rounded-2xl shadow border p-4 hover:shadow-lg transition dark:border-slate-500 dark:bg-slate-600"
                        >
                            <LazyImage
                                src={item.strMealThumb}
                                alt="related"
                                className="w-full h-40 object-cover rounded-xl mb-4"
                            />
                            <h3 className="font-medium text-sm mb-2">
                                {item.strMeal}
                            </h3>
                            <span className="text-indigo-600 font-bold dark:text-slate-50">
                                ${item.strMealPrice}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* MOBILE STICKY CART */}
            <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t p-4 flex items-center justify-between lg:hidden">
                <div>
                    <p className="text-xs text-slate-500">Total</p>
                    <p className="text-lg font-bold text-indigo-600">$18.99</p>
                </div>
                <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium">
                    Add to Cart
                </button>
            </div>

        </div>
    );
};

export default ProductDetails;
