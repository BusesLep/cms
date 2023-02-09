import { useStaticQuery, graphql } from "gatsby"

const useHome = () => {
  return useStaticQuery(graphql`
    {
      sanityHome {
        titlePage
        descriptionPage
        banner {
          slides {
            image {
              alt
              _key
              image {
                _key
                asset {
                  _id
                }
                crop {
                  top
                  right
                  left
                  bottom
                }
                hotspot {
                  y
                  x
                  width
                  height
                }
              }
            }
            overlay
            text
            title
            url
          }
        }
        dinamicContent {
          ... on SanityBeg {
            _key
            _type
            textBlock {
              title
              _rawContent
            }
          }
          ... on SanityForm {
            _key
            _type
            formId
            textBlock {
              title
              _rawContent
            }
          }
          ... on SanityHelpCenter {
            _key
            _type
            title
            questions {
              textBlock {
                title
                _rawContent
              }
              image {
                alt
                _key
                image {
                  _key
                  asset {
                    _id
                  }
                  crop {
                    top
                    right
                    left
                    bottom
                  }
                  hotspot {
                    y
                    x
                    width
                    height
                  }
                }   
              }
              _key
            }
          }
          ... on SanityShipping {
            _key
            _type
            textBlock {
              title
              _rawContent
            }
          }
          ... on SanityTextBlock {
            _key
            _type
            title
            _rawContent
          }
          ... on SanityTextImage {
            _key
            _type
            image {
              alt
              _key
              image {
                _key
                asset {
                  _id
                }
                crop {
                  top
                  right
                  left
                  bottom
                }
                hotspot {
                  y
                  x
                  width
                  height
                }
              }
            }
            textBlock {
              title
              content {
                _rawChildren
              }
            }
          }
        }
      }
    }
  `)
}

export default useHome