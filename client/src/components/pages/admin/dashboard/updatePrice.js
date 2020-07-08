import React, { useState, useEffect } from 'react';
import { Modal, ConfigProvider } from 'antd';
import axios from 'axios';
import PropTypes from 'prop-types';
import Select from '../../../Common/selectCurrency';
import InputText from '../../../Common/TextInput';
import Text from '../../../Common/Typography';
import './style.css';

const getPrices = async () => {
  const { data: Prices } = await axios.get('/api/v1/prices');
  console.log(Prices.Prices);
  return Prices.Prices;
};

const getPriceData = (array, from, to, cases) =>
  array
    .map((element) =>
      element.from === from && element.to === to
        ? Number(element[cases]).toFixed(3)
        : 0
    )
    .filter((e) => e !== 0);

const UpdatePriceForm = ({ visible, handleHide }) => {
  const [exchangePrice, setPrices] = useState(0);
  const [alert, setAlert] = useState();
  const [From, setFrom] = useState('USD');
  const [To, setTo] = useState('ILS');
  console.log(exchangePrice);
  const {
    appPrice,
    tellerPrice,
    bankPrice,
    lastUpdate,
    screenPrice,
  } = exchangePrice;
  useEffect(() => {
    if (!exchangePrice)
      getPrices()
        .then(setPrices)
        .catch(
          setAlert({
            type: 'warning',
            message: 'حدثت مشكلة تاكد من اتصالك بقاعدة البيانات',
          })
        );
  }, [exchangePrice]);

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
          onOk={() => {}}
          onCancel={() => handleHide(false)}
          okText="تعــديل"
          cancelText="الــغاء"
        >
          <div className="update__content">
            <Text className="update__text" Content="مـن" />
            <Select selectType="from" onChange={changeFrom} />
            <Text className="update__text" Content="الى" />
            <Select valueSelect={From} onChange={changeTo} />
          </div>

          <div className="update__content">
            <Text className="update__text" Content="سعر البنك" />
            <Text className="update__text" Content="سعر الصرافين" />
            <Text className="update__text" Content="سعر عملات X" />
            <Text
              className="update__text_rate"
              Content={` شراء${getPriceData(screenPrice, From, To, 'buy')}`}
            />
            <Text
              className="update__text_rate"
              Content={` بيع${getPriceData(screenPrice, From, To, 'sell')}`}
            />
          </div>
          <div className="update__content">
            <InputText
              // type="number"
              // handleChange={(e)=>setBuyBank()}
              value={getPriceData(bankPrice, From, To, 'buy')}
              className="update__input"
            />
            <InputText
              className="update__input"
              value={getPriceData(tellerPrice, From, To, 'buy')}
            />
            <InputText
              className="update__input"
              value={getPriceData(appPrice, From, To, 'buy')}
            />
            <Text className="update__text" Content="سعر الشراء" />
          </div>
          <div className="update__content">
            <InputText
              className="update__input"
              value={getPriceData(bankPrice, From, To, 'sell')}
            />
            <InputText
              className="update__input"
              value={getPriceData(tellerPrice, From, To, 'sell')}
            />
            <InputText
              className="update__input"
              value={getPriceData(appPrice, From, To, 'sell')}
            />
            <Text className="update__text" Content="سعـر البيـــع" />
          </div>
          <Text
            Content={`آخر تعديل ${lastUpdate.split('T')[0]} الساعة  ${
              lastUpdate.split('T')[1]
            }  `}
          />
        </Modal>
      )}
    </ConfigProvider>
  );
};

export default UpdatePriceForm;
