const transactions = require('../../../database/models/transactions');
const client = require('../../../database/models/client');
const exchangeMoney = require('../../../database/models/exchangeMoney');

const getClients = async (req, res) => {
  try {
    const clientsTransactions = await transactions.find({});
    if (clientsTransactions.length) {
      let promise = Promise.resolve();
      const data = [];
      // loop to get client name and exchange details
      clientsTransactions.map(({ client_id, exchange_id }) => {
        promise = exchangeMoney
          .findById(exchange_id)
          .then(async (exchangeDetails) => {
            const { fullName } = await client.findById(client_id);
            data.push({ fullName, exchangeDetails });
          });
      });
      promise.then(() =>
        res.status(200).json({
          count: clientsTransactions.length,
          data,
        })
      );
    } else {
      res.status(200).json({
        message: 'No transactions found',
      });
    }
  } catch (error) {
    res.status(500).send({ error: 'Something failed!' });
  }
};

module.exports = getClients;
