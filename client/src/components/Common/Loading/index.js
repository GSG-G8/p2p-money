import React from 'react';
import './style.css';
import { Spin, Space } from 'antd';

const Loading = () => (
  <Space size="Large" className="loading-container">
    <Spin size="large" tip="يتم تحميل الصفحة الآن " className="loading" />
  </Space>
);

export default Loading;
