const yup = require('yup');

const schema = yup.object().shape({
  fullName: yup.string().trim().required(),
  email: yup.string().email('Please use a valid email address.'),
  mobileNumber: yup
    .string()
    .matches(/^[0-9]{10,}$/, 'Mobile number must Contain 10 numbers'),
  oldPassword: yup
    .string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'your old password Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
    ),
  newPassword: yup
    .string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
    ),
  passwordConfirmation: yup.mixed().oneOf([yup.ref('newPassword')]),
  mainBankName: yup.string(),
  mainBankAccount: yup.number(),
  avatar: yup.string(),
  activeAccount: yup.boolean(),
  newsLetter: yup.boolean(),
  defaultCurrency: yup.string(),
  feedback: yup.string(),
});

const updateValidation = (clientData) => schema.isValid(clientData);

module.exports = updateValidation;
