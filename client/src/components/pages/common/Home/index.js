/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Helmet from 'react-helmet';
import { event } from 'react-ga';
import PropTypes from 'prop-types';
import { Modal, ConfigProvider } from 'antd';
import { useHistory } from 'react-router-dom';
import TextInput from '../../../Common/TextInput';
import SelectCurrency from '../../../Common/selectCurrency';
import MainCardCurrencies from '../../../client/mainCardCurrencies';
import logo from '../../../../assets/icons/homeIcon.svg';
import ourPriceLogo from '../../../../assets/icons/ourPrice.svg';
import bankPriceLogo from '../../../../assets/icons/bankPrice.svg';
import tellerPriceLogo from '../../../../assets/icons/tellerPrice.svg';
import HomeMap from '../../../../assets/images/HomeMap.svg';
import Button from '../../../Common/Button';
import Footer from '../../../Common/Footer';
import Alert from '../../../Common/Alert';
import Typography from '../../../Common/Typography';

import './style.css';

const getPrices = async () => {
  const {
    data: { Prices },
  } = await axios.get('/api/v1/prices');
  return Prices;
};
const currencyLogo = {
  USD: '$',
  ILS: '₪',
  JOD: 'JD',
  EUR: '£',
  EGP: 'E£',
};
const Home = ({ MainBalance, isClient }) => {
  const [From, setFrom] = useState('USD');
  const [To, setTo] = useState('ILS');
  const [sellBank, setSellBank] = useState();
  const [buyBank, setBuyBank] = useState();
  const [sellTeller, setSellTeller] = useState();
  const [buyTeller, setBuyTeller] = useState();
  const [sellApp, setSellApp] = useState();
  const [buyApp, setBuyApp] = useState();
  const [resultExchange, setResultExchange] = useState();
  const [bankResult, setBankResult] = useState(3470.0);
  const [amount, setTotal] = useState(1000);
  const [alert, setAlert] = useState();
  const [visible, setVisible] = useState(false);
  const [AppPrice, setAppPrice] = useState([]);
  const [BankPrice, setBankPrice] = useState([]);
  const [TellerPrice, setTellerPrice] = useState([]);
  const history = useHistory();

  const addResult = (e) => {
    const elementValue = e.target.value;
    setTotal(elementValue);
  };
  const changeFrom = ({ target: { value } }) => {
    setFrom(value);
    setTo(value === 'ILS' ? 'USD' : 'ILS');
  };
  const changeTo = ({ target: { value } }) => {
    setTo(value);
  };
  const showModal = () => {
    if (isClient) {
      if (MainBalance[From] && MainBalance[From] >= amount) {
        setVisible(true);
      } else {
        setAlert({
          type: 'error',
          message: `  عذرا لا تملك رصيد كافي لإتمام هذه العملية, رصيدك الحالي هو : ${
            MainBalance[From] ? MainBalance[From].toFixed(4) : 0
          } ${currencyLogo[From]}`,
        });
      }
    } else {
      setVisible(true);
    }
    setTimeout(() => setAlert(false), 5000);
  };
  const handleOk = () => {
    if (isClient) {
      event({
        category: 'Button',
        action: 'تحويل من مستخدم',
      });
      axios.post('/api/v1/transaction', { from: From, to: To, amount });
      window.location.replace('/wallet');
    } else {
      event({
        category: 'Button',
        action: 'تحويل من زائر',
      });
      history.push('/signup');
    }
  };
  const handleCancel = () => {
    setVisible(false);
  };
  useEffect(() => {
    getPrices().then(({ appPrice, bankPrice, tellerPrice }) => {
      setAppPrice(appPrice);
      setBankPrice(bankPrice);
      setTellerPrice(tellerPrice);
      appPrice.map(({ from, to, sell, buy }) => {
        if (from === From && to === To) {
          setSellApp(sell.toFixed(4));
          setBuyApp(buy.toFixed(4));
          setResultExchange((amount * sell).toFixed(4));
        }
      });

      bankPrice.map(({ from, to, sell, buy }) => {
        if (from === From && to === To) {
          setSellBank(sell.toFixed(4));
          setBuyBank(buy.toFixed(4));
          setBankResult((amount * sell).toFixed(4));
        }
      });

      tellerPrice.map(({ from, to, sell, buy }) => {
        if (from === From && to === To) {
          setSellTeller(sell.toFixed(4));
          setBuyTeller(buy.toFixed(4));
        }
      });
    });
  }, []);
  useEffect(() => {
    AppPrice.map(({ from, to, sell, buy }) => {
      if (from === From && to === To) {
        setSellApp(sell.toFixed(4));
        setBuyApp(buy.toFixed(4));
        setResultExchange((amount * sell).toFixed(4));
      }
    });

    BankPrice.map(({ from, to, sell, buy }) => {
      if (from === From && to === To) {
        setSellBank(sell.toFixed(4));
        setBuyBank(buy.toFixed(4));
        setBankResult((amount * sell).toFixed(4));
      }
    });

    TellerPrice.map(({ from, to, sell, buy }) => {
      if (from === From && to === To) {
        setSellTeller(sell.toFixed(4));
        setBuyTeller(buy.toFixed(4));
      }
    });
  }, [From, To, amount]);
  return (
    <>
      <Helmet>
        <title>الصفحة الرئيسية</title>
      </Helmet>
      {alert && (
        <>
          <Alert
            type={alert.type}
            message={alert.message}
            className="Home__alert"
          />
        </>
      )}
      <div className="home_section">
        <Typography
          Content="أفضل سعر بيع وشراء، في أي وقت، وأي مكان"
          className="Home_typography"
          level={3}
          type="title"
        />
        <Typography
          Content="بدون أي عمولة أو ضريبة ."
          className="Home_typography extra_typo"
          level={3}
          type="title"
        />
        <ConfigProvider direction="rtl">
          {MainBalance[From] && MainBalance[From] >= amount && (
            <Modal
              title="تحويل المال"
              visible={visible}
              onOk={handleOk}
              onCancel={handleCancel}
              okText="متابعة"
              cancelText="إلغاء"
            >
              سيتم تحويل مبلغ: {amount}
              {currencyLogo[From]}
              إلى
              {resultExchange}
              {currencyLogo[To]}
              <p> هل أنت متأكد من العملية ؟</p>
            </Modal>
          )}
          {!isClient && (
            <Modal
              title="تحويل المال"
              visible={visible}
              onOk={handleOk}
              onCancel={handleCancel}
              okText="التسجيل الآن"
              cancelText="إلغاء"
            >
              <p>يجب عليك إنشاء حساب لتتمكن من تحويل العملات بكل سهولة</p>
              <p>في أقل من دقيقة ستتمكن من إنشاء حساب جديد</p>
              <p>التسجيل مجاني و بدون رسوم </p>
              <p>سجل الآن</p>
            </Modal>
          )}
        </ConfigProvider>
        <div className="backGround" />
        <MainCardCurrencies
          className="cardStyle"
          Content={
            <>
              <div className="first-section">
                <SelectCurrency onChange={changeFrom} selectType="from" />
                <TextInput
                  handleChange={addResult}
                  value={amount}
                  placeholder="من"
                  type="number"
                />
                <div className="exchange_section">
                  <span> سعر التحويل : </span>
                  <span>{sellApp}</span>
                </div>
              </div>
              <div className="second-section">
                <SelectCurrency onChange={changeTo} valueSelect={From} />
                <TextInput disabled value={resultExchange} placeholder="إلى" />
                <Button
                  content="حول الآن"
                  cssClass="green exchange_button"
                  onClick={showModal}
                />
                <div className="exchange_section">
                  <span> أنت تحصل على : </span>
                  <span className=" prices_title--orange">
                    {currencyLogo[To]}
                    {(bankResult - resultExchange).toFixed(2)}
                  </span>
                  <span> أكثر </span>
                </div>
              </div>
            </>
          }
        />

        <div className="container_card_Prices">
          <span className="title_Exchange currency_prices">
            أسعار صرف العملات
          </span>
          <div className="image_title_section">
            <div className="images_section">
              <div className="name_prices">
                <img src={bankPriceLogo} alt="logo" className="sections_logo" />
                <span className="prices_title">البنك</span>
                <div className="extra_prices">
                  <span className="prices_title">
                    {currencyLogo[To]} {buyBank}
                  </span>
                  <span className="prices_title">
                    {currencyLogo[To]} {sellBank}
                  </span>
                </div>
              </div>
              <div className="name_prices">
                <img
                  src={tellerPriceLogo}
                  alt="logo"
                  className="sections_logo"
                />
                <span className="prices_title extra_title">الصراف</span>
                <div className="extra_prices">
                  <span className="prices_title">
                    {currencyLogo[To]} {buyTeller}
                  </span>
                  <span className="prices_title">
                    {currencyLogo[To]} {sellTeller}
                  </span>
                </div>
              </div>
              <div className="name_prices">
                <img src={ourPriceLogo} alt="logo" className="sections_logo" />
                <span className="prices_title extra_title">X عُملات </span>
                <div className="extra_prices">
                  <span className="prices_title prices_title--green ">
                    {currencyLogo[To]} {buyApp}
                  </span>
                  <span className="prices_title prices_title--red ">
                    {currencyLogo[To]} {sellApp}
                  </span>
                </div>
              </div>
              <div className="name_prices">
                <img src={logo} alt="logo" className="prices_logo" />
                <div className="extra_prices">
                  <span className="prices_title prices_title--green">شراء</span>
                  <span className="prices_title prices_title--red ">
                    بيـــع
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="images_section extra_buy" />
          <div className="images_section extra_sell" />
        </div>
        <span className="title_Exchange ">
          .أفضل سعر بيع وشراء، في أي وقت، وأي مكان
        </span>
        <img src={HomeMap} alt="map currency" />
        <Footer />
      </div>
    </>
  );
};
Home.propTypes = {
  MainBalance: PropTypes.objectOf(PropTypes.number).isRequired,
  isClient: PropTypes.bool.isRequired,
};

export default Home;
