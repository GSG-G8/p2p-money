const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');

const adminValidation = require('../../utils/validations/adminValidation');
const Admin = require('../../database/models/admin');
const Client = require('../../database/models/client');

require('env2')('config.env');

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const valid = await adminValidation(email, password);
    if (!valid) {
      res.status(400).json({
        status: 'failed',
        message: 'Check the entered data',
      });
    } else {
      const clients = await Client.findOne({ email });
      await bcrypt.compare(password, clients.password, (err, result) => {
        if (!result)
          res.status(400).json({
            status: 'failed',
            message: 'somthing wrong with Email or passoword',
          });
        const userToken = { userId: clients.id };
        const cookie = sign(userToken, process.env.SECRET_KEY);
        res.cookie('client', cookie).json({
          status: 'successfully',
          role: 'applicant',
          data: {
            email,
            fullName: `${clients.fullName}`,
            avatar: `${clients.avatar}`,
          },
        });
      });
    }
  } catch (e) {
    try {
      const admins = await Admin.findOne({ email });
      await bcrypt.compare(password, admins.password, (err, result) => {
        if (!result)
          res
            .status(400)
            .json({ message: 'somthing wrong with Email or passoword' });
        const userToken = { userId: admins.id };
        const cookie = sign(userToken, process.env.SECRET_KEY);
        res.cookie('client', cookie).json({
          status: 'successfully',
          role: 'admin',
          data: { email },
        });
      });
    } catch (err) {
      res.json({
        status: 'failed',
        message: 'somthing wrong with Email or passoword',
      });
    }
  }
};

module.exports = login;
