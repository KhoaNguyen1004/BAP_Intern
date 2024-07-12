import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Layout, Button, Input, Card } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Popup from '../../components/Popup';

const { Header: AntdHeader } = Layout;

const Header = ({ title, onEdit, isEditable, ava_path }) => {
  const { id } = useParams();
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
    setUploadedImages(ava_path);
  }, [ava_path]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    onFileUpload();
    onEdit(newTitle);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setNewTitle(title);
    setSelectedFile(null);
  };

  const onFileChange = event => {
    setSelectedFile(event.target.files[0]);
  };

  const onFileUpload = async () => {
    if (!selectedFile) {
      console.error('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/${id}/ava`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      console.log(response.data);
      fetchImages();
    } catch (error) {
      console.error('There was an error uploading the image!', error);
    }
  };

  const fetchImages = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/templates/${id}`
      );
      setUploadedImages(response.data.data.ava_path);
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
        title="Edit Header"
        isOpen={isModalVisible}
        onConfirm={handleOk}
        onCancel={handleCancel}
        text="Save"
      >
        <div>
          <input type="file" onChange={onFileChange} />
        </div>
        <Input
          placeholder="Title"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          className="mb-4"
        />
        <Card className="bg-slate-500 mt-4 rounded p-4">
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
                <p>No image selected or uploaded.</p>
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
};

Header.propTypes = {
  logo: PropTypes.string,
  title: PropTypes.string,
  onEdit: PropTypes.func.isRequired,
  isEditable: PropTypes.bool,
  ava_path: PropTypes.string
};

Header.defaultProps = {
  isEditable: true
};

export default Header;
