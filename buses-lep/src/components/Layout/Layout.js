
import React from "react";
import PropTypes from 'prop-types'
import { Header, Footer} from "..";
import ThemeProvider from "../../context/themeContext";

import "./Layout.scss";

const Layout = ({ location, children }) => {

  return (
    <ThemeProvider>
      <Header location={location}/>
      <main>{children}</main>
      <Footer/>
    </ThemeProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
}
export default Layout;
