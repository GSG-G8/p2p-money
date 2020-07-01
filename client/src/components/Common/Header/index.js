import React from 'react';
import { ConfigProvider, Button } from 'antd';

import headerIcon from '../../../assets/icons/headerIcon.svg';

import 'antd/dist/antd.css';
import './style.css';

const Header = () => (
  <ConfigProvider direction="rtl">
    <header className="header-component">
      <div className="header-right flex-row">
        <img src={headerIcon} className="header__img" alt="site logo" />
        <p className="text--white--almarai  logo-text">P2P</p>
      </div>
      <div className="header-left flex-row">
        <Button className="header-btn btn-login" type="text">
          <p className="text--white">تسجيل الدخول</p>
        </Button>
        <Button className="header-btn btn-signup" type="text">
          <p className="text--white">حساب جديد</p>
        </Button>
      </div>
    </header>
  </ConfigProvider>
);

export default Header;
