const path = require("path")
const fetch = (...args) =>
  import(`node-fetch`).then(({ default: fetch }) => fetch(...args))
const crypto = require('crypto');


exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // CREACION DE PAGINAS DE ARTÍCULO
  const { data: pageQueryData } = await graphql(`
    query Pages {
      allSanityPages {
        nodes {
          slug {
            current
          }
        }
      }
    }
  `)

  if (pageQueryData.errors) {
    reporter.panicOnBuild("Error creando paginas")
  }

  pageQueryData.allSanityPages.nodes.forEach(node => {
    const page = path.resolve("./src/templates/page.js")
    createPage({
      path: "/" + node.slug.current,
      component: page,
      context: { slug: node.slug.current },
    })
  })

  // CREACION DE PAGINAS DE CATEGORY 
  const { data: categoryQueryData } = await graphql(`
    query Categories {
      allSanityCategories {
        nodes {
          slug {
            current
          }
        }
      }
    }
  `)

  if (categoryQueryData.errors) {
    reporter.panicOnBuild("Error creando paginas de categorias")
  }

  categoryQueryData.allSanityCategories.nodes.forEach(node => {
    const category = path.resolve("./src/templates/questionCategory.js")
    createPage({
      path: "/categories/" + node.slug.current,
      component: category,
      context: { slug: node.slug.current },
    })
  })
}


exports.sourceNodes = async ({ actions }) => {
  const { createNode } = actions;

    // fetch raw data from the Origin api
    const fetchTicketOffices = () => fetch(`${process.env.GATSBY_URL_BFF}/puntos-de-venta`, {headers: {
      "Content-Type": "application/json",
      "X-origin":"CMS"
    },});
    // await for results
    const resTicketOffices = await fetchTicketOffices();
    const dataTicketOffices = await resTicketOffices.json();
    // map into these results and create nodes
    dataTicketOffices.map((offices, i) => {
      // Create your node object
      const officesNode = {
        // Required fields
        id: `offices-${i}`,
        parent: `__OFFICES__`,
        internal: {
          type: `Offices`, // name of the graphQL query --> allOrigin {}
          // contentDigest will be added just after
          // but it is required
        },
        children: [],
        // Other fields that you want to query with graphQl
        Localidad: offices.Localidad,
        Boleteria_Ubicacion: offices.Boleteria_Ubicacion,
        latitud: offices.latitud,
        longitud: offices.longitud,
        Boleteria_Telefono: offices.Boleteria_Telefono,
        linkfoto: offices.linkfoto,
      }
  
      // Get content digest of node. (Required field)
      const contentDigestOffices = crypto
        .createHash(`md5`)
        .update(JSON.stringify(officesNode))
        .digest(`hex`);
      // add it to officesNode
      officesNode.internal.contentDigest = contentDigestOffices;
  
      // Create node with the gatsby createNode() API
      createNode(officesNode);
      
    });
}