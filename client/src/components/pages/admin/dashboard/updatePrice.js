import React, { useState, useEffect } from 'react';
import { Modal, ConfigProvider } from 'antd';
import axios from 'axios';
import PropTypes from 'prop-types';
import Select from '../../../Common/selectCurrency';
import InputText from '../../../Common/TextInput';
import Text from '../../../Common/Typography';
import Alert from '../../../Common/Alert';
import './style.css';

const getPrices = async () => {
  const { data: Prices } = await axios.get('/api/v1/prices');
  return Prices.Prices;
};

const UpdatePriceForm = ({ visible, handleHide }) => {
  const [exchangePrice, setPrices] = useState(0);
  const [alert, setAlert] = useState({
    type: 'warning',
    message: 'تاكد من البيانات قبل التعديل',
  });
  const [From, setFrom] = useState('USD');
  const [To, setTo] = useState('ILS');
  const {
    appPrice,
    tellerPrice,
    bankPrice,
    screenPrice,
    lastUpdate,
  } = exchangePrice;

  useEffect(() => {
    if (alert) setTimeout(() => setAlert(), 5000);
    if (!exchangePrice) getPrices().then(setPrices);
  }, [exchangePrice, alert]);

  // get values to input text
  const getPriceData = (array, from, to, cases) =>
    array
      .map((element) =>
        element.from === from && element.to === to
          ? Number(element[cases]).toFixed(3)
          : 0
      )
      .filter((e) => e !== 0);

  // change state for text input
  const setValues = (array, from, to, cases, value) => {
    exchangePrice[array].map((price, index) => {
      if (price.from === from && price.to === to) {
        exchangePrice[array][index][cases] = Number(value);
      }
      return 0;
    });
    setPrices({ [array]: exchangePrice[array], ...exchangePrice });
  };

  const updatePrices = () => {
    axios
      .patch('/api/v1/admin/update', exchangePrice)
      .then(() =>
        setAlert({ type: 'success', message: 'تم تعديل الاسعار بنجاح' })
      )
      .catch(() =>
        setAlert({
          type: 'error',
          message: 'لم يتم تحديث الاسعار تاكد من البيانات',
        })
      );
  };

  const changeFrom = ({ target: { value } }) => {
    setFrom(value);
    setTo(value === 'ILS' ? 'USD' : 'ILS');
  };
  const changeTo = ({ target: { value } }) => {
    setTo(value);
  };

  return (
    <ConfigProvider direction="rtl">
      {exchangePrice && (
        <Modal
          title="تعــديل الاســعار"
          width="40rem"
          visible={visible}
          onOk={() => updatePrices()}
          onCancel={() => handleHide(false)}
          okText="تعــديل"
          cancelText="الــغاء"
        >
          {alert && (
            <Alert
              closable={false}
              className="price_alert"
              message={alert.message}
              type={alert.type}
            />
          )}
          <div className="update__content extra ">
            <Select selectType="from" onChange={changeFrom} />
            <div className="arrow-circle" />
            <Select valueSelect={From} onChange={changeTo} />
            <Text className="update__text" Content="" />
          </div>
          <div className="update__content less">
            <Text className="update__text" Content="سعر الشاشة" />
            <Text className="update__text" Content="سعر البنك" />
            <Text className="update__text" Content="سعر الصرافين" />
            <Text className="update__text" Content="سعر عملات X" />
          </div>
          <div className="update__content">
            <InputText
              type="number"
              className="update__input"
              value={getPriceData(screenPrice, From, To, 'buy')}
              handleChange={() => {}}
              disabled
            />
            <InputText
              type="number"
              handleChange={({ target: { value } }) =>
                setValues('bankPrice', From, To, 'buy', value)
              }
              value={getPriceData(bankPrice, From, To, 'buy')}
              className="update__input"
            />
            <InputText
              type="number"
              className="update__input"
              value={getPriceData(tellerPrice, From, To, 'buy')}
              handleChange={({ target: { value } }) =>
                setValues('tellerPrice', From, To, 'buy', value)
              }
            />
            <InputText
              type="number"
              className="update__input"
              value={getPriceData(appPrice, From, To, 'buy')}
              handleChange={({ target: { value } }) =>
                setValues('appPrice', From, To, 'buy', value)
              }
            />
            <Text className="update__text" Content="سعر الشراء" />
          </div>
          <div className="update__content">
            <InputText
              type="number"
              className="update__input"
              value={getPriceData(screenPrice, From, To, 'sell')}
              handleChange={() => {}}
              disabled
            />
            <InputText
              type="number"
              className="update__input"
              value={getPriceData(bankPrice, From, To, 'sell')}
              handleChange={({ target: { value } }) =>
                setValues('bankPrice', From, To, 'sell', value)
              }
            />
            <InputText
              type="number"
              className="update__input"
              value={getPriceData(tellerPrice, From, To, 'sell')}
              handleChange={({ target: { value } }) =>
                setValues('tellerPrice', From, To, 'sell', value)
              }
            />
            <InputText
              type="number"
              className="update__input"
              value={getPriceData(appPrice, From, To, 'sell')}
              handleChange={({ target: { value } }) =>
                setValues('appPrice', From, To, 'sell', value)
              }
            />

            <Text className="update__text" Content="سعـر البيـــع" />
          </div>
          <Text
            className="update__date"
            Content={`آخر تعديل ${lastUpdate.split('T')[0]} الساعة  ${
              lastUpdate.split('T')[1]
            }  `}
          />
        </Modal>
      )}
    </ConfigProvider>
  );
};

UpdatePriceForm.propTypes = {
  visible: PropTypes.bool.isRequired,
  handleHide: PropTypes.func.isRequired,
};

export default UpdatePriceForm;
