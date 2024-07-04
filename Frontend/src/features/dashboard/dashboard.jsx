import React, { useState, useContext } from 'react';
import {
  Layout,
  Space,
  Avatar,
  Button,
  Form,
  Input,
  Radio,
  Checkbox,
  Card,
  List
} from 'antd';
import {
  UserOutlined,
  LogoutOutlined,
  SettingOutlined
} from '@ant-design/icons';
import AuthService from '../../services/auth.service';
import Popup from '../../components/Popup';
import { LoadingContext } from '../../contexts/LoadingContext';
import ConfigSection from './configSection';
const { Header, Content } = Layout;

function Dashboard() {
  const { setIsLoading } = useContext(LoadingContext);
  const templateList = [
    { id: 1, name: 'Template 1', value: 'template1' },
    { id: 2, name: 'Template 2', value: 'template2' },
    { id: 3, name: 'Template 3', value: 'template3' },
    { id: 4, name: 'Template 4', value: 'template4' },
    { id: 5, name: 'Template 5', value: 'template5' },
    { id: 6, name: 'Template 6', value: 'template6' }
  ];
  const [selectedTemplate, setSelectedTemplate] = useState(templateList[0].id);
  const [selectedTemplatesToDelete, setSelectedTemplatesToDelete] = useState(
    []
  );

  const [isAddTemplateModalOpen, setIsAddTemplateModalOpen] = useState(false);
  const [isDeleteTemplateModalOpen, setIsDeleteTemplateModalOpen] =
    useState(false);
  const [isConfigTemplateModalOpen, setIsConfigTemplateModalOpen] =
    useState(false);
  const [, setCloneTemplate] = useState(true);

  const username = localStorage.getItem('username');

  const showAddTemplateModal = () => {
    setIsAddTemplateModalOpen(true);
  };

  const showDeleteTemplateModal = () => {
    setIsDeleteTemplateModalOpen(true);
  };
  const showConfigTemplateModal = () => {
    setIsConfigTemplateModalOpen(true);
  };

  const handleCancel = () => {
    setIsAddTemplateModalOpen(false);
    setIsDeleteTemplateModalOpen(false);
    setIsConfigTemplateModalOpen(false);
  };

  const handleConfirmDelete = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    setIsDeleteTemplateModalOpen(false);
  };

  const handleOk = () => {
    setIsAddTemplateModalOpen(false);
    setIsConfigTemplateModalOpen(false);
  };

  const onFinish = values => {
    console.log('Received values:', values);
    setIsAddTemplateModalOpen(false);
    const randomId = Math.floor(Math.random() * 1000);
    window.open(
      `${window.location.origin}/admin/config-page/${randomId}`,
      '_blank'
    );
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const handleRadioChange = e => {
    setCloneTemplate(e.target.value === 'Clone Template');
  };
  const handleSettingClick = templateValue => {
    window.open(
      `${window.location.origin}/admin/config-page/${templateValue}`,
      '_blank'
    );
  };
  const handleTemplateChange = e => {
    setSelectedTemplate(e.target.value);
  };
  const handleTemplateDelete = checkedValues => {
    setSelectedTemplatesToDelete(checkedValues);
  };
  return (
    <div className="min-h-screen">
      <Layout className="min-h-screen w-full">
        <Header className="bg-transparent z-40 mt-4 fixed w-full top-0 right-0 transition-all">
          <div className="rounded-lg h-full shadow-md px-4 bg-white text-end">
            <Space
              size="middle"
              align="center"
              className="text-black hover:text-slate-500"
            >
              <div className="flex">
                <Avatar shape="square" size="large" icon={<UserOutlined />} />
                <div className="ml-2">
                  <p className="text-lg text-start m-0 mb-2 leading-none font-semibold">
                    {username}
                  </p>
                  <p className="m-0 leading-none text-start">role</p>
                </div>
              </div>
              <Button
                type="text"
                icon={<LogoutOutlined />}
                onClick={() => {
                  AuthService.logout();
                  window.location.href = '/login';
                }}
                className="w-full border-none bg-transparent text-start p-0 m-0"
              />
            </Space>
          </div>
        </Header>

        <Content className="bg-transparent rounded-lg mb-4 mx-10 mt-[92px] ">
          <div className="flex">
            <div className="bg-white rounded-lg p-4 shadow-md flex-1">
              <p className="text-lg font-semibold items-start m-[4]">
                Template
              </p>
              <div className="flex flex-wrap">
                {templateList.map(item => (
                  <div className="w-1/2 p-2" key={item.id}>
                    <Card className="shadow-sm rounded-md border border-gray-200 p-2">
                      <Radio.Group
                        value={selectedTemplate}
                        onChange={handleTemplateChange}
                        className="w-full flex items-center"
                      >
                        <Radio className="w-full" value={item.id}>
                          {item.name}
                        </Radio>
                      </Radio.Group>
                    </Card>
                  </div>
                ))}
              </div>
              <div className="w-full flex justify-end mt-4">
                <Button
                  className="!bg-primary-dominant hover:!bg-primary-dominant-dark focus:!bg-primary-dominant-light"
                  type="primary"
                >
                  Save
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 ml-4 shadow-md flex-1 h-[280px]">
              <p className="text-lg font-semibold items-start m-[4]">
                Config Template
              </p>

              <div className="flex flex-col space-y-4 justify-between items-center w-2/4 mx-auto">
                <Button
                  type="primary"
                  block
                  className="!bg-primary-dominant hover:!bg-primary-dominant-dark focus:!bg-primary-dominant-light"
                  onClick={showAddTemplateModal}
                >
                  Add Template
                </Button>
                <Popup
                  title="Add Configuration"
                  isOpen={isAddTemplateModalOpen}
                  onOk={handleOk}
                  onCancel={handleCancel}
                  footer={[
                    <Button key="back" onClick={handleCancel}>
                      Cancel
                    </Button>,
                    <Button
                      form="addConfigForm"
                      key="submit"
                      type="primary"
                      htmlType="submit"
                    >
                      Create
                    </Button>
                  ]}
                >
                  <Form
                    id="addConfigForm"
                    initialValues={{
                      configValue: 'Clone Template',
                      header: true,
                      section: true,
                      footer: true
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    layout="vertical"
                  >
                    <Form.Item
                      label="Template Name"
                      name="configName"
                      rules={[
                        {
                          required: true,
                          message: 'Please enter template name!'
                        }
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Template Options"
                      name="configValue"
                      rules={[
                        { required: true, message: 'Please choose an option!' }
                      ]}
                    >
                      <Radio.Group onChange={handleRadioChange}>
                        <Radio value="Clone Template">Clone Template</Radio>
                        <Radio value="New Template">New Template</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Form>
                </Popup>

                <Button type="primary" block onClick={showConfigTemplateModal}>
                  Config Template
                </Button>
                <Popup
                  title="Config Template"
                  isOpen={isConfigTemplateModalOpen}
                  onConfirm={handleOk}
                  onCancel={handleCancel}
                >
                  <List
                    itemLayout="horizontal"
                    dataSource={templateList}
                    renderItem={item => (
                      <List.Item
                        actions={[
                          <Button
                            key="setting"
                            type="text"
                            icon={<SettingOutlined />}
                            onClick={() => handleSettingClick(item.value)}
                          />
                        ]}
                      >
                        <List.Item.Meta title={item.name} />
                      </List.Item>
                    )}
                  />
                </Popup>
                <Button type="primary" block onClick={showDeleteTemplateModal}>
                  Delete Template
                </Button>
                <Popup
                  title="Delete Template"
                  isOpen={isDeleteTemplateModalOpen}
                  onConfirm={handleConfirmDelete}
                  onCancel={handleCancel}
                  text="Delete"
                  className="w-500"
                >
                  <div className="flex flex-wrap">
                    {templateList.map(item => (
                      <div className="w-1/2" key={item.id}>
                        <Card className="shadow-sm rounded-md border border-gray-200 ">
                          <Checkbox
                            value={selectedTemplatesToDelete}
                            onChange={handleTemplateDelete}
                            disabled={item.id === selectedTemplate}
                            defaultChecked={item.id === selectedTemplate}
                          >
                            {item.name}
                          </Checkbox>
                        </Card>
                      </div>
                    ))}
                  </div>
                </Popup>
                <ConfigSection />
              </div>
            </div>
          </div>
        </Content>
      </Layout>
    </div>
  );
}

export default Dashboard;
