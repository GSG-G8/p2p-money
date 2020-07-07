import React from 'react';
import { ConfigProvider } from 'antd';
import footerIcon from '../../../assets/icons/headerIcon.svg';

import './style.css';

const FooterComponent = () => (
  <footer className="footer-component">
    <ConfigProvider direction="rtl">
      <p className="footer__paragraph">
        جميع الحقوق محفوظة © 2020 |&nbsp;&nbsp;
        <img className="footer__img" alt="site logo" src={footerIcon} />
      </p>
    </ConfigProvider>
  </footer>
);

export default FooterComponent;
