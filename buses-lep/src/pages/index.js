import * as React from "react"
import { Layout , Home} from "../components"
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/global.scss";
import useHome from "../hooks/useHome";

const IndexPage = ({location}) => {
  const data = useHome().sanityHome;
   
  return (
    <Layout location={location} title={data.titlePage} description={data.descriptionPage}>
      <Home data={data}/>
    </Layout>
  )
}

export default IndexPage

