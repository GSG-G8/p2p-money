import React from 'react';
import { ConfigProvider } from 'antd';

import headerIcon from '../../../assets/icons/headerIcon.svg';
import Button from '../Button';

import './style.css';

const Header = () => (
  <ConfigProvider direction="rtl">
    <header className="header-component">
      <div className="header-right flex-row">
        <img src={headerIcon} className="header__img" alt="site logo" />
        <p className=" logo-text">P2P</p>
      </div>
      <div className="header-left flex-row">
        <Button className="header-btn btn-login" content="تسجيل الدخول" />
        <Button
          cssClass="blue-border"
          className="header-btn btn-signup"
          content="حساب جديد"
        />
      </div>
    </header>
  </ConfigProvider>
);

export default Header;
