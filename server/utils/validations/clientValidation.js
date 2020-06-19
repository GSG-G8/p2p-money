const yup = require('yup');

const schema = yup.object().shape({
  fullName: yup.string().trim().required(),
  email: yup.string().email().trim(),
  mobileNumber: yup.string().trim(),
  password: yup
    .string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
    )
    .required(),
  passwordConfirmation: yup.mixed().oneOf([yup.ref('password')]),
  bankAccounts: yup.number().required(),
  mainBank: yup.number().required(),
  balance: yup.object().required(),
  avatar: yup.string().url().trim(),
  accepted: yup.boolean(),
});

const clientValidation = (obj) => schema.isValid(obj);

module.exports = clientValidation;
