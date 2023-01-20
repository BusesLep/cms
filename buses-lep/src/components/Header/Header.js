import React from "react";
import SanityImage from "gatsby-plugin-sanity-image";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useTheme } from "../../context/themeContext";

import "./Header.scss";
import LinkBlock from "./LinkBlock";
import Menu from "./Menu";
import useHeader from "../../hooks/useHeader";

const Header = () => {
  const data = useHeader().sanityHeader;
  const { theme } = useTheme();
console.log(data)
  return data !== null ? (
    <header className="header">
      <Navbar expand="md">
        <Container fluid>
          <Navbar.Brand href="#home">
            {theme === "dark" ? (
              data.logo.imageDark !== null ? <SanityImage
              {...data.logo.imageDark}
              alt={`${data.logo.image.alt}`}
              className="header__logo"
            /> : <></>
            ) : (
              data.logo.image !== null ? <SanityImage
                {...data.logo.image}
                alt={`${data.logo.image.alt}`}
                className="header__logo"
              /> : <></>
            )}
          </Navbar.Brand>
          {data.menu !== null ? <Menu links={data.menu.links} /> : <></>}
          {data.customLinkBlock !== null ? (
            <LinkBlock links={data.customLinkBlock?.links} />
          ) : (
            <></>
          )}
        </Container>
      </Navbar>
    </header>
  ) : (
    <></>
  );
};

export default Header;
