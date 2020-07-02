import React from 'react';
import { Switch, Input } from 'antd';
import TextInput from '../../../Common/TextInput';
import SelectBox from '../../../Common/selectBox';
import Typography from '../../../Common/Typography';
import Button from '../../../Common/Button';

import './style.css';

const { TextArea } = Input;

const Setting = ({ ClientData }) => {
  console.log(ClientData.result[0].clientData);
  const {
    fullName,
    avatar,
    email,
    mainBankName,
    bankAccounts,
    defaultCurrency,
  } = ClientData.result[0].clientData;
  const banksArr = <div>{bankAccounts.map((bank) => bank.bankName)}</div>;
  return (
    <>
      <div className="setting-page">
        <div className="setting">
          <div className="setting-item">
            <Typography Content="الاسم الشخصي" />
            <TextInput value={fullName} placeholder="أدخل اسمك الشخصي" />
          </div>
          <div className="setting-item">
            <Typography Content="البريد الالكتروني" />
            <TextInput value={email} placeholder="أدخل بريدك الالكتروني" />
          </div>
          <div className="setting-item">
            <Typography Content="الصورة الشخصية" />
            <TextInput value={avatar} placeholder="أدخل رابط الصورة الشخصية" />
          </div>

          <div className="setting-item">
            <Typography Content="كلمة المرور السابقة" />
            <TextInput placeholder="كلمة المرور السابقة" />
          </div>
          <div className="setting-item">
            <Typography Content="كلمة المرور الجديدة" />
            <TextInput placeholder="أدخل كلمة المرور الجديدة" />
          </div>
          <div className="setting-item">
            <Typography Content="العملة الرئيسية" />
            <SelectBox
              value={defaultCurrency}
              placeholder="أدخل العملة الرئيسية"
            />
          </div>
          <div className="setting-item">
            <Typography Content="حساب البنك الرئيسي" />
            <SelectBox
              value={mainBankName}
              elements={banksArr.props.children}
              placeholder="اختر الحساب البنك الرئيسي"
            />
          </div>
          <div className="setting-item">
            <Typography Content="ايقاف التحويل" />
            <Switch />
          </div>
          <div className="setting-item">
            <Typography Content="النشرة البريدية" />
            <Switch />
          </div>
          <div className="setting-item">
            <Typography Content="الشكاوي والاقتراحات" />
            <TextArea
              rows={4}
              placeholder="اذا كان لديك اقتراح او شكوى اكتبه هنا"
            />
          </div>
          <div className="setting-item">
            <Button>تحديث</Button>
          </div>
        </div>
        <div>
          <img className="avatar__prev" src={avatar} alt="profile-preivew" />
        </div>
      </div>
    </>
  );
};

export default Setting;
