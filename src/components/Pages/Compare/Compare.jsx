import {
    GitCompare,
    Star,
    Check,
    X,
    ShoppingCart,
    Trash2,
    ShieldCheck,
    Truck,
    BadgeCheck,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCompare } from "../../redux/Slices/CompareSlice";
import LazyImage from "../../UI/LazyImage/LazyImage";

const Compare = () => {
    const dispatch = useDispatch();

    const compareItems =
        useSelector((state) => state.compareLocal?.compareItems) || [];

    // Remove handler
    const handleRemove = (id) => {
        dispatch(removeFromCompare({ id }));
        console.log("Remove:", id);
    };

    if (compareItems.length < 2) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-800">
                <p className="text-slate-600 text-lg font-medium dark:text-slate-50">
                    Please add at least 2 items to compare
                </p>
            </div>
        );
    }

    const features = [
        {
            title: "Free Delivery",
            icon: <Truck size={16} />,
            key: "freeDelivery",
        },
        {
            title: "Premium Quality",
            icon: <BadgeCheck size={16} />,
            key: "premium",
        },
        {
            title: "Secure Packaging",
            icon: <ShieldCheck size={16} />,
            key: "secure",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 pb-24 dark:bg-none dark:bg-slate-800">
            {/* HEADER */}
            <div className="max-w-7xl mx-auto px-4 pt-10">
                <div className="flex items-center gap-3 mb-2 ">
                    <GitCompare className="text-indigo-600 dark:text-slate-50" size={30} />
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-50">
                        Compare Products
                    </h1>
                </div>
                <p className="text-slate-500 text-sm dark:text-slate-50">
                    Compare features and choose the best product
                </p>
            </div>

            {/* ================= DESKTOP ================= */}
            <div className="hidden lg:block max-w-7xl mx-auto px-4 py-10">
                <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden dark:bg-slate-600 dark:border-slate-500">
                    {/* PRODUCT ROW */}
                    <div
                        className="grid border-b"
                        style={{
                            gridTemplateColumns: `250px repeat(${compareItems.length}, 1fr)`,
                        }}
                    >
                        <div className="p-6 font-semibold text-slate-700 border-r dark:text-slate-50">
                            Product
                        </div>

                        {compareItems.map((item) => (
                            <div
                                key={item.id}
                                className="p-6 text-center border-r last:border-r-0 relative dark:text-slate-50"
                            >
                                <button
                                    onClick={() => handleRemove(item.id)}
                                    className="absolute top-4 right-4 text-rose-500 hover:scale-110 transition dark:text-slate-50"
                                >
                                    <Trash2 size={18} />
                                </button>

                                <LazyImage
                                    src={item.strMealThumb}
                                    alt={item.strMeal}
                                    className="w-24 h-24 object-cover mx-auto rounded-2xl mb-4 "
                                />

                                <h3 className="font-semibold text-slate-800 mb-2 dark:text-slate-50">
                                    {item.strMeal}
                                </h3>

                                {/* Dynamic Rating */}
                                <div className="flex justify-center gap-1 mb-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={16}
                                            fill={i < (item.rating || 4) ? "currentColor" : "none"}
                                            className={
                                                i < (item.rating || 4)
                                                    ? "text-yellow-400 dark:text-slate-50"
                                                    : "text-slate-300"
                                            }
                                        />
                                    ))}
                                </div>

                                <p className="text-indigo-600 font-bold text-lg mb-3 dark:text-slate-50">
                                    ${item.strMealPrice || 18.99}
                                </p>

                                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm flex items-center justify-center gap-2 mx-auto transition dark:bg-red-600 dark:hover:bg-red-700">
                                    <ShoppingCart size={16} />
                                    Add to Cart
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* FEATURE ROWS */}
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="grid border-b last:border-b-0"
                            style={{
                                gridTemplateColumns: `250px repeat(${compareItems.length}, 1fr)`,
                            }}
                        >
                            <div className="p-6 font-medium text-slate-600 border-r flex items-center gap-2">
                                {feature.icon}
                                {feature.title}
                            </div>

                            {compareItems.map((item) => {
                                const value =
                                    item[feature.key] ??
                                    Math.random() > 0.3; // fallback random if not exist

                                return (
                                    <div
                                        key={item.id + feature.key}
                                        className="p-6 flex items-center justify-center border-r last:border-r-0"
                                    >
                                        {value ? (
                                            <Check className="text-green-500" />
                                        ) : (
                                            <X className="text-rose-500" />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>

            {/* ================= MOBILE ================= */}
            <div className="lg:hidden max-w-7xl mx-auto px-4 py-10 space-y-8">
                {compareItems.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white rounded-3xl shadow-lg border border-slate-100 p-6 space-y-4"
                    >
                        <div className="flex justify-between items-start">
                            <h3 className="font-semibold text-lg">{item.strMeal}</h3>
                            <button
                                onClick={() => handleRemove(item.id)}
                                className="text-rose-500"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>

                        <LazyImage
                            src={item.strMealThumb}
                            alt={item.strMeal}
                            className="w-full h-48 object-cover rounded-2xl"
                        />

                        {/* Rating */}
                        <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    size={16}
                                    fill={i < (item.rating || 4) ? "currentColor" : "none"}
                                    className={
                                        i < (item.rating || 4)
                                            ? "text-yellow-400"
                                            : "text-slate-300"
                                    }
                                />
                            ))}
                        </div>

                        <p className="text-indigo-600 font-bold text-lg">
                            ${item.strMealPrice || 18.99}
                        </p>

                        <div className="space-y-2 text-sm text-slate-600">
                            {features.map((feature) => {
                                const value =
                                    item[feature.key] ?? Math.random() > 0.3;

                                return (
                                    <div
                                        key={feature.key}
                                        className="flex justify-between"
                                    >
                                        <span>{feature.title}</span>
                                        {value ? (
                                            <Check className="text-green-500" size={16} />
                                        ) : (
                                            <X className="text-rose-500" size={16} />
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-2xl font-medium flex items-center justify-center gap-2 transition">
                            <ShoppingCart size={18} />
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Compare;
