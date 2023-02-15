import * as React from "react"
import { Layout , Categories} from "../components"
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/global.scss";


const IndexPage = ({location}) => {

  return (
    <Layout location={location}>
      <Categories/>
    </Layout>
  )
}

export default IndexPage