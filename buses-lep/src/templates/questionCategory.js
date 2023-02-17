import React from "react";
import { graphql } from "gatsby";
import {
  CategoryAccordeon,
  Layout,
  // Banner
} from "../components";
import useQuestions from "../hooks/useQuestions";



const QuestionCategory = ({ location, data }) => {
  const categoryData = data?.allSanityCategories?.nodes[0];

  const questionsData = useQuestions().allSanityQuestion.nodes;

  

  return (
    <Layout location={location}>
      <div className="container">
        {/* {(banner !== null && banner !== undefined  && banner.banner?.slides?.length !== 0) ? <Banner banner={banner} /> : <></>} */}
        <CategoryAccordeon questionsData={questionsData} categoryData={categoryData} />
      </div>
    </Layout>
  );
};

export default QuestionCategory;

export const query = graphql`
  query ($slug: String!) {
    allSanityCategories(filter: { slug: { current: { eq: $slug } } }) {
      nodes {
        title
        slug {
          current
        }
        id
        _key
        icon {
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
  }
`;
