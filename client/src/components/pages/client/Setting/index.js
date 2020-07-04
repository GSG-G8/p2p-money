import React from 'react';
import { Switch, Input } from 'antd';
import Helmet from 'react-helmet';
import TextInput from '../../../Common/TextInput';
import Typography from '../../../Common/Typography';
import SelectBox from '../../../Common/selectBox';
import Button from '../../../Common/Button';

import './style.css';

const { TextArea } = Input;

const Setting = () => (
  <>
    <Helmet>
      <title>الاعدادات</title>
    </Helmet>
    <Typography Content="الاعدادات" />
    <div className="settings-wrapper">
      <div className="avatar">
        <img
          className="avatar-preview"
          src="https://media1.popsugar-assets.com/files/thumbor/aE3EHrt_FvLGy30jPKfZPWg__qM/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2018/08/17/651/n/1922283/99dde2155b76ddb9115023.04123404_/i/World-Highest-Paid-Actress-2018.jpg"
          alt="avtar-preview"
        />
      </div>
      <div className="form-wrapper">
        <div className="setting-item">
          <Typography Content="الاسم الكامل" />
          <TextInput placeholder="أدخل اسمك الكامل" />
        </div>
        <div className="setting-item">
          <Typography Content="البريد الالكتروني" />
          <TextInput placeholder="أدخل بريدك الالكتروني" />
        </div>
        <div className="setting-item">
          <Typography Content="كلمة المرور القديمة" />
          <TextInput placeholder="كلمة المرور الجديدة" />
        </div>
        <div className="setting-item">
          <Typography Content="كلمة المرور الجديدة" />
          <TextInput placeholder="أدخل كلمة المررور الجديدة" />
        </div>
        <div className="setting-item">
          <Typography Content="العملة الرئيسية" />
          <SelectBox placeholder="أدخل العملة الرئيسية" />
        </div>
        <div className="setting-item">
          <Typography Content="حساب البنك الرئيسي" />
          <SelectBox placeholder="أدخل حساب البنك الرئيسي" />
        </div>
        <div className="setting-item">
          <Typography Content="ايقاف التحويلات" />
          <Switch />
        </div>
        <div className="setting-item">
          <Typography Content="النشرة البريدية" />
          <Switch />
        </div>
        <div className="setting-item">
          <Typography Content="الاقتراحات او الشكاوي" />
          <TextArea placeholder="اذا كان لديك شكوى او اقتراح ارسلها الينا" />
        </div>
        <div className="setting-item">
          <Button Content="تحديث البيانات" />
        </div>
      </div>
    </div>
  </>
);

export default Setting;
