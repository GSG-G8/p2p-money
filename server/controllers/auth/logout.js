const logOut = (req, res, next) => {
  if (req.cookies.client) {
    res
      .clearCookie('client')
      .status(200)
      .json({ status: 'done', message: 'Logout Successfully' });
  } else if (req.cookies.admin) {
    res
      .clearCookie('admin')
      .status(200)
      .json({ status: 'done', message: 'Logout Successfully' });
  } else {
    res.status(401).json({ status: 'failed', message: `you're not sign-in` });
  }
};

module.exports = logOut;
