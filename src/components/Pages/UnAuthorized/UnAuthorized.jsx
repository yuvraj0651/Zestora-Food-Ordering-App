import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShieldAlert, Home } from "lucide-react";

const UnAuthorized = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 text-white px-6 relative overflow-hidden">

            {/* Animated Glow */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                className="absolute w-[500px] h-[500px] border border-indigo-500/20 rounded-full"
            />

            <div className="text-center z-10">

                <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="flex justify-center mb-6"
                >
                    <ShieldAlert size={90} className="text-red-400 drop-shadow-xl" />
                </motion.div>

                <motion.h1
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="text-5xl md:text-6xl font-bold mb-4"
                >
                    403 - Unauthorized
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-gray-300 mb-8 max-w-md mx-auto"
                >
                    You don't have permission to access this page.
                    Please login with the correct credentials.
                </motion.p>

                <Link
                    to="/auth"
                    className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 transition font-semibold flex items-center gap-2 justify-center"
                >
                    <Home size={18} />
                    Go to Login
                </Link>

            </div>
        </div>
    );
};

export default UnAuthorized;
