import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextInput from '../../../Common/TextInput';
import SelectCurrency from '../../../Common/selectCurrency';
import MainCardCurrencies from '../../../client/mainCardCurrencies';
import logo from '../../../../assets/icons/icon.svg';
import ourPriceLogo from '../../../../assets/icons/ourPrice.svg';
import bankPriceLogo from '../../../../assets/icons/bankPrice.svg';
import tellerPriceLogo from '../../../../assets/icons/tellerPrice.svg';
import HomeMap from '../../../../assets/images/HomeMap.svg';
import Button from '../../../Common/Button';
import Footer from '../../../Common/Footer';

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
const Home = () => {
  const [From, setFrom] = useState('USD');
  const [To, setTo] = useState('ILS');
  const [sellBank, setSellBank] = useState();
  const [buyBank, setBuyBank] = useState();
  const [sellTeller, setSellTeller] = useState();
  const [buyTeller, setBuyTeller] = useState();
  const [sellApp, setSellApp] = useState();
  const [buyApp, setBuyApp] = useState();
  const [resultExchange, setResultExchange] = useState(3452.8);
  const [bankResult, setBankResult] = useState(3470.0);
  const [total, setTotal] = useState(1000);

  const addResult = (e) => {
    const elementValue = e.target.value;
    setTotal(elementValue);
  };
  const changeFrom = (value) => {
    setFrom(value);
  };
  const changeTo = (value) => {
    setTo(value);
  };
  useEffect(() => {
    getPrices().then(({ appPrice, bankPrice, tellerPrice }) => {
      appPrice.map(({ from, to, sell, buy }) => {
        if (from === From && to === To) {
          setSellApp(sell.toFixed(2));
          setBuyApp(buy.toFixed(2));
          setResultExchange((total * sell).toFixed(2));
        }
      });

      bankPrice.map(({ from, to, sell, buy }) => {
        if (from === From && to === To) {
          setSellBank(sell.toFixed(2));
          setBuyBank(buy.toFixed(2));
          setBankResult((total * sell).toFixed(2));
        }
      });

      tellerPrice.map(({ from, to, sell, buy }) => {
        if (from === From && to === To) {
          setSellTeller(sell.toFixed(2));
          setBuyTeller(buy.toFixed(2));
        }
      });
    });
  }, [From, To, total]);
  return (
    <div className="home_section">
      <div className="backGround" />
      <MainCardCurrencies
        className="cardStyle"
        Content={
          <>
            <div className="first-section">
              <SelectCurrency onChange={changeFrom} />
              <TextInput
                handleChange={addResult}
                value={total}
                placeholder="من"
                type="number"
              />
              <div className="exchange_section">
                <span> سعر التحويل : </span>
                <span>{sellApp}</span>
              </div>
            </div>
            <div className="second-section">
              <SelectCurrency
                onChange={changeTo}
                valueSelect={From}
                selectType="from"
              />
              <TextInput disabled value={resultExchange} placeholder="إلى" />
              <Button content="حول الآن" cssClass="green exchange_button" />
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
              <img src={tellerPriceLogo} alt="logo" className="sections_logo" />
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
              <span className="prices_title extra_title">عملات إكس</span>
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
                <span className="prices_title prices_title--red ">بيع</span>
              </div>
            </div>
          </div>
        </div>
        <div className="images_section extra_buy" />
        <div className="images_section extra_sell" />
      </div>
      <span className="title_Exchange ">
        .أفضل سعر بيع وشراء, في أي وقت, وأي مكان
      </span>
      <img src={HomeMap} alt="map currency" />
      <Footer />
    </div>
  );
};

export default Home;
