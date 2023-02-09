import * as React from "react"
import { Layout , Home} from "../components"

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/global.scss";
import { graphql, useStaticQuery } from "gatsby"
import useOffices from "../hooks/useOffices";

const TicketOffices = ({location}) => {
    const offices = useOffices().allOffices.nodes;

  console.log(offices)
  return (
    <Layout location={location}>
      
      <h1>Puntos de venta</h1>
    </Layout>
  )
}

export default TicketOffices

