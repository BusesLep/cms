import { useStaticQuery, graphql } from "gatsby"

const useHeader = () => {
  return useStaticQuery(graphql`
    {
        sanityHeader {
            menu {
              links {
                ... on SanityDropdown {
                  _key
                  _type
                  text
                  links {
                    separated
                    link {
                      url
                      text
                      _key
                    }
                  }
                  icon {
                    icon
                    _type
                    _key
                  }
                }
                ... on SanityMenuLink {
                  _key
                  _type
                  link {
                    url
                    text
                    _type
                    _key
                  }
                  icon {
                    icon
                    _type
                    _key
                  }
                }
              }
              _type
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
                  id
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
                  id
                }
                alt
              }
              _type
              _key
            }
            linkBlock {
              links {
                ... on SanityLink {
                  _key
                  _type
                  url
                  text
                }
                ... on SanityCustomLink {
                  _key
                  _type
                  link {
                    url
                    text
                    _type
                    _key
                  }
                  icon {
                    icon
                    _type
                    _key
                  }
                }
              }
              _type
              _key
            }
            _type
            _key
          }
    }
  `)
}

export default useHeader