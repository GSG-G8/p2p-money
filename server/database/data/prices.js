const Prices = require('../models/prices');

module.exports = async () => {
  const prices = [
    {
      screenPrice: [
        { from: 'USD', To: 'ILS', sell: 3.4429, buy: 3.4529 },
        { from: 'JOD', To: 'ILS', sell: 5.42708, buy: 5.44774 },
        { from: 'EGP', To: 'ILS', sell: 0.43326, buy: 0.43454 },
        { from: 'EUR', To: 'ILS', sell: 3.865, buy: 3.87 },
      ],
      bankPrice: [
        { from: 'USD', To: 'ILS', sell: 4.9429, buy: 2.4529 },
        { from: 'JOD', To: 'ILS', sell: 6.92708, buy: 4.44774 },
        { from: 'EGP', To: 'ILS', sell: 1.93326, buy: 0.056546 },
        { from: 'EUR', To: 'ILS', sell: 5.365, buy: 2.87 },
      ],
      tellerPrice: [
        { from: 'USD', To: 'ILS', sell: 4.4429, buy: 2.9529 },
        { from: 'JOD', To: 'ILS', sell: 6.42708, buy: 4.94774 },
        { from: 'EGP', To: 'ILS', sell: 1.43326, buy: 0.06546 },
        { from: 'EUR', To: 'ILS', sell: 4.865, buy: 3.37 },
      ],
      appPrice: [
        { from: 'USD', To: 'ILS', sell: 3.9429, buy: 3.2529 },
        { from: 'JOD', To: 'ILS', sell: 5.92708, buy: 5.24774 },
        { from: 'EGP', To: 'ILS', sell: 0.93326, buy: 0.23454 },
        { from: 'EUR', To: 'ILS', sell: 4.365, buy: 3.67 },
      ],
    },
  ];
  await Prices.create(prices);
};
