import * as React from "react"
import { Layout, Seo } from "../components"


const NotFoundPage = ({location}) => {
  return (
    <>
    <Layout location={location}>
      <div className="d-flex flex-column align-items-center justify-content-center p-5">
      <h1 className="displey-medium">Página no encontrada</h1>
      <p className="title-medium">Lo sentimos, intenta con otra dirección</p>
      </div>
    </Layout>
    </>
  )
}

export default NotFoundPage

export const Head = () => <title>Not found</title>
