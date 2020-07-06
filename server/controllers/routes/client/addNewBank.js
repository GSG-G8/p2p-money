const client = require('../../../database/models/client');
const addBankAccountValidation = require('../../../utils/validations/addBankValidation');

const addClientBank = async (req, res) => {
  const { clientId } = res;
  // check validate
  const isBankValidate = await addBankAccountValidation(req.body);
  // check if bank account is exist !!
  const checkBankAccount = await client.find({
    'bankAccounts.accountNumber': req.body.accountNumber,
  });
  if (checkBankAccount.length === 0 && isBankValidate) {
    client.findByIdAndUpdate(
      clientId,
      {
        $push: { bankAccounts: req.body },
      },
      { useFindAndModify: false },
      async (err) => {
        if (err) res.status(400).json({ message: 'User not exist' });
        const data = await client.findById(clientId);
        res.status(200).json({
          message: 'User Bank added successfully',
          data: data.bankAccounts,
        });
      }
    );
  } else
    res.status(400).json({
      message: 'Please check your data and your Account Number already exist',
    });
};

module.exports = addClientBank;
