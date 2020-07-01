import React from 'react';
import { Helmet } from 'react-helmet';
import Typography from '../../../Common/Typography';
import SignUpForm from './signUpForm';

import './style.css';

const Signup = () => (
  <div className="signUp__container">
    <Helmet>
      <title>SignUp</title>
    </Helmet>
    <div className="signUp__left">
      <SignUpForm />
    </div>
    <div className="signUp__right">
      <Typography
        type="title"
        level={4}
        className="signUp__title"
        Content="تمتع بمبلغ 1000$ و 3000 شيكل كاش بمجرد تسجيل دخولك الآن."
      />
      <Typography
        className="signUp__description"
        Content="افضل سعر بيع وشراء, في اي وقت, وفي اي مكان."
      />
    </div>
  </div>
);

export default Signup;
