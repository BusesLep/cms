import React from "react";
import Accordion from "react-bootstrap/Accordion";
import { PortableText } from "@portabletext/react";
import SanityImage from "gatsby-plugin-sanity-image";
const QuestionCard = ({ question }) => {
  return (
    <div className="questionCard col-12 col-md-6 p-1">
      <Accordion.Item eventKey={question._key || question.id}>
        <Accordion.Header>
          <div className="questionCard__image">
            {question.image?.image !== null || question.category?.icon ? (
              <SanityImage
                {...(question?.image?.image || question.category?.icon?.image)}
                alt={`${question?.image?.alt || question.question}`}
              />
            ) : (
              <></>
            )}
          </div>
          <div>
             {question.category && (
            <a className="questionCard__link"
              href={`/categories/${question.category?.slug?.current}`}
            >
              {question.category.title}
            </a>
          )}
          <h5 className="title-small py-0">
            {question?.textBlock?.title || question?.question}
          </h5>
          </div>
         
        </Accordion.Header>
        <Accordion.Body>
          <PortableText
            value={question.textBlock?._rawContent || question._rawAnswer}
          />
        </Accordion.Body>
      </Accordion.Item>
    </div>
  );
};

export default QuestionCard;
