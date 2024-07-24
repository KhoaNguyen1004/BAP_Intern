import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Button, Input, Radio, message, Card } from 'antd';
import { SettingOutlined, DeleteOutlined } from '@ant-design/icons';
import Popup from '../../components/Popup';

function Section({
  sectionId,
  type,
  title,
  content1,
  content2,
  onDelete,
  onEdit,
  isEditable = true,
  isDeletable = true
}) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showContentOption, setShowContentOption] = useState(
    type === 2 ? 'show' : 'hide'
  );
  const { t } = useTranslation();
  const [newTitle, setNewTitle] = useState(title);
  const [newContent1, setNewContent1] = useState(content1);
  const [newContent2, setNewContent2] = useState(content2);
  const [titleError, setTitleError] = useState('');
  const [typeDraft, setTypeDraft] = useState(type);

  useEffect(() => {
    setTypeDraft(type);
    setShowContentOption(type === 2 ? 'show' : 'hide');
  }, [type]);

  const showModal = () => {
    setIsModalVisible(true);
    setTypeDraft(type);
    setShowContentOption(type === 2 ? 'show' : 'hide');
  };

  const handleOk = () => {
    if (newTitle.length > 20) {
      setTitleError(t('EDIT_SECTION.Title_Error', { ns: 'notification' }));
    } else {
      onEdit(newTitle, newContent1, newContent2, typeDraft);
      setIsModalVisible(false);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setNewTitle(title);
    setNewContent1(content1);
    setNewContent2(content2);
    setTitleError('');
    setShowContentOption(type === 2 ? 'show' : 'hide');
  };

  const handleOptionChange = (e) => {
    const newValue = e.target.value;
    setTypeDraft(newValue);
    if (newValue === 1) {
      setNewContent2('');
    }
    setShowContentOption(newValue === 2 ? 'show' : 'hide');
  };

  const handleTitleChange = (e) => {
    const { value } = e.target;
    if (value.length <= 20) {
      setNewTitle(value);
      setTitleError('');
    } else {
      message.error(t('EDIT_SECTION.Title_Error', { ns: 'notification' }));
    }
  };

  return (
    <section
      id={sectionId}
      className="bg-gray-100 p-2 mb-5 pb-4 relative top-24"
    >
      <div style={{ padding: '0px 30%', borderRadius: '10px' }}>
        <h2 className="text-xl font-semibold mb-4 text-center bg-white">
          {title}
        </h2>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {type === 1 ? (
          <Card style={{ flex: 1 }}>
            <p style={{ overflowWrap: 'break-word' }}>{content1}</p>
          </Card>
        ) : (
          <>
            <Card
              style={{
                flex: 1,
                marginRight: showContentOption === 'show' ? '10px' : '0px',
                maxWidth:
                  showContentOption === 'show' ? 'calc(50% - 10px)' : '100%'
              }}
            >
              <p style={{ overflowWrap: 'break-word' }}>{content1}</p>
            </Card>
            {showContentOption === 'show' && (
              <Card
                style={{
                  flex: 1,
                  marginLeft: '10px',
                  maxWidth: 'calc(50% - 10px)'
                }}
              >
                <p style={{ overflowWrap: 'break-word' }}>{content2}</p>
              </Card>
            )}
          </>
        )}
      </div>
      {isEditable && (
        <div className="flex justify-end">
          <Button
            type="text"
            icon={<SettingOutlined />}
            className="text-gray-500"
            onClick={showModal}
          />
          <Button
            type="text"
            icon={<DeleteOutlined />}
            className="text-gray-500"
            onClick={isDeletable ? onDelete : null}
            disabled={!isDeletable}
          />
        </div>
      )}
      <Popup
        title={t('CONFIG/PAGE.EDIT_SECTION.Title')}
        isOpen={isModalVisible}
        onConfirm={handleOk}
        onCancel={handleCancel}
        text={t('BUTTON.Save')}
      >
        <Input
          placeholder={t('CONFIG/PAGE.EDIT_SECTION.Section_Title')}
          value={newTitle}
          onChange={handleTitleChange}
          style={{ marginBottom: '10px' }}
        />
        {titleError && <p style={{ color: 'red' }}>{titleError}</p>}
        <Input
          placeholder={t('CONFIG/PAGE.EDIT_SECTION.Section_Content_1')}
          value={newContent1}
          onChange={(e) => setNewContent1(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
        {showContentOption === 'show' && (
          <Input
            placeholder={t('CONFIG/PAGE.EDIT_SECTION.Section_Content_2')}
            value={newContent2}
            onChange={(e) => setNewContent2(e.target.value)}
            style={{ marginBottom: '10px' }}
          />
        )}
        <Radio.Group
          onChange={handleOptionChange}
          value={typeDraft}
          style={{ marginBottom: '10px' }}
        >
          <Radio value={1}>{t('CONFIG/PAGE.EDIT_SECTION.Type_1')}</Radio>
          <Radio value={2}>{t('CONFIG/PAGE.EDIT_SECTION.Type_2')}</Radio>
        </Radio.Group>
        <Card className="mt-5 bg-gray-100 relative">
          <div style={{ padding: '0px 30%', borderRadius: '10px' }}>
            <h2 className="text-xl font-semibold mb-4 text-center bg-white">
              {newTitle}
            </h2>
          </div>
          <div style={{ display: 'flex', justifyContent: 'pace-between' }}>
            <Card
              style={{
                flex: 1,
                marginRight: showContentOption === 'show' ? '10px' : '0px',
                maxWidth:
                  showContentOption === 'show' ? 'calc(50% - 10px)' : '100%'
              }}
            >
              <p style={{ overflowWrap: 'break-word' }}>{newContent1}</p>
            </Card>
            {showContentOption === 'show' && (
              <Card
                style={{
                  flex: 1,
                  marginLeft: '10px',
                  maxWidth: 'calc(50% - 10px)'
                }}
              >
                <p style={{ overflowWrap: 'break-word' }}>{newContent2}</p>
              </Card>
            )}
          </div>
        </Card>
      </Popup>
    </section>
  );
}

Section.propTypes = {
  type: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  content1: PropTypes.string,
  content2: PropTypes.string,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  isEditable: PropTypes.bool,
  isDeletable: PropTypes.bool
};

Section.defaultProps = {
  isEditable: true,
  isDeletable: true
};

export default Section;
