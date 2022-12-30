import React from "react";

import "./Fotter.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container py-4 d-flex flex-wrap">
        <div className="col-12 col-md-4">
          <h5 className="title-small">Lista de links</h5>
          <ul role='list'>
            <li className="body-medium mb-2" ><a href="Link">Link 1</a></li>
            <li className="body-medium mb-2"><a href="Link">Link 2</a></li>
            <li className="body-medium mb-2"><a href="Link">Link 3</a></li>
            <li className="body-medium mb-2"><a href="Link">Link 4</a></li>
            <li className="body-medium mb-2"><a href="Link">Link 5</a></li>
          </ul>
        </div>
        <div className="col-12 col-md-4">
          <h5 className="title-small">Otros links</h5>
          <ul role='list'>
            <li className="body-medium mb-2" ><a href="Link">Link 1</a></li>
            <li className="body-medium mb-2"><a href="Link">Link 2</a></li>
            <li className="body-medium mb-2"><a href="Link">Link 3</a></li>
          </ul>
        </div>
        <div className="col-12 col-md-4 justify-content-end">
          <h5 className="title-small text-end">Contacto</h5>
        </div>
      </div>
      <div className="footer__down">
        <div className="container d-flex justify-content-end align-items-center py-4">
          <p className="mb-0">LOGO</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
