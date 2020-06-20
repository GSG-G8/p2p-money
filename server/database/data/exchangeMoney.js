const exchangeMoney = require('../models/exchangeMoney');

module.exports = async () => {
  const newExchangeMoney = [
    {
      time: '2015-06-17T13:28:06.419Z',
      ourRate: { buy: 3.46, sell: 3.47 },
      bankRate: { buy: 3.45, sell: 3.48 },
      agencyRate: { buy: 3.45, sell: 3.47 },
    },
    {
      time: '2015-06-16T13:28:06.419Z',
      ourRate: { buy: 3.475, sell: 3.485 },
      bankRate: { buy: 3.455, sell: 3.485 },
      agencyRate: { buy: 3.47, sell: 3.49 },
    },
    {
      time: '2015-06-15T13:28:06.419Z',
      ourRate: { buy: 3.485, sell: 3.495 },
      bankRate: { buy: 3.475, sell: 3.505 },
      agencyRate: { buy: 3.48, sell: 3.5 },
    },
  ];
  await exchangeMoney.create(newExchangeMoney);
};
