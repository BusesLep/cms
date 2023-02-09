import React from "react";
import { graphql } from "gatsby";
import { Layout, CustomSection, Banner } from "../components";

const Page = ({location,  data }) => {
  const {
    dinamicContent , banner
  } = data?.allSanityPages?.nodes[0]


  return (
    <Layout location={location}>
      <div className="container">
      {banner !== null && banner !== undefined ? <Banner banner={banner} /> : <></>}
        {dinamicContent !== null  && dinamicContent.length !== undefined  &&(
          <CustomSection sections={dinamicContent} />
        )}
      </div>
    </Layout>
  );
};

export default Page;

export const query = graphql`
  query ($slug: String!) {
    allSanityPages(filter: { slug: { current: { eq: $slug } } }) {
      nodes {
        titlePage
        slug {
          current
        }
        id
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
          ... on SanityTicketOffices {
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
