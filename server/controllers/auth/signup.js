const { hash } = require('bcrypt');
const { sign } = require('jsonwebtoken');

const { client } = require('../../database/models');
const signUpValidation = require('../../utils/validations/signUpValidation');

const signUp = async (req, res, next) => {
  const {
    fullName,
    email,
    mobileNumber,
    password,
    passwordConfirmation,
    mainBankName,
    mainBankAccount,
  } = req.body;

  const addClient = async (value) => {
    const checkClient = await client.find(value);
    if (checkClient.length !== 0) {
      res.status(400).json({
        status: 400,
        message: `${
          value.email || value.mobileNumber
        } is already exists, please sign-in`,
      });
    } else {
      const hashedPassword = await hash(password, 10);
      const { _id } = await client.create({
        fullName,
        email: value.email,
        mobileNumber: value.mobileNumber,
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
      });
      const userToken = { clientId: _id };
      const cookie = sign(userToken, process.env.SECRET_KEY);
      res.cookie('client', cookie).json({
        status: 'successfully',
        role: 'client',
        _id,
      });
    }
  };

  let preferredContact = '';
  if (email) {
    preferredContact = 'email';
  } else {
    preferredContact = 'mobile';
  }
  try {
    await signUpValidation({
      fullName,
      email,
      mobileNumber,
      password,
      passwordConfirmation,
      preferredContact,
      mainBankName,
      mainBankAccount,
    });
    const checkBankAccount = await client.findOne({
      bankAccounts: {
        $elemMatch: {
          accountNumber: mainBankAccount,
        },
      },
    });
    if (checkBankAccount !== null) {
      res.status(400).json({
        status: 400,
        message: `Bank account [${mainBankAccount}] is already exists, please sign-in`,
      });
    } else if (email) {
      addClient({ email });
    } else {
      addClient({ mobileNumber });
    }
  } catch (err) {
    res.send(err);
  }
};
module.exports = signUp;
