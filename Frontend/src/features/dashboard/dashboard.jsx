import React, { useContext, useEffect } from 'react';
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
  List,
  Popconfirm
} from 'antd';
import {
  UserOutlined,
  LogoutOutlined,
  SettingOutlined
} from '@ant-design/icons';
// import AuthService from '../../services/auth.service';
import Popup from '../../components/Popup';
import { LoadingContext } from '../../contexts/LoadingContext';
import { NotificationContext } from '../../contexts/NotificationContext';
import ConfigSection from './configSection';
import { logoutAsync, selectAuth } from '../auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  getAllTemplates,
  chooseTemplate,
  deleteTemplate,
  addTemplate
} from './templatesSlice';
import useTemplateModals from '../../store/useTemplateModals';

const { Header, Content } = Layout;

function Dashboard() {
  const { setIsLoading } = useContext(LoadingContext);
  const { openNotification } = useContext(NotificationContext);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectAuth);
  const { templates, chosen, status, error } = useAppSelector(
    state => state.templates
  );

  const fetchTemplates = () => {
    setIsLoading(true);
    dispatch(getAllTemplates())
      .unwrap()
      .then(response => {
        console.log('Fetched templates:', response);
        setSelectedTemplate(response.chosen);
      })
      .catch(err => {
        console.error('Error fetching templates:', err);
      })
      .finally(() => setIsLoading(false));
  };

  const {
    selectedTemplate,
    selectedTemplatesToDelete,
    isAddTemplateModalOpen,
    isDeleteTemplateModalOpen,
    isConfigTemplateModalOpen,
    handleTemplateChange,
    handleTemplateDelete,
    handleConfirmDelete,
    showAddTemplateModal,
    showDeleteTemplateModal,
    showConfigTemplateModal,
    handleCancel,
    handleOk,
    setCloneTemplate,
    setShowPopconfirm,
    setIsDeleteTemplateModalOpen,
    setIsAddTemplateModalOpen,
    setSelectedTemplate
  } = useTemplateModals(fetchTemplates, chosen);

  const handlePopconfirmConfirm = () => {
    setIsLoading(true);
    dispatch(deleteTemplate(selectedTemplatesToDelete))
      .unwrap()
      .then(response => {
        openNotification({
          message: 'Template deleted successfully!',
          type: 'success',
          title: 'Success'
        });
        console.log('Template deleted:', response);
      })
      .catch(err => {
        console.error('Error deleting template:', err);
        openNotification({
          message: 'Failed to delete template!',
          type: 'error',
          title: 'Error'
        });
      })
      .finally(() => {
        setIsLoading(false);
        setShowPopconfirm(false);
        setIsDeleteTemplateModalOpen(false);
      });
  };

  const handleAddTemplate = templates => {
    setIsLoading(true);
    dispatch(addTemplate(templates))
      .unwrap()
      .then(response => {
        openNotification({
          message: 'Template added successfully!',
          type: 'success',
          title: 'Success'
        });
        console.log('Template added:', response);
        console.log('response.template.id', response.id);
        fetchTemplates();
        onFinishComplete(response.id);
      })
      .catch(err => {
        console.error('Error adding template:', err);
        openNotification({
          message: 'Failed to add template!',
          type: 'error',
          title: 'Error'
        });
      })
      .finally(() => {
        setIsLoading(false);
        setIsAddTemplateModalOpen(false);
      });
  };

  const onFinishComplete = id => {
    window.open(`${window.location.origin}/admin/config-page/${id}`, '_blank');
  };

  const onFinish = values => {
    setIsAddTemplateModalOpen(false);
    handleAddTemplate(values);
    console.log('Success:', values);
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

  const handleLogout = () => {
    setIsLoading(true);
    dispatch(logoutAsync())
      .unwrap()
      .then(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    fetchTemplates();
  }, []);

  const handlChooseTemplate = () => {
    setIsLoading(true);
    dispatch(chooseTemplate(selectedTemplate))
      .unwrap()
      .then(response => {
        openNotification({
          message: 'Template chosen successfully!',
          type: 'success',
          title: 'Success'
        });
        console.log('Template chosen:', response);
      })
      .catch(err => {
        console.error('Error choosing template:', err);
      })
      .finally(() => setIsLoading(false));
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
                    {user?.username}
                  </p>
                  <p className="m-0 leading-none text-start">{user?.role}</p>
                </div>
              </div>
              <Button
                type="text"
                icon={<LogoutOutlined />}
                onClick={() => {
                  handleLogout();
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
                {status === 'loading' && setIsLoading(true)}
                {status === 'failed' && <p>{error}</p>}
                {status === 'succeeded' &&
                  templates?.map(item => (
                    <div className="w-1/2 sm:w-1/2 p-2" key={item.id}>
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
                  onClick={handlChooseTemplate}
                >
                  Save
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 ml-4 shadow-md flex-1 h-[280px]">
              <p className="text-lg font-semibold items-start m-[4]">Config</p>

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
                  title="Add Template"
                  isOpen={isAddTemplateModalOpen}
                  onOk={handleAddTemplate}
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
                      name="name"
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
                  <div className="flex flex-wrap -mx-2">
                    {templates?.map(item => (
                      <div className="w-full sm:w-1/2" key={item.id}>
                        <List
                          itemLayout="horizontal"
                          dataSource={[item]}
                          bordered
                          renderItem={item => (
                            <List.Item
                              actions={[
                                <Button
                                  key="setting"
                                  type="text"
                                  icon={<SettingOutlined />}
                                  onClick={() => handleSettingClick(item.id)}
                                  className="text-primary-dominant"
                                />
                              ]}
                            >
                              <p>{item.name}</p>
                            </List.Item>
                          )}
                        />
                      </div>
                    ))}
                  </div>
                </Popup>

                <Button type="primary" block onClick={showDeleteTemplateModal}>
                  Delete Template
                </Button>
              </div>
              <Popup
                title="Delete Template"
                isOpen={isDeleteTemplateModalOpen}
                onOk={handleConfirmDelete}
                onCancel={handleCancel}
                footer={[
                  <Button key="back" onClick={handleCancel}>
                    Cancel
                  </Button>,
                  <Popconfirm
                    title="Delete this template?"
                    onConfirm={handlePopconfirmConfirm}
                    onCancel={() => setShowPopconfirm(false)}
                    okText="Yes"
                    cancelText="No"
                    key="confirm"
                  >
                    <Button type="primary">Delete</Button>
                  </Popconfirm>
                ]}
              >
                <div className="flex flex-wrap space-y-2">
                  {templates?.map(item => (
                    <div className="w-full sm:w-1/2" key={item.id}>
                      <Card className="shadow-sm rounded-md border border-gray-200">
                        <Checkbox
                          value={item.id}
                          onChange={handleTemplateDelete}
                          disabled={item.id === chosen}
                          className="w-full flex items-center"
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
        </Content>
      </Layout>
    </div>
  );
}

export default Dashboard;
