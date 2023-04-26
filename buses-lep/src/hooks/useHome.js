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
          ... on SanityTicketOffices {
            _key
            _type
            textBlock {
              _rawContent
              title
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
          ... on SanityTextBlock {
            _key
            _type
            title
            _rawContent
          }
          ... on SanityStoryIntro {
            _key
            _type
            textBlock {
              title
              _rawContent
            }
            linkedPage {
              slug {
                current
              }
            }
            icon {
              icon
              _type
              _key
            }
          }
          ... on SanityPromotions {
            _key
            _type
            promotions {
              title
              subtitle
              link {
                url
                text
              }
              linkedPage {
                slug {
                  current
                }
              }
              images {
                alt
                image {
                  hotspot {
                    y
                    x
                    width
                    height
                  }
                  crop {
                    top
                    right
                    left
                    bottom
                  }
                  asset {
                    _id
                  }
                }
              }
              image {
                alt
                image {
                  hotspot {
                    y
                    x
                    width
                    height
                  }
                  crop {
                    top
                    right
                    left
                    bottom
                  }
                  asset {
                    _id
                  }
                }
              }
            }
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