import {
    MapPin,
    CreditCard,
    ShieldCheck,
    ArrowRight,
} from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddingCheckout } from "../../Services/Checkout/CheckoutThunk";
import { useNavigate } from "react-router";

const deliveryOptions = [
    { id: "standard", label: "Standard Delivery", fee: 0 },
    { id: "express", label: "Express Delivery", fee: 5 },
];

const Checkout = () => {

    const [checkoutData, setCheckoutData] = useState({
        fullName: "",
        phone: "",
        address: "",
        city: "",
        code: "",
        paymentMethod: "",
        deliveryMethod: "",
        deliveryFee: 0,
    });

    const [error, setError] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { checkoutData: checkout, addLoading } = useSelector((state) => state.checkout);
    const cartItems = useSelector((state) => state.cartLocal.cartItems);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCheckoutData({ ...checkoutData, [name]: value });
        setError({ ...error, [name]: "" });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!checkoutData.fullName.trim()) {
            newErrors.fullName = "Full name is required";
        }

        if (!checkoutData.phone.trim()) {
            newErrors.phone = "Phone number is required";
        } else if (!/^[0-9]{10}$/.test(checkoutData.phone)) {
            newErrors.phone = "Phone number must be 10 digits";
        }

        if (!checkoutData.address.trim()) {
            newErrors.address = "Address is required";
        }

        if (!checkoutData.city.trim()) {
            newErrors.city = "City is required";
        }

        if (!checkoutData.code.trim()) {
            newErrors.code = "Postal code is required";
        } else if (!/^[0-9]{5,6}$/.test(checkoutData.code)) {
            newErrors.code = "Postal code must be 5-6 digits";
        }

        if (!checkoutData.paymentMethod) {
            newErrors.paymentMethod = "Please select a payment method";
        };

        if (!checkoutData.deliveryMethod) {
            newErrors.deliveryMethod = "Please select a delivery method";
        };

        return newErrors;
    };

    const handlePaymentSelect = (method) => {
        setCheckoutData({
            ...checkoutData,
            paymentMethod: method,
        });

        setError({ ...error, paymentMethod: "" });
    };

    const handleDeliverySelect = (method, fee) => {
        setCheckoutData({
            ...checkoutData,
            deliveryMethod: method,
            deliveryFee: fee,
        });

        setError({ ...error, deliveryMethod: "" });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formErrors = validateForm();
        setError(formErrors);

        if (Object.keys(formErrors).length === 0) {
            dispatch(AddingCheckout(checkoutData)).unwrap().then(() => {
                alert("Checkout Data Submitted Successfully!");

                setCheckoutData({
                    fullName: "",
                    phone: "",
                    address: "",
                    city: "",
                    code: "",
                    paymentMethod: "",
                    deliveryMethod: "",
                    deliveryFee: 0,
                });

                setError({});

                setTimeout(() => {
                    navigate("/thankyou", {
                        state: {
                            order: {
                                orderId: "ORD-" + Math.floor(Math.random() * 1000000),
                                date: new Date().toLocaleDateString(),
                                paymentMethod: checkoutData.paymentMethod,
                                deliveryAddress: `${checkoutData.address}, ${checkoutData.city}`,
                                estimatedDelivery:
                                    checkoutData.deliveryMethod === "express"
                                        ? "15-20 mins"
                                        : "30-40 mins",
                                items: cartItems.map((item) => ({
                                    name: item.strMeal,
                                    qty: item.quantity,
                                    price: item.strMealPrice,
                                })),
                            },
                        },
                    });

                }, 500);
            }).catch((error) => {
                alert(error);
            })
        }
    };

    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.strMealPrice * item.quantity,
        0
    );

    const discount = 10;
    const total = subtotal - discount + checkoutData.deliveryFee;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 pb-32">

            {/* HEADER */}
            <div className="max-w-7xl mx-auto px-4 pt-10">
                <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
                    Checkout
                </h1>
                <p className="text-slate-500 text-sm">
                    Complete your order securely
                </p>
            </div>

            {/* MAIN GRID */}
            <div className="max-w-7xl mx-auto px-4 py-10 grid lg:grid-cols-3 gap-10">

                {/* LEFT */}
                <div className="lg:col-span-2 space-y-8">

                    {/* DELIVERY ADDRESS */}
                    <div className="bg-white rounded-3xl shadow-md border border-slate-100 p-6 space-y-6">
                        <div className="flex items-center gap-3">
                            <MapPin className="text-indigo-600" />
                            <h2 className="text-xl font-semibold">
                                Delivery Address
                            </h2>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            id="checkout-form"
                            className="grid md:grid-cols-2 gap-5"
                        >

                            {/* FULL NAME */}
                            <div>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={checkoutData.fullName}
                                    onChange={handleChange}
                                    placeholder="Full Name"
                                    className={`w-full border rounded-xl px-4 py-3 outline-none transition ${error.fullName
                                        ? "border-red-500 focus:ring-2 focus:ring-red-500"
                                        : "focus:ring-2 focus:ring-indigo-500"
                                        }`}
                                />
                                <p className="text-red-500 text-xs mt-1 min-h-[16px]">
                                    {error.fullName || ""}
                                </p>
                            </div>

                            {/* PHONE */}
                            <div>
                                <input
                                    type="tel"
                                    name="phone"
                                    maxLength={10}
                                    value={checkoutData.phone}
                                    onChange={handleChange}
                                    placeholder="Phone Number"
                                    className={`w-full border rounded-xl px-4 py-3 outline-none transition ${error.phone
                                        ? "border-red-500 focus:ring-2 focus:ring-red-500"
                                        : "focus:ring-2 focus:ring-indigo-500"
                                        }`}
                                />
                                <p className="text-red-500 text-xs mt-1 min-h-[16px]">
                                    {error.phone || ""}
                                </p>
                            </div>

                            {/* ADDRESS */}
                            <div className="md:col-span-2">
                                <input
                                    type="text"
                                    name="address"
                                    value={checkoutData.address}
                                    onChange={handleChange}
                                    placeholder="Street Address"
                                    className={`w-full border rounded-xl px-4 py-3 outline-none transition ${error.address
                                        ? "border-red-500 focus:ring-2 focus:ring-red-500"
                                        : "focus:ring-2 focus:ring-indigo-500"
                                        }`}
                                />
                                <p className="text-red-500 text-xs mt-1 min-h-[16px]">
                                    {error.address || ""}
                                </p>
                            </div>

                            {/* CITY */}
                            <div>
                                <input
                                    type="text"
                                    name="city"
                                    value={checkoutData.city}
                                    onChange={handleChange}
                                    placeholder="City"
                                    className={`w-full border rounded-xl px-4 py-3 outline-none transition ${error.city
                                        ? "border-red-500 focus:ring-2 focus:ring-red-500"
                                        : "focus:ring-2 focus:ring-indigo-500"
                                        }`}
                                />
                                <p className="text-red-500 text-xs mt-1 min-h-[16px]">
                                    {error.city || ""}
                                </p>
                            </div>

                            {/* POSTAL CODE */}
                            <div>
                                <input
                                    type="text"
                                    name="code"
                                    maxLength={6}
                                    value={checkoutData.code}
                                    onChange={handleChange}
                                    placeholder="Postal Code"
                                    className={`w-full border rounded-xl px-4 py-3 outline-none transition ${error.code
                                        ? "border-red-500 focus:ring-2 focus:ring-red-500"
                                        : "focus:ring-2 focus:ring-indigo-500"
                                        }`}
                                />
                                <p className="text-red-500 text-xs mt-1 min-h-[16px]">
                                    {error.code || ""}
                                </p>
                            </div>

                        </form>
                    </div>

                    {/* DELIVERY METHOD */}
                    <div className="bg-white rounded-3xl shadow-md border border-slate-100 p-6 space-y-6">
                        {deliveryOptions.map((option) => (
                            <div
                                key={option.id}
                                onClick={() => handleDeliverySelect(option.id, option.fee)}
                                className={`border rounded-2xl p-4 transition cursor-pointer flex justify-between items-center
                                ${checkoutData.deliveryMethod === option.id
                                        ? "border-indigo-600 bg-indigo-50"
                                        : "hover:border-indigo-600"
                                    }`}
                            >
                                <span>{option.label}</span>
                                <span>
                                    {option.fee === 0 ? "Free" : `$${option.fee.toFixed(2)}`}
                                </span>
                            </div>
                        ))}

                        <p className="text-red-500 text-xs">
                            {error.deliveryMethod || ""}
                        </p>
                    </div>

                    {/* PAYMENT METHOD */}
                    <div className="bg-white rounded-3xl shadow-md border border-slate-100 p-6 space-y-6">
                        <div className="flex items-center gap-3">
                            <CreditCard className="text-indigo-600" />
                            <h2 className="text-xl font-semibold">
                                Payment Method
                            </h2>
                        </div>

                        <div className="space-y-4">
                            <div
                                onClick={() => handlePaymentSelect("card")}
                                className={`border rounded-2xl p-4 transition cursor-pointer flex items-center gap-4
                                ${checkoutData.paymentMethod === "card"
                                        ? "border-indigo-600 bg-indigo-50"
                                        : "hover:border-indigo-600"
                                    }`}
                            >
                                <CreditCard className="text-indigo-600" />
                                Credit / Debit Card
                            </div>

                            <div
                                onClick={() => handlePaymentSelect("wallet")}
                                className={`border rounded-2xl p-4 transition cursor-pointer flex items-center gap-4
                                ${checkoutData.paymentMethod === "wallet"
                                        ? "border-indigo-600 bg-indigo-50"
                                        : "hover:border-indigo-600"
                                    }`}
                            >
                                <CreditCard className="text-indigo-600" />
                                Wallet
                            </div>


                            <div
                                onClick={() => handlePaymentSelect("net-banking")}
                                className={`border rounded-2xl p-4 transition cursor-pointer flex items-center gap-4
                                ${checkoutData.paymentMethod === "net-banking"
                                        ? "border-indigo-600 bg-indigo-50"
                                        : "hover:border-indigo-600"
                                    }`}
                            >
                                <CreditCard className="text-indigo-600" />
                                Net Banking
                            </div>


                            <div
                                onClick={() => handlePaymentSelect("upi-payment")}
                                className={`border rounded-2xl p-4 transition cursor-pointer flex items-center gap-4
                                ${checkoutData.paymentMethod === "upi-payment"
                                        ? "border-indigo-600 bg-indigo-50"
                                        : "hover:border-indigo-600"
                                    }`}
                            >
                                <CreditCard className="text-indigo-600" />
                                UPI / Mobile Payment
                            </div>

                            <p className="text-red-500 text-xs">
                                {error.paymentMethod || ""}
                            </p>
                        </div>
                    </div>

                </div>

                {/* ORDER SUMMARY */}
                <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 h-fit lg:sticky lg:top-24 space-y-6">

                    <h3 className="text-xl font-bold text-slate-800">
                        Order Summary
                    </h3>

                    <div className="space-y-4 text-sm text-slate-600">

                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>${subtotal}</span>
                        </div>

                        <div className="flex justify-between">
                            <span>Delivery Fee</span>
                            <span>
                                {checkoutData.deliveryFee === 0
                                    ? "$0.00"
                                    : `$${checkoutData.deliveryFee.toFixed(2)}`}
                            </span>
                        </div>

                        <div className="flex justify-between text-green-600">
                            <span>Discount</span>
                            <span>- ${discount}</span>
                        </div>

                        <div className="border-t pt-4 flex justify-between font-bold text-lg text-slate-800">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>

                    </div>

                    <button
                        type="submit"
                        form="checkout-form"
                        disabled={addLoading}
                        className={`w-full py-4 rounded-2xl text-lg font-medium flex items-center justify-center gap-2 shadow-lg transition 
                        ${addLoading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-indigo-600 hover:bg-indigo-700 text-white"
                            }`}
                    >
                        {addLoading ? "Processing..." : "Pay Now"}
                        {!addLoading && <ArrowRight size={18} />}
                    </button>

                    <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                        <ShieldCheck size={14} />
                        Secure & Encrypted Payment
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Checkout;
