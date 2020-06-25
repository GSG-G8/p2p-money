const getClientData = require('./getClientData');
const updateClientData = require('./updateClient');
const addBankAccount = require('./addNewBank');
const deleteBankAccount = require('./deleteBankAccount');
const createTransaction = require('./createTransaction');

module.exports = {
  getClientData,
  updateClientData,
  addBankAccount,
  deleteBankAccount,
  createTransaction,
};
