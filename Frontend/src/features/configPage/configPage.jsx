import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Modal, Input, message } from 'antd';
import Header from './header';
import Footer from './footer';
import Section from './section';
import { getTemplate } from '../dashboard/templatesSlice';
import { addSection } from './sectionSlice';
import { useAppDispatch } from '../../store/hooks';
import { LoadingContext } from '../../contexts/LoadingContext';

const ConfigPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [templateData, setTemplateData] = useState({});
  const [sections, setSections] = useState([]);
  const { setIsLoading } = useContext(LoadingContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [sectionToDelete, setSectionToDelete] = useState(null);
  const [headerTitle, setHeaderTitle] = useState('Title');
  const [headerLogo, setHeaderLogo] = useState('Logo');
  const [footerContent, setFooterContent] = useState('Made with ❤️');

  useEffect(() => {
    dispatch(getTemplate(id))
      .unwrap()
      .then(response => {
        setTemplateData(response);
        setSections(response.section || []);
      })
      .catch(error => {
        console.error('Failed to fetch template:', error);
      });
  }, [id, dispatch]);

  const handleAddSection = () => {
    const newSection = {
      template_id: id
    };
    setIsLoading(true);
    dispatch(addSection(newSection))
      .unwrap()
      .then(response => {
        setSections(prevSections => [...prevSections, response]);
      })
      .catch(error => {
        console.error('Failed to add section:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const confirmDeleteSection = sectionId => {
    if (sections.length > 1) {
      setIsModalVisible(true);
      setSectionToDelete(sectionId);
      setModalContent('deleteSection');
    } else {
      message.info('At least one section must be present.');
    }
  };

  const handleDelete = () => {
    setSections(prevSections =>
      prevSections.filter(section => section.id !== sectionToDelete)
    );
    setIsModalVisible(false);
    setSectionToDelete(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSectionToDelete(null);
  };

  const handleEditSection = (id, newTitle, newContent1, newContent2) => {
    setSections(prevSections =>
      prevSections.map(section =>
        section.id === id
          ? {
              ...section,
              title: newTitle,
              content1: newContent1,
              content2: newContent2
            }
          : section
      )
    );
  };

  const handleEditHeader = (newLogo, newTitle) => {
    setHeaderTitle(newTitle);
    setHeaderLogo(newLogo);
    setIsModalVisible(false);
  };

  const handleEditFooter = newContent => {
    setFooterContent(newContent);
    setIsModalVisible(false);
  };

  return (
<div className="flex flex-col min-h-screen">
      <Header
        logo={templateData.logo || headerLogo}
        title={templateData.title || headerTitle}
        onEdit={handleEditHeader}
      />
      <div className="flex-1 mb-20 px-4">
        {sections.map(section => (
          <Section
            key={section.id}
            title={section.title}
            content1={section.content1}
            content2={section.content2}
            onDelete={() => confirmDeleteSection(section.id)}
            onEdit={(newTitle, newContent1, newContent2) =>
              handleEditSection(section.id, newTitle, newContent1, newContent2)
            }
          />
        ))}
        <div className="flex justify-end mt-20">
          <Button type="primary" onClick={handleAddSection}>
            Add more Section
          </Button>
        </div>
      </div>
<Footer content={templateData.footer || footerContent} onEdit={handleEditFooter} />
      <Modal
        title={
          modalContent === 'deleteSection'
            ? 'Confirm Delete'
            : modalContent === 'editHeader'
            ? 'Edit Header'
            : 'Edit Footer'
        }
        visible={isModalVisible}
        onOk={
          modalContent === 'deleteSection'
            ? handleDelete
            : modalContent === 'editHeader'
            ? () => handleEditHeader(headerLogo, headerTitle)
            : () => handleEditFooter(footerContent)
        }
        onCancel={handleCancel}
        okText="Delete"
        cancelText="Cancel"
      >
        {modalContent === 'deleteSection' ? (
          <p>Are you sure you want to delete this section?</p>
        ) : modalContent === 'editHeader' ? (
          <div>
            <Input
              placeholder="Logo"
              value={headerLogo}
              onChange={e => setHeaderLogo(e.target.value)}
              style={{ marginBottom: '10px' }}
            />
            <Input
              placeholder="Title"
              value={headerTitle}
              onChange={e => setHeaderTitle(e.target.value)}
            />
          </div>
        ) : (
          <Input
            placeholder="Footer Content"
            value={footerContent}
            onChange={e => setFooterContent(e.target.value)}
          />
        )}
      </Modal>
    </div>
  );
};

export default ConfigPage;
