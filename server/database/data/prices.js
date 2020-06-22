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
        { from: 'EGP', To: 'ILS', sell: 1.93326, buy: -0.56546 },
        { from: 'EUR', To: 'ILS', sell: 5.365, buy: 2.87 },
      ],
      tellerPrice: [
        { from: 'USD', To: 'ILS', sell: 4.4429, buy: 1.9529 },
        { from: 'JOD', To: 'ILS', sell: 6.42708, buy: 3.94774 },
        { from: 'EGP', To: 'ILS', sell: 1.43326, buy: -1.06546 },
        { from: 'EUR', To: 'ILS', sell: 4.865, buy: 2.37 },
      ],
      appPrice: [
        { from: 'USD', To: 'ILS', sell: 3.9429, buy: 1.7529 },
        { from: 'JOD', To: 'ILS', sell: 5.92708, buy: 3.74774 },
        { from: 'EGP', To: 'ILS', sell: 0.93326, buy: -1.26546 },
        { from: 'EUR', To: 'ILS', sell: 4.365, buy: 2.17 },
      ],
    },
  ];
  await Prices.create(prices);
};
