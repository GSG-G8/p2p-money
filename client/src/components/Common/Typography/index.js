import React from 'react';
import { Typography, ConfigProvider } from 'antd';
import PropTypes from 'prop-types';

import 'antd/dist/antd.css';

import './style.css';

const { Title, Paragraph } = Typography;

const typography = ({ type, level, Content, className, align }) => (
  <ConfigProvider direction="rtl">
    {type === 'title' ? (
      // this Title have 4 level h1:1,  h2:2, h3:3, h4:4
      <Title className={`Typography ${className}`} level={level}>
        {Content}
      </Title>
    ) : (
      <Paragraph
        style={{ fontSize: level }}
        align={align}
        className={`Typography ${className}`}
      >
        {Content}
      </Paragraph>
    )}
  </ConfigProvider>
);

export default typography;

typography.propTypes = {
  type: PropTypes.string,
  level: PropTypes.number,
  Content: PropTypes.string.isRequired,
};

typography.defaultProps = {
  type: '',
  level: '.8rem',
};
