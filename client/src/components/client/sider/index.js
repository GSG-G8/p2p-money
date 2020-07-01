import React from 'react';
import { Layout, Menu, ConfigProvider } from 'antd';
import PropTypes from 'prop-types';
import { WalletFilled, BankFilled, SettingFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Typography from '../../Common/Typography';

import Wallet from '../../pages/client/Wallet';
import Bank from '../../pages/client/Bank';
import Settings from '../../pages/client/Setting';

import 'antd/dist/antd.css';
import './style.css';

const { Content, Sider } = Layout;
const SiderMenu = ({ ClientData }) => {
  // console.log(ClientData.result[0].clientData);
  const { avatar, fullName } = ClientData.result[0].clientData;
  const routeName = window.location.pathname.split('/')[1];
  return (
    <ConfigProvider direction="rtl">
      <div className="sider-wrapper">
        <Layout dir="rtl">
          <Sider dir="rtl" className="sider-rtl">
            <div className="user-wrapper">
              <img className="sider-logo" src={avatar} alt="user-name" />
              <Typography className="user-title" Content={fullName} />
            </div>
            <Menu theme="light" mode="inline" defaultSelectedKeys={routeName}>
              <Menu.Item key="wallet" icon={<WalletFilled />}>
                <Link to="/wallet" />
                محفظتي
              </Menu.Item>
              <Menu.Item key="bank" icon={<BankFilled />}>
                <Link to="/bank" />
                تفاصيل البنك
              </Menu.Item>
              <Menu.Item key="settings" icon={<SettingFilled />}>
                <Link to="/settings" />
                الإعدادات
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="wrap-layout">
            <Content>
              <div className="wrap-layout__content" />
              {routeName === 'wallet' && <Wallet ClientData={ClientData} />}
              {routeName === 'bank' && <Bank />}
              {routeName === 'settings' && <Settings />}
            </Content>
          </Layout>
        </Layout>
      </div>
    </ConfigProvider>
  );
};

SiderMenu.propTypes = {
  ClientData: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
};

export default SiderMenu;
