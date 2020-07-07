const client = require('../../../database/models/client');
const deleteBankAccountValidation = require('../../../utils/validations/deleteBankValidation');

const deleteBankAccount = async (req, res) => {
  const { clientId } = res;
  const { accountNumber } = req.body;
  // check if account exist
  const accountExist = await client.find({
    _id: clientId,
    'bankAccounts.accountNumber': accountNumber,
  });
  // check account validation
  const accountValidation = await deleteBankAccountValidation(req.body);

  if (accountExist.length > 0 && accountValidation) {
    client.findByIdAndUpdate(
      clientId,
      { $pull: { bankAccounts: { accountNumber } } },
      { useFindAndModify: false },
      async (error) => {
        if (error)
          res.status(400).json({ message: "Account doesn't exist in DB" });
        else {
          const data = await client.findById(clientId);
          res.status(200).json({
            message: 'Account was deleted successfully',
            data: data.bankAccounts,
          });
        }
      }
    );
  } else res.status(400).json({ message: "Account doesn't exist" });
};

module.exports = deleteBankAccount;
