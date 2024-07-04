import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Button } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
const { Header: AntdHeader } = Layout;

const Header = ({ logo, title }) => {
  return (
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
            padding: '5px 200px',
            borderRadius: '5px'
          }}
        >
          {title}
        </h1>
      </div>
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
