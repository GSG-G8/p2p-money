const clientError = (req, res) => {
  res.status(404).send({
    StatusCode: '404',
    message: 'Page Not Found',
  });
};

module.exports = clientError;
