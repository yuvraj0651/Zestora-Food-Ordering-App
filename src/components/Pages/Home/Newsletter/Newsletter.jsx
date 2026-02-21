const Newsletter = () => {
    return (
        <div className="bg-black text-white py-16 text-center px-4">
            <h2 className="text-3xl font-bold mb-4">
                Get Exclusive Deals in Your Inbox
            </h2>
            <div className="flex flex-col md:flex-row justify-center gap-4 max-w-xl mx-auto">
                <input
                    type="email"
                    placeholder="Enter your email"
                    className="px-4 py-3 rounded-lg text-black w-full"
                />
                <button className="bg-white text-black px-6 py-3 rounded-lg hover:scale-105 transition">
                    Subscribe
                </button>
            </div>
        </div>
    );
};

export default Newsletter;
