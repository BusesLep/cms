import React, { createContext, useEffect, useRef, useState, useContext } from "react";
import PropTypes from "prop-types";
import { TEMA_POR_DEFECTO } from "../styles/temas";

const ThemeContext = createContext(null);

// const { theme, setTheme, toggleTheme } = useTheme()
export const useTheme = () => useContext(ThemeContext);

// cambiar si cambia el tema por defecto
const DEFAULT_THEME = TEMA_POR_DEFECTO;

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

  // Cuando el tema lo impone la app que embebe el sitio, no se guarda en
  // localStorage: es una preferencia de la app, no de este sitio, y
  // guardarla le pisaria al visitante su propia eleccion para cuando entre
  // por fuera del WebView.
  const loImponeLaApp = useRef(Boolean(urlTheme));

  useEffect(() => {
    if (loImponeLaApp.current) return;
    localStorage.setItem("themeColor", theme);
  }, [theme]);

  // El tema se aplica moviendo data-theme en el <html>; las variables CSS de
  // cada paleta estan declaradas en la hoja de estilos (ver gatsby-ssr.js).
  //
  // Antes esto se hacia escribiendo las variables en el div con setProperty,
  // lo que funcionaba pero recien despues de hidratar: la pagina se veia
  // clara un instante y despues cambiaba. Ahora el atributo ya viene puesto
  // desde el script que corre antes del <body>, y esto solo lo mantiene al
  // dia cuando el usuario -o la app- cambian de modo.
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // La app avisa por postMessage cuando el usuario cambia el modo, asi no hay
  // que recargar el iframe entero para que se vea el cambio.
  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const onMessage = (event) => {
      const data = event.data;
      if (!data || data.type !== "buseslep:theme") return;
      const nuevo = normalizeTheme(data.theme);
      if (nuevo) {
        loImponeLaApp.current = true;
        setTheme(nuevo);
      }
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  const toggleTheme = () => {
    // Si el visitante cambia el tema a mano, vuelve a mandar su preferencia.
    loImponeLaApp.current = false;
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      <div style={{ background: "var(--bg-primary)", color: "var(--bg-secondary)", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
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
