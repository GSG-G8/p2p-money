import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Select, ConfigProvider } from 'antd';
import PropTypes from 'prop-types';

const { Option } = Select;

const SelectBox = ({
  handlleChange,
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
        onChange={handlleChange}
        onFocus={onFocus}
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
  elements: PropTypes.arrayOf(PropTypes.string).isRequired,
  handlleChange: PropTypes.func,
  placeholder: PropTypes.string.isRequired,
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
  onFocus: PropTypes.func,
  disabled: PropTypes.bool,
};

SelectBox.defaultProps = {
  handlleChange: () => {},
  onFocus: () => {},
  className: '',
  disabled: false,
};

export default SelectBox;
