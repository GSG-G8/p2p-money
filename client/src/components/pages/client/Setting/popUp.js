import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import { Modal, Button, Input } from 'antd';
import Alert from '../../../Common/Alert';

const PopUp = ({ fullName, avatar, changeAvatar }) => {
  const [visible, setVisible] = useState(false);
  const [image, setImage] = useState(avatar);
  const [aletMsg, setAlertMsg] = useState([]);
  const [loading, setLoading] = useState(false);

  const showModal = () => setVisible(true);

  const handleOk = async () => {
    try {
      setLoading(true);
      const updateSetting = await Axios.patch('/api/v1/client', {
        avatar: image,
        fullName,
      });
      console.log(updateSetting.data.message);
      setLoading(false);
      setAlertMsg([
        ...aletMsg,
        <Alert message="تمت العملية" description="تم تحديث الصورة بنجاح" />,
      ]);
      setTimeout(() => {
        setAlertMsg([]);
      }, 2000);
    } catch (error) {
      console.log(error.message);
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
        // onOk={changeAvatar(image)}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            رجوع
          </Button>,
          <Button
            onOk={console.log('asdsadas')}
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
        />
      </Modal>
    </div>
  );
};

PopUp.propTypes = {
  fullName: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  changeAvatar: PropTypes.func.isRequired,
};

export default PopUp;
