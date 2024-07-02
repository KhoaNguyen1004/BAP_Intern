import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { SettingOutlined, DeleteOutlined } from '@ant-design/icons';

const Section = ({ title, children }) => {
  return (
    <section className="bg-gray-100 p-4 mb-6 relative top-16">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {children}
      <Button
        type="text"
        icon={<SettingOutlined />}
        className="text-gray-500 absolute top-4 right-4"
        onClick={() => {
          console.log('Settings clicked');
        }}
      />
      <Button
        type="text"
        icon={<DeleteOutlined />}
        className="text-gray-500 absolute top-4 right-16"
        onClick={() => {
          console.log('Delete clicked');
        }}
      />
    </section>
  );
};

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default Section;
