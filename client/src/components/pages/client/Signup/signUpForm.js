import React, { useState } from 'react';
import { Form, InputNumber, Button, ConfigProvider, Input, Select } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Typography from '../../../Common/Typography';
import antConfigurations from './AntFormantConfigurations';
import Alert from '../../../Common/Alert';
import fireBase from './firebase';

const { Option } = Select;
const { firebase, SubmitByEmail } = fireBase;

const prefixSelector = (
  <Form.Item name="prefix" noStyle>
    <Select defaultValue="+970" style={{ width: 75 }}>
      <Option value="+970">970+</Option>
      <Option value="+972">972+</Option>
    </Select>
  </Form.Item>
);

const SignupForm = () => {
  const [LogMobile, setMobile] = useState();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState();
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
        setAlert({
          type: 'success',
          message:
            'تم تسجيل دخولك بنجاح, سيتم توجيهك الى الصفحة الرئيسية خلال 5 ثواني..',
        });
      })
      .catch(() => {
        window.localStorage.removeItem('User_Data');
        setLoading(false);
        setAlert({
          type: 'error',
          message: 'تاكد من البريد الالكتروني,رقم الهاتف ورقم الحساب',
        });
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
            setAlert({
              type: 'error',
              message: 'هذا الحساب مفعل مسبقا برجاء تسجيل الدخول',
            });
            setLoading(false);
          });
      }
  })();

  const onFinish = ({ user }) => {
    setLoading(true);
    if (user.email) {
      SubmitByEmail(user);
      setAlert({
        type: 'warning',
        message: 'تم ارسال بريد الكترونيو برجاء تفعيل حسابك .',
      });
      setLoading(false);
      form.resetFields();
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
      <Typography type="title" level={4} Content="تسجيل الدخول" />
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
    </ConfigProvider>
  );
};
export default SignupForm;
