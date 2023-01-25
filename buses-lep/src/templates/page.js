import React from "react"
import { graphql } from "gatsby"
import { Layout, CustomSection } from "../components"

const Page = ({ data }) => {
  const {
    dinamicContent
  } = data?.allSanityPages?.nodes[0]


  return (
    <Layout>
      <div className="container">
        <CustomSection sections={dinamicContent} />
      </div>
    </Layout>
  )
}

export default Page

export const query = graphql`
  query ($slug: String!) {
    allSanityPages(filter: { slug: { current: { eq: $slug } } }) {
      nodes {
        titlePage
        slug {
          current
        }
        id
        dinamicContent {
          ... on SanityTextImage {
            _key
            _type
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
          }
          ... on SanityTextBlock {
            _key
            _type
            title
            _rawContent
          }
          ... on SanityShipping {
            _key
            _type
            textBlock {
              _rawContent
              title
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
          ... on SanityForm {
            _key
            _type
            formId
            textBlock {
              title
              _rawContent
            }
          }
          ... on SanityBeg {
            _key
            _type
            textBlock {
              title
              _rawContent
            }
          }
        }
        descriptionPage
        banner {
          slides {
            url
            title
            text
            overlay
            _key
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
            }
          }
          autoplay
        }
      }
    }
  }
`;
