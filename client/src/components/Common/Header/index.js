import React from 'react';
import { useHistory } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';

import headerIcon from '../../../assets/icons/headerIcon.svg';
import Button from '../Button';
import './style.css';

const Header = ({ isClient, isAdmin, logoutHandler, cssClass }) => {
  const history = useHistory();
  return (
    <ConfigProvider direction="rtl">
      <header className={`header-component ${cssClass}`}>
        <div className="header-right flex-row">
          <img src={headerIcon} className="header__img" alt="site logo" />
        </div>
        <div className="header-left flex-row">
          {isClient && Cookies.get('client') ? (
            <>
              <Button
                className="header-btn btn-login"
                content="المحفظة"
                onClick={() => {
                  history.push('/wallet');
                }}
              />
              <Button
                cssClass="blue-border"
                className="header-btn btn-signup"
                content="خروج"
                onClick={logoutHandler}
              />
            </>
          ) : isAdmin && Cookies.get('admin') ? (
            <>
              <Button
                className="header-btn btn-login"
                content="لوحة التحكم"
                onClick={() => {
                  history.push('/dashboard');
                }}
              />
              <Button
                cssClass="blue-border"
                className="header-btn btn-signup"
                content="خروج"
                onClick={logoutHandler}
              />
            </>
          ) : (
            <>
              <Button
                className="header-btn btn-login"
                content="تسجيل الدخول"
                onClick={() => {
                  if (isAdmin || isClient) {
                    window.location.replace('/login');
                  } else {
                    history.push('/login');
                  }
                }}
              />
              <Button
                cssClass="blue-border"
                className="header-btn btn-signup"
                content="حساب جديد"
                onClick={() => {
                  if (isAdmin || isClient) {
                    window.location.replace('/signup');
                  } else {
                    history.push('/signup');
                  }
                }}
              />
            </>
          )}
        </div>
      </header>
    </ConfigProvider>
  );
};

Header.propTypes = {
  logoutHandler: PropTypes.func.isRequired,
  isClient: PropTypes.bool,
  isAdmin: PropTypes.bool,
  cssClass: PropTypes.string,
};
Header.defaultProps = {
  isClient: false,
  isAdmin: false,
  cssClass: '',
};
export default Header;
