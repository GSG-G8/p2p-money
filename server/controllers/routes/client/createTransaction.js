/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
const transactions = require('../../../database/models/transactions');
const exchangeMoney = require('../../../database/models/exchangeMoney');
const client = require('../../../database/models/client');
const prices = require('../../../database/models/prices');
const createTransactionValidation = require('../../../utils/validations/createTransactionValidation');

const createTransaction = async (req, res) => {
  try {
    const client_id = res.clientId;
    const { amount, from, to } = req.body;
    const latestPrices = await prices.find({}).sort({ _id: -1 }).limit(1);
    const appPrice = latestPrices[0].appPrice.filter(
      (e) => e.from === from && e.To === to
    );
    const bankPrice = latestPrices[0].bankPrice.filter(
      (e) => e.from === from && e.To === to
    );
    const agencyPrice = latestPrices[0].tellerPrice.filter(
      (e) => e.from === from && e.To === to
    );
    // console.log(appPrice[0].sell);
    const clientData = await client.findById(res.clientId);
    const clientBalance = clientData.mainBalance;
    // get the client currency balance which he wants to convert from
    const clientBalanceToConvertFromArray = clientBalance.filter(
      (element) => element.type === from
    );
    const clientBalanceToConvertToArray = clientBalance.filter(
      (element) => element.type === to
    );
    // check if there is enough balance to complete the transaction
    if (
      clientBalanceToConvertFromArray.length === 0 ||
      clientBalanceToConvertFromArray[0].total < amount
    ) {
      throw new Error("Sorry, but you don't have enough balance to continue.");
    } else {
      await createTransactionValidation({ from, to, amount });
      exchangeMoney
        .create({
          amount,
          from,
          to,
          app_price_sell: appPrice[0].sell * amount, // this will added to client
          app_price_buy: appPrice[0].buy * amount,
          app_saved_money:
            appPrice[0].sell * amount - bankPrice[0].sell * amount, // need review
          spread: appPrice[0].buy * amount - appPrice[0].sell * amount, // need review
          bank_price_sell: bankPrice[0].sell * amount,
          bank_price_buy: bankPrice[0].buy * amount,
          agency_price_sell: agencyPrice[0].sell * amount,
          agency_price_buy: agencyPrice[0].buy * amount,
          agency_saved_money:
            agencyPrice[0].sell * amount - bankPrice[0].sell * amount, // need review
        })
        .then((data) => {
          transactions.create({ client_id, exchange_id: data._id });
        })
        .then(async () => {
          clientBalance.forEach((e) => {
            if (e.type === from) {
              e.total -= amount;
            }
            if (e.type === to) {
              e.total += appPrice[0].sell;
            }
          });
          if (clientBalanceToConvertToArray.length === 0) {
            clientBalance.push({ type: to, total: appPrice[0].sell });
            console.log(clientBalance, appPrice[0].sell);
          }
          await client.updateOne(
            { _id: client_id },
            { mainBalance: clientBalance }
          );
        })
        .then(() => res.status(200).json({ message: 'Transaction Completed' }));
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
module.exports = createTransaction;
