import React, { createContext, useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";

const themes = {
  light: {
    "--bg-primary": "#FAFAFA",
    "--bg-secondary": "#202124",
    "--bg-elevation-1": "#FEFCFC",
    "--bg-elevation-2": "#FAFAFA",
    "--bg-white-elevation-1": "#ffffff",
    "--bg-gray-elevation-1": "#EEEEEE",
    "--bg-gray-elevation-2": "#FFFFFF",
    "--color-text-primary": "#5F6368",
    "--color-border": "#C9C5CA",
    "--color-border-2": "#f0f0f0",
    



  },
  dark: {
    "--bg-primary": "#202124",
    "--bg-secondary": "#ffffff",
    "--bg-elevation-1": "#35373A",
    "--bg-elevation-2": "#35373A",
    "--bg-white-elevation-1": "#35373A",
    "--bg-gray-elevation-1": "#3C3F44",
    "--bg-gray-elevation-2": "#6B6A6A",
    "--color-text-primary": "#ffffff",
    "--color-border": "#6B6A6A",
    "--color-border-2": "#949394",
  },
};

const ThemeContext = createContext(null);

// const { theme, setTheme, toggleTheme } = useTheme()
export const useTheme = () => useContext(ThemeContext);

// cambiar si cambia el tema por defecto
const DEFAULT_THEME = "light";

const ThemeProvider = ({ children }) => {
  const localTheme =
    typeof window !== "undefined" ? localStorage.getItem("themeColor") : undefined;
  const deviseTheme = getDeviseTheme();
  const [theme, setTheme] = useState(
    localTheme || deviseTheme || DEFAULT_THEME
  );

  useEffect(() => {
    localStorage.setItem("themeColor", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      <div style={{ ...themes[theme], background: "var(--bg-primary)", color: "var(--bg-secondary)", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "space-between"  }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const getDeviseTheme = () => {
  if (typeof window !== "undefined") {
    if (window.matchMedia) {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark";
      } else {
        return "light";
      }
    } else {
      return DEFAULT_THEME;
    }
  } else {
    return undefined;
  }
};
ThemeProvider.propTypes = {
  children: PropTypes.object,
};

export default ThemeProvider;
