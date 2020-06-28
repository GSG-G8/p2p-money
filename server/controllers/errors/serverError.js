const serverError = (err, req, res, next) => {
  res.status(500).send({ message: 'Internal Server Error' });
};

module.exports = serverError;
