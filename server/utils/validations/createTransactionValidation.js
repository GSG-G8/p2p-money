const yup = require('yup');

const schema = yup.object().shape({
  amount: yup.number().required(),
  from: yup
    .mixed()
    .oneOf(['USD', 'ILS', 'JOD', 'EGP', 'EUR'])
    .required('Please choose the currency from type.'),
  to: yup
    .mixed()
    .oneOf(['USD', 'ILS', 'JOD', 'EGP', 'EUR'])
    .required('Please choose the currency to type.'),
});

const createTransactionValidation = (transactionDetails) =>
  schema.validate(transactionDetails, { abortEarly: false });

module.exports = createTransactionValidation;
