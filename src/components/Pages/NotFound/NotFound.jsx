import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white px-6 relative overflow-hidden">

            {/* Floating Animated Circles */}
            <motion.div
                animate={{ y: [0, -30, 0] }}
                transition={{ repeat: Infinity, duration: 6 }}
                className="absolute w-72 h-72 bg-white/10 rounded-full top-10 left-10 blur-3xl"
            />
            <motion.div
                animate={{ y: [0, 40, 0] }}
                transition={{ repeat: Infinity, duration: 8 }}
                className="absolute w-96 h-96 bg-white/10 rounded-full bottom-10 right-10 blur-3xl"
            />

            <div className="text-center z-10">

                {/* Animated 404 */}
                <motion.h1
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="text-[120px] md:text-[180px] font-extrabold drop-shadow-2xl"
                >
                    404
                </motion.h1>

                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-2xl md:text-3xl font-semibold mb-4"
                >
                    Oops! Page Not Found
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-white/80 mb-8 max-w-md mx-auto"
                >
                    The page you're looking for doesn't exist or has been moved.
                </motion.p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">

                    <Link
                        to="/home"
                        className="px-6 py-3 rounded-2xl bg-white text-indigo-600 font-semibold flex items-center gap-2 hover:scale-105 transition"
                    >
                        <Home size={18} />
                        Go Home
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="px-6 py-3 rounded-2xl border border-white/50 backdrop-blur-md hover:bg-white/20 transition flex items-center gap-2"
                    >
                        <ArrowLeft size={18} />
                        Go Back
                    </button>

                </div>

            </div>
        </div>
    );
};

export default NotFound;
