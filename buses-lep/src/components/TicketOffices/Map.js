import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import { Icon } from "../";
import "./TicketOffices.scss";

const MapGoogle = ({ site, offices, open , handler, location}) => {
  const [cordinates, setCordinates] = useState([-31.3, -64.5]);
  const siteOpen = open ? 15 : 11 

  useEffect(() => {
    if (site !== null) {
      setCordinates([parseFloat(site.latitud), parseFloat(site.longitud)]);
    }
  }, [site]);

  const markers = offices.map((mark) => (
    <button
      className="markSites"
      onClick={() => handler(mark)}
      key={mark.id}
      lat={mark.latitud}
      lng={mark.longitud}
    >
      <Icon code={"MdLocationOn"}></Icon>
    </button>
  ));

  return (
    <GoogleMapReact
      yesIWantToUseGoogleMapApiInternals={true}
      bootstrapURLKeys={{ key: process.env.GATSBY_GMAP_KEY }}
      center={location !== null ? location : cordinates}
      zoom={site !== null ? siteOpen : 10}
    >
      {markers}
      {site !== null ? (
        <button
          className="markSites active"
          lat={site.latitud}
          lng={site.longitud}
        >
          <Icon code={"MdLocationOn"}></Icon>
        </button>
      ) : (
        <></>
      )}
    </GoogleMapReact>
  );
};

export default MapGoogle;
