const transactions = require('../../../database/models/transactions');
const exchangeMoney = require('../../../database/models/exchangeMoney');
const client = require('../../../database/models/client');

const getTransactionById = async (req, res) => {
  try {
    let promise = Promise.resolve();
    const transactionTableData = await transactions.find({
      client_id: req.params.id,
    });
    const result = [];
    const exchangeDetail = [];
    const clientData = await client.findById(req.params.id);
    result.push({ clientData });
    // eslint-disable-next-line camelcase
    transactionTableData.forEach(({ exchange_id }) => {
      promise = exchangeMoney.findById(exchange_id).then((exchangeData) => {
        exchangeDetail.push(exchangeData);
      });
    });
    result.push({ exchangeDetail });
    promise.then(() => res.status(200).json({ result }));
  } catch (error) {
    res.status(400).json({ error: "client doesn't exists" });
  }
};
module.exports = getTransactionById;
