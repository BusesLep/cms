
import React from "react";
import PropTypes from 'prop-types'
import { Header, Footer } from "..";
import WhatsappLink from "../WhatsappLink/WhatsappLink";
import ThemeProvider from "../../context/themeContext";

import "./Layout.scss";
import Seo from "../seo";

const Layout = ({ location, children, title, description }) => {
  return (
    <ThemeProvider>  
      <Seo pageTitle={title} pageDescription={description}/>    
      {/* <Header location={location}/> */}
      <main>{children}</main>
      {/* <WhatsappLink />
      <Footer/> */}
      
    </ThemeProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
}
export default Layout;
