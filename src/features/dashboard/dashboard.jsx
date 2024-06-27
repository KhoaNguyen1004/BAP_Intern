import React, { useEffect, useState } from 'react';
import { Layout, Space, Avatar, Dropdown, Button } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import AuthService from '../../services/auth.service';
import Popup from '../../components/Popup/popup';
const { Header, Content, Footer } = Layout;

const Template = () => {
  return (
    <div>
      <p>Template</p>
    </div>
  );
};
function Dashboard() {
  const [open, setOpen] = useState(false);

  const username = localStorage.getItem('username');

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
    //call lại api list
  };

  const handleConfirmDelete = () => {
    console.log('confirm delete');
    setOpen(false);
  };

  return (
    <div className="w-screen min-h-screen">
      <Layout className="h-full w-full">
        <Header className="bg-transparent z-40 mt-4 fixed w-full top-0 right-0 transition-all duration-200 before:content-[''] before:w-[99%] before:absolute before:-top-6 before:left-0 before:bottom-0 before:z-[-10] before:bg-[#f5f5f5]">
          <div className="rounded-lg h-full shadow-md px-4 bg-white text-end">
            <Space
              size="middle"
              align="center"
              className="text-black hover:text-slate-500"
            >
              <div className="flex justify-start items-center">
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

        <Content className="bg-transparent rounded-lg z-40 mb-4 mx-8 mt-[92px] ">
          <div className="flex justify-between items-center">
            <div className="bg-white rounded-lg p-4 shadow-md flex-1"></div>
            <div className="bg-white rounded-lg p-4 mx-8 shadow-md flex-1">
              <p className="text-lg font-semibold items-start m-[4]">
                Config Template
              </p>

              <div className="flex flex-col space-y-4 justify-between items-center w-2/4 mx-auto">
                <Button
                  type="primary"
                  block
                  className="bg-primary-dominant hover:bg-primary-dominant-dark focus:bg-primary-dominant-dark"
                >
                  {' '}
                  Add Template
                </Button>

                <Button type="primary" block>
                  Config Template
                </Button>
                <Button type="primary" block onClick={showModal}>
                  Delete Template
                </Button>
                <Popup
                  title="Delete Template"
                  isOpen={open}
                  onConfirm={handleConfirmDelete}
                  onCancel={handleCancel}
                  text="Delete"
                >
                  List Template
                </Popup>
              </div>
            </div>
          </div>
        </Content>
      </Layout>
    </div>
  );
}
export default Dashboard;
