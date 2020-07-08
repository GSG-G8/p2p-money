import React from 'react';
import PropTypes from 'prop-types';
import flagOptions from './currencies';

import 'antd/dist/antd.css';
import './style.css';

const SelectCurrency = ({ onChange, valueSelect, selectType }) => (
  <select
    name="Select Currency"
    id="selectCurrency"
    onChange={onChange}
    className="selectCurrency"
  >
    {selectType === 'from' ? (
      flagOptions.map(({ value, text, flag }) => (
        <option key={value} value={value} selected={value === valueSelect}>
          &nbsp; &nbsp; &nbsp;
          {flag}
          &nbsp; &nbsp; &nbsp;
          {text}
        </option>
      ))
    ) : valueSelect === 'ILS' ? (
      flagOptions.map(
        ({ value, text, flag }) =>
          value !== 'ILS' && (
            <option key={value} value={value} selected={value === 'USD'}>
              &nbsp; &nbsp; &nbsp;
              {flag}
              &nbsp; &nbsp; &nbsp;
              {text}
            </option>
          )
      )
    ) : (
      <option key={flagOptions[1].value} value={flagOptions[1].value} selected>
        &nbsp; &nbsp; &nbsp;
        {flagOptions[1].flag}
        &nbsp; &nbsp; &nbsp;
        {flagOptions[1].text}
      </option>
    )}
  </select>
);

SelectCurrency.propTypes = {
  onChange: PropTypes.func.isRequired,
  valueSelect: PropTypes.string,
  selectType: PropTypes.string,
};

SelectCurrency.defaultProps = {
  selectType: '',
  valueSelect: '',
};

export default SelectCurrency;
