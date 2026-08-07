const React = require("react");
const { cssDeTemas } = require("./src/styles/temas");

/// Script que decide el tema ANTES de que se pinte la pagina.
///
/// Sin esto el sitio se veia claro por un instante y recien despues pasaba a
/// oscuro: el HTML se genera en el build, donde no hay forma de saber que tema
/// corresponde, y el cambio ocurria al hidratar React.
///
/// Corriendo esto al principio del <body>, el atributo data-theme ya esta
/// puesto cuando el navegador pinta, asi que no hay parpadeo. Va inline y
/// sincronico a proposito: un script externo o diferido llegaria tarde.
const scriptTemaTemprano = `
(function () {
  try {
    var valido = function (v) { return v === "dark" || v === "light" ? v : null; };
    var deLaUrl = null;
    try {
      deLaUrl = valido(new URLSearchParams(window.location.search).get("theme"));
    } catch (e) {}
    var guardado = null;
    try { guardado = valido(localStorage.getItem("themeColor")); } catch (e) {}
    var delSistema =
      window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    document.documentElement.setAttribute(
      "data-theme",
      deLaUrl || guardado || delSistema
    );
  } catch (e) {}
})();
`;

exports.onRenderBody = ({ setHeadComponents, setPreBodyComponents }) => {
  setHeadComponents([
    React.createElement("style", {
      key: "temas",
      dangerouslySetInnerHTML: { __html: cssDeTemas() },
    }),
  ]);

  setPreBodyComponents([
    React.createElement("script", {
      key: "tema-temprano",
      dangerouslySetInnerHTML: { __html: scriptTemaTemprano },
    }),
  ]);
};
