import React from 'react';
import { Layout, Menu, ConfigProvider } from 'antd';
import {
  WalletFilled,
  BankFilled,
  SettingFilled,
  MoneyCollectFilled,
} from '@ant-design/icons';
import logo from '../../../assets/icons/icon.svg';

import 'antd/dist/antd.css';
import './index.css';

const { Content, Sider } = Layout;
const SiderMenu = () => (
  <ConfigProvider direction="rtl">
    <div className="sider-wrapper">
      <Layout dir="rtl">
        <Sider dir="rtl" className="sider-rtl">
          <div className="sider-logo">
            <img src={logo} alt="logo" /> موني اكستشانج
          </div>
          <Menu theme="light" mode="inline" defaultSelectedKeys={['4']}>
            <Menu.Item key="1" icon={<WalletFilled />}>
              محفظتي
            </Menu.Item>
            <Menu.Item key="2" icon={<BankFilled />}>
              تفاصيل البنك
            </Menu.Item>
            <Menu.Item key="3" icon={<SettingFilled />}>
              الإعدادات
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="wrap-layout">
          <Content>
            <div className="wrap-layout__content">
              <br />
              content
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  </ConfigProvider>
);

export default SiderMenu;
