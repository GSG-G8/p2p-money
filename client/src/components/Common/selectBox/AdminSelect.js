import React from 'react';
import { Select, ConfigProvider } from 'antd';
import PropTypes from 'prop-types';

import 'antd/dist/antd.css';
import './style.css';

const { Option } = Select;
const elements = [
  { value: '30daysAgo', name: 'آخر 30 يوم' },
  { value: '7daysAgo', name: 'آخر 7 أيام' },
  { value: '3daysAgo', name: 'آخر 3 أيام' },
  { value: 'today', name: 'اليوم' },
];
const AdminSelect = ({ onChange, placeholder, className }) => (
  <div className="custom-select">
    <ConfigProvider direction="rtl">
      <Select
        defaultValue={elements[3].name}
        direction="rtl"
        className={`full-width ${className}`}
        placeholder={placeholder}
        onChange={onChange}
      >
        {elements.map(({ value, name }) => (
          <Option key={value} value={value}>
            {name}
          </Option>
        ))}
      </Select>
    </ConfigProvider>
  </div>
);

AdminSelect.propTypes = {
  onChange: PropTypes.func,
  placeholder: PropTypes.string.isRequired,
  className: PropTypes.string,
};

AdminSelect.defaultProps = {
  onChange: () => {},
  className: '',
};

export default AdminSelect;
