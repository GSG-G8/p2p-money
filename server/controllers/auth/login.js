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

  const loginFunc = async (value) => {
    const clients = await Client.findOne(value);

    if (clients) {
      await compare(password, clients.password, (err, result) => {
        if (err) {
          res.status(400).send({ err: 'error compare' });
        }
        const clientToken = { clientId: clients.id };
        const cookie = sign(clientToken, process.env.SECRET_KEY);
        res.cookie('client', cookie).json({
          status: 'successfully',
          role: 'client',
          data: {
            email: value.email,
            mobileNumber: value.mobileNumber,
            fullName: clients.fullName,
            avatar: clients.avatar,
            balance: clients.mainBalance,
          },
        });
      });
    } else {
      const admins = await Admin.findOne(value);
      if (admins) {
        await compare(password, admins.password, (err, result) => {
          if (err) {
            res.status(400).json(errResponse);
          }

          const adminToken = { adminId: admins.id };
          const cookie = sign(adminToken, process.env.SECRET_KEY);
          res.cookie('admin', cookie).json({
            status: 'successfully',
            role: 'admin',
            data: { email },
          });
        });
      } else {
        res
          .status(400)
          .send({ status: 'failed', message: 'User is not exists' });
      }
    }
  };

  let preferredContact = '';
  if (mobileNumber) {
    preferredContact = 'mobile';
  } else {
    preferredContact = 'email';
  }

  try {
    await loginValidation({
      preferredContact,
      email,
      mobileNumber,
      password,
    });

    if (email) {
      loginFunc({ email });
    } else {
      loginFunc({ mobileNumber });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = login;
