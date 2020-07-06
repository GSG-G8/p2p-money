import React, { useEffect, useState } from 'react';
import { Table, Modal, Popconfirm } from 'antd';
import PropTypes from 'prop-types';
import axios from 'axios';
import Helmet from 'react-helmet';
import Currency from './arabicCurrency';
import Button from '../../../Common/Button';
import InputText from '../../../Common/TextInput';
import SelectBox from '../../../Common/selectBox';
import Alert from '../../../Common/Alert';
import './style.css';

const { currencyLogo, arabicCurrency } = Currency;

const getData = (bankAccounts) =>
  bankAccounts.map(({ balance, accountNumber, bankName }, key) => {
    const children = [];
    Object.keys(balance).map((el, index) => {
      children.push({
        key: (key + 1).toString() + index + 1,
        bankName: (
          <span className="insideTable">{` ${arabicCurrency[el]}`}</span>
        ),
        accountNumber: (
          <span className="insideTable">
            {` ${balance[el]} ${currencyLogo[el]}`}
          </span>
        ),
      });
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
  const [showModal, setShowModel] = useState(false);
  const [accountNumber, setAccountNumber] = useState();
  const [bankName, setBankName] = useState('بنك فلسطين');
  const [alert, setAlert] = useState(false);
  const [success, setSuccess] = useState(false);

  const { bankAccounts } = ClientData;
  useEffect(() => {
    if (!data) setData(getData(bankAccounts));
  });

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
    {
      title: 'حذف',
      dataIndex: 'operation',
      render: (text, record) => (
        <Popconfirm
          title="هل انت متاكد من حذف الحساب?"
          onConfirm={() => handleDelete(record.key)}
        >
          <a>حذف الحساب</a>
        </Popconfirm>
      ),
    },
  ];

  const handleDelete = () => {};
  const addBank = () => {
    if (!accountNumber || accountNumber < 0) {
      setAlert(true);
      setLoading(false);
    } else {
      setShowModel(false);
      axios
        .post('/api/v1/client/bank', {
          bankName,
          accountNumber,
          balance: {
            ILS: 200,
          },
        })
        .then((responseData) => {
          setSuccess(true);
          setAlert(false);
          setBankName('');
          setAccountNumber(0);
          setData(responseData.ata.data.bankAccounts);
        })
        .catch(() => {
          setAlert(true);
          setBankName('');
          setAccountNumber(0);
        });
    }
    setLoading(false);
  };

  return (
    <>
      <Helmet>
        <title>حساباتي البنكية</title>
      </Helmet>
      {alert && (
        <Alert
          className="wallet_alert"
          type="warning"
          message="عذرا , لن يتم اضافة حسابك الجديد تاكد من رقم الحساب"
        />
      )}
      {success && (
        <Alert
          className="wallet_alert"
          message="تم اضافة حساب البنكي الجديد بنجاح"
        />
      )}
      <div className="wallet-table">
        <div className="wallet-head" />
        <Button
          content="اضافة حساب بنكي"
          loading={loading}
          onClick={() => {
            setLoading(true);
            setShowModel(true);
          }}
          cssClass="add--bank--btn"
        />
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
      <Modal
        className="addBankModel"
        title="اضافة حساب بنك جديد"
        visible={showModal}
        onOk={addBank}
        onCancel={() => setShowModel(false)}
        okText="اضافـة"
        cancelText="إلغـاء"
      >
        <div className="bankName">
          <SelectBox
            defaultValue="بنك فلسطين"
            elements={['بنك فلسطين', 'بنك الإسكان', 'بنك القدس']}
            value={bankName}
            onChange={(value) => setBankName(value)}
            className="form--input--bank"
          />
          <InputText
            type="number"
            placeholder="رقم الحساب"
            value={accountNumber}
            handleChange={({ target: { value } }) => setAccountNumber(value)}
            className="form--input--bank"
          />
        </div>
      </Modal>
    </>
  );
};

export default Banks;
