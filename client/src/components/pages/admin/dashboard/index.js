import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Calendar, ConfigProvider, Card } from 'antd';
import CardBox from '../../../admin/AdminCard';
import Charts from '../../../admin/Chart';
import ClientCard from '../../../admin/clientsCard';
import UpdatePriceModal from './updatePrice';
import './style.css';

const Dashboard = ({ Clients, Transactions }) => {
  const [updatePriceModal, setUpdateModal] = useState(false);
  return (
    <ConfigProvider direction="rtl">
      <div className="dashboard">
        <div className="dashboard__page">
          <Helmet>
            <title>لوحة التحكم</title>
          </Helmet>
          <div className="dashboard__head__card">
            <CardBox
              type="transaction"
              title="العمليات "
              description={Transactions.length}
            />
            <CardBox
              type="clients"
              title="عمـلاء"
              description={Clients.data.count}
            />
            <CardBox
              onClick={() => setUpdateModal(true)}
              title="تعــديل"
              description="الاســعار"
            />
          </div>
          <div className="dashboard__content">
            <div className="dashboard__charts">
              <Charts />
            </div>
            <div className="dashboard__elements">
              <div>
                <Card className="dashboard__calendar" hoverable>
                  <Calendar fullscreen={false} />
                </Card>
              </div>
              <div className="dashboard__clients">
                <Card hoverable>
                  <p> آخــر الــزوار</p>
                  <hr className="dashboard__line" />
                  <ClientCard />
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
      {updatePriceModal && (
        <UpdatePriceModal
          visible={updatePriceModal}
          handleHide={setUpdateModal}
        />
      )}
    </ConfigProvider>
  );
};

Dashboard.propTypes = {
  Clients: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
  Transactions: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
};

export default Dashboard;
