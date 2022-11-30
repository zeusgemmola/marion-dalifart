import React from "react";
import Spinner from "../Spinner";
import * as PropTypes from "prop-types";

const ConvertorResult = ({ result, showLoading }) => (
  <div className="row">
    <div className="input-field col s12">
      <h5>Result : {showLoading ? <Spinner /> : result} </h5>
    </div>
  </div>
);

ConvertorResult.propTypes = {
  result: PropTypes.number.isRequired,
  showLoading: PropTypes.bool.isRequired
};

export default ConvertorResult;
