import React, { useState, useEffect } from 'react';
import { List, Avatar, Card } from 'antd';
import axios from 'axios';

import './style.css';

const getPrices = async () => {
  await axios.get('/api/v1/prices');
};

const UpdatePriceForm = async () => {
  const [prices, setPrices] = useState();
  const [alert, setAlert] = useState();

  useEffect(() => {
    if (!prices)
      getPrices.then(setPrices).catch(
        setAlert({
          type: 'warning',
          message: 'حدثت مشكلة تاكد من اتصالك بقا',
        })
      );
  });
};

export default UpdatePriceForm;
