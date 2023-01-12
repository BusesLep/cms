import React from "react";
import { CustomLink, MaterialIcon, FontAwesomeIcon } from "..";
import { useTheme } from "../../context/themeContext";

import "./Header.scss";

const LinkBlock = ({links}) => {
  const { theme, toggleTheme } = useTheme();
  console.log(links)
  return (
    <div className="header__actions">
      <CustomLink
        href="google.com"
        icon={<FontAwesomeIcon code="FaWhatsapp"></FontAwesomeIcon>}
        style="link mobile"
        text="Link de header"
      />
      <CustomLink
        href="google.com"
        icon={<FontAwesomeIcon code="FaUserCircle"></FontAwesomeIcon>}
        style="button mobile me-2"
        text="Boton de header"
      />
      <button onClick={toggleTheme} className="header__theme-toggle">
        <div className={`moon ${theme === "dark" ? "" : "moon-animate"}`}>
          <FontAwesomeIcon code="FaMoon" />
        </div>
        <div className={`sun ${theme === "dark" ? "sun-animate" : ""}`}>
          <MaterialIcon code="MdWbSunny" />
        </div>
      </button>
    </div>
  );
};

export default LinkBlock;
