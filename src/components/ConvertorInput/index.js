import React, { useEffect } from "react";
import * as PropTypes from "prop-types";

const ConvertorInput = ({ onChange, value, className }) => {
  useEffect(() => {
    M.updateTextFields();
  }, []);
  return (
    <div className="input-field col s12">
      <input
        id="amount"
        type="text"
        className={className}
        value={value}
        onChange={onChange}
      />
      <span
        className="helper-text"
        data-error="Erreur"
        data-success="Valide"
      ></span>
      <label htmlFor="amount">Montant</label>
    </div>
  );
};

ConvertorInput.propTypes = {
  className: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func
};

export default ConvertorInput;
