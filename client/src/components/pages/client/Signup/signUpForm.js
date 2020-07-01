import React, { useState } from 'react';
import { Form, InputNumber, Button, ConfigProvider, Input } from 'antd';
import Typography from '../../../Common/Typography';

const layout = {
  labelCol: { span: 16 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: '${label} مطلوب!',
  types: {
    email: '${label} is not validate email!',
    number: '${label} is not a validate number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const SignupForm = () => {
  const onFinish = (values) => {
    console.log(values);
  };
  return (
    <ConfigProvider direction="rtl">
      <Form
        className="signUp__form"
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Typography type="title" level={4} Content="تسجيل الدخول" />
        <Form.Item
          className="signUp__item"
          name={['user', 'name']}
          label="الاسم الكامل"
          rules={[{ required: true }]}
        >
          <Input className="signUp__input" />
        </Form.Item>
        <Form.Item
          className="signUp__item"
          name={['user', 'email']}
          label="البريد الالكتروني"
          rules={[{ type: 'email' }]}
        >
          <Input className="signUp__input" />
        </Form.Item>
        <Form.Item
          className="signUp__item"
          name={['user', 'email']}
          label="كلمة المرور"
          rules={[{ type: 'password' }]}
        >
          <Input className="signUp__input" />
        </Form.Item>
        <Form.Item
          className="signUp__item"
          name={['user', 'email']}
          label="تاكيد كلمة المرور"
          rules={[{ type: 'rePassword' }]}
        >
          <Input className="signUp__input" />
        </Form.Item>
        <Form.Item
          className="signUp__item"
          name={['user', 'email']}
          label="حساب البنك"
          rules={[{ type: 'rePassword' }]}
        >
          <Input className="signUp__input" />
        </Form.Item>
        <Form.Item
          className="signUp__item"
          name={['user', 'email']}
          label="رقم الحساب"
          rules={[{ type: 'rePassword' }]}
        >
          <Input className="signUp__input" />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 0 }}>
          <Button type="primary" htmlType="submit" className="signUp__submit">
            تسجيل
          </Button>
        </Form.Item>
      </Form>
    </ConfigProvider>
  );
};
export default SignupForm;
