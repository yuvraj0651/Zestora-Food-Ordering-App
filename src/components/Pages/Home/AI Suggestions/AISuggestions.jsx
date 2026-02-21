import { useSelector } from "react-redux";

const AISuggestions = () => {

    const { homeData } = useSelector((state) => state.home);

    return (
        <div className="py-12 px-4 max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 dark:text-slate-100">{homeData?.aiSuggestions?.title}</h2>
            <p className="text-gray-500 mb-6 dark:text-slate-50">
                {homeData?.aiSuggestions?.description}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="bg-white p-4 rounded-xl shadow hover:scale-105 transition">
                        <h4 className="font-semibold">Smart Choice Meal</h4>
                        <p className="text-sm text-gray-500">₹349</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AISuggestions;
