const yup = require('yup');

const schema = yup.object().shape({
  client_id: yup.string().required('Please Enter your password'),
  amount: yup
    .number()
    .required('Please Enter your amount you want to exchange')
    .positive(),
  from: yup
    .string()
    .required('Please Enter currency you want to exchange from'),
  to: yup.string().required('Please Enter currency you want to exchange'),
  result: yup.number().required('please add the result').positive(),
  spread: yup.number().required('Please add the spread').positive(),
  saved_money: yup.number().required('Please add the saved money').positive(),
  operation_time: yup.number().required('Please add the date'),
});

const transactionsValidation = (transactions) =>
  schema.isValid({
    transactions,
  });

module.exports = transactionsValidation;
