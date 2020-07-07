const transactions = require('../../../database/models/transactions');
const exchangeMoney = require('../../../database/models/exchangeMoney');
const client = require('../../../database/models/client');
const prices = require('../../../database/models/prices');
const createTransactionValidation = require('../../../utils/validations/createTransactionValidation');

const createTransaction = async (req, res) => {
  try {
    // eslint-disable-next-line camelcase
    const client_id = res.clientId;
    const { amount, from, to } = req.body;
    const latestPrices = await prices.find({});
    const appPrice = latestPrices[0].appPrice.filter(
      (e) => e.from === from && e.to === to
    );
    const bankPrice = latestPrices[0].bankPrice.filter(
      (e) => e.from === from && e.to === to
    );
    const agencyPrice = latestPrices[0].tellerPrice.filter(
      (e) => e.from === from && e.to === to
    );
    const clientData = await client.findById(client_id);
    if (clientData) {
      const { mainBalance, mainBankAccount, bankAccounts } = clientData;
      if (
        !mainBalance[from] ||
        mainBalance[from] < amount ||
        mainBalance[from] === 0
      ) {
        res.status(400).send({
          message: "Sorry, but you don't have enough balance to continue.",
        });
      } else {
        await createTransactionValidation({ from, to, amount });
        const { _id } = await exchangeMoney.create({
          amount,
          from,
          to,
          app_price_sell: appPrice[0].sell * amount,
          app_price_buy: appPrice[0].buy * amount,
          app_saved_money:
            appPrice[0].sell * amount - bankPrice[0].sell * amount,
          spread: appPrice[0].buy * amount - appPrice[0].sell * amount,
          bank_price_sell: bankPrice[0].sell * amount,
          bank_price_buy: bankPrice[0].buy * amount,
          agency_price_sell: agencyPrice[0].sell * amount,
          agency_price_buy: agencyPrice[0].buy * amount,
          agency_saved_money:
            agencyPrice[0].sell * amount - bankPrice[0].sell * amount,
        });
        await transactions.create({ client_id, exchange_id: _id });
        mainBalance[from] -= amount;
        if (mainBalance[to]) {
          mainBalance[to] = appPrice[0].sell * amount + mainBalance[to];
        } else {
          mainBalance[to] = appPrice[0].sell * amount;
        }
        const bankAccountsArray = [];
        bankAccounts.forEach((element) => {
          if (Number(element.accountNumber) === mainBankAccount) {
            // eslint-disable-next-line no-param-reassign
            element.balance = mainBalance;
          }
          bankAccountsArray.push(element);
        });
        await client.findByIdAndUpdate(
          { _id: client_id },
          { mainBalance, bankAccounts: bankAccountsArray },
          { useFindAndModify: false }
        );
        res.send({ mainBalance });
      }
    } else {
      res.status(400).send({ message: 'client not exist' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
module.exports = createTransaction;
