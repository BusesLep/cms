import React from "react";
import { CustomLink, MaterialIcon, FontAwesomeIcon, Icon } from "..";
import { useTheme } from "../../context/themeContext";

import "./Header.scss";

const LinkBlock = ({ links }) => {
  const { theme, toggleTheme } = useTheme();

  const linksList = links.map((link) => {
    const url = link?.link?.url;
    const iconCode = link?.icon?.icon;
    const style = link?.style;
    const title = link?.link?.text;

    return (
      <CustomLink
        href={url}
        icon={<Icon code={iconCode}></Icon>}
        style={`${style} mobile`}
        text={title}
      />
    );
  });

  return (
    <div className="header__actions">
      {linksList}
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
