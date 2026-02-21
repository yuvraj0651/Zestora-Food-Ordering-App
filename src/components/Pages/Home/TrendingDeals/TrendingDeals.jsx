import { useSelector } from "react-redux";
import { Link } from "react-router";

const TrendingDeals = () => {

    const { homeData } = useSelector((state) => state.home);

    return (
        <div className="bg-gray-100 py-12 px-4 dark:bg-slate-600">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-2xl font-bold mb-6 text-slate-50">{homeData?.trendingDeals?.title}</h2>

                <div className="grid md:grid-cols-3 gap-6">
                    {homeData?.trendingDeals?.deals?.map(item => (
                        <div key={item.title} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                            <h3 className="font-semibold">{item.title}</h3>
                            <p className="text-sm text-gray-500 mt-2">
                                {item.description}
                            </p>
                            <Link
                                to={item.buttonLink}
                                className="mt-4 text-sm text-blue-600">
                                {item.buttonText} →
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TrendingDeals;
