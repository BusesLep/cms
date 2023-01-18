import { useStaticQuery, graphql } from "gatsby";

const useFooter = () => {
  return useStaticQuery(graphql`
    {
      sanityFooter {
        socialMediaBlock {
          title
          links {
            link {
              url
              text
              _key
            }
            icon {
              icon
            }
          }
        }
        qrCode {
          url
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
        logo {
          imageDark {
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
        linkBlock {
          _key
          title
          links {
            url
            text
            _key
          }
        }
        id
      }
    }
  `);
};

export default useFooter;
