const axios = require('axios');
const pricesModel = require('../../../database/models/prices');

const autoUpdatePrices = (req, res) => {
  setInterval(async () => {
    const FROM = ['USD', 'JOD', 'EUR', 'ILS'];
    const TO = ['ILS', 'USD', 'JOD'];
    const screenPrice = [];
    const bankPrice = [];
    const tellerPrice = [];
    const appPrice = [];
    try {
      await FROM.map(async (from, index) => {
        if (from !== 'ILS') {
          const { data } = await axios.get(
            `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${from}&to_currency=${TO[0]}&apikey=GS9SWZG9ZH5K4VB7`
          );
          const buy = data['Realtime Currency Exchange Rate']['8. Bid Price'];
          const sell = data['Realtime Currency Exchange Rate']['9. Ask Price'];
          screenPrice.push({
            from,
            to: TO[0],
            buy: Number(buy),
            sell: Number(sell),
          });
        } else {
          TO.map(async (element) => {
            if (element !== 'ILS') {
              const { data } = await axios.get(
                `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${from}&to_currency=${element}&apikey=5Y9QH6FOSXB7OQ5O`
              );
              const buy =
                data['Realtime Currency Exchange Rate']['8. Bid Price'];
              const sell =
                data['Realtime Currency Exchange Rate']['9. Ask Price'];
              screenPrice.push({
                from,
                to: element,
                buy: Number(buy),
                sell: Number(sell),
              });
            }
          });
        }
      });
      await setTimeout(async () => {
        // add bank price
        await screenPrice.map(async (element) => {
          element.buy -= 0.02;
          element.sell += 0.03;
          bankPrice.push(element);
        });
        // add teller price
        await screenPrice.map(async (element) => {
          element.buy -= 0.015;
          element.sell += 0.025;
          tellerPrice.push(element);
        });
        // add app price
        await screenPrice.map(async (element) => {
          element.buy -= 0.005;
          element.sell += 0.015;
          appPrice.push(element);
        });

        const price = await pricesModel.updateOne(
          {},
          {
            screenPrice,
            tellerPrice,
            bankPrice,
            appPrice,
          }
        );
      }, 6000);
      console.log('prices Updated');
    } catch (error) {
      res.json({ error });
    }
  }, 175000);
};

module.exports = autoUpdatePrices;
