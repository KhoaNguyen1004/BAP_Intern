import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Button } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
const { Header: AntdHeader } = Layout;

const Header = ({ logo, title }) => {
  return (
    <AntdHeader className="bg-slate-500 text-center fixed top-0 right-0 left-0 items-center flex justify-center">
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '100%',
          padding: '5px',
          display: 'inline-block',
          marginRight: '400px'
        }}
      >
        <p className="text-2xl text-black m-0">{logo}</p>
      </div>
      <h1
        className="text-2xl text-black m-0"
        style={{
          backgroundColor: '#fff',
          padding: '5px 300px',
          borderRadius: '5px'
        }}
      >
        {title}
      </h1>
      <Button
        type="text"
        icon={<SettingOutlined />}
        className="text-white absolute top-4 right-4"
        onClick={() => {
          console.log('Settings clicked');
        }}
      />
    </AntdHeader>
  );
};

Header.propTypes = {
  logo: PropTypes.string,
  title: PropTypes.string.isRequired
};

export default Header;
