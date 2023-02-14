import React from "react";
import FontAwesomeIcon from "./FontAwesomeIcon";
import MaterialIcon from "./MetertialIcon";

const Icon = ({ code, url, altText }) => {
  const icon = (
    <>
      {code.startsWith("Md") ? (
        <MaterialIcon code={code}></MaterialIcon>
      ) : (
        <FontAwesomeIcon code={code}></FontAwesomeIcon>
      )}
    </>
  );

  if (url) {
    return <a href={url} title={altText}>{icon}</a>;
  }

  return icon;
};

export default Icon;
