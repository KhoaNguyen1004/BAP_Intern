import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Layout, Button, Input, Card, message } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Popup from '../../components/Popup';
import TokenService from '../../services/token.service';

const { Header: AntdHeader } = Layout;

function Header({ title, onEdit, isEditable, avaPath }) {
  const { id } = useParams();
  const { t } = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [uploadedImages, setUploadedImages] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    setNewTitle(title);
  }, [title]);

  useEffect(() => {
    fetchImages();
  }, [id]);

  useEffect(() => {
    setUploadedImages(avaPath);
  }, [avaPath]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (selectedFile) {
      onFileUpload();
    }
    onEdit(newTitle);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setNewTitle(title);
    setSelectedFile(null);
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
        <h1 className="text-2xl text-black bg-white p-2 rounded">{title}</h1>
      </div>
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
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="mb-4"
        />
        <Card bodyStyle={{ padding: '0 10px'}} className="bg-slate-500 mt-4 rounded">
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
  title: PropTypes.string,
  onEdit: PropTypes.func.isRequired,
  isEditable: PropTypes.bool,
  avaPath: PropTypes.string
};

Header.defaultProps = {
  isEditable: true
};

export default Header;
