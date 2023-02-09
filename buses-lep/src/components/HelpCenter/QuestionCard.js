import React from 'react'
import Accordion from "react-bootstrap/Accordion";
import { PortableText } from "@portabletext/react";
import SanityImage from "gatsby-plugin-sanity-image";
const QuestionCard = ({question}) => {
  return (
    <div className='questionCard col-12 col-md-6 p-1'>
      <Accordion.Item eventKey={question._key}>
        <Accordion.Header>
          <div className='questionCard__image'>
          {question.image.image !== null ? <SanityImage {...question.image.image} alt={`${question.image.alt}`} /> : <></> }
          </div>
          <h5 className='title-small py-0'>{question.textBlock.title}</h5>
          
        </Accordion.Header>
        <Accordion.Body>
        <PortableText value={question.textBlock._rawContent} />
        </Accordion.Body>
      </Accordion.Item>
    </div>
  )
}

export default QuestionCard