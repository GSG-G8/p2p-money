const yup = require('yup');

const schema = yup.object().shape({
  time: yup.date(),
  ourRate: yup.object().shape({
    buy: yup.number(),
    sell: yup.number(),
  }),
  bankRate: yup.object().shape({
    buy: yup.number(),
    sell: yup.number(),
  }),
  agencyRate: yup.object().shape({
    buy: yup.number(),
    sell: yup.number(),
  }),
});

const exchangeMoneyValidation = (obj) => schema.isValid(obj);

module.exports = exchangeMoneyValidation;
