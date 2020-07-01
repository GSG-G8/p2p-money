const pricesModel = require('../../../database/models/prices');

const updatePrices = async (req, res, next) => {
  const { bankPrice, tellerPrice, appPrice } = req.body;
  const Prices = await pricesModel.updateOne(
    {},
    { bankPrice, tellerPrice, appPrice },
    (error) => {
      if (!error)
        res.send({
          message: 'prices Updated',
        });
      else res.send({ error });
    }
  );
  res.send({ Prices });
};
module.exports = updatePrices;
