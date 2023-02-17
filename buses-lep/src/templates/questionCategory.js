import React from "react";
import { graphql } from "gatsby";
import {
  CategoryAccordeon,
  Layout,
  Banner
} from "../components";
import useQuestions from "../hooks/useQuestions";
import useHome from "../hooks/useHome";



const QuestionCategory = ({ location, data }) => {

  const categoryData = data?.allSanityCategories?.nodes[0];
  const questionsData = useQuestions().allSanityQuestion.nodes;
  const dataHome = useHome().sanityHome;

  return (
    <Layout location={location}>
      <div className="container">
      {dataHome.banner !== null && dataHome.banner.length !== 0 ? (
          <Banner banner={dataHome.banner} />
        ) : (
          <></>
        )}
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
