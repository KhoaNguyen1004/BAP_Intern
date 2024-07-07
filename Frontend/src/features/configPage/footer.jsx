import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Layout, Modal, Input, Button, Card } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import Popup from '../../components/Popup';

const { Footer: AntdFooter } = Layout;

const Footer = ({ content, onEdit, isEditable }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newContent, setNewContent] = useState(content);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    onEdit(newContent);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <AntdFooter
      className="bg-slate-500"
      style={{
        position: 'fixed',
        bottom: 0,
        right: 0,
        zIndex: 10,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <h1
        className="text-sm text-white m-0"
        style={{
          textAlign: 'center'
        }}
      >
        {content}
      </h1>
      {isEditable && (
        <Button
          type="text"
          icon={<SettingOutlined />}
          className="text-white"
          style={{
            position: 'absolute',
            top: '50%',
            right: '20px',
            transform: 'translateY(-50%)'
          }}
          onClick={showModal}
        />
      )}
      <Popup
        title="Edit Footer"
        isOpen={isModalVisible}
        onConfirm={handleOk}
        onCancel={handleCancel}
        text="Save"
      >
        <Input
          placeholder="Footer Content"
          value={newContent}
          onChange={e => setNewContent(e.target.value)}
        />

        <Card
          className="bg-slate-500"
          style={{
            marginTop: '20px',
            textAlign: 'center',
            padding: '15px'
          }}
        >
          <h1 className="text-sm text-white m-0">{newContent}</h1>
        </Card>
      </Popup>
    </AntdFooter>
  );
};

Footer.propTypes = {
  content: PropTypes.string.isRequired,
  onEdit: PropTypes.func,
  isEditable: PropTypes.bool
};

Footer.defaultProps = {
  isEditable: true
};

export default Footer;
