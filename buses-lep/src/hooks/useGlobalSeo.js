import { useStaticQuery, graphql } from "gatsby"

const useGlobalSeo  = () => {
  return useStaticQuery(graphql`
    {
        sanityGlobalConfig {
            description
            title
          }
    }
  `)
}

export default useGlobalSeo