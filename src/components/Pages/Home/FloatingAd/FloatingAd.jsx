import { useSelector } from "react-redux";

const FloatingAd = () => {

    const { homeData } = useSelector((state) => state.home);

    return (
        <div className="hidden lg:block fixed left-6 top-1/4 z-50">
            <div className="bg-black text-white p-4 rounded-xl shadow-lg w-56 animate-bounce">
                <h4 className="font-semibold">{homeData?.floatingAd?.title}</h4>
                <p className="text-sm mt-2">{homeData?.floatingAd?.description}</p>
                <button className="mt-3 w-full bg-white text-black py-1 rounded">
                    {homeData?.floatingAd?.buttonText}
                </button>
            </div>
        </div>
    );
};

export default FloatingAd;
