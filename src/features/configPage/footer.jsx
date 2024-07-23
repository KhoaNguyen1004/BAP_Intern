import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Layout, Input, Button, Card, Radio, Row, Col } from 'antd';
import {
  SettingOutlined,
  InstagramOutlined,
  FacebookOutlined
} from '@ant-design/icons'; // Combined imports
import Popup from '../../components/Popup';

const { Footer: AntdFooter } = Layout;

function Footer({ footer, onEdit, isEditable, footerType }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newContent, setNewContent] = useState(footer);
  const [newFooterType, setNewFooterType] = useState(footerType);

  const showModal = () => {
    setNewContent(footer);
    setNewFooterType(footerType);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    onEdit(newContent, newFooterType);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setNewContent(footer);
    setNewFooterType(footerType);
  };

  const getFooterContent = () => {
    switch (newFooterType) {
      case 'type1':
        return <h1 className="text-sm text-white m-0 pl-20">{footer}</h1>;
      case 'type2':
        return (
          <footer className="footer bg-body-tertiary fixed-bottom py-3">
            <Row justify="space-between" align="middle" className="container">
              <Col
                span={12}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <h4 className="mb-0">
                  Created by{' '}
                  <a href="https://codepen.io/MFM-347" className="link-light">
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
                <InstagramOutlined className="mx-2" />
                <FacebookOutlined className="mx-2" />
              </Col>
            </Row>
          </footer>
        );
      default:
        return <h1 className="text-sm text-white m-0 pl-20">{footer}</h1>;
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
        <Input
          placeholder="Footer Content"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
        />
        <Radio.Group
          value={newFooterType}
          onChange={(e) => setNewFooterType(e.target.value)}
          className="mb-4"
        >
          <Radio value="type1">Type 1</Radio>
          <Radio value="type2">Type 2</Radio>
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
          {newFooterType === 'type1' ? (
            <h1 className="text-sm text-white m-0">{newContent}</h1>
          ) : (
            <footer className="footer bg-body-tertiary fixed-bottom py-3">
              <Row justify="space-between" align="middle" className="container">
                <Col
                  span={12}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <h4 className="mb-0">
                    Created by{' '}
                    <a href="https://codepen.io/MFM-347" className="link-light">
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
                  <InstagramOutlined className="mx-2" />
                  <FacebookOutlined className="mx-2" />
                </Col>
              </Row>
            </footer>
          )}
        </Card>
      </Popup>
    </AntdFooter>
  );
}

Footer.propTypes = {
  footer: PropTypes.string.isRequired,
  onEdit: PropTypes.func,
  isEditable: PropTypes.bool,
  footerType: PropTypes.oneOf(['type1', 'type2'])
};

Footer.defaultProps = {
  isEditable: true,
  footerType: 'type1'
};

export default Footer;
