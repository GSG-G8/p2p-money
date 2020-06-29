import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Layout, Menu, ConfigProvider } from 'antd';
import { WalletFilled, BankFilled, SettingFilled } from '@ant-design/icons';

const { Content, Sider } = Layout;
const SiderMenu = () => (
  <ConfigProvider direction="rtl">
    <div className="sider-wrapper">
      <Layout dir="rtl">
        <Sider dir="rtl" className="sider-rtl">
          <Menu
            theme="light"
            className="side-menu"
            mode="inline"
            defaultSelectedKeys={['4']}
          >
            <Menu.Item key="1" icon={<WalletFilled />}>
              المحفظة
            </Menu.Item>
            <Menu.Item key="2" icon={<BankFilled />}>
              حساب البنك
            </Menu.Item>
            <Menu.Item key="3" icon={<SettingFilled />}>
              إعدادت
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, textAlign: 'center' }}
            >
              ...
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
