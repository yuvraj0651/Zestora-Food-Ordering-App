import { useEffect, useState } from "react";
import {
    Pizza,
    Sandwich,
    Soup,
    IceCream,
    Coffee,
    Salad,
    Beef,
    Utensils,
    Sparkles,
    Flame
} from "lucide-react";
import { useSelector } from "react-redux";

const iconMap = {
    Pizza: Pizza,
    Sandwich: Sandwich,
    Soup: Soup,
    IceCream: IceCream,
    Utensils: Utensils,
    Salad: Salad,
    Coffee: Coffee,
    Beef: Beef
};

const CategorySlider = () => {
    const [active, setActive] = useState("");

    const { homeData } = useSelector((state) => state.home);
    console.log(homeData);

    useEffect(() => {
        if(homeData?.categorySection?.categories?.length){
            setActive(homeData?.categorySection?.categories[0].name)
        }
    },[homeData]);

    return (
        <section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:bg-slate-600 dark:bg-none">
            <div className="max-w-7xl mx-auto px-4">

                <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center dark:text-slate-50">
                    {homeData?.categorySection?.title}
                </h2>

                <div className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory pb-4">

                    {homeData?.categorySection?.categories?.map((cat, i) => {
                        const Icon = iconMap[cat.icon];
                        const isActive = active === cat.name;

                        return (
                            <div
                                key={cat.name}
                                onClick={() => setActive(cat.name)}
                                className="snap-start min-w-[170px] relative group cursor-pointer transition-all duration-300"
                            >
                                {/* Badge Section */}
                                {cat.ai && (
                                    <div className="absolute -top-3 -right-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 shadow-lg animate-pulse z-50 mt-3 mr-2">
                                        <Sparkles size={12} />
                                        AI Pick
                                    </div>
                                )}
                                {cat.trending && (
                                    <div className="absolute -top-3 -left-3 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 shadow-lg z-50 mt-[0.7rem] ml-3">
                                        <Flame size={12} />
                                        Hot
                                    </div>
                                )}
                                {/* Card */}
                                <div className={`p-6 rounded-2xl border backdrop-blur-lg flex flex-col items-center justify-center gap-3 transition-all duration-300 ${isActive
                                            ? "bg-black text-white scale-105 shadow-2xl"
                                            : "bg-white/60 hover:bg-black hover:text-white hover:scale-105 hover:shadow-xl"}`}
                                >
                                    {Icon && (
                                        <Icon
                                            size={32}
                                            className={`transition-transform duration-300 ${isActive
                                                    ? "rotate-12 scale-110"
                                                    : "group-hover:rotate-12 group-hover:scale-110"
                                                }`}
                                        />
                                    )}
                                    <p className="font-semibold text-sm tracking-wide">
                                        {cat.name}
                                    </p>
                                </div>
                                {/* Active Glow Line */}
                                {isActive && (
                                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-black 
                                    rounded-full animate-pulse" />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default CategorySlider;
