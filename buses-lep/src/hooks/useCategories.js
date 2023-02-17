import { useStaticQuery, graphql } from "gatsby";

const useCategories = () => {
  return useStaticQuery(graphql`
    {
      allSanityCategories {
        nodes {
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
  `);
};

export default useCategories;
