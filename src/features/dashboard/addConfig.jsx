import React, { useState } from 'react';
import { Modal, Button, Form, Input, Radio, Checkbox } from 'antd';

const AddConfig = () => {
  const [open, setOpen] = useState(false);
  const [cloneTemplate, setCloneTemplate] = useState(true);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const onFinish = (values) => {
    console.log('Received values:', values);
    setOpen(false);
    const randomId = Math.floor(Math.random() * 1000);
    window.open(`${window.location.origin}/config-page/${randomId}`, '_blank');
  };

  const handleRadioChange = (e) => {
    setCloneTemplate(e.target.value === 'Clone Template');
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add Template
      </Button>
      <Modal
        title="Add Configuration"
        visible={open} 
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button form="addConfigForm" key="submit" type="primary" htmlType="submit">
            Create
          </Button>,
        ]}
      >
        <Form
          id="addConfigForm"
          initialValues={{ configValue: 'Clone Template', header: true, section: true, footer: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <Form.Item
            label="Template Name"
            name="configName"
            rules={[{ required: true, message: 'Please enter template name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Template Options"
            name="configValue"
            rules={[{ required: true, message: 'Please choose an option!' }]}
          >
            <Radio.Group onChange={handleRadioChange}>
              <Radio value="Clone Template">Clone Template</Radio>
              <Radio value="New Template">New Template</Radio>
            </Radio.Group>
          </Form.Item>
          {cloneTemplate && (
            <>
              <Form.Item name="header" valuePropName="checked">
                <Checkbox defaultChecked>Clone Header</Checkbox>
              </Form.Item>
              <Form.Item name="section" valuePropName="checked">
                <Checkbox defaultChecked>Clone Section</Checkbox>
              </Form.Item>
              <Form.Item name="footer" valuePropName="checked">
                <Checkbox defaultChecked>Clone Footer</Checkbox>
              </Form.Item>
            </>
          )}
        </Form>
      </Modal>
    </>
  );
};

export default AddConfig;