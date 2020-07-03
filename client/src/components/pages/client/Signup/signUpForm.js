import React, { useState } from 'react';
import {
  Form,
  InputNumber,
  Button,
  ConfigProvider,
  Input,
  Select,
  Modal,
} from 'antd';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Typography from '../../../Common/Typography';
import Configurations from './AntFormantConfigurations';
import InputText from '../../../Common/TextInput';
import Alert from '../../../Common/Alert';
import fireBase from './firebase';

const { Option } = Select;
const { firebase, SubmitByEmail } = fireBase;
const { antConfigurations, messages } = Configurations;

const prefixSelector = (
  <Form.Item name="prefix" noStyle>
    <Select defaultValue="+970" style={{ width: 75 }}>
      <Option value="+97">97+</Option>
      <Option value="+97">97+</Option>
    </Select>
  </Form.Item>
);
const SignupForm = () => {
  const [LogMobile, setMobile] = useState();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState();
  const [code, setCode] = useState();
  const [popUp, setPopUp] = useState(false);

  const [form] = Form.useForm();
  const history = useHistory();

  const addUserToDatabase = (user) => {
    axios
      .post('/api/v1/signup', user)
      .then(() => {
        form.resetFields();
        window.localStorage.removeItem('User_Data');
        setTimeout(() => {
          history.push('/');
        }, 5 * 1000);
        setAlert(messages.addUserSuccess);
      })
      .catch(() => {
        window.localStorage.removeItem('User_Data');
        setLoading(false);
        setAlert(messages.addUserFailed);
      });
  };

  (() => {
    if (window.localStorage.getItem('User_Data'))
      if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
        const userData = JSON.parse(window.localStorage.getItem('User_Data'));
        const { email } = userData;
        return firebase
          .auth()
          .signInWithEmailLink(email, window.location.href)
          .then(() => {
            addUserToDatabase(userData);
          })
          .catch(() => {
            window.localStorage.removeItem('User_Data');
            setAlert(messages.emailVerificationFailed);
            setLoading(false);
          });
      }
  })();

  const setUpRecaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      'sign-in-container',
      {
        size: 'invisible',
        callback() {
          mobileVerification();
        },
      }
    );
  };

  const mobileVerification = (userData) => {
    setAlert(messages.mobileCodeSent);
    form.resetFields();
    setUpRecaptcha();
    const phoneNumber = `+97 ${userData.mobileNumber}`;
    const appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        setLoading(false);
        window.confirmationResult = confirmationResult;
        setPopUp(true);
        window.userData = userData;
      })
      .catch(() => {
        setLoading(false);
        setAlert(messages.mobileUsed);
      });
  };
  const handelCode = () => {
    window.confirmationResult
      .confirm(code)
      .then(() => addUserToDatabase(window.userData))
      .catch(() => {
        setAlert(messages.mobileCodeWrong);
      });
  };

  const onFinish = ({ user }) => {
    setLoading(true);
    if (user.email) {
      SubmitByEmail(user);
      setAlert(messages.emailSent);
    } else if (user.mobileNumber) {
      mobileVerification(user);
    }
  };

  return (
    <ConfigProvider direction="rtl">
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          className="signUp__alert"
        />
      )}
      <Typography type="title" level={4} Content="حساب جديد" />
      <Form
        {...antConfigurations.formItemLayout}
        form={form}
        className="signUp__form"
        {...antConfigurations.layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={antConfigurations.validateMessages}
      >
        <Form.Item
          name={['user', 'fullName']}
          label="الاسم الكامل"
          rules={[{ required: true }]}
        >
          <Input className="signUp__input" />
        </Form.Item>
        {LogMobile ? (
          <Form.Item
            name={['user', 'mobileNumber']}
            label="رقم الموبايل"
            rules={[
              {
                types: 'number',
                required: true,
                validator: (role, val) =>
                  antConfigurations.checkMobileNumber(val),
              },
            ]}
          >
            <Input addonAfter={prefixSelector} className="signUp__input" />
          </Form.Item>
        ) : (
          <Form.Item
            name={['user', 'email']}
            label="البريد الالكتروني"
            rules={[{ type: 'email', required: true }]}
          >
            <Input className="signUp__input" />
          </Form.Item>
        )}
        <Form.Item
          name={['user', 'password']}
          label="كلمة المرور "
          rules={[
            {
              types: 'password',
              required: true,
              validator: (role, val) => antConfigurations.validatePassword(val),
            },
          ]}
        >
          <Input.Password className="signUp__input" />
        </Form.Item>

        <Form.Item
          name={['user', 'passwordConfirmation']}
          label="تاكيد كلمة المرور"
          dependencies={['user', 'password']}
          rules={[
            {
              types: 'password',
              required: true,
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue(['user', 'password']) === value) {
                  return Promise.resolve();
                }
                const message = 'تاكيد كلمة المرور غير صحيح';
                return Promise.reject(message);
              },
            }),
          ]}
        >
          <Input.Password className="signUp__input" />
        </Form.Item>
        <Form.Item
          name={['user', 'mainBankName']}
          label="حساب البنك"
          rules={[{ required: true }]}
        >
          <Select style={{ width: '20rem', height: '2rem' }}>
            <Option value="بنك فلسطين">بنك فلسطين </Option>
            <Option value="بنك الإسكان">بنك الإسكان</Option>
            <Option value="بنك القدس">بنك القدس</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name={['user', 'mainBankAccount']}
          label="رقم الحساب"
          rules={[{ required: true }]}
        >
          <InputNumber min={1} className="signUp__input" />
        </Form.Item>
        <Form.Item
          wrapperCol={{ ...antConfigurations.layout.wrapperCol, offset: 7 }}
        >
          <Button
            loading={loading}
            type="primary"
            htmlType="submit"
            className="signUp__submit"
          >
            تسجيل
          </Button>
          <Typography
            level=".6rem"
            className="signUp__privacy"
            Content="بالنقر فوق تسجيل ، فإنك توافق على الشروط والأحكام وسياسة الخصوصية"
          />
          <Typography
            align="center"
            className="signUp__link"
            Content={
              <p>
                هل لديك حساب؟
                <Link to="/login"> تسجيل الدخول </Link> أو
                {!LogMobile ? (
                  <Link
                    to="/signup"
                    onClick={() => {
                      setLoading(false);
                      setMobile(true);
                    }}
                  >
                    &nbsp; التسجيل برقم الهاتف
                  </Link>
                ) : (
                  <Link
                    to="/signup"
                    onClick={() => {
                      setLoading(false);
                      setMobile(false);
                    }}
                  >
                    &nbsp; بالبريد الالكتروني
                  </Link>
                )}
              </p>
            }
          />
        </Form.Item>
      </Form>
      <div id="sign-in-container" />
      <Modal
        visible={popUp}
        onOk={() => {
          setPopUp(false);
          handelCode();
        }}
        onCancel={() => {
          setPopUp(false);
        }}
        title="تحقق من الكود التفعيل في هاتفك"
        okText="تفعيل"
        cancelText="إالغاء"
      >
        <InputText
          value={code}
          type="number"
          placeholder=" ادخل كود التفعيل "
          handleChange={(e) => setCode(e.target.value)}
        />
      </Modal>
    </ConfigProvider>
  );
};
export default SignupForm;
