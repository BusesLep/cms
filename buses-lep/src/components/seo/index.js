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

  // "Compras y formas de pago | Buses Lep", pero sin duplicar la marca
  // cuando el titulo de la pagina YA es la marca (la home de Sanity se llama
  // "Buses Lep" y quedaba "Buses Lep | Buses Lep").
  const marca = `Buses Lep`
  const tituloFinal =
    !defaultTitle || defaultTitle.trim().toLowerCase() === marca.toLowerCase()
      ? marca
      : `${defaultTitle} | ${marca}`

 
const siteMetadata = {
   lang: `es`,
   meta: [],
}


  return (
    <Helmet
      htmlAttributes={{ lang: siteMetadata.lang }}
      title={tituloFinal}

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
          content: tituloFinal,
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
          content: tituloFinal,
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

