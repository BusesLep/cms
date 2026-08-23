/**
 * @type {import('gatsby').GatsbyConfig}
 */

require("dotenv").config({
  path: `.env`,
})

module.exports = {
  siteMetadata: {
    title: `Buses Lep`,
    // El dominio de ESTE sitio (el centro de ayuda), no el de la web de
    // ventas: gatsby-plugin-sitemap arma las URLs del sitemap con esto, y
    // con el dominio equivocado el sitemap declaraba paginas ajenas.
    siteUrl: `https://cms.buseslep.com.ar`
  },
  plugins: [{
    resolve: 'gatsby-source-sanity',
    options: {
      "projectId": process.env.SANITY_ID_PROJECT,
      "dataset": process.env.SANITY_DATASET
    }
  }, "gatsby-plugin-image", "gatsby-plugin-sharp", "gatsby-transformer-sharp", "gatsby-plugin-sass",  "gatsby-plugin-sitemap", {
    resolve: 'gatsby-plugin-manifest',
    options: {
      "icon": "src/images/new_logo_lep.svg"
    }
  }, {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "images",
      "path": "./src/images/"
    },
    __key: "images"
  }, {
    resolve: "gatsby-plugin-sanity-image",
    options: {
      projectId: process.env.SANITY_ID_PROJECT,
      dataset: process.env.SANITY_DATASET,
      customImageTypes: ["customImage"],
      altFieldName: "alt",
    },
  }
]
};