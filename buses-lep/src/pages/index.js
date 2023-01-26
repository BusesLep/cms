import * as React from "react"
import { Layout , Home} from "../components"

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/global.scss";

const IndexPage = ({location}) => {
  console.log(location)
  return (
    <Layout location={location}>
      <Home/>
    </Layout>
  )
}

export default IndexPage

