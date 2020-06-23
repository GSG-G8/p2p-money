const yup = require('yup');

const schema = yup.object().shape({
  bankName: yup.string().required(),
  accountNumber: yup.number().required(),
  balance: yup.array(),
});

const addBankAccount = (bankAccount) => schema.isValid(bankAccount);

module.exports = addBankAccount;
