import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Layout, Input, Button, Card } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import Popup from '../../components/Popup';

const { Footer: AntdFooter } = Layout;

function Footer({ footer, onEdit, isEditable, footerType }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newContent, setNewContent] = useState(footer);

  const showModal = () => {
    setNewContent(footer);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    onEdit(newContent);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setNewContent(footer);
  };

  const getFooterContent = () => {
    switch (footerType) {
      case 'type1':
        return (
          <h1 className="text-sm text-white m-0 pl-20">
            {footer}
          </h1>
        );
      case 'type2':
        return (
          <footer className="footer bg-body-tertiary fixed-bottom">
            <div className="row">
              <div className="col-md-6 d-flex justify-content-center align-items-center flex-column">
                <h4>
                  Created by{' '}
                  <a
                    href="https://codepen.io/MFM-347"
                    className="link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                  >
                    @MFM-347
                  </a>
                </h4>
                <ul className="mt-2 list-unstyled">
                  <li className="my-2">
                    <a
                      href="https://codepen.io/MFM-347"
                      className="link-light link-underline-secondary"
                    >
                      <i className="fab fa-codepen"></i>&nbsp;CodePen
                    </a>
                  </li>
                  <li className="my-2">
                    <a
                      href="https://github.com/MFM-347"
                      className="link-light link-underline-light"
                    >
                      <i className="fab fa-github"></i>&nbsp;GitHub
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-md-6 d-flex justify-content-center align-items-center flex-column">
                <h5>Powered By</h5>
                <ul className="mt-2 list-unstyled">
                  <li>
                    <a
                      href="https://github.com/twbs/bootstrap"
                      className="link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                    >
                      BootStrap
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </footer>
        );
      default:
        return (
          <h1 className="text-sm text-white m-0 pl-20">
            {footer}
          </h1>
        );
    }
  };

  return (
    <AntdFooter
      className="bg-slate-500"
      style={{
        position: 'fixed',
        bottom: 0,
        right: 0,
        zIndex: 10,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {getFooterContent()}
      {isEditable && (
        <Button
          type="text"
          icon={<SettingOutlined />}
          className="text-white absolute top-4 right-4"
          onClick={showModal}
        />
      )}
      <Popup
        title="Edit Footer"
        isOpen={isModalVisible}
        onConfirm={handleOk}
        onCancel={handleCancel}
        text="Save"
      >
        <Input
          placeholder="Footer Content"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
        />

        <Card
          bodyStyle={{ padding: '0 10px' }}
          className="bg-slate-500"
          style={{
            marginTop: '20px',
            textAlign: 'center',
            padding: '15px',
          }}
        >
          <h1 className="text-sm text-white m-0">{newContent}</h1>
        </Card>
      </Popup>
    </AntdFooter>
  );
}

Footer.propTypes = {
  footer: PropTypes.string.isRequired,
  onEdit: PropTypes.func,
  isEditable: PropTypes.bool,
  footerType: PropTypes.oneOf(['type1', 'type2']),
};

Footer.defaultProps = {
  isEditable: true,
  footerType: 'type1',
};

export default Footer;
