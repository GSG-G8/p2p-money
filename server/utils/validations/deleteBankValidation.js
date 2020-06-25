const yup = require('yup');

const schema = yup.object().shape({
  accountNumber: yup.number().required(),
});

const addBankAccount = (bankAccount) => schema.isValid(bankAccount);

module.exports = addBankAccount;
