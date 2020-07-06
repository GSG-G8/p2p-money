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
      />
    </ConfigProvider>
  </div>
);

TextInput.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string.isRequired,
  handleChange: PropTypes.func,
  onFocus: PropTypes.func,
  value: PropTypes.string.isRequired,
};

TextInput.defaultProps = {
  className: '',
  type: 'text',
  disabled: false,
  onFocus: () => {},
  handleChange: () => {},
};

export default TextInput;
