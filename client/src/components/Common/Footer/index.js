import React from 'react';
import { ConfigProvider } from 'antd';

import './style.css';

const FooterComponent = () => (
  <footer className="footer-component">
    <ConfigProvider direction="rtl">
      <p dir="rtl">حول X | جميع الحقوق محفوظة © 2020</p>
    </ConfigProvider>
  </footer>
);

export default FooterComponent;
