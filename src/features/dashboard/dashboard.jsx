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
import { logoutAsync, selectAuth } from '../auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  getAllTemplates,
  chooseTemplate,
  deleteTemplate,
  addTemplate,
  cloneTemplate
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
    selectedTemplateId,
    selectedTemplatesToDelete,
    isAddTemplateModalOpen,
    isDeleteTemplateModalOpen,
    isConfigTemplateModalOpen,
    isCloneTemplate,
    handleTemplateChange,
    handleConfirmDelete,
    showAddTemplateModal,
    showDeleteTemplateModal,
    showConfigTemplateModal,
    handleCancel,
    handleOk,
    setIsCloneTemplate,
    setShowPopconfirm,
    setIsDeleteTemplateModalOpen,
    setIsAddTemplateModalOpen,
    setSelectedTemplate,
    setSelectedTemplatesToDelete,
    setSelectedTemplateId,
    handleTemplateIdChange
  } = useTemplateModals(fetchTemplates, chosen);

  const handleTemplateDelete = e => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedTemplatesToDelete(prev => [...prev, value]);
    } else {
      setSelectedTemplatesToDelete(prev => prev.filter(item => item !== value));
    }
  };
  const handlePopconfirmConfirm = () => {
    setIsLoading(true);
    dispatch(deleteTemplate(selectedTemplatesToDelete))
      .unwrap()
      .then(response => {
        openNotification({
          message: `Deleted ${response.deleted} templates!`,
          type: 'success',
          title: 'Success'
        });
        console.log('Template deleted:', response);
        fetchTemplates();
      })
      .catch(err => {
        console.error('Error deleting template:', err);
        openNotification({
          message: 'Failed to delete template!',
          type: 'error',
          title: 'Error'
        });
        fetchTemplates();
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
        setIsAddTemplateModalOpen(false);
        onFinishComplete(response.id);
      })
      .catch(err => {
        console.error('Error adding template:', err);
        let errorMessage = 'Failed to add template!';

        if (err.response && err.response.data && err.response.data.message) {
          errorMessage = err.response.data.message;
        }

        openNotification({
          message: errorMessage,
          type: 'error',
          title: 'Error'
        });
      })
      .finally(() => {
        setIsLoading(false);
        setIsAddTemplateModalOpen(false);
      });
  };

  const handleCloneTemplate = (id, name) => {
    setIsLoading(true);
    dispatch(cloneTemplate({ id, name: { name } }))
      .unwrap()
      .then(response => {
        openNotification({
          message: 'Template cloned successfully!',
          type: 'success',
          title: 'Success'
        });
        fetchTemplates();
        setIsAddTemplateModalOpen(false);
        onFinishComplete(response.template.id);
        console.log('Template cloned:', response);
        console.log('response.template.original.id', response.template.id);
      })
      .catch(err => {
        console.error('Error cloning template:', err);
        openNotification({
          message: 'Failed to clone template!',
          type: 'error',
          title: 'Error'
        });
        setIsAddTemplateModalOpen(false);
      })
      .finally(() => setIsLoading(false));
  };

  const onFinishComplete = id => {
    window.open(`${window.location.origin}/admin/config-page/${id}`, '_blank');
  };

  const onFinish = values => {
    setIsAddTemplateModalOpen(false);
    if (isCloneTemplate) {
      handleCloneTemplate(selectedTemplateId, values.name);
      console.log('Clone template:', selectedTemplateId);
      console.log('Name:', values.name);
    } else {
      handleAddTemplate(values);
    }
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const handleRadioChange = e => {
    const { value } = e.target;

    setIsCloneTemplate(value === 'Clone Template');
    setSelectedTemplateId('');
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
        fetchTemplates();
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
              <div className="flex items-center">
                <Avatar shape="square" size="large" icon={<UserOutlined />} />
                <div className="ml-2">
                  <p className="text-lg font-semibold leading-none">
                    {user?.username}
                  </p>
                  <p className="text-sm leading-none">{user?.role}</p>
                </div>
              </div>
              <Button
                type="text"
                icon={<LogoutOutlined />}
                onClick={() => {
                  handleLogout();
                  window.location.href = '/login';
                }}
                className="border-none bg-transparent text-start p-0 m-0"
              />
            </Space>
          </div>
        </Header>

        <Content className="bg-transparent rounded-lg mb-4 mx-4 md:mx-10 mt-[92px]">
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 p-2">
              <div className="bg-white rounded-lg p-4 shadow-md">
                <p className="text-lg font-semibold mb-4">Template</p>
                <div>
                  {status === 'loading' && setIsLoading(true)}
                  {status === 'failed' && <p>{error}</p>}
                  {status === 'succeeded' &&
                    templates?.map(item => (
                      <Card
                        key={item.id}
                        className="shadow-sm rounded-md border border-gray-200 mb-2"
                      >
                        <Radio.Group
                          value={selectedTemplate}
                          onChange={handleTemplateChange}
                          className="w-full"
                        >
                          <Radio className="w-full" value={item.id}>
                            {item.name}
                          </Radio>
                        </Radio.Group>
                      </Card>
                    ))}
                </div>
                <div className="mt-4">
                  <Button
                    className="!bg-primary-dominant hover:!bg-primary-dominant-dark focus:!bg-primary-dominant-light w-full"
                    type="primary"
                    onClick={handlChooseTemplate}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 p-2">
              <div className="bg-white rounded-lg p-4 shadow-md h-[280px]">
                <p className="text-lg font-semibold mb-4">Config</p>
                <div className="space-y-4">
                  <Button
                    type="primary"
                    block
                    className="!bg-primary-dominant hover:!bg-primary-dominant-dark focus:!bg-primary-dominant-light"
                    onClick={showAddTemplateModal}
                  >
                    Add Template
                  </Button>
                  <Button
                    type="primary"
                    block
                    className="!bg-primary-dominant hover:!bg-primary-dominant-dark focus:!bg-primary-dominant-light"
                    onClick={showConfigTemplateModal}
                  >
                    Config Template
                  </Button>
                  <Button
                    type="primary"
                    block
                    onClick={showDeleteTemplateModal}
                  >
                    Delete Template
                  </Button>
                </div>
              </div>
            </div>

            <Popup
              title="Add Template"
              isOpen={isAddTemplateModalOpen}
              onOk={onFinish}
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
                  configValue: 'Clone Template'
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
                  <Radio.Group
                    onChange={handleRadioChange}
                    initialValues="Clone Template"
                  >
                    <Radio value="Clone Template">Clone Template</Radio>
                    <Radio value="New Template">New Template</Radio>
                  </Radio.Group>
                </Form.Item>
                {isCloneTemplate && (
                  <div>
                    {status === 'loading' && setIsLoading(true)}
                    {status === 'failed' && <p>{error}</p>}
                    {status === 'succeeded' &&
                      templates?.map(item => (
                        <Card
                          key={item.id}
                          className="shadow-sm rounded-md border border-gray-200 mb-2"
                        >
                          <Radio.Group
                            value={selectedTemplateId}
                            onChange={handleTemplateIdChange}
                            className="w-full"
                          >
                            <Radio className="w-full" value={item.id}>
                              {item.name}
                            </Radio>
                          </Radio.Group>
                        </Card>
                      ))}
                  </div>
                )}
              </Form>
            </Popup>

            <Popup
              title="Config Template"
              isOpen={isConfigTemplateModalOpen}
              onConfirm={handleOk}
              onCancel={handleCancel}
            >
              <div>
                {templates?.map(item => (
                  <List
                    key={item.id}
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
                ))}
              </div>
            </Popup>

            <Popup
              title="Delete Template"
              isOpen={isDeleteTemplateModalOpen}
              onOk={handleConfirmDelete}
              onCancel={handleCancel}
              className="ant-modal-body mt-0"
              footer={[
                <Button key="back" onClick={handleCancel}>
                  Cancel
                </Button>,
                <Popconfirm
                  title="Delete selected templates?"
                  onConfirm={handlePopconfirmConfirm}
                  onCancel={() => setShowPopconfirm(false)}
                  okText="Yes"
                  cancelText="No"
                  key="confirm"
                >
                  <Button
                    type="primary"
                    disabled={selectedTemplatesToDelete.length === 0}
                  >
                    Delete
                  </Button>
                </Popconfirm>
              ]}
            >
              <div className="flex flex-wrap -mx-2">
                {templates?.map(item => (
                  <div key={item.id} className="w-full sm:w-1/2 px-2 mb-2">
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
          </div>
        </Content>
      </Layout>
    </div>
  );
}

export default Dashboard;
