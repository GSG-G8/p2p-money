const pricesModel = require('../../../database/models/prices');

const prices = async (req, res, next) => {
  const Prices = await pricesModel.findOne();
  res.send({ Prices });
};
module.exports = prices;
