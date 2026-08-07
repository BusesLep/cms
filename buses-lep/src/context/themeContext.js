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
  // Azul marino, no gris neutro. Son los mismos valores que el ColorScheme
  // oscuro de la app (lib/theme/esquemas.dart en el repo del ecommerce): este
  // sitio se muestra embebido en un WebView dentro de la app, y si las dos
  // paletas no coinciden se ve el corte entre una y otra.
  dark: {
    "--bg-primary": "#0F1623", // fondo de pantalla
    "--bg-secondary": "#F5F7FA", // texto sobre el fondo
    "--bg-elevation-1": "#1C2534", // tarjetas
    "--bg-elevation-2": "#1C2534",
    "--bg-white-elevation-1": "#1C2534",
    "--bg-gray-elevation-1": "#293445", // franjas y cabeceras
    "--bg-gray-elevation-2": "#333F4F",
    "--color-text-primary": "#F5F7FA",
    "--color-border": "#333F4F",
    "--color-border-2": "#556072",
  },
};

const ThemeContext = createContext(null);

// const { theme, setTheme, toggleTheme } = useTheme()
export const useTheme = () => useContext(ThemeContext);

// cambiar si cambia el tema por defecto
const DEFAULT_THEME = "light";

const ThemeProvider = ({ children }) => {
  const urlTheme = getUrlTheme();
  const localTheme =
    typeof window !== "undefined" ? localStorage.getItem("themeColor") : undefined;
  const deviseTheme = getDeviseTheme();
  // El ?theme= de la URL manda sobre todo lo demas: cuando el sitio se abre
  // embebido en la app de Buses Lep, el tema lo decide el switch de la app.
  // El localStorage de este iframe es de otro origen y no tiene por que
  // coincidir con lo que el usuario eligio alla.
  const [theme, setTheme] = useState(
    urlTheme || localTheme || deviseTheme || DEFAULT_THEME
  );

  useEffect(() => {
    localStorage.setItem("themeColor", theme);
  }, [theme]);

  // La app avisa por postMessage cuando el usuario cambia el modo, asi no hay
  // que recargar el iframe entero para que se vea el cambio.
  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const onMessage = (event) => {
      const data = event.data;
      if (!data || data.type !== "buseslep:theme") return;
      const nuevo = normalizeTheme(data.theme);
      if (nuevo) setTheme(nuevo);
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

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

/// Acepta solo los dos temas que existen; cualquier otra cosa se ignora.
/// "auto" no se contempla a proposito: la app resuelve el automatico contra el
/// sistema operativo antes de pasarlo, porque dentro del iframe el
/// prefers-color-scheme puede no coincidir con lo que se ve en la app.
const normalizeTheme = (valor) =>
  valor === "dark" || valor === "light" ? valor : undefined;

const getUrlTheme = () => {
  if (typeof window === "undefined") return undefined;
  try {
    return normalizeTheme(
      new URLSearchParams(window.location.search).get("theme")
    );
  } catch (e) {
    return undefined;
  }
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
