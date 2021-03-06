import React from 'react';
import { Alert, ConfigProvider } from 'antd';
import PropTypes from 'prop-types';

import 'antd/dist/antd.css';

// type should be one of [success,info,warning,error]
const AlertMessage = ({ message, description, type, className, closable }) => (
  <ConfigProvider direction="rtl">
    <Alert
      message={message}
      description={description}
      type={type}
      showIcon
      closable={closable}
      className={className}
    />
  </ConfigProvider>
);

AlertMessage.propTypes = {
  message: PropTypes.string.isRequired,
  description: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  closable: PropTypes.bool,
};

AlertMessage.defaultProps = {
  type: 'success',
  className: '',
  description: '',
  closable: true,
};

export default AlertMessage;
