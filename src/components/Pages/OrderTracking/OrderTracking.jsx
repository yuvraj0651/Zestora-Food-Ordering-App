import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    MapContainer,
    TileLayer,
    Marker,
    Polyline,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import confetti from "canvas-confetti";

const OrderTracking = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [progress, setProgress] = useState(0);
    const [eta, setEta] = useState(15);
    const [status, setStatus] = useState("Preparing Order 🍳");
    const [theme, setTheme] = useState("light");

    const start = [28.6139, 77.2090]; // Start
    const end = [28.7041, 77.1025]; // Destination

    const [riderPosition, setRiderPosition] = useState(start);

    // Calculate live position between start & end
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 1;
            });

            setEta((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (!order) {
            navigate("/");
        }
    }, []);

    // Update Rider Position
    useEffect(() => {
        const lat =
            start[0] + ((end[0] - start[0]) * progress) / 100;
        const lng =
            start[1] + ((end[1] - start[1]) * progress) / 100;

        setRiderPosition([lat, lng]);

        if (progress >= 100) {
            setStatus("Delivered ✅");

            confetti();

            const audio = new Audio("/success.mp3");
            audio.play().catch(() => {
                console.log("Autoplay blocked");
            });

            setTimeout(() => {
                navigate("/home", { state: { delivered: true } });
            }, 4000);
        } else if (progress > 60) {
            setStatus("Almost There 📍");
        } else if (progress > 30) {
            setStatus("Out for Delivery 🛵");
        } else {
            setStatus("Preparing Order 🍳");
        }
    }, [progress]);

    const riderIcon = new L.Icon({
        iconUrl:
            "https://cdn-icons-png.flaticon.com/512/2972/2972185.png",
        iconSize: [40, 40],
    });

    const cancelOrder = () => {
        navigate("/", { state: { cancelled: true } });
    };

    const order = location.state?.order;

    return (
        <div className="relative h-screen w-full">

            {/* Theme Toggle */}
            <button
                onClick={() =>
                    setTheme(theme === "light" ? "dark" : "light")
                }
                className="absolute top-4 right-4 z-[1000] bg-white px-4 py-2 rounded-lg shadow"
            >
                Toggle {theme === "light" ? "Dark" : "Light"}
            </button>

            {/* Map */}
            <MapContainer
                center={start}
                zoom={12}
                className="h-full w-full z-0"
            >
                <TileLayer
                    url={
                        theme === "light"
                            ? "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            : "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    }
                />

                <Polyline positions={[start, end]} />

                <Marker position={riderPosition} icon={riderIcon} />
            </MapContainer>

            {/* Pulse GPS */}
            <div className="absolute top-10 left-10 z-[1000]">
                <div className="relative">
                    <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                    <div className="absolute inset-0 w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
                </div>
            </div>

            {/* Bottom Card */}
            <div className="absolute bottom-0 w-full bg-white/90 backdrop-blur-xl shadow-2xl rounded-t-3xl p-6 z-[1000] dark:bg-slate-700 dark:border-slate-500">

                <h2 className="text-xl font-bold mb-2 dark:text-slate-50">
                    {status}
                </h2>

                <p className="text-gray-600 dark:text-slate-50">
                    ETA: {eta} mins
                </p>

                <p className="text-sm text-gray-600 dark:text-slate-50">
                    Delivering to: {order?.deliveryAddress}
                </p>


                <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                    <div
                        className="bg-gradient-to-r from-indigo-600 to-orange-500 h-2 transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>

                <div className="flex justify-between mt-6">
                    <button
                        onClick={cancelOrder}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg"
                    >
                        Cancel Order
                    </button>

                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg">
                        Call Rider
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderTracking;
