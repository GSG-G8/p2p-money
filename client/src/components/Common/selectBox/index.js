import React from 'react';
import { Select, ConfigProvider } from 'antd';
import PropTypes from 'prop-types';

import 'antd/dist/antd.css';
import './index.css';

const { Option } = Select;

const SelectBox = ({
  handleChange,
  elements,
  placeholder,
  className,
  value,
  disabled,
}) => (
  <div className="custom-select">
    <ConfigProvider direction="rtl">
      <Select
        className={`${className} full-width`}
        disabled={disabled}
        placeholder={placeholder}
        onChange={handleChange}
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
  handleChange: PropTypes.func,
  placeholder: PropTypes.string.isRequired,
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

SelectBox.defaultProps = {
  handleChange: () => {},
  className: '',
  elements: [],
  disabled: false,
};

export default SelectBox;
