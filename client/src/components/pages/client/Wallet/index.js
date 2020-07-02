import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import Button from '../../../Common/Button';

import './style.css';

const columns = [
  {
    title: 'المبلغ المحول',
    dataIndex: 'amount',
  },
  {
    title: 'سعر التحويل',
    dataIndex: 'app_price_sell',
  },
  {
    title: 'من',
    dataIndex: 'from',
  },
  {
    title: 'إلى',
    dataIndex: 'to',
  },
  {
    title: 'تاريخ التحويل',
    render: (data) => <>{data.operation_time.split('T')[0]}</>,
  },
  {
    title: 'قيمة التوفير',
    dataIndex: 'app_saved_money',
  },
];

const Wallet = ({ ClientData }) => {
  const history = useHistory();

  const handleClick = () => history.push('/');
  const transactions = ClientData.result[1].exchangeDetail;
  return (
    <>
      <div className="wallet-table">
        <div className="wallet-head">
          <div className="card-balance">
            <div>
              <div className="card-balance__label">المبلغ الحالي</div>
            </div>
            <div className="card-balance__amount">
              {ClientData.result[0].clientData.mainBalance[0].total}$
            </div>
          </div>
          <Button onClick={handleClick} Content="تحويل جديد" />
        </div>
        <div className="wallet-table">
          <Table columns={columns} dataSource={transactions} rowKey="_id" />
        </div>
      </div>
    </>
  );
};

Wallet.propTypes = {
  ClientData: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
};

export default Wallet;
