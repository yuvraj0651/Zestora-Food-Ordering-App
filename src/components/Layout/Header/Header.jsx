import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiSearch, FiShoppingCart, FiUser } from "react-icons/fi";
import { GiKnifeFork } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Services/Auth/AuthThunk";
import { Heart, GitCompare } from "lucide-react";
import ThemeToggle from "../../UI/ThemeToggle/ThemeToggle";
import { fetchHeaderData } from "../../Services/Settings/SettingsThunk";

const Header = ({ searchTerm, setSearchTerm }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isListening, setIsListening] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const pathname = location.pathname;

    const { authData, isAuthenticated } = useSelector((state) => state.auth);
    const { wishlistData } = useSelector((state) => state.wishlist);
    const { headerData } = useSelector((state) => state.header);

    const cartItems = useSelector((state) => state.cartLocal.cartItems);
    const compareItems = useSelector((state) => state.compareLocal.compareItems);

    useEffect(() => {
        dispatch(fetchHeaderData());
    }, [dispatch]);

    const logoutHandler = () => {
        dispatch(logout());
        setTimeout(() => {
            navigate("/");
        }, 500);
    };

    const startListening = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert("Speech Recognition not supported in this browser");
            return;
        };

        const recognition = new SpeechRecognition();
        console.log(recognition);
        recognition.lang = "en-IN";
        recognition.start();
        setIsListening(true);

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setSearchTerm(transcript);
        };

        recognition.onend = () => {
            setIsListening(false);
        };
    };

    return (
        <>
            {/* Sticky Header */}
            <header className="fixed top-0 left-0 w-full z-[60] backdrop-blur-md bg-white/70 dark:bg-slate-900/80 border-b border-white/20 shadow-sm">
                <div className="max-w-7xl mx-auto px-4">

                    {/* Mobile First Layout */}
                    <div className="flex items-center justify-between h-16">

                        {/* Left Section */}
                        <div className="flex items-center gap-3">

                            {/* Hamburger */}
                            <button
                                onClick={() => setIsOpen(true)}
                                className="lg:hidden text-2xl"
                            >
                                <FiMenu />
                            </button>

                            {/* Logo */}
                            <Link to="/" className="flex items-center gap-3">

                                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-orange-500 flex items-center justify-center shadow-md">
                                    <GiKnifeFork className="text-white text-lg" />
                                </div>

                                <span className="text-xl font-bold text-gray-900 dark:text-slate-50">
                                    {headerData?.branding?.siteName}
                                </span>

                            </Link>
                        </div>
                        <nav className="hidden lg:flex items-center gap-8 font-medium text-gray-700">
                            {
                                headerData?.navLinks?.map((navItem) => (
                                    <Link
                                        key={navItem.path}
                                        to={navItem.path}
                                        className={`hover:text-indigo-600 transition ${pathname === navItem.path ? "text-amber-600 dark:text-red-500 font-[500]" : "text-gray-700 dark:text-slate-50"}`}>
                                        {navItem.label}
                                    </Link>
                                ))
                            }
                        </nav>

                        {/* Right Section */}
                        <div className="flex items-center gap-4">
                            {authData && isAuthenticated && (
                                <div className="logout-button-block">
                                    <button
                                        onClick={logoutHandler}
                                        className="border border-[#ccc] shadow-sm px-5 py-[0.3rem] uppercase text-[0.8rem] rounded-[7px] cursor-pointer bg-gradient-to-r from-red-600 via-red-500 to-amber-500 font-[500] text-white hover:bg-gradient-to-l hover:from-red-600 hover:to-amber-500 transition-all duration-1000 dark:bg-none dark:bg-red-600">logout</button>
                                </div>
                            )}

                            {/* Search Icon (Mobile) */}
                            <button className="lg:hidden text-xl">
                                <FiSearch />
                            </button>

                            {/* Search Bar (Desktop) */}
                            {
                                headerData?.settings?.showSearch && (
                                    <div className="hidden relative lg:flex items-center bg-white dark:bg-slate-500 shadow-md rounded-full px-4 py-2 w-72">
                                        <FiSearch className="text-gray-400 mr-2 dark:text-slate-50" />
                                        <input
                                            type="text"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            placeholder={headerData?.settings?.searchPlaceholder || "Search..."}
                                            className="outline-none w-full text-sm dark:text-slate-50 dark:bg-slate-500 placeholder:dark:text-slate-50"
                                        />
                                        <button
                                            onClick={startListening}
                                            className="p-[0.1rem] rounded-full bg-red-500 text-white hover:scale-110 transition"
                                        >
                                            🎤
                                        </button>
                                    </div>
                                )
                            }
                            <ThemeToggle />

                            {/* Cart */}
                            <Link to="/cart" className={`relative text-xl ${pathname === "/cart" ? "border-b-2 pb-[0.2rem] border-amber-600" : "border-none"}`}>
                                <FiShoppingCart className="dark:text-slate-50" />
                                <span className={`absolute -top-2 -right-2 bg-orange-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full`}>
                                    {cartItems.length || 0}
                                </span>
                            </Link>

                            {/* Wishlist */}
                            {
                                headerData?.settings?.showWishlist && (
                                    <Link to="/wishlist" className={`relative text-xl ${pathname === "/wishlist" ? "border-b-2 pb-[0.2rem] border-amber-600" : "border-none"}`}>
                                        <Heart className="dark:text-slate-50" />
                                        <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                            {wishlistData.length || 0}
                                        </span>
                                    </Link>
                                )
                            }

                            {/* Compare */}
                            {
                                headerData?.settings?.showCompare && (
                                    <Link to="/compare" className={`relative text-xl ${pathname === "/compare" ? "border-b-2 pb-[0.2rem] border-amber-600" : "border-none"}`}>
                                        <GitCompare className="dark:text-slate-50" />
                                        <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                            {compareItems.length || 0}
                                        </span>
                                    </Link>
                                )
                            }

                            {/* Profile */}
                            <Link to="/profile" className={`hidden lg:block text-xl ${pathname === "/profile" ? "border-b-2 pb-[0.2rem] border-amber-600" : "border-none"}`}>
                                <FiUser className="dark:text-slate-50" />
                            </Link>

                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Drawer */}
            <div
                className={`fixed top-0 left-0 h-full w-full bg-white z-50 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-orange-500 bg-clip-text text-transparent">
                        {headerData?.branding?.siteName}
                    </h2>
                    <button onClick={() => setIsOpen(false)} className="text-2xl">
                        <FiX />
                    </button>
                </div>

                <div className="flex flex-col gap-6 p-6 text-lg font-medium text-gray-700">
                    {
                        headerData?.mobileNavLinks?.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsOpen(false)}>
                                {link.label}
                            </Link>
                        ))
                    }
                    <button className="mt-6 bg-indigo-600 text-white py-3 rounded-xl">
                        Login / Register
                    </button>
                </div>
            </div>

            {/* Spacer for fixed header */}
            <div className="h-16"></div>
        </>
    );
};

export default Header;
