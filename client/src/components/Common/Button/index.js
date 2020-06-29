import React from 'react';
import PropTypes from 'prop-types';
import { Button, ConfigProvider } from 'antd';
import 'antd/dist/antd.css';

const ButtonComponent = ({
  Content,
  disabled,
  loading,
  size,
  block,
  onClick,
}) => (
  <ConfigProvider direction="rtl">
    <Button
      type="primary"
      disabled={disabled}
      loading={loading}
      size={size}
      block={block}
      onClick={onClick}
      className="button-component"
      style={{ backgroundColor: '#126fc9', borderColor: '#126fc9' }}
    >
      {Content}
    </Button>
  </ConfigProvider>
);
ButtonComponent.propTypes = {
  Content: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  size: PropTypes.string,
  block: PropTypes.bool,
  onClick: PropTypes.func,
};

ButtonComponent.defaultProps = {
  Content: 'تسجيل الدخول',
  disabled: false,
  loading: false,
  size: 'all', // other sizes: large,middle,sm
  block: false, // make the button block element with full div width
  onClick: null,
};

export default ButtonComponent;
