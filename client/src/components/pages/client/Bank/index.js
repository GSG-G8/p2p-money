import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Table } from 'antd';
import PropTypes from 'prop-types';
import axios from 'axios';
import Helmet from 'react-helmet';
import Currency from './arabicCurrency';
import Button from '../../../Common/Button';

import './style.css';
import { object } from 'yup';

const { currencyLogo, arabicCurrency } = Currency;
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

const getData = (bankAccounts) =>
  bankAccounts.map(({ balance, accountNumber, bankName }, key) => {
    const children = [];
    Object.keys(balance).map((el, index) => {
      children.push({
        key: (index * 100).toString(),
        bankName: (
          <span className="insideTable">{` ${arabicCurrency[el]}`}</span>
        ),

        accountNumber: (
          <span className="insideTable">
            {` ${balance[el]} ${currencyLogo[el]}`}
          </span>
        ),
      });

      //   <span className="insideTable">{` ${arabicCurrency[]}`}</span>
      //
    });
    return {
      children,
      accountNumber,
      bankName,
      key: key.toString(),
    };
  });

const Banks = ({ ClientData }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const history = useHistory();

  const { bankAccounts } = ClientData;
  console.log(bankAccounts);
  useEffect(() => {
    if (!data) setData(getData(bankAccounts));
  });

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

Banks.propTypes = {
  ClientData: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
};

export default Banks;
