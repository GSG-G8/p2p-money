import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const MainCardCurrencies = ({ Content }) => (
  <div className="main-card-currencies" dir="rtl">
    <div className="top-curricle" />
    <div className="bottom-curricle" />
    {Content}
  </div>
);

export default MainCardCurrencies;

MainCardCurrencies.prototype = {
  Content: PropTypes.node,
};
