import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Layout, Button, Input, Card } from 'antd';
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
    setNewLogo(logo);
    setNewTitle(title);
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
      <div className="bg-white rounded-full p-2 ml-4 sm:ml-10">
        <p className="text-2xl text-black m-0">{logo}</p>
      </div>
      <div className="flex-1 text-center pr-20">
        <h1 className="text-2xl text-black bg-white p-2 rounded">{title}</h1>
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
          className="mb-4"
        />
        <Input
          placeholder="Title"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          className="mb-4"
        />
        <Card className="bg-slate-500 mt-4 rounded p-4">
          <div className="w-full flex items-center gap-4 sm:gap-20">
            <div className="bg-white rounded-full p-2 ml-4">
              <p className="text-2xl text-black m-0">{newLogo}</p>
            </div>
            <div className="flex-1 text-center">
              <h1 className="text-2xl text-black bg-white p-2 rounded">
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
