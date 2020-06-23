const { compare } = require('bcrypt');
const { sign } = require('jsonwebtoken');

const loginValidation = require('../../utils/validations/loginValidation');
const Admin = require('../../database/models/admin');
const Client = require('../../database/models/client');

require('env2')('config.env');

const errResponse = {
  status: 'failed',
  message: 'Data is Error',
};

const login = async (req, res) => {
  const { email, password, mobileNumber } = req.body;

  let preferredContact = '';
  if (mobileNumber) {
    preferredContact = 'mobile';
  } else {
    preferredContact = 'email';
  }

  try {
    await loginValidation({
      email,
      mobileNumber,
      password,
      preferredContact,
    });

    const clients = await Client.findOne({
      $or: [{ email }, { mobileNumber }],
    });
    if (clients)
      await compare(password, clients.password, (err, result) => {
        if (!result) {
          res.status(400).json(errResponse);
        } else {
          const clientToken = { clientId: clients.id };
          const cookie = sign(clientToken, process.env.SECRET_KEY);
          res.cookie('client', cookie).json({
            status: 'successfully',
            role: 'client',
            data: {
              email,
              mobileNumber,
              fullName: clients.fullName,
              avatar: clients.avatar,
              balance: clients.mainBalance,
            },
          });
        }
      });

    const admins = await Admin.findOne({ email });
    if (admins)
      await compare(password, admins.password, (err, result) => {
        if (!result) {
          res.status(400).json(errResponse);
        } else {
          const adminToken = { userId: admins.id };
          const cookie = sign(adminToken, process.env.SECRET_KEY);
          res.cookie('client', cookie).json({
            status: 'successfully',
            role: 'admin',
            data: { email },
          });
        }
      });

    if (admins === null && clients === null) res.json(errResponse);
  } catch (e) {
    res.send(e);
  }
};

module.exports = login;
