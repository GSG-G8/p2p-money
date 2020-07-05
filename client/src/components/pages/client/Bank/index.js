import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Table } from 'antd';
import PropTypes from 'prop-types';
import axios from 'axios';
import Helmet from 'react-helmet';
import Button from '../../../Common/Button';

import './style.css';

const columns = [
  {
    title: 'اسم البنك',
    dataIndex: 'bankName',
    key: 'bankName',
    sorter: {
      compare: (a, b) => a.amount - b.amount,
    },
  },
  {
    title: 'رقم الحساب',
    dataIndex: 'accountNumber',
    key: 'accountNumber',
    sorter: {
      compare: (a, b) => a.amount - b.amount,
    },
  },
];

const Banks = ({ ClientData }) => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const { bankAccounts } = ClientData;
  const data = bankAccounts.map(({ balance, accountNumber, bankName }, key) => {
    const children = [
      {
        key: (key + 100).toString(),
        bankName: balance[key].type,
        accountNumber: balance[key].total,
      },
    ];
    return {
      children,
      accountNumber,
      bankName,
      key: key.toString(),
    };
  });
  const handleClick = () => history.push('/');

  return (
    <>
      <Helmet>
        <title>حساباتي البنكية</title>
      </Helmet>

      <div className="wallet-table">
        <div className="wallet-head">
          <Button
            content="اضافة حساب بنكي"
            loading={loading}
            onClick={() => {}}
            cssClass="add--bank--btn"
          />
        </div>
        <div className="wallet-table">
          <Table
            columns={columns}
            dataSource={data}
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

export default Banks;
