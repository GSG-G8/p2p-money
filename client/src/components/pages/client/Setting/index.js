import React, { useState } from 'react';
import { Switch, Input, Button, Form, ConfigProvider } from 'antd';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import Axios from 'axios';
import Typography from '../../../Common/Typography';
import SelectBox from '../../../Common/selectBox';
import Alert from '../../../Common/Alert';

import AvatarPop from './AvatarPop';

import './style.css';

const { TextArea } = Input;

const EmptyOrNull = (value) => value == null || value.length === 0;
const isNull = (value) => value === null;

const Setting = ({ ClientData, setClientData }) => {
  const [aletMsg, setAlertMsg] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      let upddateVals;
      const {
        newPassword,
        oldPassword,
        passwordConfirmation,
        ...rest
      } = values;

      if (!isNull(newPassword, oldPassword, passwordConfirmation)) {
        const updatedValue = {
          ...rest,
          feedback: values.feedback === null ? '' : values.feedback,
          mainBankName: rest.mainBankName.key || rest.mainBankName,
        };
        upddateVals = updatedValue;
      } else {
        const updatedValue = {
          ...values,
          feedback: values.feedback === null ? '' : values.feedback,
          mainBankName: values.mainBankName.key || values.mainBankName,
        };
        upddateVals = updatedValue;
      }
      if (!EmptyOrNull(newPassword, oldPassword, passwordConfirmation)) {
        setAlertMsg([
          <Alert
            type="error"
            message="فشلت العملية"
            description={
              EmptyOrNull(passwordConfirmation)
                ? 'قم بكتابة تأكيد كلمة المرور'
                : 'كلمة المرور السابقة غير صحيحة'
            }
          />,
          ...aletMsg,
        ]);
        setTimeout(() => {
          setAlertMsg([]);
          setLoading(false);
        }, 4000);
      } else {
        const updateSettings = await Axios.patch('/api/v1/client', upddateVals);
        if (updateSettings) {
          setClientData({ ...ClientData, ...upddateVals });
          setLoading(false);
          setAlertMsg([
            <Alert
              message="تمت العملية"
              description="تم تحديث بياناتك بنجاح"
            />,
            ...aletMsg,
          ]);
          setTimeout(() => {
            setAlertMsg([]);
          }, 2000);
        }
      }
    } catch (error) {
      setAlertMsg([
        <Alert
          type="error"
          message="فشلت العملية"
          description="حدث خطأ اثناء التحديث"
        />,
        ...aletMsg,
      ]);
      setTimeout(() => {
        setAlertMsg([]);
        setLoading(false);
      }, 4000);
    }
  };

  const {
    avatar,
    fullName,
    email,
    bankAccounts,
    defaultCurrency,
    newsLetter,
    feedback,
    activeAccount,
    mainBankName,
  } = ClientData;
  return (
    <>
      {!ClientData && <div>loading......</div>}
      <div className="alert-wrappper">{aletMsg}</div>
      <ConfigProvider direction="rtl">
        <Helmet>
          <title>الاعدادات</title>
        </Helmet>
        <div className="page-title">
          <Typography className="age-title__sub" Content="الاعدادات" />
        </div>
        {ClientData && (
          <div className="settings-wrapper">
            <div className="avatar">
              <img
                className="avatar-preview"
                src={avatar}
                alt="avtar-preview"
              />
              <AvatarPop
                setAvatar={setClientData}
                fullName={fullName}
                avatar={avatar}
                ClientData={ClientData}
              />
            </div>
            <div className="form-wrapper">
              <Form onFinish={handleSubmit}>
                <div className="setting-item">
                  <Typography Content="الاسم الكامل" />
                  <Form.Item
                    rules={[
                      { required: true, message: 'الرجاء إدخال الاسم الكامل' },
                    ]}
                    initialValue={fullName}
                    name="fullName"
                  >
                    <Input
                      className="input-custom"
                      placeholder="أدخل اسمك الكامل"
                    />
                  </Form.Item>
                </div>
                <div className="setting-item">
                  <Typography Content="البريد الالكتروني" />
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: 'الرجاء إدخال البريد الالكتروني',
                      },
                      {
                        type: 'email',
                        message: 'قم بإدخال بريد إلكتروني صحيح',
                      },
                    ]}
                    initialValue={email}
                    name="email"
                  >
                    <Input
                      className="input-custom"
                      placeholder="أدخل بريدك الالكتروني"
                    />
                  </Form.Item>
                </div>
                <div className="setting-item">
                  <Typography Content="كلمة المرور السابقة" />
                  <Form.Item
                    name="oldPassword"
                    rules={[
                      {
                        pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}/,
                        message: `يجب ان تحتوي على ارقام وحروف وموز مثال :- test@1234`,
                      },
                    ]}
                  >
                    <Input.Password
                      type="password"
                      className="password-input"
                      placeholder="كلمة المرور السابقة"
                    />
                  </Form.Item>
                </div>
                <div className="setting-item">
                  <Typography Content="كلمة المرور الجديدة" />
                  <Form.Item
                    rules={[
                      {
                        pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}/,
                        message: `يجب ان تحتوي على ارقام وحروف وموز مثال :- test@1234`,
                      },
                    ]}
                    name="newPassword"
                  >
                    <Input.Password
                      type="password"
                      className="password-input"
                      placeholder="أدخل كلمة المررور الجديدة"
                    />
                  </Form.Item>
                </div>
                <div className="setting-item">
                  <Typography Content="تأكيد كلمة المرور الجديدة" />
                  <Form.Item
                    rules={[
                      {
                        required: false,
                        message: 'الرجاء تأكيد كلمة المرور الجديدة',
                      },
                      ({ getFieldValue }) => ({
                        validator(rule, value) {
                          if (
                            !value ||
                            getFieldValue('newPassword') === value
                          ) {
                            return Promise.resolve();
                          }
                          const message = 'تاكيد كلمة المرور غير صحيح';
                          return Promise.reject(message);
                        },
                      }),
                    ]}
                    name="passwordConfirmation"
                  >
                    <Input.Password
                      type="password"
                      className="password-input"
                      placeholder="تأكيد كلمة المرور الجديدة"
                    />
                  </Form.Item>
                </div>
                <div className="setting-item">
                  <Typography Content="العملة الرئيسية" />
                  <Form.Item
                    rules={[
                      {
                        type: 'string',
                      },
                    ]}
                    initialValue={defaultCurrency}
                    name="defaultCurrency"
                  >
                    <SelectBox
                      className="select-settings"
                      elements={['USD', 'ILS', 'JOD', 'EUR', 'EGP']}
                      placeholder="أدخل العملة الرئيسية"
                    />
                  </Form.Item>
                </div>
                <div className="setting-item">
                  <Typography Content="حساب البنك الرئيسي" />
                  <Form.Item initialValue={mainBankName} name="mainBankName">
                    <SelectBox
                      elements={bankAccounts.map(({ bankName }) => (
                        <div key={bankName}>{bankName}</div>
                      ))}
                      className="select-settings"
                      placeholder="أدخل حساب البنك الرئيسي"
                    />
                  </Form.Item>
                </div>
                <div className="setting-item">
                  <Typography Content="ايقاف التحويلات" />
                  <Form.Item
                    initialValue={activeAccount}
                    valuePropName="checked"
                    name="activeAccount"
                  >
                    <Switch defaultChecked={activeAccount} />
                  </Form.Item>
                </div>
                <div className="setting-item">
                  <Typography Content="النشرة البريدية" />
                  <Form.Item
                    valuePropName="checked"
                    initialValue={newsLetter}
                    name="newsLetter"
                  >
                    <Switch defaultChecked={newsLetter} />
                  </Form.Item>
                </div>
                <div className="setting-item">
                  <Typography Content="الاقتراحات او الشكاوي" />
                  <Form.Item
                    rules={[
                      {
                        type: 'string',
                      },
                    ]}
                    initialValue={feedback}
                    name="feedback"
                  >
                    <TextArea
                      rows={5}
                      className="form-textarea"
                      placeholder="اذا كان لديك شكوى او اقتراح ارسلها الينا"
                    />
                  </Form.Item>
                </div>
                <div className="setting-item">
                  <Button loading={loading} type="primary" htmlType="submit">
                    تحديث البيانات
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        )}
      </ConfigProvider>
    </>
  );
};

Setting.propTypes = {
  ClientData: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
  setClientData: PropTypes.func.isRequired,
};

export default Setting;
