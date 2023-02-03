import * as React from "react"
import { Layout , Home} from "../components"

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/global.scss";
import { graphql, useStaticQuery } from "gatsby"

const IndexPage = ({location}) => {

  // console.log(gatsbyRepoData)
  return (
    <Layout location={location}>
      
      <Home/>
    </Layout>
  )
}

export default IndexPage

