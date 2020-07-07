import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import CardBox from '../../../admin/AdminCard';
import Charts from '../../../admin/Chart';
import ClientCard from '../../../admin/clientsCard';

import './style.css';

const Dashboard = ({ Clients, Transactions }) => {
  const [LogMobile, setMobile] = useState(true);

  return (
    <div className="dashboard__page">
      <Helmet>
        <title>لوحة التحكم</title>
      </Helmet>
      <div className="dashboard__head__card">
        <CardBox type="transaction" title="بسيبسيب" description="بسيب" />
        <CardBox type="clients" title="بسي" description="سبيب" />
        <CardBox title=""   title="تعــديل" description="الاســعار" />
      </div>
      {/* <Charts /> */}
    </div>
  );
};

Dashboard.propTypes = {
  Clients: PropTypes.arrayOf(PropTypes.object).isRequired,
  Transactions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Dashboard;
