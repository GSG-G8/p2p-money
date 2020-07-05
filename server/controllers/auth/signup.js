const { hash } = require('bcrypt');
const { sign } = require('jsonwebtoken');

const { client } = require('../../database/models');
const signUpValidation = require('../../utils/validations/signUpValidation');

const signUp = async (req, res) => {
  const {
    fullName,
    email,
    mobileNumber,
    password,
    passwordConfirmation,
    mainBankName,
    mainBankAccount,
  } = req.body;
  const backgroundColor = Math.floor(Math.random() * 16777215).toString(16);
  const avatar = `https://ui-avatars.com/api/?name=${fullName}&rounded=true&background=${backgroundColor}&color=F3F3F3`;

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
        ...value,
        password: hashedPassword,
        mainBankName,
        mainBankAccount,
        bankAccounts: [
          {
            bankName: mainBankName,
            accountNumber: mainBankAccount,
            balance: { USD: 1000, ILS: 3000 },
          },
        ],
        mainBalance: { USD: 1000, ILS: 3000 },
        avatar,
      });
      const clientToken = { clientId: _id };
      const cookie = sign(clientToken, process.env.SECRET_KEY);
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
