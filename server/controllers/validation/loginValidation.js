const yup = require('yup');

const schema = yup.object().shape({
  email: yup.string().email().trim(),
  mobileNumber: yup.string().trim(),
  password: yup
    .string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
    ),
});

const loginValidation = (email, mobileNumber, password) =>
  schema.isValid({
    email,
    mobileNumber,
    password,
  });

module.exports = loginValidation;
