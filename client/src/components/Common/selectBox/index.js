import React from 'react';
import { Select, ConfigProvider } from 'antd';
import PropTypes from 'prop-types';

import 'antd/dist/antd.css';
import './style.css';

const { Option } = Select;

const SelectBox = ({
  defaultValue,
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
        defaultValue={defaultValue}
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
  elements: PropTypes.arrayOf(PropTypes.any),
  onChange: PropTypes.func,
  placeholder: PropTypes.string.isRequired,
  className: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  defaultValue: PropTypes.string,
};

SelectBox.defaultProps = {
  onChange: () => {},
  className: '',
  elements: [],
  disabled: false,
  defaultValue: '',
  value: '',
};

export default SelectBox;
