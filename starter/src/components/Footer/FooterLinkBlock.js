import React from "react";

const FooterLinkBlock = ({ links , title }) => {

  const linksList = links.map((link) => {
    const url = link?.url;
    const linkTitle = link?.text;

    return (
        <li className="body-medium mb-2">
        <a href={url}>{linkTitle}</a>
      </li>
    );
  });

  return (
    <div className="col-12 col-md-4 py-1">
      <h5 className="title-small">{title}</h5>
      <ul role="list">
        {linksList}
      </ul>
    </div>
  );
};

export default FooterLinkBlock;
