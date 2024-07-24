import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Layout, Input, Button, Card, Radio, Row, Col, Form } from 'antd';
import {
  SettingOutlined,
  InstagramOutlined,
  FacebookOutlined
} from '@ant-design/icons';
import Popup from '../../components/Popup';

const { Footer: AntdFooter } = Layout;

function Footer({ footer, onEdit, isEditable, footerType }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newContent, setNewContent] = useState(footer);
  const [newFooterType, setNewFooterType] = useState(footerType);
  const [displayContent, setDisplayContent] = useState(footer);
  const [displayFooterType, setDisplayFooterType] = useState(footerType);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setDisplayContent(footer);
    setDisplayFooterType(footerType);
  }, [footer, footerType]);

  const showModal = () => {
    setNewContent(displayContent);
    setNewFooterType(displayFooterType);
    setErrorMessage('');
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (validateContent()) {
      onEdit(newContent, newFooterType);
      setDisplayContent(newContent);
      setDisplayFooterType(newFooterType);
      setIsModalVisible(false);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setNewContent(displayContent);
    setNewFooterType(displayFooterType);
    setErrorMessage('');
  };

  const validateContent = () => {
    if (!newContent.trim()) {
      setErrorMessage('Footer content cannot be empty');
      return false;
    }
    return true;
  };

  const getFooterContent = () => {
    switch (displayFooterType) {
      case 1:
        return (
          <h1 className="text-sm text-white m-0 pl-20">{displayContent}</h1>
        );
      case 2:
        return (
          <footer className="text-sm text-white m-0" style={{ padding: '0' }}>
            <Row justify="space-between" align="middle">
              <Col
                span={20}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <h4 className="m-0">
                  Created by{' '}
                  <a
                    className="link-light"
                    style={{ color: 'white' }}
                  >
                    @{displayContent}
                  </a>
                </h4>
              </Col>
              <Col
                span={4}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <InstagramOutlined
                    className="mx-2"
                    style={{ color: 'white' }}
                  />
                </a>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <FacebookOutlined
                    className="mx-2"
                    style={{ color: 'white' }}
                  />
                </a>
              </Col>
            </Row>
          </footer>
        );
      default:
        return (
          <h1 className="text-sm text-white m-0 pl-20">{displayContent}</h1>
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
        alignItems: 'center'
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
        <Form>
          <Form.Item
            validateStatus={errorMessage ? 'error' : ''}
            help={errorMessage}
          >
            <Input
              placeholder="Footer Content"
              value={newContent}
              onChange={(e) => {
                setNewContent(e.target.value);
                if (e.target.value.trim()) {
                  setErrorMessage('');
                }
              }}
            />
          </Form.Item>
          <Radio.Group
            value={newFooterType}
            onChange={(e) => setNewFooterType(e.target.value)}
          >
            <Radio value={1}>Type 1</Radio>
            <Radio value={2}>Type 2</Radio>
          </Radio.Group>
          <Card
            bodyStyle={{ padding: '0 10px' }}
            className="bg-slate-500"
            style={{
              marginTop: '20px',
              textAlign: 'center',
              padding: '15px'
            }}
          >
            {newFooterType === 1 ? (
              <h1 className="text-sm text-white m-0">{newContent}</h1>
            ) : (
              <footer className="text-sm text-white m-0 pl-20">
                <Row justify="space-between" align="middle" className="container">
                  <Col
                    span={12}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <h4 className="m-0">
                      Created by{' '}
                      <a
                        className="link-light"
                        style={{ color: 'white' }}
                      >
                        @{newContent}
                      </a>
                    </h4>
                  </Col>
                  <Col
                    span={12}
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <a
                      href="https://www.instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                    >
                      <InstagramOutlined
                        className="mx-2"
                        style={{ color: 'white' }}
                      />
                    </a>
                    <a
                      href="https://www.facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                    >
                      <FacebookOutlined
                        className="mx-2"
                        style={{ color: 'white' }}
                      />
                    </a>
                  </Col>
                </Row>
              </footer>
            )}
          </Card>
        </Form>
      </Popup>
    </AntdFooter>
  );
}

Footer.propTypes = {
  footer: PropTypes.string.isRequired,
  onEdit: PropTypes.func,
  isEditable: PropTypes.bool,
  footerType: PropTypes.number.isRequired
};

Footer.defaultProps = {
  isEditable: true
};

export default Footer;
