import React, { useState, useEffect } from 'react';
import { Switch, Input, Button, Form, ConfigProvider } from 'antd';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import Axios from 'axios';
import Typography from '../../../Common/Typography';
import SelectBox from '../../../Common/selectBox';
import Alert from '../../../Common/Alert';

// import Button from '../../../Common/Button';
import PopUp from './popUp';

import './style.css';

const { TextArea } = Input;

const Setting = ({ ClientData }) => {
  const [aletMsg, setAlertMsg] = useState([]);
  const [clientInfo, setClientInfo] = useState(ClientData);

  const handleSubmit = async (values) => {
    try {
      const updateSetting = await Axios.patch('/api/v1/client', {
        ...values,
        mainBankName: values.mainBankName.key || values.mainBankName,
      });
      console.log(updateSetting.data.message);
      setAlertMsg([
        ...aletMsg,
        <Alert message="تمت العملية" description="تم تحديث بياناتك بنجاح" />,
      ]);
      setTimeout(() => {
        setAlertMsg([]);
      }, 2000);
    } catch (error) {
      console.log(error.message);
    }
  };

  // useEffect(() => {
  //   setClientInfo(clientInfo);
  // }, [clientInfo]);

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
  } = clientInfo;
  return (
    <>
      {aletMsg}
      <ConfigProvider direction="rtl">
        <Helmet>
          <title>الاعدادات</title>
        </Helmet>
        <div className="page-title">
          <Typography Content="الاعدادات" />
        </div>
        <div className="settings-wrapper">
          <div className="avatar">
            <img className="avatar-preview" src={avatar} alt="avtar-preview" />
            <PopUp fullName={fullName} avatar={avatar} />
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
                <Form.Item name="oldPassword">
                  <Input.Password
                    type="password"
                    className="password-input"
                    placeholder="كلمة المرور السابقة"
                  />
                </Form.Item>
              </div>
              <div className="setting-item">
                <Typography Content="كلمة المرور الجديدة" />
                <Form.Item name="newPassword">
                  <Input.Password
                    type="password"
                    className="password-input"
                    placeholder="أدخل كلمة المررور الجديدة"
                  />
                </Form.Item>
              </div>
              <div className="setting-item">
                <Typography Content="تأكيد كلمة المرور الجديدة" />
                <Form.Item name="passwordConfirmation">
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
                <Form.Item initialValue={activeAccount} name="activeAccount">
                  <Switch defaultChecked={activeAccount} />
                </Form.Item>
              </div>
              <div className="setting-item">
                <Typography Content="النشرة البريدية" />
                <Form.Item initialValue={newsLetter} name="newsLetter">
                  <Switch defaultChecked={newsLetter} />
                </Form.Item>
              </div>
              <div className="setting-item">
                <Typography Content="الاقتراحات او الشكاوي" />
                <Form.Item initialValue={feedback} name="feedback">
                  <TextArea
                    rows={5}
                    className="form-textarea"
                    placeholder="اذا كان لديك شكوى او اقتراح ارسلها الينا"
                  />
                </Form.Item>
              </div>
              <div className="setting-item">
                <Button type="primary" htmlType="submit">
                  تحديث البيانات
                </Button>
              </div>
            </Form>
          </div>
        </div>
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
};
export default Setting;
