const transactions = require('../models/transactions');

module.exports = async () => {
  const newTransactions = [
    {
      client_id: '1235',
      amount: 200,
      from: 'USD',
      to: 'ILS',
      result: 700,
      spread: 3,
      saved_money: 5,
    },
    {
      client_id: '3456',
      amount: 250,
      from: 'USD',
      to: 'ILS',
      result: 862,
      spread: 2,
      saved_money: 6,
    },
    {
      client_id: '1235',
      amount: 1000,
      from: 'ILS',
      to: 'USD',
      result: 290,
      spread: 3,
      saved_money: 5,
    },
    {
      client_id: '1235',
      amount: 1200,
      from: 'ILS',
      to: 'USD',
      result: 348.32,
      spread: 3,
      saved_money: 5,
    },
    {
      client_id: '1235',
      amount: 200,
      from: 'USD',
      to: 'ILS',
      result: 700,
      spread: 3,
      saved_money: 5,
    },
    {
      client_id: '1235',
      amount: 1000,
      from: 'USD',
      to: 'ILS',
      result: 3445.14,
      spread: 3,
      saved_money: 5,
    },
  ];
  await transactions.create(newTransactions);
};
