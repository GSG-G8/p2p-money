import React from 'react';
import { ConfigProvider } from 'antd';

import './style.css';

const FooterComponent = () => (
  <footer className="footer-component">
    <ConfigProvider direction="rtl">
      <p className="footer-text" dir="rtl">
        P2P | جميع الحقوق محفوظة © 2020
      </p>
    </ConfigProvider>
  </footer>
);

export default FooterComponent;
