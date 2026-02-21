import { motion } from "framer-motion";
import { CheckCircle, Home, Package } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const ThankYou = () => {
    const location = useLocation();

    // Agar order data route se aaye
    const order = location.state?.order || {
        orderId: "ORD-784512",
        date: new Date().toLocaleDateString(),
        paymentMethod: "Cash on Delivery",
        deliveryAddress: "Sector 21, Chandigarh, India",
        estimatedDelivery: "30-40 mins",
        items: [
            { name: "Margherita Pizza", qty: 2, price: 299 },
            { name: "Veg Burger", qty: 1, price: 149 },
        ],
    };

    const totalAmount = order.items.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-indigo-50 flex items-center justify-center px-4 py-12 dark:bg-slate-800 dark:bg-none">

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl w-full bg-white rounded-3xl shadow-2xl border border-slate-100 p-8 dark:bg-slate-600 dark:border-slate-500"
            >

                {/* Success Icon */}
                <div className="flex flex-col items-center text-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <CheckCircle size={90} className="text-green-500 drop-shadow-lg" />
                    </motion.div>

                    <h1 className="text-3xl md:text-4xl font-bold mt-4 text-slate-800 dark:text-slate-50">
                        Thank You for Your Order! 🎉
                    </h1>

                    <p className="text-slate-500 mt-2 dark:text-slate-50">
                        Your delicious food is being prepared 🍕
                    </p>
                </div>

                {/* Order Details */}
                <div className="mt-8 space-y-6">

                    {/* Order Info */}
                    <div className="grid md:grid-cols-2 gap-6">

                        <div className="bg-slate-50 p-5 rounded-2xl dark:bg-slate-700 dark:border-slate-500">
                            <p className="text-sm text-slate-500 dark:text-slate-50">Order ID</p>
                            <p className="font-semibold text-slate-800 dark:text-slate-50">
                                {order.orderId}
                            </p>
                        </div>

                        <div className="bg-slate-50 p-5 rounded-2xl dark:bg-slate-700 dark:border-slate-500">
                            <p className="text-sm text-slate-500 dark:text-slate-50">Order Date</p>
                            <p className="font-semibold text-slate-800 dark:text-slate-50">
                                {order.date}
                            </p>
                        </div>

                        <div className="bg-slate-50 p-5 rounded-2xl dark:bg-slate-700 dark:border-slate-500">
                            <p className="text-sm text-slate-500 dark:text-slate-50">Payment Method</p>
                            <p className="font-semibold text-slate-800 dark:text-slate-50">
                                {order.paymentMethod}
                            </p>
                        </div>

                        <div className="bg-slate-50 p-5 rounded-2xl dark:bg-slate-700 dark:border-slate-500">
                            <p className="text-sm text-slate-500 dark:text-slate-50">Estimated Delivery</p>
                            <p className="font-semibold text-slate-800 dark:text-slate-50">
                                {order.estimatedDelivery}
                            </p>
                        </div>

                    </div>

                    {/* Address */}
                    <div className="bg-indigo-50 p-5 rounded-2xl dark:bg-slate-700 dark:border-slate-500">
                        <p className="text-sm text-slate-500 dark:text-slate-50">Delivery Address</p>
                        <p className="font-medium text-slate-800 dark:text-slate-50">
                            {order.deliveryAddress}
                        </p>
                    </div>

                    {/* Items List */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 dark:text-slate-50">
                            <Package size={18} />
                            Order Summary
                        </h3>

                        <div className="space-y-3">
                            {order.items.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex justify-between bg-slate-50 p-4 rounded-xl dark:bg-slate-700 dark:border-slate-500"
                                >
                                    <div>
                                        <p className="font-medium dark:text-slate-50">{item.name}</p>
                                        <p className="text-sm text-slate-500 dark:text-slate-50">
                                            Qty: {item.qty}
                                        </p>
                                    </div>
                                    <p className="font-semibold dark:text-slate-50">
                                        ₹ {item.price * item.qty}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Total */}
                        <div className="flex justify-between mt-6 text-lg font-bold border-t pt-4 dark:text-slate-50">
                            <span>Total Amount</span>
                            <span className="text-green-600 dark:text-slate-50">
                                ₹ {totalAmount}
                            </span>
                        </div>
                    </div>

                </div>

                {/* Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/orders"
                        className="px-6 py-3 rounded-2xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
                    >
                        View My Orders
                    </Link>

                    <Link
                        to="/"
                        className="px-6 py-3 rounded-2xl bg-slate-200 text-slate-700 font-semibold hover:bg-slate-300 transition flex items-center justify-center gap-2"
                    >
                        <Home size={18} />
                        Continue Shopping
                    </Link>
                    <Link
                        to="/order-tracking"
                        state={{ order }}
                        className="px-6 py-3 rounded-2xl bg-green-600 text-white font-semibold hover:bg-green-700 transition"
                    >
                        Track Order 🚚
                    </Link>

                </div>

            </motion.div>
        </div>
    );
};

export default ThankYou;
