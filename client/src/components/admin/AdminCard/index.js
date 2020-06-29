import React from 'react';
import PropTypes from 'prop-types';
import { ConfigProvider, Card } from 'antd';
import 'antd/dist/antd.css';

import clientsImg from '../../../assets/icons/clients.svg';
import transactionImg from '../../../assets/icons/transactionImg.svg';
import addImg from '../../../assets/icons/addImg.svg';
import './style.css';
// const { Meta } = Card;

const AdminCard = ({
  loading,
  width,
  height,
  type,
  description,
  description1,
}) => {
  let imgSource;
  switch (type) {
    case type === 'add':
      imgSource = addImg;
      break;
    case type === 'clients':
      imgSource = clientsImg;
      break;
    default:
      imgSource = transactionImg;
      break;
  }
  return (
    <Card
      className="container__center"
      hoverable
      loading={loading}
      style={{ width, height }}
    >
      <div className="admin-card--content">
        <img alt="example" src={imgSource} />
        <br />
        <ConfigProvider direction="rtl">
          <p>{description}</p>
          <p>{description1}</p>
        </ConfigProvider>
      </div>
    </Card>
  );
};

AdminCard.propTypes = {
  loading: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
  type: PropTypes.string,
  description: PropTypes.string,
  description1: PropTypes.string,
};

AdminCard.defaultProps = {
  loading: false,
  width: 200,
  height: 'auto',
  type: 'add',
  description: 'إضافة',
  description1: 'الأسعار الحالية',
};
export default AdminCard;
