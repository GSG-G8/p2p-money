import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Table } from 'antd';
import PropTypes from 'prop-types';
import axios from 'axios';
import Helmet from 'react-helmet';
import Button from '../../../Common/Button';

import './style.css';

const columns = [];

const Banks = ({ ClientData }) => {
  const [loading, setLoading] = useState(false);
  console.log({ ClientData });
  const history = useHistory();

  const { bankAccounts } = ClientData;
  const handleClick = () => history.push('/');

  useEffect(() => {}, []);

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
          {/* <Button onClick={handleClick} Content="اضافة حساب بنكي" /> */}
        </div>
        <div className="wallet-table">
          <Table
            columns={columns}
            dataSource={bankAccounts}
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
