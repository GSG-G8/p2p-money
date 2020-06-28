const getClientData = require('./getClientData');
const updateClientData = require('./updateClient');
const getTransactionsById = require('./getTransactionById');
const addBankAccount = require('./addNewBank');
const deleteBankAccount = require('./deleteBankAccount');

module.exports = {
  getClientData,
  updateClientData,
  getTransactionsById,
  addBankAccount,
  deleteBankAccount,
};
