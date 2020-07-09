import React from 'react';
import PropTypes from 'prop-types';
import { ConfigProvider, Card } from 'antd';
import 'antd/dist/antd.css';

import clientsImg from '../../../assets/icons/clients.svg';
import transactionImg from '../../../assets/icons/transactionImg.svg';
import addImg from '../../../assets/icons/addImg.svg';

import './style.css';

const AdminCard = ({ loading, type, title, description, onClick }) => {
  let imgSource;
  switch (type) {
    case 'transaction':
      imgSource = transactionImg;
      break;
    case 'clients':
      imgSource = clientsImg;
      break;
    default:
      imgSource = addImg;
      break;
  }
  return (
    <Card
      onClick={onClick}
      className="admin-card-container"
      hoverable
      loading={loading}
    >
      <div className="admin-card__content">
        <img
          className="admin-card__img"
          alt="admin-dashboard-icon"
          src={imgSource}
        />
        <ConfigProvider direction="rtl">
          <p className="admin-card__paragraph">{title}</p>
          <p>{description}</p>
        </ConfigProvider>
      </div>
    </Card>
  );
};

AdminCard.propTypes = {
  loading: PropTypes.bool,
  type: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  onClick: PropTypes.func,
};

AdminCard.defaultProps = {
  loading: false,
  type: 'add', // another option is 'clients' and 'transaction' to change the icon
  title: 'إضافة',
  description: 'الأسعار الحالية',
  onClick: () => {},
};
export default AdminCard;
