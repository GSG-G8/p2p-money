/* eslint-disable no-console */
const axios = require('axios');
const pricesModel = require('../../../database/models/prices');

const autoUpdatePrices = () => {
  const FROM = ['USD', 'JOD', 'EUR', 'EGP'];
  const TO = 'ILS';
  const screenPrice = [];
  const bankPrice = [];
  const tellerPrice = [];
  const appPrice = [];
  let promise = Promise.resolve();
  FROM.map(async (from) => {
    promise = axios
      .get(
        `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${from}&to_currency=${TO}&apikey=${process.env.API_KEY}`
      )
      .then(({ data }) => {
        const buy = Number(
          data['Realtime Currency Exchange Rate']['8. Bid Price']
        );
        const sell = Number(
          data['Realtime Currency Exchange Rate']['9. Ask Price']
        );
        screenPrice.push(
          { from, TO, buy, sell },
          { from: TO, TO: from, buy: 1 / buy, sell: 1 / sell }
        );
        bankPrice.push(
          { from, TO, buy: buy - 0.02, sell: sell + 0.03 },
          { from: TO, TO: from, buy: 1 / (buy - 0.02), sell: 1 / (sell + 0.03) }
        );
        tellerPrice.push(
          {
            from,
            TO,
            buy: buy - 0.015,
            sell: sell + 0.025,
          },
          {
            from: TO,
            TO: from,
            buy: 1 / (buy - 0.015),
            sell: 1 / (sell + 0.025),
          }
        );
        appPrice.push(
          { from, TO, buy: buy - 0.005, sell: sell + 0.015 },
          {
            from: TO,
            TO: from,
            buy: 1 / (buy - 0.015),
            sell: 1 / (sell + 0.025),
          }
        );
      })
      .catch(() => {
        console.warn('1- Error request to api');
      });
  });

  promise.then(() => {
    if (screenPrice.length >= 4) {
      pricesModel.updateOne(
        {},
        {
          screenPrice,
          tellerPrice,
          bankPrice,
          appPrice,
        },
        (error) => {
          if (!error)
            console.info(
              ' ******************** \n ** prices Updated ** \n ********************'
            );
          else console.log('Database Error');
        }
      );
    } else {
      console.error('2- Error request to api');
    }
  });
};

module.exports = autoUpdatePrices;
