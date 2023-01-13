import React from "react";
import FontAwesomeIcon from "./FontAwesomeIcon";
import PropTypes from "prop-types";
import MaterialIcon from "./MetertialIcon";

const Icon = ({ code }) => {
  return (
    <>
      {code.startsWith("Md") ? (
        <MaterialIcon code={code}></MaterialIcon>
      ) : (
        <FontAwesomeIcon code={code}></FontAwesomeIcon>
      )}
    </>
  );
};
FontAwesomeIcon.propTypes = {
  code: PropTypes.string.isRequired,
};
export default Icon;
