const transactions = require('../models/transactions');

module.exports = async () => {
  const newTransactions = [
    {
      amount: 200,
      from: 'USD',
      to: 'ILS',
      result: 700,
      spread: 3,
      saved_money: 5,
      operation_time: '04-12-2020',
    },
  ];
  await transactions.create(newTransactions);
};
