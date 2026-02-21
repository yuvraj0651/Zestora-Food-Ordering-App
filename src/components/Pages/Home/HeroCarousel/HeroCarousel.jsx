import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { useSelector } from "react-redux";

const HeroCarousel = () => {
    const [current, setCurrent] = useState(0);

    const { homeData } = useSelector((state) => state.home);

    const slides = homeData?.heroSection?.slides || [];

    useEffect(() => {
        if (!slides.length) return;

        const interval = setInterval(() => {
            setCurrent(prev => (prev + 1) % slides.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [slides.length]);

    if (!slides.length) return null;

    return (
        <div className="relative h-[70vh] w-full overflow-hidden">
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ${index === current ? "opacity-100" : "opacity-0"
                        }`}
                >
                    <img
                        src={`${slide.image}?auto=format&fit=crop&w=1600&q=80`}
                        alt=""
                        className="w-full h-full object-cover"
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center px-6"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                            {slide.title}
                        </h2>

                        <p className="text-gray-200 max-w-xl">
                            {slide.description}
                        </p>

                        <Link to={homeData?.heroSection?.buttonLink || "/menu"}>
                            <button className="mt-6 bg-white text-black px-6 py-3 rounded-lg hover:scale-105 transition">
                                {homeData?.heroSection?.buttonText || "Explore Now"}
                            </button>
                        </Link>
                    </motion.div>
                </div>
            ))}
        </div>
    );
};

export default HeroCarousel;
