import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Table } from 'antd';
import PropTypes from 'prop-types';
import Axios from 'axios';
import Helmet from 'react-helmet';
import Button from '../../../Common/Button';

import './style.css';

const columns = [
  {
    title: 'المبلغ المحول',
    dataIndex: 'amount',
    key: 'amount',
    sorter: {
      compare: (a, b) => a.amount - b.amount,
    },
  },
  {
    title: 'سعر التحويل',
    dataIndex: 'app_price_sell',
    key: 'app_price_sell',
    sorter: {
      compare: (a, b) => a.app_price_sell - b.app_price_sell,
    },
  },
  {
    title: 'من',
    dataIndex: 'from',
    key: 'from',

    filters: [
      { text: 'USD', value: 'USD' },
      { text: 'ILS', value: 'ILS' },
      { text: 'JOD', value: 'JOD' },
      { text: 'EUR', value: 'EUR' },
      { text: 'EGP', value: 'EGP' },
    ],
    onFilter: (value, record) => record.from.indexOf(value) === 0,
  },
  {
    title: 'إلى',
    dataIndex: 'to',
    key: 'to',
    filters: [
      { text: 'USD', value: 'ILS' },
      { text: 'ILS', value: 'USD' },
      { text: 'JOD', value: 'JOD' },
      { text: 'EUR', value: 'EUR' },
      { text: 'EGP', value: 'EGP' },
    ],
    onFilter: (value, record) => record.from.indexOf(value) === 0,
  },
  {
    title: 'تاريخ التحويل',
    dataIndex: 'operation_time',
    key: 'operation_time',
    sorter: {
      compare: (a, b) =>
        new Date(a.operation_time) - new Date(b.operation_time),
    },
  },
  {
    title: 'قيمة التوفير',
    dataIndex: 'app_saved_money',
    key: 'app_saved_money',
    sorter: {
      compare: (a, b) => a.app_saved_money - b.app_saved_money,
    },
  },
];

const getTransactions = async () => {
  const { data } = await Axios.get('/api/v1/transaction');
  return data;
};

const Wallet = ({ ClientData }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const { total } = ClientData.mainBalance[0];
  const handleClick = () => history.push('/');

  useEffect(() => {
    setLoading(true);
    getTransactions().then((rows) => {
      setTransactions(
        rows.result[1].exchangeDetail.map((obj) => ({
          ...obj,
          operation_time: obj.operation_time.split('T')[0],
        }))
      );
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>Wallet</title>
      </Helmet>
      <div className="wallet-table">
        <div className="wallet-head">
          <div className="card-balance">
            <div>
              <div className="card-balance__label">المبلغ الحالي</div>
            </div>
            <div className="card-balance__amount">{total}$</div>
          </div>
          <Button onClick={() => handleClick} Content="تحويل جديد" />
        </div>
        <div className="wallet-table">
          <Table
            columns={columns}
            dataSource={transactions}
            rowKey="_id"
            pagination={{
              defaultCurrent: 1,
              defaultPageSize: 5,
            }}
            loading={loading}
          />
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
