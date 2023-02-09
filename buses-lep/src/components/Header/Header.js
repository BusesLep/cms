import React from "react";
import SanityImage from "gatsby-plugin-sanity-image";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useTheme } from "../../context/themeContext";
import MaterialIcon from "../Icons/MetertialIcon";
import FontAwesomeIcon from "../Icons/FontAwesomeIcon";
import "./Header.scss";
import LinkBlock from "./LinkBlock";
import Menu from "./Menu";
import useHeader from "../../hooks/useHeader";

const Header = ({location}) => {
  const data = useHeader().sanityHeader;
  const { theme, toggleTheme} = useTheme();
  const regularCondition = data.logo.image.image !== null ? (
    <SanityImage
      {...data.logo.image.image}
      alt={`${data.logo.image.alt}`}
      
    />
  ) : (
    <></>
  )

  return data !== null ? (
    <header className="header">
      <Navbar expand="lg">
        <Container fluid>
          <Navbar.Brand href="/">
            <div className="header__logo">
              {theme === "dark" ? (
                data.logo.imageDark !== null ? (
                  <SanityImage
                    {...data.logo.imageDark}
                    alt={`${data.logo.image.alt}`}
                    
                  />
                ) : (
                  <></>
                )
              ) : regularCondition}
            </div>
          </Navbar.Brand>
          {data.menu !== null ? <Menu location={location} links={data.menu.links} /> : <></>}
          {data.customLinkBlock !== null ? (
            <LinkBlock links={data.customLinkBlock?.links} />
          ) : (
            <></>
          )}
            <button onClick={toggleTheme} className="header__theme-toggle">
        <div className={`moon ${theme === "dark" ? "" : "moon-animate"}`}>
          <FontAwesomeIcon code="FaMoon" />
        </div>
        <div className={`sun ${theme === "dark" ? "sun-animate" : ""}`}>
          <MaterialIcon code="MdWbSunny" />
        </div>
      </button>
        </Container>
      </Navbar>
    </header>
  ) : (
    <></>
  );
};

export default Header;
