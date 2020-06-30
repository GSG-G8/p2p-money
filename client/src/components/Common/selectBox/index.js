import React from 'react';
import { Select, ConfigProvider } from 'antd';
import PropTypes from 'prop-types';

import 'antd/dist/antd.css';
import './style.css';

const { Option } = Select;

const SelectBox = ({
  onChange,
  elements,
  placeholder,
  className,
  value,
  disabled,
}) => (
  <div className="custom-select">
    <ConfigProvider direction="rtl">
      <Select
        direction="rtl"
        className={`full-width ${className}`}
        disabled={disabled}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      >
        {elements.map((elm) => (
          <Option key={elm} value={elm}>
            {elm}
          </Option>
        ))}
      </Select>
    </ConfigProvider>
  </div>
);

SelectBox.propTypes = {
  elements: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
  placeholder: PropTypes.string.isRequired,
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

SelectBox.defaultProps = {
  onChange: () => {},
  className: '',
  elements: [],
  disabled: false,
};

export default SelectBox;
