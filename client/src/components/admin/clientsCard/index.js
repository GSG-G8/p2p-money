import React, { useState, useEffect } from 'react';
import { List, Avatar, Card } from 'antd';
import PropTypes from 'prop-types';
import axios from 'axios';

import './style.css';
import 'antd/dist/antd.css';

const getClients = async () => {
  const {
    data: { data },
  } = await axios.get('/api/v1/admin/clients');
  return data;
};

const ClientsCard = ({ className }) => {
  const [data, setData] = useState();

  useEffect(() => {
    if (!data) getClients().then(setData);
  }, [data]);

  return (
    <Card
      dir="rtl"
      hoverable
      className={className}
      cover={
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} className="listItems" />}
                title={item.fullName}
                description={item.email || item.mobileNumber}
              />
            </List.Item>
          )}
        />
      }
    />
  );
};

ClientsCard.propTypes = {
  className: PropTypes.string,
};
ClientsCard.defaultProps = {
  className: 'clientsCard',
};

export default ClientsCard;
