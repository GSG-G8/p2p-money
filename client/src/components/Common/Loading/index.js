import React from 'react';
import { Spin, Space } from 'antd';

import './style.css';

const Loading = () => (
  <Space size="Large" className="loading-container">
    <Spin size="large" tip="يتم تحميل الصفحة الآن " className="loading" />
  </Space>
);

export default Loading;
