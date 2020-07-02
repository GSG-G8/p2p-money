/* eslint-disable no-template-curly-in-string */
const antConfigurations = {
  layout: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
  formItemLayout: {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 7 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  },
  validateMessages: {
    required: '${label} مطلوب!',
    types: {
      email: 'تاكد من البريد الالكتروني!',
      number: '${label} يجب ان يكون رقماّ!',
      password: 'تاكد من كلمة المرور!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  },
  validatePassword: (password) => {
    const validation = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (password.match(validation)) {
      return Promise.resolve();
    }
    const message = 'تاكد من كلمة المرور!';
    return Promise.reject(message);
  },
  checkMobileNumber: (mobile) => {
    let message = 'رقم الهاتف مطلوب!';
    if (!mobile) return Promise.reject(message);
    const validation = /^[0-9]{10}$/;
    if (mobile.match(validation)) {
      return Promise.resolve();
    }
    message = 'رقم الهاتف غير صحيح!';
    return Promise.reject(message);
  },
};
export default antConfigurations;
