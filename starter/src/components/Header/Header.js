import React from "react";
import { MaterialIcon } from "..";
import SanityImage from "gatsby-plugin-sanity-image";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useTheme } from "../../context/themeContext";

import "./Header.scss";
import LinkBlock from "./LinkBlock";
import useHeader from "../../hooks/useHeader";

const Header = () => {
  const data = useHeader().sanityHeader;
  const { theme } = useTheme();

  return (
    <header className="header">
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand href="#home">
            {theme == "dark" ? (
              <SanityImage
                {...data.logo.imageDark}
                alt={`${data.logo.image.alt}`}
                className="header__logo"
              />
            ) : (
              <SanityImage
                {...data.logo.image}
                alt={`${data.logo.image.alt}`}
                className="header__logo"
              />
            )}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <MaterialIcon code="MdMenu" />
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
          <LinkBlock links={data?.customLinkBlock?.links} />
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
