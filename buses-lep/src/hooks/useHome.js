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
          ... on SanityForm {
            _key
            _type
            formId
            textBlock {
              title
              content {
                _rawChildren
              }
            }
          }
          ... on SanityHelpCenter {
            _key
            _type
            title
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
            content {
              _rawChildren
            }
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