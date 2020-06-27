const axios = require('axios');
const pricesModel = require('../../../database/models/prices');

const autoUpdatePrices = (req, res) => {
  setInterval(async () => {
    const FROM = ['USD', 'JOD', 'EUR', 'EGP'];
    const TO = 'ILS';
    const screenPrice = [];
    const bankPrice = [];
    const tellerPrice = [];
    const appPrice = [];
    try {
      FROM.map(async (from) => {
        const { data } = await axios.get(
          `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${from}&to_currency=${TO}&apikey=${process.env.API_KEY}`
        );
        const buy = data['Realtime Currency Exchange Rate']['8. Bid Price'];
        const sell = data['Realtime Currency Exchange Rate']['9. Ask Price'];
        screenPrice.push({
          from,
          to: TO,
          buy: Number(buy),
          sell: Number(sell),
        });
        screenPrice.push({
          from: TO,
          to: from,
          buy: 1 / Number(buy),
          sell: 1 / Number(sell),
        });
      });
      setTimeout(async () => {
        // add bank price
        screenPrice.map(({ from, to, buy, sell }) => {
          bankPrice.push({ from, to, buy: buy - 0.02, sell: sell + 0.03 });
        });
        // add teller price
        screenPrice.map(({ from, to, buy, sell }) => {
          tellerPrice.push({ from, to, buy: buy - 0.015, sell: sell + 0.025 });
        });
        // add app price
        screenPrice.map(({ from, to, buy, sell }) => {
          appPrice.push({ from, to, buy: buy - 0.005, sell: sell + 0.015 });
        });
        if (screenPrice.length >= 4) {
          await pricesModel.updateOne(
            {},
            {
              screenPrice,
              tellerPrice,
              bankPrice,
              appPrice,
            }
          );
          // eslint-disable-next-line no-console
          console.log('prices Updated');
        } else {
          // eslint-disable-next-line no-console
          console.log('Error request to api');
        }
      }, 8000);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }, 175000);
};

module.exports = autoUpdatePrices;
