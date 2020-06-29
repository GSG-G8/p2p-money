import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Input, ConfigProvider } from 'antd';
import PropTypes from 'prop-types';

const TextInput = ({
  className,
  type,
  disabled,
  placeholder,
  handlleChange,
  onFocus,
  value,
  prefix,
  suffix,
}) => (
  <div className="inputSpecs">
    <ConfigProvider direction="rtl">
      <Input
        className={`${className} input-custom`}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        onChange={handlleChange}
        onFocus={onFocus}
        value={value}
        prefix={prefix}
        suffix={suffix}
      />
    </ConfigProvider>
  </div>
);

TextInput.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string.isRequired,
  handlleChange: PropTypes.func,
  onFocus: PropTypes.func,
  value: PropTypes.string.isRequired,
  prefix: PropTypes.element,
  suffix: PropTypes.element,
};

TextInput.defaultProps = {
  className: '',
  type: 'text',
  disabled: false,
  handlleChange: () => {},
  onFocus: () => {},
  prefix: <></>,
  suffix: <></>,
};

export default TextInput;
