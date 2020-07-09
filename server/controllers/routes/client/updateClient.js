const { compare, hash } = require('bcrypt');
const client = require('../../../database/models/client');
const updateClientValidation = require('../../../utils/validations/updateClientValidation');

const updateClientById = async (req, res) => {
  const id = res.clientId;
  const { oldPassword, newPassword, passwordConfirmation, ...rest } = req.body;

  if (await updateClientValidation(req.body)) {
    // handle change password
    if (oldPassword) {
      const clientPassword = await client.findById(id, { password: 1 });
      compare(oldPassword, clientPassword.password, async (err, result) => {
        if (result) {
          const password = await hash(newPassword, 10);
          await client.updateOne({ _id: id }, { password, ...rest });
          res.status(200).json({
            status: 'Successfully',
            message: 'Client updated successfully',
          });
        } else {
          res.status(400).json({
            status: 'failed',
            message: 'Wrong password please try again later',
          });
        }
      });
    } else {
      // handle any change.
      try {
        await client.updateOne({ _id: id }, rest);
        res.status(200).json({
          status: 'Successfully',
          message: 'Client updated successfully',
        });
      } catch (error) {
        res
          .status(400)
          .json({ status: 'failed', message: "Client doesn't exist" });
      }
    }
  } else {
    res.status(400).json({ status: 'failed', message: 'Check your data' });
  }
};

module.exports = updateClientById;
