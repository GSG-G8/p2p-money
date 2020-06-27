const clientError = (req, res) => {
  res.status(404).send({
    message: 'Page Not Found',
  });
};

module.exports = clientError;
