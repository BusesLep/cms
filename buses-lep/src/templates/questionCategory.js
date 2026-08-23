import React from "react";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";
import {
  CategoryAccordeon,
  Layout,
  Banner
} from "../components";
import useQuestions from "../hooks/useQuestions";
import useHome from "../hooks/useHome";

/// El texto plano de una respuesta de Sanity (los bloques del portable text,
/// unidos). Es lo que va al schema: tiene que decir lo mismo que se ve en el
/// acordeon de la pagina.
const textoRespuesta = (question) =>
  (question.answer || [])
    .map((bloque) => (bloque.children || []).map((c) => c.text).join(""))
    .join("\n")
    .trim();

const QuestionCategory = ({ location, data }) => {

  const categoryData = data?.allSanityCategories?.nodes[0];
  const questionsData = useQuestions().allSanityQuestion.nodes;
  const dataHome = useHome().sanityHome;

  // FAQPage con las mismas preguntas que muestra el acordeon: los datos
  // estructurados son lo que Google usa para los resultados enriquecidos y
  // lo que los asistentes de IA extraen mas facil al citar la pagina.
  const preguntas = questionsData
    .filter((q) => q.category?.id === categoryData?.id)
    .map((q) => ({ pregunta: q.question, respuesta: textoRespuesta(q) }))
    .filter((q) => q.pregunta && q.respuesta);
  const faqLd = preguntas.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: preguntas.map((q) => ({
          "@type": "Question",
          name: q.pregunta,
          acceptedAnswer: { "@type": "Answer", text: q.respuesta },
        })),
      }
    : null;

  return (
    // El titulo de la categoria ya viene en el query de la pagina; sin
    // pasarlo, el Seo caia al titulo global y todas las categorias se
    // titulaban igual en Google.
    <Layout
      location={location}
      title={categoryData?.title}
      description={
        categoryData?.title
          ? `Preguntas frecuentes sobre ${categoryData.title.toLowerCase()} en Buses Lep.`
          : undefined
      }>
      {faqLd && (
        <Helmet>
          <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
        </Helmet>
      )}
      <div >
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
