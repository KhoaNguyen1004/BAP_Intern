import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { Layout, Input, Button, Card, Radio, Row, Col } from 'antd';
import {
  SettingOutlined,
  InstagramOutlined,
  FacebookOutlined
} from '@ant-design/icons';
import Popup from '../../components/Popup';
import ColorPickerComponent from '../../components/ColorPicker';

const { Footer: AntdFooter } = Layout;

function Footer({
  footer,
  onEdit,
  isEditable,
  footerType,
  footerBgColor,
  footerTextColor
}) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newContent, setNewContent] = useState(footer);
  const { t } = useTranslation();
  const [newFooterType, setNewFooterType] = useState(footerType);
  const [displayContent, setDisplayContent] = useState(footer);
  const [displayFooterType, setDisplayFooterType] = useState(footerType);
  const [textColor, setTextColor] = useState(footerTextColor);
  const [backgroundColor, setBackgroundColor] = useState(footerBgColor);

  useEffect(() => {
    setDisplayContent(footer);
    setDisplayFooterType(footerType);
    setTextColor(footerTextColor);
    setBackgroundColor(footerBgColor);
  }, [footer, footerType, footerTextColor, footerBgColor]);

  const showModal = () => {
    setNewContent(displayContent);
    setNewFooterType(displayFooterType);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    onEdit(newContent, newFooterType, backgroundColor, textColor);
    setDisplayContent(newContent);
    setDisplayFooterType(newFooterType);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setNewContent(displayContent);
    setNewFooterType(displayFooterType);
  };

  const getFooterContent = () => {
    switch (displayFooterType) {
      case 1:
        return (
          <h1 className="text-sm m-0 pl-20" style={{ color: textColor }}>
            {displayContent}
          </h1>
        );
      case 2:
        return (
          <footer
            className="text-sm m-0"
            style={{ padding: '0', color: textColor }}
          >
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
                    href="https://codepen.io/MFM-347"
                    style={{ color: textColor }}
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
                    style={{ color: textColor }}
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
                    style={{ color: textColor }}
                  />
                </a>
              </Col>
            </Row>
          </footer>
        );
      default:
        return (
          <h1 className="text-sm m-0 pl-20" style={{ color: textColor }}>
            {displayContent}
          </h1>
        );
    }
  };

  return (
    <AntdFooter
      style={{
        position: 'fixed',
        bottom: 0,
        right: 0,
        zIndex: 10,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: backgroundColor
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
        title={t('CONFIG/PAGE.EDIT_FOOTER.Title')}
        isOpen={isModalVisible}
        onConfirm={handleOk}
        onCancel={handleCancel}
        text={t('BUTTON.Save')}
      >
        <Input
          placeholder={t('CONFIG/PAGE.EDIT_FOOTER.Footer_Content')}
          rules={[
            {
              required: true,
              message: t('CONFIG/PAGE.EDIT_FOOTER.Title_Required')
            }
          ]}
          value={newContent}
          onChange={(e) => {
            setNewContent(e.target.value);
          }}
        />
        {/* Change color */}
        <ColorPickerComponent
          label="Text color"
          initialColor={textColor}
          onColorChange={setTextColor}
        />
        <ColorPickerComponent
          label="Background color"
          initialColor={backgroundColor}
          onColorChange={setBackgroundColor}
        />
        <Radio.Group
          value={newFooterType}
          onChange={(e) => setNewFooterType(e.target.value)}
          className="mb-4"
        >
          <Radio value={1}>Type 1</Radio>
          <Radio value={2}>Type 2</Radio>
        </Radio.Group>
        <Card
          bodyStyle={{ padding: '0 10px' }}
          style={{
            marginTop: '20px',
            textAlign: 'center',
            padding: '15px',
            background: backgroundColor
          }}
        >
          {newFooterType === 1 ? (
            <h1 className="text-sm m-0" style={{ color: textColor }}>
              {newContent}
            </h1>
          ) : (
            <footer className="text-sm m-0 pl-20">
              <Row justify="space-between" align="middle" className="container">
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
                      href="https://codepen.io/MFM-347"
                      className="link-light"
                      style={{ color: textColor }}
                    >
                      @{newContent}
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
                      style={{ color: textColor }}
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
                      style={{ color: textColor }}
                    />
                  </a>
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
  footerType: PropTypes.number.isRequired,
  footerBgColor: PropTypes.string,
  footerTextColor: PropTypes.string
};

Footer.defaultProps = {
  isEditable: true
};

export default Footer;
