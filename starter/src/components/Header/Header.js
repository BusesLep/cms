import React from "react";
import { MaterialIcon } from "..";
import { StaticImage } from "gatsby-plugin-image";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import "./Header.scss";
import LinkBlock from "./LinkBlock";
import Menu from "./Menu";
import useHeader from "../../hooks/useHeader";

const Header = () => {
  const data = useHeader().sanityHeader
  console.log(data); 
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
          {data.menu !== null ? <Menu links={data.menu.links}/> : <></>}          
          {/* <LinkBlock links={data.linkBlock.links}/> */}
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
