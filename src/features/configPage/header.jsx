import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Layout, Button, Input, Card, message, Radio } from 'antd';
import { useTranslation } from 'react-i18next';

import { SettingOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Popup from '../../components/Popup';
import TokenService from '../../services/token.service';

const { Header: AntdHeader } = Layout;

function Header({
  title,
  onEdit,
  headerType,
  isEditable,
  avaPath,
  sectionMenu
}) {
  const { id } = useParams();
  const { t } = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [uploadedImages, setUploadedImages] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [newHeaderType, setNewHeaderType] = useState(headerType);
  const [show, setShow] = useState(false);
  const [sections, setSections] = useState(sectionMenu);

  useEffect(() => {
    setNewTitle(title);
  }, [title]);

  useEffect(() => {
    setNewHeaderType(headerType);
  }, [headerType]);

  useEffect(() => {
    fetchImages();
  }, [id]);

  useEffect(() => {
    setUploadedImages(avaPath);
  }, [avaPath]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  useEffect(() => {
    setSections(sectionMenu);
  }, [sectionMenu]);

  const handleClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - 50;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };
  const handleMouseEnter = () => {
    setShow(true);
  };

  const handleMouseLeave = () => {
    setShow(false);
  };

  const handleOk = async () => {
    try {
      if (selectedFile) {
        await onFileUpload();
      }
      await onEdit(newTitle, newHeaderType);
      setIsModalVisible(false);
    } catch (error) {
      message.error('There was an error updating the header!');
      console.error('Error updating the header:', error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setNewTitle(title);
    setSelectedFile(null);
    setNewHeaderType(headerType);
  };

  const onFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type;
      if (!fileType.match(/image\/(jpg|jpeg|png|gif)/)) {
        message.error('Only image files are allowed (jpg, jpeg, png, gif)');
        event.target.value = null;
        setSelectedFile(null);
        return;
      }
      setSelectedFile(file);
    }
  };

  const onFileUpload = async () => {
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/${id}/ava`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${TokenService.getLocalAccessToken()}`
          }
        }
      );
      console.log(response.data);
      fetchImages();
    } catch (error) {
      message.error('There was an error uploading the image!');
      console.error('There was an error uploading the image!', error);
    }
  };

  const fetchImages = async () => {
    if (id) {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/templates/${id}`,
          {
            headers: {
              Authorization: `Bearer ${TokenService.getLocalAccessToken()}`
            }
          }
        );
        setUploadedImages(response.data.data.avaPath);
      } catch (error) {
        console.error('There was an error fetching the images!', error);
      }
    }
  };

  return (
    <AntdHeader
      className="bg-slate-500"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 5,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        padding: '0px 20px',
        gap: '20%',
        height: '64px'
      }}
    >
      {headerType === 2 ? (
        <>
          <div className="flex-1 text-center pl-10">
            <h1 className="text-2xl text-black bg-white p-2 rounded">
              {newTitle}
            </h1>
          </div>
          <div className="rounded-full mr-4 sm:mr-10 mt-6 pr-20">
            {uploadedImages && (
              <img
                key={uploadedImages}
                src={`http://127.0.0.1:8000${uploadedImages}`}
                alt={`Uploaded ${uploadedImages}`}
                style={{
                  height: '50px',
                  width: '50px',
                  borderRadius: '50px',
                  top: '5%'
                }}
              />
            )}
          </div>
        </>
      ) : headerType === 1 ? (
        <>
          <div className="rounded-full ml-4 sm:ml-10 mt-6">
            {uploadedImages && (
              <img
                key={uploadedImages}
                src={`http://127.0.0.1:8000${uploadedImages}`}
                alt={`Uploaded ${uploadedImages}`}
                style={{
                  height: '50px',
                  width: '50px',
                  borderRadius: '50px',
                  top: '5%'
                }}
              />
            )}
          </div>
          <div className="flex-1 text-center pr-20">
            <h1 className="text-2xl text-black bg-white p-2 rounded">
              {newTitle}
            </h1>
          </div>
        </>
      ) : headerType === 3 ? (
        <div
          className="relative inline-block"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            type="button"
            className="bg-slate-500 text-white p-4 text-base cursor-pointer"
            aria-haspopup="true"
            aria-expanded={show}
          >
            Menu
          </div>
          <div
            className={`absolute bg-white min-w-[160px] shadow-lg z-10 max-h-[800px] overflow-y-auto   ${show ? 'block' : 'hidden'}`}
            role="menu"
          >
            {sections.map((section) => (
              <a
                className="block text-black p-3 no-underline hover:bg-gray-200 h-[40px] flex items-center justify-center"
                key={section.id}
                id={`menu ${section.id}`}
                onClick={() => handleClick(section.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleClick(section.id);
                }}
                role="menuitem"
                tabIndex={0}
              >
                {section.title}
              </a>
            ))}
          </div>
        </div>
      ) : null}

      {isEditable && (
        <Button
          type="text"
          icon={<SettingOutlined />}
          className="text-white"
          style={{
            position: 'absolute',
            top: '50%',
            right: '50px',
            transform: 'translateY(-50%)'
          }}
          onClick={showModal}
        />
      )}

      <Popup
        title={t('CONFIG/PAGE.EDIT_HEADER.Title')}
        isOpen={isModalVisible}
        onConfirm={handleOk}
        onCancel={handleCancel}
        text={t('BUTTON.Save')}
      >
        <div className="pb-3">
          <input
            type="file"
            onChange={onFileChange}
            accept=".jpg,.jpeg,.png,.gif"
          />
        </div>
        <Input
          placeholder={t('CONFIG/PAGE.EDIT_HEADER.Header_Name')}
          rules={[
            {
              required: true,
              message: t('CONFIG/PAGE.EDIT_HEADER.Title_Required')
            }
          ]}
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="mb-4"
        />
        <Radio.Group
          value={newHeaderType}
          onChange={(e) => setNewHeaderType(e.target.value)}
          className="mb-4"
        >
          <Radio value={1}>Logo Left</Radio>
          <Radio value={2}>Logo Right</Radio>
          <Radio value={3}>Menu</Radio>
        </Radio.Group>
        <Card
          bodyStyle={{ padding: '0 10px' }}
          className="bg-slate-500 mt-4 rounded"
        >
          <div className="w-full flex items-center gap-4 sm:gap-20">
            {selectedFile ? (
              <div>
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt={`Selected ${selectedFile.name}`}
                  style={{
                    height: '50px',
                    width: '50px',
                    borderRadius: '50px'
                  }}
                />
              </div>
            ) : uploadedImages ? (
              <div>
                <img
                  src={`http://127.0.0.1:8000${uploadedImages}`}
                  alt={`Uploaded ${uploadedImages}`}
                  style={{
                    height: '50px',
                    width: '50px',
                    borderRadius: '50px'
                  }}
                />
              </div>
            ) : (
              <div>
                <p>{t('CONFIG/PAGE.EDIT_HEADER.No_Image')}</p>
              </div>
            )}
            <div className="flex-1 text-center">
              <h1 className="text-2xl text-black bg-white p-2 rounded">
                {newTitle}
              </h1>
            </div>
          </div>
        </Card>
      </Popup>
    </AntdHeader>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  headerType: PropTypes.number.isRequired,
  onEdit: PropTypes.func,
  isEditable: PropTypes.bool,
  avaPath: PropTypes.string
};

Header.defaultProps = {
  isEditable: true
};

export default Header;
