const transactions = require('../models/exchangeMoney');

module.exports = async () => {
  const newTransactions = [
    {
      amount: 200,
      from: 'USD',
      to: 'ILS',
      app_price_sell: 700,
      app_price_buy: 697,
      app_saved_money: 2,
      spread: 3,
      bank_price_sell: 691,
      bank_price_buy: 690,
      agency_price_sell: 698,
      agency_price_buy: 696,
      agency_saved_money: 1,
    },
  ];
  await transactions.create(newTransactions);
};
