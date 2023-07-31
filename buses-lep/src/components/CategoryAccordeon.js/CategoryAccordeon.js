import React from "react";
import Accordion from "react-bootstrap/Accordion";
import { PortableText } from "@portabletext/react";
import SanityImage from "gatsby-plugin-sanity-image";
import "./CategoryAccordeon.scss";

export default function CategoryAccordeon({ questionsData, categoryData }) {

  
  const questionsList = questionsData
    .filter((question) => question.category.id === categoryData.id)
    .map((question) => {
      return (

          <Accordion.Item eventKey={question.id} key={question.id}>
            <Accordion.Header>
              <h5 className="title-small py-0 m-0">{question.question}</h5>
            </Accordion.Header>
            <Accordion.Body>
              <PortableText value={question._rawAnswer} />
            </Accordion.Body>
          </Accordion.Item>

      );
    });
  return (
    <div>
      <section className="categoryAccordeon">
        <div className="categoryAccordeon__content">
          <div className="categoryAccordeon__header">
            <div className="categoryAccordeon__header_image">
              {categoryData.icon.image !== null ? (
                <SanityImage
                  {...categoryData.icon.image}
                  alt={`${categoryData.title}`}
                />
              ) : (
                <></>
              )}
            </div>
            <div className="categoryAccordeon__header_text">
              <p className="p-0">
                <small>Categoria:</small>
              </p>
              <h4 className="p-0">{categoryData.title}</h4>
            </div>
          </div>
          <Accordion defaultActiveKey="0">{questionsList}</Accordion>
        </div>
      </section>
      <div className="container">
        <a href="/centro-de-ayuda">Volver</a>
      </div>
    </div>
  );
}
