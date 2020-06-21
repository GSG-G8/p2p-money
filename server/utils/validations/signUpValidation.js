const yup = require('yup');

const schema = yup.object().shape({
  fullName: yup.string().trim().required(),
  preferredContact: yup.string(),
  email: yup.string().when('preferredContact', {
    is: 'email',
    then: yup
      .string()
      .email('Please use a valid email address.')
      .required('Email address is required.'),
  }),
  mobileNumber: yup.string().when('preferredContact', {
    is: 'mobile',
    then: yup
      .string()
      .matches(/^[0-9]{10,}$/, 'Mobile number must Contain 10 numbers')
      .required('Mobile number is required.'),
  }),
  password: yup
    .string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
    )
    .required(),
  passwordConfirmation: yup.mixed().oneOf([yup.ref('password')]),
  mainBankName: yup
    .mixed()
    .oneOf(['بنك فلسطين', 'بنك الإسكان', 'بنك القدس'])
    .required(),
  mainBankAccount: yup.number().required(),
});

const signUpValidation = (obj) => schema.validate(obj, { abortEarly: false });

module.exports = signUpValidation;
