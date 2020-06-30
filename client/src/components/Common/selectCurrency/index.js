import React from 'react';
import { Select } from 'antd';
import PropTypes from 'prop-types';
import flagOptions from './currencies';

import 'antd/dist/antd.css';
import './style.css';

const { Option } = Select;

const SelectCurrency = ({ className, onChange }) => (
  <Select
    defaultValue={
      <div dir="ltr" className="flagSpan">
        <span role="img" aria-label="USA">
          {flagOptions[0].flag}
        </span>
        <div> {flagOptions[0].text}</div>
      </div>
    }
    className={`selectCurrency ${className}`}
    optionFilterProp="children"
    onChange={onChange}
    optionLabelProp="label"
  >
    {flagOptions.map(({ value, text, flag }) => (
      <Option
        dir="ltr"
        key={value}
        value={value}
        label={
          <div className="flagSpan">
            <span role="img" aria-label={text}>
              {flag}
            </span>
            <div> {text}</div>
          </div>
        }
      >
        <div className="flagSpan">
          <span role="img" aria-label={text}>
            {flag}
          </span>
          <div>{text}</div>
        </div>
      </Option>
    ))}
  </Select>
);

SelectCurrency.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

SelectCurrency.defaultProps = {
  className: '',
};

export default SelectCurrency;
