import { useStaticQuery, graphql } from "gatsby"

const useHome = () => {
  return useStaticQuery(graphql`
    {
        sanityHome {
            titlePage
            descriptionPage
            banner {
              autoplay
              slides {
                title
                text
                url
                overlay
                image {
                    alt
                  asset {
                    _id
                  }
                  crop {
                    bottom
                    left
                    right
                    top
                  }
                  hotspot {
                    height
                    width
                    x
                    y
                  }
                }
              }
            }
          }
    }
  `)
}

export default useHome