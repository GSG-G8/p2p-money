const { compare } = require('bcrypt');
const { sign } = require('jsonwebtoken');

const loginValidation = require('../validation/loginValidation');
const Admin = require('../../database/models/admin');
const Client = require('../../database/models/client');

require('env2')('config.env');

const errResponse = {
  status: 'failed',
  message: 'Data is not exists',
};

const login = async (req, res) => {
  const { email, password, mobileNumber } = req.body;
  try {
    const valid = await loginValidation(email, mobileNumber, password);
    if (!valid)
      res.status(400).json({
        status: 'failed',
        message: 'Data is not Valid',
      });

    const clients = await Client.findOne({
      $or: [{ email }, { mobileNumber }],
    });
    if (clients)
      await compare(password, clients.password, (err, result) => {
        if (!result) {
          res.status(400).json(errResponse);
        } else {
          const userToken = { userId: clients.id };
          const cookie = sign(userToken, process.env.SECRET_KEY);
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
          const userToken = { userId: admins.id };
          const cookie = sign(userToken, process.env.SECRET_KEY);
          res.cookie('client', cookie).json({
            status: 'successfully',
            role: 'admin',
            data: { email },
          });
        }
      });

    if (admins === null && clients === null) res.json(errResponse);
  } catch (e) {
    res.status(500).json({
      status: 'failed',
      message: 'internal server error',
    });
  }
};

module.exports = login;
