import { useStaticQuery, graphql } from "gatsby";

const useQuestions = () => {
  return useStaticQuery(graphql`
    {
        allSanityQuestion {
            nodes {
              question
              answer {
                _rawChildren
              }
              id
              category {
                title
                slug {
                  current
                }
                id
                icon {
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
                  alt
                }
              }
            }
          }
    }
  `);
};

export default useQuestions;
