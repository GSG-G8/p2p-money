import React from 'react';
import { ConfigProvider } from 'antd';

import './style.css';

const FooterComponent = () => (
  <footer className="footer-component">
    <ConfigProvider direction="rtl">
      <p> جميع الحقوق محفوظة © 2020 | عملات إكس</p>
    </ConfigProvider>
  </footer>
);

export default FooterComponent;
