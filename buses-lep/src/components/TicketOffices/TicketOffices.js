import React from "react";
import { PortableText } from "@portabletext/react";
import useOffices from "../../hooks/useOffices";
import './TicketOffices.scss'
import OfficeMap from "./OfficeMap";

const TicketOffices = ({ title, text }) => {
  const offices = useOffices().allOffices.nodes;

  return (
    <section className="ticketOffices">
      <h3 className="py-1">{title}</h3>
      <div className="d-flex flex-wrap p-3 p-md-4">
        <div className="mb-4"><PortableText value={text} /></div>
        <OfficeMap offices={offices}></OfficeMap>
      </div>
    </section>
  );
};

export default TicketOffices;
