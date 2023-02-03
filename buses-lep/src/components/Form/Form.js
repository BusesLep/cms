import React from "react";
import { PortableText } from "@portabletext/react";
import "./Form.scss";

const Form = ({ title, id, text }) => {
  return (
    <section className="form">
      <h3 className="py-1">{title}</h3>
      <div className="d-flex flex-wrap p-3 p-md-4">
        <div className="col-12 col-md-6 pe-4 mb-3">
          <PortableText value={text} />
        </div>
        <div className="col-12 col-md-6 form__box">
        {id !== null && id !== '' && <iframe class="embed-responsive-item" src={`https://wcentrix.net/app/form_web.html?accountID=bu3455&wcboxID=${id}`}></iframe>}
        </div>
      </div>
    </section>
  );
};

export default Form;
