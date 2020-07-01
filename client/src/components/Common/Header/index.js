import React from 'react';
import { useHistory } from 'react-router-dom';
import { ConfigProvider } from 'antd';

import headerIcon from '../../../assets/icons/headerIcon.svg';
import Button from '../Button';
import './style.css';

const Header = () => {
  const history = useHistory();
  return (
    <ConfigProvider direction="rtl">
      <header className="header-component">
        <div className="header-right flex-row">
          <img src={headerIcon} className="header__img" alt="site logo" />
          <p className=" logo-text">P2P</p>
        </div>
        <div className="header-left flex-row">
          <Button
            className="header-btn btn-login"
            content="تسجيل الدخول"
            onClick={() => {
              history.push('/login');
            }}
          />
          <Button
            cssClass="blue-border"
            className="header-btn btn-signup"
            content="حساب جديد"
            onClick={() => {
              history.push('/signup');
            }}
          />
        </div>
      </header>
    </ConfigProvider>
  );
};

export default Header;
