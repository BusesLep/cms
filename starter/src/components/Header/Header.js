import React from "react";
import { MaterialIcon } from "..";
import { StaticImage } from "gatsby-plugin-image";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import "./Header.scss";
import LinkBlock from "./LinkBlock";
import useHeader from "../../hooks/useHeader";

const Header = () => {
  const data = useHeader().sanityHeader
/*   console.log(data); */
  return (
    <header className="header">
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand href="#home">
            <div className="header__logo">
              <StaticImage
                src="../../images/Vector.svg"
                quality={100}
                layout="fixed"
                formats={["WEBP"]}
                alt="logo"
              />
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" >
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
          <LinkBlock links={data.linkBlock.links}/>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
