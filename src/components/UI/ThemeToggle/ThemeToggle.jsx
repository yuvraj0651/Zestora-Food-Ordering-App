import React, { useContext } from "react";
import { Sun, Moon } from "lucide-react";
import ThemeContext from "../../context/Theme/ThemeContext";

const ThemeToggle = () => {
    const { theme, themeToggler } = useContext(ThemeContext);

    const isDark = theme === "dark";

    return (
        <button
            onClick={themeToggler}
            className="relative w-16 h-8 flex items-center bg-gray-300 rounded-full p-1 transition-colors duration-300 dark:bg-amber-500"
        >
            <div
                className={`w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center 
transform transition-all duration-300 ease-in-out
${isDark
                        ? "translate-x-8 rotate-180 shadow-indigo-400/50 shadow-lg"
                        : "translate-x-0 rotate-0 shadow-yellow-400/50 shadow-lg"}`}
            >
                {isDark ? (
                    <Moon size={14} className="text-slate-600" />
                ) : (
                    <Sun size={14} className="text-yellow-500" />
                )}
            </div>
        </button>
    );
};

export default ThemeToggle;
