import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';

import './style.css';

const columns = [
  {
    title: 'المبلغ المحول',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: 'سعر التحويل',
    dataIndex: 'app_price_sell',
    key: 'app_price_sell',
  },
  {
    title: 'من',
    dataIndex: 'from',
    key: 'from',
  },
  {
    title: 'إلى',
    dataIndex: 'to',
    key: 'to',
  },
  {
    title: 'تاريخ التحويل',
    key: 'operation_time',
    render: (data) => <>{data.operation_time.split('T')[0]}</>,
  },
  {
    title: 'قيمة التوفير',
    dataIndex: 'app_saved_money',
    key: 'app_saved_money',
  },
];

function onChange(pagination, filters, sorter, extra) {
  console.log('params', pagination, filters, sorter, extra);
}

const Wallet = ({ ClientData }) => {
  const transactions = ClientData.result[1].exchangeDetail;
  // console.log({ transactions });
  return (
    <>
      <div className="card-balance">
        <div>
          <div className="card-balance__label">المبلغ الحالي</div>
        </div>
        <div>{ClientData.result[0].clientData.mainBalance[0].total}$</div>
      </div>
      <div>
        <Table
          columns={columns}
          dataSource={transactions}
          onChange={onChange}
          rowKey={Math.random()}
        />
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
