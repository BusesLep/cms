import React from "react";
import Icon from "../Icons/Icon";

const FooterLinkBlock = ({ links, title }) => {
  const socialMediaList = links.map((link) => <Icon code={link.icon.icon} url={link.link.url} altText={link.link.text}/>);

  return (
    <div className="col-12 col-md-7 justify-content-end py-2">
      <h5 className="title-small">{title}</h5>
      <div className="row">
        {socialMediaList}
      </div>
    </div>
  );
};

export default FooterLinkBlock;
