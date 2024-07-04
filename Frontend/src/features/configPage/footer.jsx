import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Layout, Modal, Input, Button } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

const { Footer: AntdFooter } = Layout;

const Footer = ({ content, onEdit }) => {
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
      <Modal
        title="Edit Footer"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Save"
        cancelText="Cancel"
      >
        <Input
          placeholder="Footer Content"
          value={newContent}
          onChange={e => setNewContent(e.target.value)}
        />
      </Modal>
    </AntdFooter>
  );
};

Footer.propTypes = {
  content: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired
};

export default Footer;
