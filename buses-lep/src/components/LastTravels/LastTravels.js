import React from "react";
import Icon from "../Icons/Icon";
import Divider from '@mui/material/Divider';
import "./LastTravels.scss";

const LastTravels = () => {
  return (
    <section className="lastTravels d-flex flex-wrap">
      <div className="lastTravels__header col-12 col-md-6">
        <div className="d-flex flex-nowrap pb-3">
          <Icon code={"FaBusAlt"}></Icon>
          <h4>Ultimos destinos buscados</h4>
        </div>
        <p className="body-medium">
          Para una mejor experiencia de viaje{" "}
          <a href="http://">inicia sesión</a> con tu cuenta , podrás comprar más
          rápido y acceder al historial de destinos y compras realizadas.
        </p>
      </div>
      <div className="col-12 col-md-6">
        <ul className="lastTravels__list">
          <li role={"button"} className="d-flex align-items-center p-3">
            <div className="iconContainer">
              <Icon code={"FaBusAlt"}></Icon>
            </div>
            <h6 className="flex-grow-1 py-0 ps-3 mb-0">
              Cordoba - Despeñaderos
            </h6>
            <div className="iconContainerEnd">
              <Icon code={"MdOutlineKeyboardArrowRight"}></Icon>
            </div>
          </li>
          <Divider />
          <li role={"button"} className="d-flex align-items-center p-3">
            <div className="iconContainer">
              <Icon code={"FaBusAlt"}></Icon>
            </div>
            <h6 className="flex-grow-1 py-0 ps-3 mb-0">
              Cordoba - Despeñaderos
            </h6>
            <div className="iconContainerEnd">
              <Icon code={"MdOutlineKeyboardArrowRight"}></Icon>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default LastTravels;
