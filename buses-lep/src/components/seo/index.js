import * as React from "react"
import { Helmet } from "react-helmet"
import  useGlobalSeo  from "../../hooks/useGlobalSeo"


 function Seo({ pageTitle, pageDescription }) {
   const data = useGlobalSeo()

  const {
    description,
    title,
  } = data?.sanityGlobalConfig || {}

  
  const defaultTitle = pageTitle ? pageTitle : title
  const defaultDescription = pageDescription ? pageDescription : description

 
const siteMetadata = {
   lang: `es`,
   meta: [],
}


  return (
    <Helmet
      htmlAttributes={{ lang: siteMetadata.lang }}
      title={defaultTitle}
      // Con %s el titulo de la pagina se conserva ("Formas de pago | Buses
      // Lep"). Sin el placeholder, react-helmet usa la plantilla literal y
      // TODAS las paginas se titulaban "buses Lep" a secas, tambien en Google.
      titleTemplate={`%s | Buses Lep`}

      meta={[
        {
          name: `robots`,
          content: `index, follow`,
        },
        {
          name: `description`,
          content: defaultDescription,
        },
        {
          property: `og:title`,
          content: defaultTitle,
        },
        {
          property: `og:description`,
          content: defaultDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:image`,
          content: `https://www.buseslep.com.ar/logo.png`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:title`,
          content: defaultTitle,
        },
        {
          name: `twitter:description`,
          content: defaultDescription,
        },
      ].concat(siteMetadata.meta)}
      // link={[]}
    />
  )
 }

 export default Seo

