import React from "react";
import "./HelpCenter.scss";
import QuestionCard from "./QuestionCard";
import Accordion from "react-bootstrap/Accordion";

const HelpCenter = ({ title, questions }) => {
  const questionsItems = questions.map((question) => (
    <QuestionCard key={question._key} question={question} />
  ));
  return (
    <section className="helpCenter">
      <h3 className="py-1">{title}</h3>
      <Accordion defaultActiveKey="0">
        {questions !== null ? questionsItems : <></>}
      </Accordion>
    </section>
  );
};

export default HelpCenter;
