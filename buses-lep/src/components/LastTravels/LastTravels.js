import React from "react";
import Icon from "../Icons/Icon";
import Divider from "@mui/material/Divider";
import "./LastTravels.scss";

let lastSearchs = null;
let link_1 = null;
let link_2 = null;

const LastTravels = (data) => {

  if (typeof window !== "undefined") {
    lastSearchs = JSON.parse(localStorage.getItem("lastTravels"))

    if (lastSearchs !== null) {
      if (lastSearchs[0] !== null && lastSearchs[0] !== undefined) {
        link_1 = `${process.env.GATSBY_URL_ECOMMERCE}?locality=${lastSearchs[0].idO}&destination=${lastSearchs[0].idD}`
      }

      if (lastSearchs[1] !== null && lastSearchs[1] !== undefined) {
        link_2 = `${process.env.GATSBY_URL_ECOMMERCE}?locality=${lastSearchs[1].idO}&destination=${lastSearchs[1].idD}`
      }
    }
  }


  return (
    <section className="lastTravels d-flex flex-wrap">
      <div className="lastTravels__header col-12 col-md-6">
        <div className="d-flex flex-nowrap pb-3">
          <Icon code={"FaBusAlt"}></Icon>
          <h4>Ultimos destinos buscados</h4>
        </div>
        <p className="body-medium">
          Para una mejor experiencia de viaje {' '}
          <a href={process.env.GATSBY_URL_ECOMMERCE + '/login'} >inicia sesión</a> con tu cuenta , podrás comprar más
          rápido y acceder al historial de destinos y compras realizadas.
        </p>
      </div>
      <div className="col-12 col-md-6">
        <ul className="lastTravels__list">
          {link_1 !== null ? (
            <a href={link_1} className="lastTravels__link">
              <li role={"button"} className="d-flex align-items-center p-3">
                <div className="iconContainer">
                  <Icon code={"FaBusAlt"}></Icon>
                </div>
                <h6 className="flex-grow-1 py-0 ps-3 mb-0">
                  {lastSearchs[0]?.nameO} - {lastSearchs[0]?.nameD}
                </h6>
                <div className="iconContainerEnd">
                  <Icon code={"MdOutlineKeyboardArrowRight"}></Icon>
                </div>
              </li>
            </a>


          ) : (
            <></>
          )}
          {link_2 !== null ? (
            <>
              <Divider />
              <a href={link_2} className="lastTravels__link">
                <li role={"button"} className="d-flex align-items-center p-3">
                  <div className="iconContainer">
                    <Icon code={"FaBusAlt"}></Icon>
                  </div>
                  <h6 className="flex-grow-1 py-0 ps-3 mb-0">
                    {lastSearchs[1]?.nameO} - {lastSearchs[1]?.nameD}
                  </h6>
                  <div className="iconContainerEnd">
                    <Icon code={"MdOutlineKeyboardArrowRight"}></Icon>
                  </div>
                </li>
              </a>
            </>

          ) : (
            <></>
          )}
        </ul>
      </div>
    </section>
  );
};

export default LastTravels;
