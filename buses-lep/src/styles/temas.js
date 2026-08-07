// Paletas del sitio, en un modulo aparte para que las usen tanto el
// ThemeProvider (React) como gatsby-ssr.js (Node), sin duplicar los valores.
//
// La paleta oscura son los mismos valores que el ColorScheme oscuro de la app
// de Buses Lep (lib/theme/esquemas.dart en el repo del ecommerce): este sitio
// se muestra embebido en un WebView dentro de la app, y si las dos paletas no
// coinciden se ve el corte entre una y otra.

const temas = {
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

const TEMA_POR_DEFECTO = "light";

/// Convierte una paleta en el cuerpo de una regla CSS.
const aCss = (paleta) =>
  Object.entries(paleta)
    .map(([clave, valor]) => `${clave}:${valor}`)
    .join(";");

/// Hoja de estilos con las dos paletas. Va en el <head> para que las
/// variables existan antes de que se pinte nada.
const cssDeTemas = () =>
  `:root{${aCss(temas.light)}}` +
  `html[data-theme="dark"]{${aCss(temas.dark)}}`;

module.exports = { temas, TEMA_POR_DEFECTO, cssDeTemas };
