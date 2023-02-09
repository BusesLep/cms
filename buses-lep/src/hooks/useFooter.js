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
            style
          }
        }
        qrCode {
          url
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
        imageLinkBlock {
          title
          images {
            _key
            url
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
          }
        }
        id
      }
    }
  `);
};

export default useFooter;
