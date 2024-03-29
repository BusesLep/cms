import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Icon } from "..";


const Menu = ({ location, links }) => {
  const itemsMenu = links.map((link) =>
    link._type === "dropdown" ? (
      <NavDropdown
        title={
          <div className="nav-link">
            {link.icon !== null && <Icon code={link.icon.icon}></Icon>}
            {link.text}
          </div>
        }
        id="basic-nav-dropdown"
        key={link._key}
      >
        {link.links.map((dropdownLink) =>
          dropdownLink.separated ? (
            <>
              <NavDropdown.Divider />
              <NavDropdown.Item href={dropdownLink.link.url}>
                {dropdownLink.link.text}
              </NavDropdown.Item>
            </>
          ) : (
            <NavDropdown.Item href={dropdownLink.link.url} key={dropdownLink.link._key}>
              {dropdownLink.link.text}
            </NavDropdown.Item>
          )
        )}
      </NavDropdown>
    ) : (
      <Nav.Link href={link.link.url} className={` ${location?.pathname?.replaceAll('/' , '') === link?.link?.url?.replaceAll('/' , '') ? 'active' : ''}`} key={link._key}>
        {link.icon !== null && <Icon code={link.icon.icon}></Icon>}
        {link.link.text}
      </Nav.Link>
    )
  );
  return (
    <>
      <Navbar.Toggle aria-controls="basic-navbar-nav">
        <Icon code={"MdMenu"}></Icon>
      </Navbar.Toggle>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">{itemsMenu}</Nav>
      </Navbar.Collapse>
    </>
  );
};

export default Menu;
