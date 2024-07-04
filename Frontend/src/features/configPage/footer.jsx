import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Button } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

const { Footer: AntdFooter } = Layout;

const Footer = ({ content }) => {
  return (
    <AntdFooter
      className="bg-slate-500"
      style={{
        position: 'fixed',
        bottom: 0,
        right: 0,
        zIndex: 10,
        width: '100%',
        display: 'flex'
      }}
    >
      <h1
        className="text-sm text-white m-0"
        style={{
          width: '100%',
          textAlign: 'center',
          alignItems: 'center'
        }}
      >
        {content}
      </h1>
      <Button
        type="text"
        icon={<SettingOutlined />}
        className="text-white absolute top-4 right-4"
        onClick={() => {
          console.log('Settings clicked');
        }}
      />
    </AntdFooter>
  );
};

Footer.propTypes = {
  content: PropTypes.string.isRequired
};

export default Footer;
