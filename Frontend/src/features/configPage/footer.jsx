import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Button } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

const { Footer: AntdFooter } = Layout;

const Footer = ({ content }) => {
  return (
    <AntdFooter className="bg-slate-500 text-center fixed bottom-0 right-0 left-0 items-center flex justify-center">
      <h1 className="text-sm text-white m-0">{content}</h1>
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
