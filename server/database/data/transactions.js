const { transactions, client, exchangeMoney } = require('../models');

module.exports = async () => {
  const Clients = await client.find({}, { _id: 1 });
  const ExchangeMoney = await exchangeMoney.find({}, { _id: 1 });
  const array = [];
  Clients.map(({ _id }, index) =>
    array.push({
      client_id: _id,
      // eslint-disable-next-line no-underscore-dangle
      exchange_id: ExchangeMoney[index]._id,
    })
  );
  const Transactions = array;
  await transactions.create(Transactions);
};
