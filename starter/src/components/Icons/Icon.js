import React from "react";
import FontAwesomeIcon from "./FontAwesomeIcon";
import PropTypes from "prop-types";
import MaterialIcon from "./MetertialIcon";

const Icon = ({ code }) => {
  return (
    <>
      {code.slice(0, 2) === "Fa" ? (
        <FontAwesomeIcon code={code} />
      ) : (
        <MaterialIcon code={code} />
      )}
    </>
  );
};
FontAwesomeIcon.propTypes = {
  code: PropTypes.string.isRequired,
};
export default Icon;
