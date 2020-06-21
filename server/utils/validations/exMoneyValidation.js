const yup = require('yup');

const schema = yup.object().shape({
  amount: yup
    .number()
    .required('Please Enter your amount you want to exchange')
    .positive(),
  from: yup
    .string()
    .required('Please Enter currency you want to exchange from'),
  to: yup.string().required('Please Enter currency you want to exchange to it'),
});

const exchangeMoneyValidation = (newConversion) =>
  schema.isValid({
    newConversion,
  });

module.exports = exchangeMoneyValidation;
