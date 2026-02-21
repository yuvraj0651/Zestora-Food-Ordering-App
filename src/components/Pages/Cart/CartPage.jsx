import {
    ShoppingCart,
    Trash2,
    Plus,
    Minus,
    Tag,
    ShieldCheck,
    Truck,
    CreditCard,
    ArrowRight,
    Sparkles
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decreaseCartQuantity, increaseCartQuantity, removeFromCart } from "../../redux/Slices/CartSlice";
import { AddingCart } from "../../Services/Cart/CartThunk";
import { useState } from "react";
import { Link } from "react-router";
import LazyImage from "../../UI/LazyImage/LazyImage";

const coupons = {
    SAVE10: { type: "flat", value: 10 },
    SAVE20: { type: "percent", value: 20 },
    FREESHIP: { type: "shipping", value: 4 }
};

const CartPage = () => {
    const [couponCode, setCouponCode] = useState("");
    const [couponDiscount, setCouponDiscount] = useState(0);
    const [couponError, setCouponError] = useState("");

    const dispatch = useDispatch();

    const { foodItems } = useSelector((state) => state.food);

    const cartItems = useSelector((state) => state.cartLocal.cartItems);
    console.log("Cart Page:", cartItems);

    const handleIncrementQty = (id) => {
        dispatch(increaseCartQuantity({ id }));
    };

    const handleDecrementQty = (id) => {
        dispatch(decreaseCartQuantity({ id }));
    };

    const handleDelete = (id) => {
        dispatch(removeFromCart({ id }));
    };

    const addProductHandler = (product) => {
        dispatch(AddingCart(product)).unwrap().then(() => {
            alert("Product Added To Cart");
            dispatch(addToCart(product));
        }).catch((error) => {
            alert(error);
        })
    };

    const totalAmount = cartItems.reduce((acc, item) => {
        return acc + Number(item.strMealPrice) * item.quantity;
    }, 0);

    const recommendedProducts = foodItems
        .filter(item => !cartItems.some((cart) => cart.idMeal === item.idMeal))
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);

    const handleApplyCoupon = () => {
        const code = couponCode.trim().toUpperCase();

        if (!coupons[code]) {
            setCouponError("Invalid coupon code");
            setCouponDiscount(0);
            return;
        }

        setCouponError("");

        const coupon = coupons[code];

        if (coupon.type === "flat") {
            setCouponDiscount(coupon.value);
        };

        if (coupon.type === "percent") {
            setCouponDiscount((subtotal * coupon.value) / 100);
        };

        if (coupon.type === "shipping") {
            setCouponDiscount(deliveryFee);
        };
    };

    const deliveryFee = totalAmount > 0 ? 4 : 0;
    const discountAmt = totalAmount > 500 ? 10 : 0;

    const subtotal = totalAmount;
    const rawTotal = subtotal + deliveryFee - discountAmt - couponDiscount;
    const total = Math.max(0, rawTotal);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 pb-32 dark:bg-slate-800 dark:bg-none">

            {/* PAGE HEADER */}
            <div className="max-w-7xl mx-auto px-4 pt-10">
                <div className="flex items-center gap-3 mb-2">
                    <ShoppingCart className="text-indigo-600 dark:text-slate-50" size={30} />
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-50">
                        Your Cart
                    </h1>
                </div>
                <p className="text-slate-500 text-sm dark:text-slate-50">
                    {cartItems.length} {cartItems.length > 1 ? "items" : "item"} added in your cart
                </p>
            </div>

            {/* MAIN GRID */}
            <div className="max-w-7xl mx-auto px-4 py-10 grid lg:grid-cols-3 gap-10">

                {/* LEFT SIDE - CART ITEMS */}
                <div className="lg:col-span-2 space-y-6">

                    {
                        cartItems.length === 0 ? (
                            <p className="text-center capitalize tracking-wide font-[500] border border-[#ccc] shadow-sm max-w-[13rem] mx-auto py-3 rounded-[10px] bg-white text-[0.9rem] cursor-pointer dark:bg-slate-600 dark:text-slate-50 dark:border-slate-500">no cart data to show</p>
                        ) : (
                            cartItems?.map((item) => {
                                return (
                                    <div
                                        key={item.id}
                                        className="group bg-white rounded-3xl shadow-md hover:shadow-2xl transition duration-300 p-5 flex flex-col sm:flex-row gap-6 border border-slate-100 dark:bg-slate-600 dark:border-slate-500 dark:text-slate-50"
                                    >
                                        {/* IMAGE */}
                                        <div className="relative">
                                            <LazyImage
                                                src={item.strMealThumb}
                                                alt="product"
                                                className="w-28 h-28 sm:w-36 sm:h-36 object-cover rounded-2xl"
                                            />
                                            <span className="absolute -top-2 -left-2 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full shadow">
                                                Bestseller
                                            </span>
                                        </div>

                                        {/* DETAILS */}
                                        <div className="flex-1 space-y-4">

                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-50">
                                                        {item.strMeal || "N/A"}
                                                    </h3>
                                                    <p className="text-sm text-slate-500 dark:text-slate-50">
                                                        Medium • Extra Cheese
                                                    </p>
                                                </div>

                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    className="text-rose-500 hover:scale-110 transition dark:text-slate-50">
                                                    <Trash2 size={20} />
                                                </button>
                                            </div>

                                            {/* QUANTITY + PRICE */}
                                            <div className="flex flex-wrap items-center justify-between gap-4">

                                                <div className="flex items-center border rounded-xl overflow-hidden">
                                                    <button
                                                        onClick={() => handleDecrementQty(item.id)}
                                                        className="px-4 py-2 hover:bg-slate-100 transition">
                                                        <Minus size={16} />
                                                    </button>
                                                    <span className="px-4 py-2 font-medium">{item.quantity}</span>
                                                    <button
                                                        onClick={() => handleIncrementQty(item.id)}
                                                        className="px-4 py-2 hover:bg-slate-100 transition">
                                                        <Plus size={16} />
                                                    </button>
                                                </div>

                                                <div className="text-right">
                                                    <p className="text-sm text-slate-400 line-through">
                                                        ${(Math.random() * 500).toFixed(2)}
                                                    </p>
                                                    <p className="text-lg font-bold text-indigo-600 dark:text-slate-50">
                                                        ${item.strMealPrice}
                                                    </p>
                                                </div>

                                            </div>

                                            {/* DELIVERY INFO */}
                                            <div className="flex flex-wrap gap-4 text-xs text-slate-500 pt-3 border-t dark:text-slate-50">
                                                <div className="flex items-center gap-1">
                                                    <Truck size={14} />
                                                    Free Delivery
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <ShieldCheck size={14} />
                                                    Safe Packaging
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                )
                            })
                        )}

                    {/* COUPON SECTION */}
                    <div className="bg-white p-6 rounded-3xl shadow-md border border-slate-100 dark:bg-slate-600 dark:border-slate-500">
                        <div className="flex items-center gap-3 mb-4 dark:text-slate-50">
                            <Tag className="text-indigo-600 dark:text-slate-50" />
                            <h3 className="font-semibold text-lg">
                                Apply Coupon
                            </h3>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <input
                                type="text"
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value)}
                                placeholder="Enter promo code"
                                className="flex-1 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none dark:bg-slate-700 dark:border-slate-500 placeholder:text-slate-400 dark:text-slate-50"
                            />
                            <button
                                onClick={handleApplyCoupon}
                                className="bg-indigo-600 hover:bg-indigo-700 dark:bg-red-600 dark:hover:bg-red-700 text-white px-6 py-3 rounded-xl transition">
                                Apply
                            </button>
                            {couponError && (
                                <p className="text-red-500 text-sm mt-2">{couponError}</p>
                            )}
                        </div>
                    </div>

                    {/* RECOMMENDED SECTION */}
                    <div>
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2 dark:text-slate-50">
                            <Sparkles size={20} className="text-purple-600 dark:text-slate-50" />
                            Recommended For You
                        </h2>

                        <div className="grid sm:grid-cols-2 gap-6">
                            {recommendedProducts.map((item) => {
                                const isInCart = cartItems.some((cartItem) => cartItem.idMeal === item.idMeal)
                                return (
                                    <div
                                        key={item.idMeal}
                                        className="bg-white rounded-2xl shadow border p-4 hover:shadow-lg transition dark:bg-slate-600 dark:border-slate-500 dark:text-slate-50"
                                    >
                                        <LazyImage
                                            src={item.strMealThumb}
                                            alt="recommended"
                                            className="w-full h-32 object-cover rounded-xl mb-3"
                                        />
                                        <h3 className="font-medium text-sm mb-2">
                                            {item.strMeal}
                                        </h3>
                                        <div className="flex justify-between items-center">
                                            <span className="text-indigo-600 font-bold dark:text-slate-50">
                                                ${item.strMealPrice}
                                            </span>
                                            <button
                                                onClick={() => addProductHandler(item)}
                                                className="text-sm bg-indigo-100 text-indigo-600 px-3 py-1 rounded-lg hover:bg-indigo-200 transition">
                                                {isInCart ? "Added" : "Add"}
                                            </button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                </div>

                {/* RIGHT SIDE - ORDER SUMMARY */}
                <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 h-fit lg:sticky lg:top-24 space-y-6 dark:bg-slate-600 dark:border-slate-600">

                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-50">
                        Order Summary:
                    </h3>

                    <div className="space-y-4 text-sm text-slate-600 dark:text-slate-50">

                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between">
                            <span>Delivery Fee</span>
                            <span>${deliveryFee.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between text-green-600 dark:text-red-500">
                            <span>Discount</span>
                            <span>- ${discountAmt.toFixed(2)}</span>
                        </div>

                        {couponDiscount > 0 && (
                            <div className="flex justify-between text-green-600 dark:text-red-500">
                                <span>Coupon Discount</span>
                                <span>- ${couponDiscount.toFixed(2)}</span>
                            </div>
                        )}

                        <div className="border-t pt-4 flex justify-between font-bold text-lg text-slate-800 dark:text-slate-50">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>

                    </div>

                    <Link to="/checkout">
                        <button className="w-full mt-[1rem] bg-indigo-600 hover:bg-indigo-700 dark:bg-red-600 dark:hover:bg-red-700 text-white py-4 rounded-2xl text-lg font-medium flex items-center justify-center gap-2 shadow-lg transition">
                            <CreditCard size={20} />
                            Proceed to Checkout
                            <ArrowRight size={18} />
                        </button>
                    </Link>

                    <p className="text-xs text-slate-400 text-center">
                        Secure payments • 100% Safe Checkout
                    </p>

                </div>

            </div>

            {/* MOBILE STICKY CHECKOUT BAR */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 flex items-center justify-between lg:hidden">
                <div>
                    <p className="text-xs text-slate-500">Total</p>
                    <p className="text-lg font-bold text-indigo-600">$50.97</p>
                </div>
                <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium">
                    Checkout
                </button>
            </div>

        </div>
    );
};

export default CartPage;
