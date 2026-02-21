import {
    Heart,
    ShoppingCart,
    Trash2,
    Star,
    ArrowRight,
    Sparkles
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../../redux/Slices/WishlistSlice";
import { AddingCart } from "../../Services/Cart/CartThunk";
import { addToCart } from "../../redux/Slices/CartSlice";
import LazyImage from "../../UI/LazyImage/LazyImage";

const Wishlist = () => {

    const dispatch = useDispatch();

    const wishlistItems = useSelector((state) => state.wishlistLocal.wishlistItems);
    console.log("Wishlist Slice:", wishlistItems);
    const cartItems = useSelector((state) => state.cartLocal.cartItems);

    const { foodItems } = useSelector((state) => state.food);

    const deleteWishlistHandler = (id) => {
        dispatch(removeFromWishlist({ id }))
    };

    const addProductHandler = (product) => {
        dispatch(AddingCart(product))
            .unwrap()
            .then(() => {
                alert("Product Added To Cart From Wishlist");
                dispatch(addToCart(product));
            }).catch((error) => {
                alert(error);
            })
    }

    const recommendedWishlist = foodItems
        .filter((product) =>
            wishlistItems.some((item) => item.strCategory === product.strCategory &&
                item.id !== product.id
            )).slice(0, 4);

    console.log(recommendedWishlist);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 pb-24 dark:bg-none dark:bg-slate-800">

            {/* HEADER */}
            <div className="max-w-7xl mx-auto px-4 pt-10">
                <div className="flex items-center gap-3 mb-2">
                    <Heart className="text-rose-500 dark:text-slate-50" size={30} />
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-50">
                        Your Wishlist
                    </h1>
                </div>
                <p className="text-slate-500 text-sm dark:text-slate-100">
                    {wishlistItems.length} saved {wishlistItems.length > 1 ? "items" : "item"}
                </p>
            </div>

            {/* MAIN CONTENT */}
            <div className="max-w-7xl mx-auto px-4 py-10">

                {/* PRODUCTS GRID */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

                    {
                        wishlistItems.length === 0 ? (
                            <div className="text-center col-span-full py-20">
                                <p className="text-center w-full capitalize tracking-wide font-[500] dark:text-slate-100">no wishlist data to show</p>
                            </div>
                        ) : (
                            wishlistItems.map((item) => {
                                const isInCart = cartItems.some((cartItem) => cartItem.idMeal === item.idMeal);
                                return (
                                    <div
                                        key={item.id}
                                        className="group bg-white rounded-3xl shadow-md hover:shadow-2xl transition duration-300 border border-slate-100 overflow-hidden dark:bg-slate-600 dark:border-slate-500"
                                    >

                                        {/* IMAGE */}
                                        <div className="relative">
                                            <LazyImage
                                                src={item.strMealThumb}
                                                alt="product"
                                                className="w-full h-52 object-cover group-hover:scale-105 transition duration-500"
                                            />

                                            {/* REMOVE BUTTON */}
                                            <button
                                                onClick={() => deleteWishlistHandler(item.id)}
                                                className="absolute top-4 right-4 bg-white/90 backdrop-blur p-2 rounded-full shadow hover:scale-110 transition">
                                                <Trash2 size={16} className="text-rose-500" />
                                            </button>

                                            {/* BADGE */}
                                            <span className="absolute top-4 left-4 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full shadow">
                                                20% OFF
                                            </span>
                                        </div>

                                        {/* DETAILS */}
                                        <div className="p-5 space-y-3">

                                            {/* TITLE */}
                                            <h3 className="font-semibold text-slate-800 group-hover:text-indigo-600 transition dark:text-slate-50">
                                                {item.strMeal}
                                            </h3>

                                            {/* RATING */}
                                            <div className="flex items-center gap-1 text-yellow-400 dark:text-slate-50">
                                                <Star size={16} fill="currentColor" />
                                                <Star size={16} fill="currentColor" />
                                                <Star size={16} fill="currentColor" />
                                                <Star size={16} fill="currentColor" />
                                                <Star size={16} className="text-slate-300" />
                                                <span className="text-xs text-slate-500 ml-2">
                                                    ({(Math.random() * 200).toFixed(0)} reviews)
                                                </span>
                                            </div>

                                            {/* PRICE */}
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-sm text-slate-400 line-through dark:text-slate-50">
                                                        ${((Math.random() * (500 - 250 + 1)) + 250).toFixed(2)}
                                                    </p>
                                                    <p className="text-lg font-bold text-indigo-600 dark:text-slate-50">
                                                        ${item.strMealPrice}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* ACTION BUTTON */}
                                            <button
                                                onClick={() => addProductHandler(item)}
                                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-2xl font-medium flex items-center justify-center gap-2 transition shadow-lg dark:bg-red-600">
                                                <ShoppingCart size={18} />
                                                {isInCart ? "Moved To Cart" : "Move To Cart"}
                                            </button>

                                        </div>

                                    </div>
                                )
                            })
                        )}

                </div>

                {/* RECOMMENDED SECTION */}
                <div className="mt-16">
                    <h2 className="text-2xl font-bold mb-8 flex items-center gap-2 dark:text-slate-50">
                        <Sparkles size={20} className="text-purple-600 dark:text-slate-50" />
                        You May Also Like
                    </h2>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

                        {
                            recommendedWishlist.length === 0 ? (
                                <div className="col-span-full text-center">
                                    <p className="capitalize tracking-wide font-[500] dark:text-slate-50">no recommended products, add product to wishlist first</p>
                                </div>
                            ) : (
                                recommendedWishlist.map((item) => (
                                    <div
                                        key={item.id}
                                        className="bg-white rounded-2xl shadow border p-4 hover:shadow-lg transition dark:bg-slate-600 dark:border-slate-500"
                                    >
                                        <LazyImage
                                            src={item.strMealThumb}
                                            alt="recommended"
                                            className="w-full h-32 object-cover rounded-xl mb-3"
                                        />
                                        <h3 className="font-medium text-sm mb-2 dark:text-slate-50">
                                            {item.strMeal}
                                        </h3>
                                        <div className="flex justify-between items-center">
                                            <span className="text-indigo-600 font-bold dark:text-slate-50">
                                                ${item.strMealPrice}
                                            </span>
                                            <button className="text-sm bg-indigo-100 text-indigo-600 px-3 py-1 rounded-lg hover:bg-indigo-200 transition">
                                                Add
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                    </div>
                </div>

            </div>

            {/* MOBILE STICKY ACTION BAR */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 flex items-center justify-between lg:hidden">
                <p className="text-sm font-medium text-slate-600">
                    6 items saved
                </p>
                <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2">
                    <ArrowRight size={16} />
                    Continue Shopping
                </button>
            </div>

        </div>
    );
};

export default Wishlist;
