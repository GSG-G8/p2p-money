import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import { Modal, Button, Input } from 'antd';
import Alert from '../../../Common/Alert';

const AvatarPop = ({ setAvatar, ClientData }) => {
  const [visible, setVisible] = useState(false);
  const [image, setImage] = useState(ClientData.avatar);
  const [aletMsg, setAlertMsg] = useState([]);
  const [loading, setLoading] = useState(false);

  const { avatar, fullName } = ClientData;

  const showModal = () => setVisible(true);

  const handleOk = async () => {
    try {
      setLoading(true);
      await Axios.patch('/api/v1/client', {
        avatar: image,
        fullName,
      });
      setAvatar({ ...ClientData, avatar: image });
      setLoading(false);
      setAlertMsg([
        ...aletMsg,
        <Alert message="تمت العملية" description="تم تحديث الصورة بنجاح" />,
      ]);
      setTimeout(() => {
        setAlertMsg([]);
      }, 2000);
    } catch (error) {
      setAlertMsg([
        <Alert
          type="error"
          message="فشلت العملية"
          description="حدث خطأ اثناء تحديث الصورة"
        />,
        ...aletMsg,
      ]);
      setTimeout(() => {
        setAlertMsg([]);
        setLoading(false);
      }, 4000);
    }

    setVisible(false);
  };

  const handleCancel = () => setVisible(false);
  return (
    <div>
      <Button className="avatar-btn" type="primary" onClick={showModal}>
        تغيير الصورة
      </Button>
      <Modal
        visible={visible}
        title="تغيير صورة البروفايل"
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            رجوع
          </Button>,
          <Button
            loading={loading}
            key="submit"
            type="primary"
            onClick={() => handleOk()}
          >
            حفظ
          </Button>,
        ]}
      >
        <img
          className="pop-image"
          onError={() => setImage(avatar)}
          src={image || avatar}
          alt=""
        />
        <Input
          className="input-custom"
          onChange={(e) => setImage(e.target.value)}
          placeholder="أدخل رابط الصورة"
          // onError={() => setImage(avatar)}
        />
      </Modal>
    </div>
  );
};

AvatarPop.propTypes = {
  ClientData: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
  setAvatar: PropTypes.func.isRequired,
};

export default AvatarPop;
