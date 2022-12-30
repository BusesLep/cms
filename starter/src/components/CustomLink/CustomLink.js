import React from "react";
import "./CustomLink.scss"


function CustomLink({href, icon, style, text}) {
  return (
    <a href={href} className={`custom-link ${style}`}>
      {icon && icon}
      <p className="mb-0">{text}</p>
    </a>
  );
}

export default CustomLink;
