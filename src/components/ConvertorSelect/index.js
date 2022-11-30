import React from "react";
import * as PropTypes from "prop-types";

const ConvertorSelect = ({ label, currencies, ...selectProps }) => {
  return (
    <div className="col s6">
      <label>{label}</label>
      <select className="browser-default" {...selectProps}>
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
};

ConvertorSelect.propTypes = {
  currencies: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired
};

export default ConvertorSelect;
