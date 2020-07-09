import React from 'react';
import PropTypes from 'prop-types';
import { Input, ConfigProvider } from 'antd';

import 'antd/dist/antd.css';
import './style.css';

const TextInput = ({
  className,
  type,
  disabled,
  placeholder,
  handleChange,
  onFocus,
  value,
  step,
  name,
}) => (
  <div className="inputSpecs">
    <ConfigProvider direction="rtl">
      <Input
        className={`${className} input-custom`}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        onChange={handleChange}
        onFocus={onFocus}
        value={value}
        step={step}
        name={name}
      />
    </ConfigProvider>
  </div>
);

TextInput.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  handleChange: PropTypes.func,
  onFocus: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  step: PropTypes.string,
};

TextInput.defaultProps = {
  className: '',
  type: 'text',
  disabled: false,
  onFocus: () => {},
  name: '',
  handleChange: () => {},
  placeholder: '',
  step: '.1',
};

export default TextInput;
