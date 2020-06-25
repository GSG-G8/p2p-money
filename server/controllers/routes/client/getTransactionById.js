/* eslint-disable camelcase */
const transactions = require('../../../database/models/transactions');
const exchangeMoney = require('../../../database/models/exchangeMoney');
const client = require('../../../database/models/client');

const getTransactionById = async (req, res) => {
  try {
    const result = [];
    const exchangeDetail = [];
    let promise = Promise.resolve();
    const transactionTableData = await transactions.find({
      client_id: res.clientId,
    });
    const clientData = await client.findById(res.clientId);
    if (clientData.length === 0) throw new Error();
    result.push({ clientData });
    transactionTableData.forEach(({ exchange_id }) => {
      promise = exchangeMoney.findById(exchange_id).then((exchangeData) => {
        exchangeDetail.push(exchangeData);
      });
    });
    result.push({ exchangeDetail });
    promise.then(() => res.status(200).json({ result }));
  } catch (error) {
    res.status(400).json({ message: "client doesn't exists" });
  }
};
module.exports = getTransactionById;
