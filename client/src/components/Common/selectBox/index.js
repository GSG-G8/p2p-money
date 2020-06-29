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
  onFocus,
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
        optionFilterProp="children"
        onChange={handleChange}
        onFocus={onFocus}
        value={value}
        labe
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
  elements: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleChange: PropTypes.func,
  placeholder: PropTypes.string.isRequired,
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
  onFocus: PropTypes.func,
  disabled: PropTypes.bool,
};

SelectBox.defaultProps = {
  handleChange: () => {},
  onFocus: () => {},
  className: '',
  disabled: false,
};

export default SelectBox;
