import React from 'react';
import { ConfigProvider, Button } from 'antd';

import headerIcon from '../../../assets/icons/headerIcon.svg';
import Typography from '../Typography';
import 'antd/dist/antd.css';

import './style.css';

const Header = () => (
  <ConfigProvider direction="rtl">
    <header className="header-component">
      <div className="header-right flex-row">
        <img src={headerIcon} alt="site logo" />
        <Typography
          Content="P2P"
          type="title"
          level={4}
          className="text--white"
        />
      </div>
      <div className="header-left flex-row">
        <Button className="header-btn btn-login" type="text">
          <Typography className="text--white" Content="تسجيل الدخول" />
        </Button>
        <Button className="header-btn btn-signup" type="text">
          <Typography className="text--white" Content="حساب جديد" />
        </Button>
      </div>
    </header>
  </ConfigProvider>
);

export default Header;
