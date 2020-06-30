import React from 'react';
import PropTypes from 'prop-types';
import { ConfigProvider, Card } from 'antd';
import 'antd/dist/antd.css';

import clientsImg from '../../../assets/icons/clients.svg';
import transactionImg from '../../../assets/icons/transactionImg.svg';
import addImg from '../../../assets/icons/addImg.svg';

import './style.css';

const AdminCard = ({ loading, type, description, description1 }) => {
  let imgSource;
  switch (type) {
    case type === 'transaction':
      imgSource = transactionImg;
      break;
    case type === 'clients':
      imgSource = clientsImg;
      break;
    default:
      imgSource = addImg;
      break;
  }
  return (
    <Card className="admin-card-container" hoverable loading={loading}>
      <div className="admin-card--content">
        <img
          className="admin-card--img"
          alt="admin-dashboard-icon"
          src={imgSource}
        />
        <ConfigProvider direction="rtl">
          <p className="admin-card--paragraph">{description}</p>
          <p>{description1}</p>
        </ConfigProvider>
      </div>
    </Card>
  );
};

AdminCard.propTypes = {
  loading: PropTypes.bool,
  type: PropTypes.string,
  description: PropTypes.string,
  description1: PropTypes.string,
};

AdminCard.defaultProps = {
  loading: false,
  type: 'add', // another option is 'clients' and 'transaction' to change the icon
  description: 'إضافة',
  description1: 'الأسعار الحالية',
};
export default AdminCard;
