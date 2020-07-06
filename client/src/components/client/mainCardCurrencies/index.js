import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const MainCardCurrencies = ({ Content, className }) => (
  <div className={`main-card-currencies ${className}`} dir="rtl">
    <div className="top-curricle" />
    <div className="bottom-curricle" />
    {Content}
  </div>
);

MainCardCurrencies.prototype = {
  Content: PropTypes.node,
  className: PropTypes.string,
};
MainCardCurrencies.defaultProps = {
  className: '',
};

export default MainCardCurrencies;
