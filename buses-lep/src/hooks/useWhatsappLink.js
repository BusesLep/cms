import { useStaticQuery, graphql } from "gatsby"

const useWhatsappLink = () => {
  return useStaticQuery(graphql`
    {
        sanityGlobalConfig {
            url
          }
    }
  `)
}

export default useWhatsappLink