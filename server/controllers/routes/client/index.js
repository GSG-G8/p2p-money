const getClientData = require('./getClientData');
const updateClientData = require('./updateClient');
const getTransactionsById = require('./getTransactionById');
const addBankAccount = require('./addNewBank');
const deleteBankAccount = require('./deleteBankAccount');
const createTransaction = require('./createTransaction');

module.exports = {
  getClientData,
  updateClientData,
  getTransactionsById,
  addBankAccount,
  deleteBankAccount,
  createTransaction,
};
