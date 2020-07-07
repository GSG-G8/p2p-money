import React from 'react';
import { Select } from 'antd';
import PropTypes from 'prop-types';
import flagOptions from './currencies';

import 'antd/dist/antd.css';
import './style.css';

const { Option } = Select;

const SelectCurrency = ({ className, onChange, valueSelect, selectType }) => (
  <Select
    defaultValue={
      valueSelect === 'ILS' ? (
        <div dir="ltr" className="flagSpan">
          <div> {flagOptions[0].text}</div>
          <span role="img" aria-label="USA">
            {flagOptions[0].flag}
          </span>
        </div>
      ) : (
        <div dir="ltr" className="flagSpan">
          <div> {flagOptions[1].text}</div>
          <span role="img" aria-label="USA">
            {flagOptions[1].flag}
          </span>
        </div>
      )
    }
    className={`selectCurrency ${className}`}
    optionFilterProp="children"
    onChange={onChange}
    optionLabelProp="label"
  >
    {valueSelect === 'ILS' ? (
      flagOptions.map(({ value, text, flag }) =>
        valueSelect === value && selectType === 'from' ? (
          <></>
        ) : (
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
        )
      )
    ) : (
      <Option
        dir="ltr"
        key={flagOptions[1].value}
        value={flagOptions[1].value}
        label={
          <div className="flagSpan">
            <span role="img" aria-label={flagOptions[1].text}>
              {flagOptions[1].flag}
            </span>
            <div> {flagOptions[1].text}</div>
          </div>
        }
      >
        <div className="flagSpan">
          <span role="img" aria-label={flagOptions[1].text}>
            {flagOptions[1].flag}
          </span>
          <div>{flagOptions[1].text}</div>
        </div>
      </Option>
    )}
  </Select>
);

SelectCurrency.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  valueSelect: PropTypes.string,
  selectType: PropTypes.string,
};

SelectCurrency.defaultProps = {
  className: '',
  valueSelect: 'ILS',
  selectType: '',
};

export default SelectCurrency;
