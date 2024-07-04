import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Layout, Button, Modal, Input } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

const { Header: AntdHeader } = Layout;

const Header = ({ logo, title, onEdit }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newLogo, setNewLogo] = useState(logo);
  const [newTitle, setNewTitle] = useState(title);

  // Update internal state if props change (e.g., editing logo/title from ConfigPage)
  useEffect(() => {
    setNewLogo(logo);
    setNewTitle(title);
  }, [logo, title]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    onEdit(newLogo, newTitle);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <AntdHeader
        className="bg-slate-500"
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          zIndex: 5,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          padding: '0px 20px',
          gap: '20%'
        }}
      >
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '100%',
            marginLeft: '50px',
            padding: '5px',
            display: 'inline-block'
          }}
        >
          <p className="text-2xl text-black m-0">{newLogo}</p>{' '}
          {/* Use newLogo state here */}
        </div>
        <div
          style={{
            width: '600px',
            textAlign: 'center',
            alignItems: 'center'
          }}
        >
          <h1
            className="text-2xl text-black m-0"
            style={{
              backgroundColor: '#fff',
              padding: '5px 20px',
              borderRadius: '5px'
            }}
          >
            {newTitle} {/* Use newTitle state here */}
          </h1>
        </div>
        <Button
          type="text"
          icon={<SettingOutlined />}
          className="text-white absolute top-4 right-4"
          onClick={showModal}
        />
      </AntdHeader>
      <Modal
        title="Edit Header"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Save"
        cancelText="Cancel"
      >
        <Input
          placeholder="Logo"
          value={newLogo}
          onChange={e => setNewLogo(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
        <Input
          placeholder="Title"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
        />
      </Modal>
    </div>
  );
};

Header.propTypes = {
  logo: PropTypes.string,
  title: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired
};

export default Header;
