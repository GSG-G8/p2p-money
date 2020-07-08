import React from 'react';
import { Result, Button } from 'antd';

const Error404 = () => (
  <Result
    status="404"
    title="404"
    subTitle="للأسف، الصفحة المطلوبة غير موجودة"
    extra={
      <Button
        type="primary"
        onClick={() => {
          window.location.replace('/');
        }}
      >
        الرجوع للصفحة الرئيسية
      </Button>
    }
  />
);

export default Error404;
