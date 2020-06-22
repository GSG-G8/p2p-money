const { verify } = require('jsonwebtoken');

require('env2')('config.env');

const isClient = (req, res, next) => {
  try {
    verify(req.cookies.client, process.env.SECRET_KEY, (err, token) => {
      if (err) {
        res.status(401).send({
          statusCode: 401,
          auth: false,
          message: 'you are Unauthorized',
        });
      } else {
        const { clientId } = token;
        res.clientId = clientId;
        next();
      }
    });
  } catch (err) {
    next(err);
  }
};

const isAdmin = (req, res, next) => {
  try {
    verify(req.cookies.admin, process.env.SECRET_KEY, (err, token) => {
      if (err) {
        res.status(401).send({
          statusCode: 401,
          auth: false,
          message: 'you are Unauthorized',
        });
      } else {
        const { adminId } = token;
        res.adminId = adminId;
        next();
      }
    });
  } catch (err) {
    next(err);
  }
};
module.exports = { isClient, isAdmin };
