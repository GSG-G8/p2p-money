import React from 'react';
import PropTypes from 'prop-types';
import { Button, ConfigProvider } from 'antd';
import 'antd/dist/antd.css';
import './style.css';

const ButtonComponent = ({
  content,
  disabled,
  loading,
  size,
  block,
  onClick,
  cssClass,
}) => (
  <ConfigProvider direction="rtl">
    <Button
      type="primary"
      disabled={disabled}
      loading={loading}
      size={size}
      block={block}
      onClick={onClick}
      className={cssClass}
    >
      {content}
    </Button>
  </ConfigProvider>
);
ButtonComponent.propTypes = {
  content: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  size: PropTypes.string,
  block: PropTypes.bool,
  onClick: PropTypes.func,
  cssClass: PropTypes.string,
};

ButtonComponent.defaultProps = {
  disabled: false,
  loading: false,
  size: 'all', // other sizes: large,middle,sm
  block: false, // make the button block element with full div width
  onClick: () => {},
  cssClass: 'blue', // options:blue blue-border green
};

export default ButtonComponent;
