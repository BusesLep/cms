import React from "react";
import Icon from "../Icons/Icon";

const FooterLinkBlock = ({ links, title }) => {
  const socialMediaList = links.map((link) => <Icon key={link._key} code={link.icon.icon} url={link.link.url} altText={link.link.text}/>);

  return (
    <div className="py-2 contactBlock__socialMedia">
      <h5 className="title-small">{title}</h5>
      <div className="row">
        {socialMediaList}
      </div>
    </div>
  );
};

export default FooterLinkBlock;
