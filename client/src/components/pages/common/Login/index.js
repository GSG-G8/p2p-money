import React from 'react';
import { Helmet } from 'react-helmet';
import Typography from '../../../Common/Typography';
import LoginForm from './LoginForm';
import './style.css';

const Login = () => (
  <div className="signUp__container">
    <Helmet>
      <title>تسجيل الدخول</title>
    </Helmet>
    <div className="signUp__left">
      <LoginForm />
    </div>
    <div className="signUp__right">
      <Typography
        type="title"
        level={4}
        className="signUp__title"
        Content="تبادل الأموال عبر الإنترنت"
      />
      <Typography
        className="signUp__description"
        Content="افضل سعر بيع وشراء, في اي وقت, وفي اي مكان."
      />
    </div>
  </div>
);

export default Login;
