import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Input } from 'antd';
import { SettingOutlined, DeleteOutlined } from '@ant-design/icons';

const Section = ({ title, content1, content2, onDelete, onEdit }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newContent1, setNewContent1] = useState(content1);
  const [newContent2, setNewContent2] = useState(content2);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    onEdit(newTitle, newContent1, newContent2);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <section className="bg-gray-100 p-4 mb-5 pb-4 relative top-16">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <p>{content1}</p>
      <p>{content2}</p>
      <Button
        type="text"
        icon={<SettingOutlined />}
        className="text-gray-500 absolute top-4 right-4"
        onClick={showModal}
      />
      <Button
        type="text"
        icon={<DeleteOutlined />}
        className="text-gray-500 absolute top-4 right-16"
        onClick={onDelete}
      />
      <Modal
        title="Edit Section"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Save"
        cancelText="Cancel"
      >
        <Input
          placeholder="Title"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
        <Input
          placeholder="Content 1"
          value={newContent1}
          onChange={e => setNewContent1(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
        <Input
          placeholder="Content 2"
          value={newContent2}
          onChange={e => setNewContent2(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
      </Modal>
    </section>
  );
};

Section.propTypes = {
  title: PropTypes.string.isRequired,
  content1: PropTypes.string,
  content2: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
};

export default Section;
