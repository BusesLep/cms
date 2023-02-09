import React, { useState, useEffect } from "react";

import { Icon, SelectAutocomplete } from "../";
import Map from "./Map";
import "./TicketOffices.scss";

const OfficeMap = ({ zoom, offices }) => {
  const [isActive, setIsActive] = useState(false);
  const [activeSite, setActiveSite] = useState(null);
  const [isOpenSite, setIsOpenSite] = useState(null);
  // const [mylOCATION, setIsOpenSite] = useState(null);

  const selectSite = (site) => {
    console.log(site)
    if(site !== ''){
      setActiveSite(site);
    }else{
      setActiveSite(null);
    }
    
    

  };
  const openSite = (site) => {
    setIsOpenSite(true);
  };
  const closeSite = () => {
    setIsOpenSite(false);
  };
  const toLocate = async ()=> {

    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }

  function success(position) {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
    alert('lat: ' + latitude + ' lng: ' + longitude)
  }

  function error() {
    alert('Unable to retrieve your location');
  }

  return (
    <div className="mapContent">
      <div className="container mapContent__search">
        <div className="box-search">
          {!isOpenSite && (
            <div>
              <SelectAutocomplete
                icon={<Icon code={"MdOutlineTripOrigin"}></Icon>}
                style="offices"
                label={"Buscar punto de venta..."}
                options={offices}
                handler={selectSite}
              />
              <button onClick={() => toLocate()}>Localizar</button>

              {activeSite !== null && (
                <div className="box-search__list">
                  <button
                    className="cardSite"
                    onClick={() => openSite(activeSite)}
                  >
                    <div className="cardSite__text">
                      <h5>{activeSite.Localidad}</h5>
                      <p>{activeSite.Boleteria_Ubicacion}</p>
                    </div>
                  </button>
                </div>
              )}
            </div>
          )}
          {isOpenSite && (
            <div className="box-search__activeItem">
              <button className="activeItem_button" onClick={() => closeSite()}>
                <Icon code={"FaArrowLeft"} />
              </button>
              <h5>{activeSite.Boleteria_Ubicacion}</h5>
              <p>
                <b>Contacto</b>
              </p>
              <p>{activeSite.Localidad}</p>
              <p>
                <b>Horario de Atención</b>
              </p>
              <p>{activeSite.Boleteria_Telefono}</p>
            </div>
          )}
        </div>
      </div>
      <Map
        site={activeSite}
        offices={offices}
        open={isOpenSite}
        handler={selectSite}
      ></Map>
    </div>
  );
};

export default OfficeMap;
