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

const messages = {
  addUserSuccess: {
    type: 'success',
    message:
      'تم تسجيل دخولك بنجاح, سيتم توجيهك الى الصفحة الرئيسية خلال 5 ثواني..',
  },
  addUserFailed: {
    type: 'error',
    message: 'هذا الحساب مستخدم تاكد من البريد ورقم الحساب',
  },
  mobileCodeSent: {
    type: 'warning',
    message: 'تم ارسال كود التفعيل الى هاتفك ',
  },
  mobileCodeWrong: {
    type: 'error',
    message: 'كود التفعيل خطا, برجاء المحاولة مرة اخرى',
  },
  mobileUsed: {
    type: 'warning',
    message: 'هذا الهاتف مفعل مسبقا, برجاء تسجيل الدخول',
  },
  emailSent: {
    type: 'warning',
    message: 'تم ارسال بريد الكترونيو برجاء تفعيل حسابك .',
  },
  emailVerificationSuccess: '',
  emailVerificationFailed: {
    type: 'error',
    message: 'هذا الحساب مفعل مسبقا برجاء تسجيل الدخول',
  },
};

export default { antConfigurations, messages };
