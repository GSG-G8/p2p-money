const { hash } = require('bcrypt');
const { sign } = require('jsonwebtoken');

const { client } = require('../../database/models');
const signUpValidation = require('../../utils/validations/signUpValidation');

const signUp = (req, res, next) => {
  const {
    fullName,
    email,
    mobileNumber,
    password,
    passwordConfirmation,
    mainBankName,
    mainBankAccount,
  } = req.body;

  let preferredContact = '';
  if (email) {
    preferredContact = 'email';
  } else {
    preferredContact = 'mobile';
  }
  signUpValidation({
    fullName,
    email,
    mobileNumber,
    password,
    passwordConfirmation,
    preferredContact,
    mainBankName,
    mainBankAccount,
  })
    .then(() => {
      client
        .findOne({
          bankAccounts: {
            $elemMatch: {
              accountNumber: mainBankAccount,
            },
          },
        })
        .then((data) => {
          if (data !== null) {
            res.status(400).json({
              status: 400,
              message: `Bank account [${mainBankAccount}] is already exists, please sign-in`,
            });
          } else if (email) {
            client.find({ email }).then((Data) => {
              if (Data.length !== 0) {
                res.status(400).json({
                  status: 400,
                  message: `${email} is already exists, please sign-in`,
                });
              } else {
                hash(password, 10).then((hashedPassword) => {
                  client
                    .create({
                      fullName,
                      email,
                      password: hashedPassword,
                      mainBankName,
                      mainBankAccount,
                      bankAccounts: [
                        {
                          bankName: mainBankName,
                          accountNumber: mainBankAccount,
                          balance: [{ type: 'USD', total: 1000 }],
                        },
                      ],
                      mainBalance: [{ type: 'USD', total: 1000 }],
                    })
                    .then(() =>
                      client.findOne({ email }).then((result) => {
                        const userToken = { clientId: result.id };
                        const cookie = sign(userToken, process.env.SECRET_KEY);
                        res.cookie('client', cookie).json({
                          status: 'successfully',
                          role: 'client',
                          result: {
                            email,
                            fullName: `${result.fullName}`,
                          },
                        });
                      })
                    )
                    .catch((error) => res.send(error));
                });
              }
            });
          } else {
            client.find({ mobileNumber }).then((Data) => {
              if (Data.length !== 0) {
                res.status(400).json({
                  status: 400,
                  message: `${mobileNumber} is already exists, please sign-in`,
                });
              } else {
                hash(password, 10).then((hashedPassword) => {
                  client
                    .create({
                      fullName,
                      mobileNumber,
                      password: hashedPassword,
                      mainBankName,
                      mainBankAccount,
                      bankAccounts: [
                        {
                          bankName: mainBankName,
                          accountNumber: mainBankAccount,
                          balance: [{ type: 'USD', total: 1000 }],
                        },
                      ],
                      mainBalance: [{ type: 'USD', total: 1000 }],
                    })
                    .then(() => {
                      client.findOne({ mobileNumber }).then((result) => {
                        const userToken = { clientId: result.id };
                        const cookie = sign(userToken, process.env.SECRET_KEY);
                        res.cookie('client', cookie).json({
                          status: 'successfully',
                          role: 'client',
                          result: {
                            mobileNumber,
                            fullName: `${result.fullName}`,
                          },
                        });
                      });
                    })
                    .catch((error) => res.send(error));
                });
              }
            });
          }
        });
    })
    .catch((err) => res.send(err));
};

module.exports = signUp;
