import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Form, Button, ConfigProvider, Input, Select } from 'antd';

import Axios from 'axios';
import Typography from '../../../Common/Typography';
import antConfigurations from '../../client/Signup/AntFormantConfigurations';

const { Option } = Select;

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
  const [form] = Form.useForm();
  const history = useHistory();

  const onFinish = async (values) => {
    setLoading(true);
    await Axios.post('/api/v1/login', {
      email: values.user.email,
      password: values.user.password,
      mobileNumber: values.user.mobileNumber
        ? `0${values.user.mobileNumber}`
        : undefined,
    })
      .then(() => history.push('/'))
      .catch(console.log);
  };
  return (
    <ConfigProvider direction="rtl">
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
          wrapperCol={{ ...antConfigurations.layout.wrapperCol, offset: 7 }}
        >
          <Button
            loading={loading}
            type="primary"
            htmlType="submit"
            className="signUp__submit"
          >
            تسجيل الدخول
          </Button>
          <Typography
            align="center"
            className="signUp__link"
            Content={
              <p>
                {!LogMobile ? (
                  <>
                    <Link
                      to="/login"
                      onClick={() => {
                        setLoading(false);
                        setMobile(true);
                      }}
                    >
                      &nbsp; التسجيل برقم الهاتف
                    </Link>
                    <br />
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => {
                        setLoading(false);
                        setMobile(false);
                      }}
                    >
                      &nbsp; التسجيل بالبريد الالكتروني
                    </Link>
                    <br />
                  </>
                )}
                <Link to="/signup"> لا أملك حساب بعد</Link>
              </p>
            }
          />
        </Form.Item>
      </Form>
    </ConfigProvider>
  );
};
export default SignupForm;
