import React from 'react';
import { Alert, ConfigProvider } from 'antd';
import PropTypes from 'prop-types';

import 'antd/dist/antd.css';

// type should be one of [success,info,warning,error]
const AlertMessage = ({ message, description, type }) => (
  <ConfigProvider direction="rtl">
    <Alert
      message={message}
      description={description}
      type={type}
      showIcon
      closable
    />
  </ConfigProvider>
);

AlertMessage.propTypes = {
  message: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  type: PropTypes.string,
};

AlertMessage.defaultProps = {
  type: 'success',
};

export default AlertMessage;
