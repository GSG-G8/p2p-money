const pricesModel = require('../../../database/models/prices');

const getPrices = async (req, res, next) => {
  const Prices = await pricesModel.findOne();
  res.send({ Prices });
};
module.exports = getPrices;
