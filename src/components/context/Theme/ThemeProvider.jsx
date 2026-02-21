import { useEffect, useState } from 'react';
import ThemeContext from "../Theme/ThemeContext";

const ThemeProvider = ({ children }) => {

    const [theme, setTheme] = useState(() => {
        try {
            const storedTheme = localStorage.getItem("theme");
            return storedTheme ? storedTheme : "light";
        } catch (error) {
            console.log("Invalid theme value found in localStorage");
            return "light";
        }
    });

    useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme]);

    useEffect(() => {
        const root = document.documentElement;

        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
    }, [theme]);

    const themeToggler = () => {
        setTheme((prev) => prev === "light" ? "dark" : "light");
    };

    return (
        <ThemeContext.Provider value={{ theme, themeToggler }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider