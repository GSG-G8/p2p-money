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
  bankAccounts.map(({ balance = {}, accountNumber, bankName }, key) => {
    const children = [];
    Object.keys(balance).map((el, index) =>
      children.push({
        key: (key + 1000).toString() + (index + 1),
        bankName: (
          <span className="insideTable">{` ${arabicCurrency[el]}`}</span>
        ),
        accountNumber: (
          <span className="insideTable">
            {` ${balance[el].toFixed(3)} ${currencyLogo[el]}`}
          </span>
        ),
      })
    );
    return {
      accountNumber,
      bankName,
      children,
      key: (key + 1).toString(),
    };
  });

const Banks = ({ ClientData }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [showModal, setShowModel] = useState(false);
  const [accountNumber, setAccountNumber] = useState();
  const [bankName, setBankName] = useState('بنك فلسطين');
  const [alert, setAlert] = useState();

  const { bankAccounts } = ClientData;
  useEffect(() => {
    if (!data) setData(getData(bankAccounts));
  }, [data, bankAccounts]);
  const handleDelete = (bankAccount) => {
    axios
      .put('/api/v1/client/bank', { accountNumber: bankAccount })
      .then((responseData) => {
        setAlert({
          type: 'success',
          message: 'تم حذف حسابك البنكي بنجاح !',
        });
        setData(getData(responseData.data.data));
      })
      .catch(() => {
        setAlert({
          type: 'error',
          message: 'عذرا ، لم يتم حذف حسابك البنكي',
        });
      });
    setLoading(false);
  };

  const columns = [
    {
      title: 'اسم البنك',
      dataIndex: 'bankName',
      key: 'bankName',
      width: '50%',
      sorter: {
        compare: (a, b) => a.bankName - b.bankName,
      },
    },
    {
      title: 'رقم الحساب',
      dataIndex: 'accountNumber',
      key: 'accountNumber',
      sorter: {
        compare: (a, b) => a.accountNumber - b.accountNumber,
      },
    },
    {
      title: '',
      dataIndex: 'operation',
      render: (text, record) => {
        if (record.key < 1000)
          return (
            <Popconfirm
              title="هل انت متاكد من حذف الحساب?"
              okText="موافق"
              cancelText="الغاء"
              onConfirm={() => handleDelete(record.accountNumber)}
            >
              <Button content="حذف" cssClass="delete--bank--btn" />
            </Popconfirm>
          );
      },
    },
  ];

  const addBank = () => {
    if (!accountNumber || accountNumber < 0) {
      setAlert({
        type: 'warning',
        message: 'عذرا ، لن يتم اضافة حسابك الجديد تأكد من رقم الحساب',
      });
      setLoading(false);
    } else {
      axios
        .post('/api/v1/client/bank', {
          bankName,
          accountNumber,
          balance: { USD: 200, ILS: 200 },
        })
        .then((responseData) => {
          setAlert({
            type: 'success',
            message: 'تم إضافة حساب بنكي جديد بنجاح !',
          });
          setData(getData(responseData.data.data));
        })
        .catch(() => {
          setAlert({
            type: 'warning',
            message: 'عذرا ، لن يتم اضافة حسابك الجديد تاكد من رقم الحساب',
          });
        });
    }
    setShowModel(false);
    setAccountNumber();
    setLoading(false);
  };

  return (
    <>
      <Helmet>
        <title>حساباتي البنكية</title>
      </Helmet>
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          className="wallet_alert"
        />
      )}

      <div className="wallet-table">
        <div className="wallet-head" />
        <Button
          content="إضافة حساب بنكي"
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
            pagination={{
              defaultCurrent: 1,
              defaultPageSize: 6,
            }}
            loading={loading}
          />
        </div>
      </div>
      <Modal
        className="addBankModel"
        title="إضافة حساب بنك جديد"
        visible={showModal}
        onOk={addBank}
        onCancel={() => {
          setLoading(false);
          setShowModel(false);
        }}
        okText="اضافـة"
        cancelText="إلغـاء"
      >
        <div className="bankName">
          <SelectBox
            placeholder=" اختر العملة "
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

Banks.propTypes = {
  ClientData: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
};

export default Banks;
