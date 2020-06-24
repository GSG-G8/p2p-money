const client = require('../../../database/models/client');
const deleteBankAccountValidation = require('../../../utils/validations/deleteBankValidation');

const deleteBankAccount = async (req, res) => {
  const { id } = res;
  const { accountNumber } = req.body;
  // check if account exist
  const accountExist = await client.find({
    _id: id,
    'bankAccounts.accountNumber': accountNumber,
  });
  // check account validation
  const accountValidation = await deleteBankAccountValidation(req.body);

  if (accountExist.length > 0 && accountValidation) {
    await client.findByIdAndUpdate(
      id,
      { $pull: { bankAccounts: { accountNumber } } },
      { useFindAndModify: false }
    );
    res.status(200).json({
      message: 'Account was deleted successfully',
    });
  } else res.status(400).json({ message: "Account doesn't exist" });
};

module.exports = deleteBankAccount;
