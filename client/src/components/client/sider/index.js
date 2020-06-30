import React from 'react';
import { Layout, Menu, ConfigProvider } from 'antd';
import PropTypes from 'prop-types';
import { WalletFilled, BankFilled, SettingFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Typography from '../../Common/Typography';

import 'antd/dist/antd.css';
import './style.css';

const { Content, Sider } = Layout;
const SiderMenu = ({ content, avatar, userTitle }) => (
  <ConfigProvider direction="rtl">
    <div className="sider-wrapper">
      <Layout dir="rtl">
        <Sider dir="rtl" className="sider-rtl">
          <div className="user-wrapper">
            <img className="sider-logo" src={avatar} alt="user-name" />
            <Typography className="user-title" Content={userTitle} />
          </div>
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={window.location.pathname.split('/')[1]}
          >
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
            {content}
          </Content>
        </Layout>
      </Layout>
    </div>
  </ConfigProvider>
);

SiderMenu.propTypes = {
  content: PropTypes.element.isRequired,
  avatar: PropTypes.string.isRequired,
  userTitle: PropTypes.string.isRequired,
};

export default SiderMenu;
