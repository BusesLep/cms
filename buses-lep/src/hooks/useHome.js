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
                alt
                _key
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