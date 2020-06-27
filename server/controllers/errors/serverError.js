const serverError = (err, req, res, next) => {
  res.status(500).send({ StatusCode: '500', message: 'Internal Server Error' });
};

module.exports = serverError;
