const pricesModel = require('../../../database/models/prices');

const updatePrices = async (req, res, next) => {
  const { bankPrice, tellerPrice, appPrice } = req.body;
  await pricesModel.updateOne(
    {},
    { bankPrice, tellerPrice, appPrice },
    (error) => {
      if (!error)
        res.status(200).json({
          message: 'prices Updated',
        });
      else res.status(400).json({ error });
    }
  );
};
module.exports = updatePrices;
