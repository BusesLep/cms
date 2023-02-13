import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import { Icon, SelectAutocomplete } from "../";
import Button from "@mui/material/Button";
import Map from "./Map";
import "./TicketOffices.scss";

const OfficeMap = ({ offices }) => {
  const [activeSite, setActiveSite] = useState(null);
  const [isOpenSite, setIsOpenSite] = useState(null);
  const [myLocation, setMyLocation] = useState(null);

  const selectSite = (site) => {
    if (site !== "") {
      setActiveSite(site);
    } else {
      setActiveSite(null);
    }
    setMyLocation(null);
  };
  const openSite = (site) => {
    setIsOpenSite(true);
  };
  const closeSite = () => {
    setIsOpenSite(false);
  };
  const toLocate = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
    } else {
      navigator.permissions.query({name:"geolocation"}).then(function(result) {
        navigator.geolocation.getCurrentPosition(success, error);
      });  // Sensitive: geolocation is a powerful feature with high privacy concerns
      
    }
  };

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setMyLocation([parseFloat(latitude), parseFloat(longitude)]);
    setActiveSite(null);
  }

  function error() {
    alert("Unable to retrieve your location");
  }

  return (
    <div className="mapContent">
      <div className="mapContent__search">
        <div className="box-search">
          {!isOpenSite && (
            <div>
              <div className="d-flex">
                <SelectAutocomplete
                  icon={<Icon code={"FaSearch"}></Icon>}
                  style='offices'
                  label={"Buscar punto de venta..."}
                  options={offices}
                  handler={selectSite}
                />
                <Button
                  variant="contained"
                  startIcon={<Icon code={"MdMyLocation"}></Icon>}
                  onClick={toLocate}
                ></Button>
              </div>

              {activeSite !== null && (
                <div className="box-search__list">
                  <button
                    className="cardSite"
                    onClick={() => openSite(activeSite)}
                  >
                    <div className="cardSite__icon">
                      <Icon code={"MdLocationOn"} />
                    </div>
                    <div className="cardSite__text">
                      <h3 className="title-medium">{activeSite.Localidad}</h3>
                      <p className="body-medium">
                        {activeSite.Boleteria_Ubicacion}
                      </p>
                      <p className="body-medium">
                        {activeSite.Boleteria_Telefono}
                      </p>
                    </div>
                  </button>
                </div>
              )}
            </div>
          )}
          {isOpenSite && (
            <div className="box-search__activeItem">
              <div className="d-flex align-items-center">
                <IconButton
                  color="primary"
                  aria-label="volver"
                  onClick={() => closeSite()}
                >
                  <Icon code={"FaArrowLeft"} />
                </IconButton>
                <h3 className="title-medium ps-4">{activeSite.Localidad}</h3>
              </div>
              <div className="d-flex">
                <div className="ps-3">
                  <p className="body-medium mb-0 pb-0">
                    <b>Dirección</b>
                  </p>
                  <p className="body-medium">
                    {activeSite.Boleteria_Ubicacion}
                  </p>
                  {activeSite.Boleteria_Telefono !== "" &&
                  activeSite.Boleteria_Telefono !== null ? (
                    <>
                      <p className="body-medium">
                        <b>Teléfono</b>
                      </p>
                      <p className="body-medium">
                        {activeSite.Boleteria_Telefono}
                      </p>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="mapContent__map">
        <Map
          site={activeSite}
          offices={offices}
          open={isOpenSite}
          handler={selectSite}
          location={myLocation}
        ></Map>
      </div>
    </div>
  );
};

export default OfficeMap;
