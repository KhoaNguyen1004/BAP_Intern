import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Layout, Button, Modal, Input, Card } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import Popup from '../../components/Popup';
const { Header: AntdHeader } = Layout;

const Header = ({ logo, title, onEdit, isEditable }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newLogo, setNewLogo] = useState(logo);
  const [newTitle, setNewTitle] = useState(title);

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
    <AntdHeader
      className="bg-slate-500"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 5,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        padding: '0px 20px',
        gap: '20%',
        height: '64px'
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
        <p className="text-2xl text-black m-0">{logo}</p>
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
          {title}
        </h1>
      </div>
      {isEditable && (
        <Button
          type="text"
          icon={<SettingOutlined />}
          className="text-white"
          style={{
            position: 'absolute',
            top: '50%',
            right: '50px',
            transform: 'translateY(-50%)'
          }}
          onClick={showModal}
        />
      )}
      <Popup
        title="Edit Header"
        isOpen={isModalVisible}
        onConfirm={handleOk}
        onCancel={handleCancel}
        text="Save"
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
          style={{ marginBottom: '10px' }}
        />
        <Card
          className="bg-slate-500"
          style={{
            marginTop: '10px',
            borderRadius: '5px',
            padding: '5px'
          }}
        >
          <div
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '20%'
            }}
          >
            <div
              style={{
                backgroundColor: 'white',
                borderRadius: '100%',
                marginLeft: '20px',
                padding: '5px',
                display: 'inline-block'
              }}
            >
              <p className="text-2xl text-black m-0">{newLogo}</p>
            </div>
            <div
              style={{
                width: '200px',
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
                {newTitle}
              </h1>
            </div>
          </div>
        </Card>
      </Popup>
    </AntdHeader>
  );
};

Header.propTypes = {
  logo: PropTypes.string,
  title: PropTypes.string.isRequired,
  onEdit: PropTypes.func,
  isEditable: PropTypes.bool
};

Header.defaultProps = {
  isEditable: true
};

export default Header;
