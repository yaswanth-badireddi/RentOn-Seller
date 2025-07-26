import { createContext, useContext, useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";

const THEMES = ["light", "dark", "system"];

const ThemeProviderContext = createContext({
    theme: "system",
    setTheme: () => null,
});

export const ThemeProvider = ({ children, defaultTheme = "system", ...props }) => {
    const [theme, setTheme] = useState(defaultTheme);

    const applyTheme = useCallback((newTheme) => {
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");

        if (newTheme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light";
            root.classList.add(systemTheme);
        } else {
            root.classList.add(newTheme);
        }
    }, []);

    useEffect(() => {
        applyTheme(theme);
    }, [theme, applyTheme]);

    // Listen for system theme changes when theme is set to "system"
    useEffect(() => {
        if (theme === "system") {
            const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
            const handleChange = () => applyTheme("system");
            
            mediaQuery.addEventListener("change", handleChange);
            return () => mediaQuery.removeEventListener("change", handleChange);
        }
    }, [theme, applyTheme]);

    const handleThemeChange = useCallback((newTheme) => {
        if (THEMES.includes(newTheme)) {
            setTheme(newTheme);
        } else {
            console.warn(`Invalid theme: ${newTheme}. Must be one of: ${THEMES.join(", ")}`);
        }
    }, []);

    const value = {
        theme,
        setTheme: handleThemeChange,
    };

    return (
        <ThemeProviderContext.Provider {...props} value={value}>
            {children}
        </ThemeProviderContext.Provider>
    );
};

ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired,
    defaultTheme: PropTypes.oneOf(THEMES),
};

export const useTheme = () => {
    const context = useContext(ThemeProviderContext);

    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }

    return context;
};