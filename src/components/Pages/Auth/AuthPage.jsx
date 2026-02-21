import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../../Services/Auth/AuthThunk";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const AuthPage = () => {
    const [activeTab, setActiveTab] = useState("login");
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
        role: "user",
    });
    const [loginErrors, setLoginErrors] = useState({});

    const [registerData, setRegisterData] = useState({
        fullName: "",
        email: "",
        password: "",
        role: "user",
    });
    const [registerErrors, setRegisterErrors] = useState({});

    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loginLoading, registerLoading } = useSelector((state) => state.auth);

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
        setLoginErrors({ ...loginErrors, [name]: "" });
    };

    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setRegisterData({ ...registerData, [name]: value });
        setRegisterErrors({ ...registerErrors, [name]: "" });
    };

    const validateLogin = () => {
        let loginErrors = {};

        if (!loginData.email.trim()) {
            loginErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
            loginErrors.email = "Invalid email format";
        }

        if (!loginData.password.trim()) {
            loginErrors.password = "Password is required";
        } else if (loginData.password.length < 6) {
            loginErrors.password = "Password must be at least 6 characters";
        }

        if (!loginData.role) {
            loginErrors.role = "Role is required";
        };

        return loginErrors;
    };

    const validateRegister = () => {
        let registerErrors = {};

        if (!registerData.fullName.trim()) {
            registerErrors.fullName = "Full name is required";
        }

        if (!registerData.email.trim()) {
            registerErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(registerData.email)) {
            registerErrors.email = "Invalid email format";
        }

        if (!registerData.password.trim()) {
            registerErrors.password = "Password is required";
        } else if (registerData.password.length < 6) {
            registerErrors.password = "Password must be at least 6 characters";
        }

        if (!registerData.role) {
            registerData.role = "Role is required";
        };

        return registerErrors;
    };

    useEffect(() => {
        setLoginErrors({});
        setRegisterErrors({});
        setShowPassword(false);
    }, [activeTab]);

    const handleLoginSubmit = (e) => {
        e.preventDefault();

        const loginValidateErr = validateLogin();
        setLoginErrors(loginValidateErr);

        if (Object.keys(loginValidateErr).length === 0) {
            const toastId = toast.loading("Logging in...");

            dispatch(loginUser(loginData)).unwrap().then(() => {
                // alert("Login Successfully");
                toast.success("Login Successfully", { id: toastId });

                setLoginData({
                    email: "",
                    password: "",
                });

                setLoginErrors({});

                setTimeout(() => {
                    navigate("/home");
                }, 500);
            }).catch((error) => {
                // alert(error);
                toast.error(error || "something went wrong", { id: toastId });
            })
        }
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();

        const registerValidateErr = validateRegister();
        setRegisterErrors(registerValidateErr);

        if (Object.keys(registerValidateErr).length === 0) {
            const toastId = toast.loading("Logging in...");

            dispatch(registerUser(registerData)).unwrap().then(() => {
                toast.success("User Registered Successfully", { id: toastId })

                setRegisterData({
                    fullName: "",
                    email: "",
                    password: "",
                });

                setRegisterErrors({});
            }).catch((error) => {
                toast.error(error || "something went wrong", { id: toastId });
            });
        };
    }

    return (
        <div className="min-h-screen py-[3rem] flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden px-4">

            <div className="absolute w-96 h-96 bg-blue-600/20 rounded-full blur-3xl -top-20 -left-20"></div>
            <div className="absolute w-96 h-96 bg-purple-600/20 rounded-full blur-3xl -bottom-20 -right-20"></div>

            <div className="w-full max-w-md backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl rounded-2xl p-8 relative z-10">

                {/* Logo */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white tracking-wide">
                        Zestora
                    </h1>
                    <p className="text-gray-400 text-sm mt-2">
                        AI Powered Food Experience
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex bg-white/10 rounded-lg p-1 mb-8">
                    <button
                        onClick={() => setActiveTab("login")}
                        className={`flex-1 py-2 text-sm rounded-md transition-all duration-300 ${activeTab === "login"
                            ? "bg-white text-black shadow-lg"
                            : "text-gray-300"
                            }`}
                    >
                        Login
                    </button>

                    <button
                        onClick={() => setActiveTab("register")}
                        className={`flex-1 py-2 text-sm rounded-md transition-all duration-300 ${activeTab === "register"
                            ? "bg-white text-black shadow-lg"
                            : "text-gray-300"
                            }`}
                    >
                        Register
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={activeTab === "login" ? handleLoginSubmit : handleRegisterSubmit} className="space-y-6">

                    {activeTab === "register" && (
                        <div className="relative">
                            <input
                                type="text"
                                name="fullName"
                                value={registerData.fullName}
                                onChange={handleRegisterChange}
                                placeholder=" "
                                className="peer w-full bg-transparent border border-white/20 rounded-lg px-4 pt-5 pb-2 text-sm text-white focus:outline-none focus:border-white"
                            />
                            <label className="absolute left-4 top-2 text-xs text-gray-400 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 transition-all">
                                Full Name
                            </label>
                            {
                                registerErrors.fullName && (
                                    <p className="text-red-400 text-xs mt-1">
                                        {registerErrors.fullName}
                                    </p>
                                )
                            }
                        </div>
                    )}

                    <div className="relative">
                        <input
                            type="email"
                            name="email"
                            value={activeTab === "login" ? loginData.email : registerData.email}
                            onChange={activeTab === "login" ? handleLoginChange : handleRegisterChange}
                            placeholder=" "
                            className="peer w-full bg-transparent border border-white/20 rounded-lg px-4 pt-5 pb-2 text-sm text-white focus:outline-none focus:border-white"
                        />
                        <label className="absolute left-4 top-2 text-xs text-gray-400 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 transition-all">
                            Email Address
                        </label>
                        {
                            activeTab === "login" ?
                                loginErrors.email && <p className="text-red-400 text-xs mt-1">{loginErrors.email}</p>
                                : registerErrors.email && <p className="text-red-400 text-xs mt-1">{registerErrors.email}</p>
                        }
                    </div>

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={activeTab === "login" ? loginData.password : registerData.password}
                            onChange={activeTab === "login" ? handleLoginChange : handleRegisterChange}
                            placeholder=" "
                            className="peer w-full bg-transparent border border-white/20 rounded-lg px-4 pt-5 pb-2 text-sm text-white focus:outline-none focus:border-white"
                        />
                        <label className="absolute left-4 top-2 text-xs text-gray-400 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 transition-all">
                            Password
                        </label>
                        {
                            activeTab === "login" ?
                                loginErrors.password && <p className="text-red-400 text-xs mt-1">{loginErrors.password}</p>
                                : registerErrors.password && <p className="text-red-400 text-xs mt-1">{registerErrors.password}</p>
                        }

                        <div
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-4 cursor-pointer text-gray-400"
                        >
                            {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                        </div>
                    </div>

                    <div className="relative">
                        <select
                            name="role"
                            value={registerData.role}
                            onChange={handleRegisterChange}
                            className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-white"
                        >
                            <option value="user" className="text-black">User</option>
                            <option value="admin" className="text-black">Admin</option>
                        </select>

                        {
                            registerErrors.role && (
                                <p className="text-red-400 text-xs mt-1">
                                    {registerErrors.role}
                                </p>
                            )
                        }
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 rounded-lg bg-white text-black font-semibold hover:scale-[1.02] transition-transform duration-300">
                        {
                            activeTab === "login" ?
                                loginLoading ? "Logging In..." : "Login" :
                                registerLoading ? "Creating Account..." : "Create Account"
                        }
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center my-6">
                    <div className="flex-1 h-px bg-white/20"></div>
                    <span className="px-3 text-gray-400 text-xs">OR</span>
                    <div className="flex-1 h-px bg-white/20"></div>
                </div>

                {/* Social Login */}
                <div className="space-y-3">
                    <button className="w-full border border-white/20 py-2 rounded-lg text-sm text-gray-300 hover:bg-white/10 transition">
                        Continue with Google
                    </button>

                    <button className="w-full border border-white/20 py-2 rounded-lg text-sm text-gray-300 hover:bg-white/10 transition">
                        Continue with Facebook
                    </button>
                </div>

                {/* Footer Text */}
                <p className="text-center text-gray-500 text-xs mt-8">
                    © {new Date().getFullYear()} Zestora. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default AuthPage;