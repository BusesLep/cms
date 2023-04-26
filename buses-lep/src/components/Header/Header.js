import React from "react";
import SanityImage from "gatsby-plugin-sanity-image";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useTheme } from "../../context/themeContext";
import "./Header.scss";
import LinkBlock from "./LinkBlock";
import Menu from "./Menu";
import useHeader from "../../hooks/useHeader";
import { Icon } from "..";


const Header = ({ location }) => {
  const data = useHeader().sanityHeader;
  const { theme, toggleTheme } = useTheme();
  const regularCondition = data.logo.image.image !== null ? (
    <SanityImage
      {...data.logo.image.image}
      alt={`${data.logo.image.alt}`}
    />
  ) : (
    <></>
  )

  const checkImageDark = data.logo.imageDark !== null ? (
    <SanityImage
      {...data.logo.imageDark}
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
            <div className="header__logo ps-3">
              {theme === "dark" ? (
                checkImageDark
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
              <Icon code={"FaMoon"}></Icon>
            </div>
            <div className={`sun ${theme === "dark" ? "sun-animate" : ""}`}>
              <Icon code={"MdWbSunny"}></Icon>
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
