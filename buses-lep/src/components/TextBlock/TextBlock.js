import React from "react";
import { PortableText } from "@portabletext/react";

const TextBlock = ({title, text}) => {
  return (
    <div className="textBlock">
      <div className="textBlock__title">{title}</div>
      <div className="textBlock__text">
        <PortableText value={text} />
      </div>
    </div>
  );
};

export default TextBlock;
