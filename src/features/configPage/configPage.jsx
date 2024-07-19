import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Modal, Input } from 'antd';
import Header from './header';
import Footer from './footer';
import Section from './section';
import {
  getTemplate,
  editHeader,
  editFooter
} from '../dashboard/templatesSlice';
import { addSection, deleteSection, editSection } from './sectionSlice';
import { useAppDispatch } from '../../store/hooks';
import { LoadingContext } from '../../contexts/LoadingContext';
import { NotificationContext } from '../../contexts/NotificationContext';
import BackUpUI from '../templates/backUpUI';

function ConfigPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [templateData, setTemplateData] = useState({});
  const [sections, setSections] = useState([]);
  const { setIsLoading } = useContext(LoadingContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [sectionToDelete, setSectionToDelete] = useState(null);
  const [headerTitle, setHeaderTitle] = useState('');
  const [headerAva, setHeaderAva] = useState('');
  const [headerLogo, setHeaderLogo] = useState('');
  const [footerContent, setFooterContent] = useState('');
  const { openNotification } = useContext(NotificationContext);
  const [showBackupUI, setShowBackupUI] = useState(false);

  useEffect(() => {
    fetchSections();
  }, [id]);

  const fetchSections = () => {
    dispatch(getTemplate(id))
      .unwrap()
      .then((response) => {
        setTemplateData(response);
        setSections(response.section);
        setHeaderTitle(response.title);
        setHeaderAva(response.ava_path);
        setHeaderLogo(response.logo);
        setFooterContent(response.footer);
      })
      .catch((error) => {
        console.error('Failed to fetch sections:', error);
        setShowBackupUI(true);
      });
  };

  const handleAddSection = () => {
    const templateId = id;
    setIsLoading(true);
    console.log('Adding new section:', templateId);
    console.log('Template ID:', id);
    dispatch(addSection(templateId))
      .unwrap()
      .then((response) => {
        setSections((prevSections) => [...prevSections, response.section]);
        openNotification({
          message: 'Section added successfully',
          type: 'success',
          title: 'Success'
        });
        fetchSections();
      })
      .catch((error) => {
        console.error('Failed to add section:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const confirmDeleteSection = (sectionId) => {
    console.log('Confirming delete for section with id:', sectionId);
    if (sections.length > 1) {
      setIsModalVisible(true);
      setSectionToDelete(sectionId);
      setModalContent('deleteSection');
    } else {
      openNotification({
        message: 'At least one section must be present!',
        type: 'error',
        title: 'Error'
      });
    }
  };

  const handleDeleteSection = () => {
    console.log('Deleting section with id:', sectionToDelete);
    setIsLoading(true);
    dispatch(deleteSection(sectionToDelete))
      .unwrap()
      .then(() => {
        setSections((prevSections) =>
          prevSections.filter(
            (section) => section.section_id !== sectionToDelete
          )
        );
        openNotification({
          message: 'Section deleted successfully',
          type: 'success',
          title: 'Success'
        });
        fetchSections();
      })
      .catch((error) => {
        openNotification({
          message: 'Failed to delete section',
          type: 'error',
          title: 'Error'
        });
        console.error('Failed to delete section:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
    setIsModalVisible(false);
    setSectionToDelete(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSectionToDelete(null);
  };

  const handleEditSection = (
    sectionId,
    newTitle,
    newContent1,
    newContent2,
    newType
  ) => {
    console.log('handleEditSection called with:', {
      sectionId,
      newTitle,
      newContent1,
      newContent2,
      newType
    });

    const payload = {
      title: newTitle,
      content1: newContent1,
      content2: newContent2,
      type: Number(newType)
    };
    console.log('Payload before dispatch:', payload);

    setIsLoading(true);
    const templateId = id;

    dispatch(
      editSection({
        templateId,
        sectionId,
        section: payload
      })
    )
      .unwrap()
      .then(() => {
        setSections((prevSections) =>
          prevSections.map((section) =>
            section.id === sectionId
              ? {
                  ...section,
                  title: newTitle,
                  content1: newContent1,
                  content2: newContent2,
                  type: newType
                }
              : section
          )
        );
        openNotification({
          message: 'Section edited successfully',
          type: 'success',
          title: 'Success'
        });
        fetchSections();
      })
      .catch((error) => {
        openNotification({
          message: 'Failed to edit section',
          type: 'error',
          title: 'Error'
        });
        console.error('Failed to edit section:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleEditHeader = (newTitle) => {
    setIsLoading(true);
    dispatch(
      editHeader({
        id,
        header: {
          title: newTitle
        }
      })
    )
      .unwrap()
      .then(() => {
        openNotification({
          message: 'Header edited successfully',
          type: 'success',
          title: 'Success'
        });
        setHeaderTitle(newTitle);
        fetchSections();
      })
      .catch((error) => {
        openNotification({
          message: 'Failed to edit header',
          type: 'error',
          title: 'Error'
        });
        console.error('Failed to edit header:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
    setIsModalVisible(false);
  };

  const handleEditFooter = (newContent) => {
    setIsLoading(true);
    dispatch(
      editFooter({
        id,
        footer: {
          footer: newContent
        }
      })
    )
      .unwrap()
      .then(() => {
        openNotification({
          message: 'Footer edited successfully',
          type: 'success',
          title: 'Success'
        });
        setFooterContent(newContent);
        fetchSections();
      })
      .catch((error) => {
        openNotification({
          message: 'Failed to edit footer',
          type: 'error',
          title: 'Error'
        });
        console.error('Failed to edit footer:', error);
      })
      .finally(() => {
        setIsLoading(false);
        setIsModalVisible(false);
      });
  };

  if (showBackupUI) {
    return <BackUpUI />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        logo={templateData.logo || headerLogo}
        title={templateData.title || headerTitle}
        onEdit={handleEditHeader}
        ava_path={templateData.ava_path || headerAva}
      />
      <div className="flex-1 mb-20 px-4">
        {sections.map((section) => (
          <Section
            key={section.section_id}
            sectionId={section.id}
            type={Number(section.type)}
            title={section.title}
            content1={section.content1}
            content2={section.content2}
            onDelete={() => {
              console.log('Deleting section with id:', section.id);
              confirmDeleteSection(section.id);
            }}
            onEdit={(newTitle, newContent1, newContent2, newType) =>
              handleEditSection(
                section.id,
                newTitle,
                newContent1,
                newContent2,
                newType
              )
            }
          />
        ))}
        <div className="flex justify-end mt-20">
          <Button type="primary" onClick={handleAddSection}>
            Add more Section
          </Button>
        </div>
      </div>
      <Footer
        footer={templateData.footer || footerContent}
        onEdit={handleEditFooter}
      />
      <Modal
        title={
          modalContent === 'deleteSection'
            ? 'Confirm Delete'
            : modalContent === 'editHeader'
              ? 'Edit Header'
              : 'Edit Footer'
        }
        open={isModalVisible}
        onOk={
          modalContent === 'deleteSection'
            ? handleDeleteSection
            : modalContent === 'editHeader'
              ? () => handleEditHeader(headerLogo, headerTitle)
              : () => handleEditFooter(footerContent)
        }
        onCancel={handleCancel}
        okText={modalContent === 'deleteSection' ? 'Delete' : 'Save'}
        cancelText="Cancel"
      >
        {modalContent === 'deleteSection' ? (
          <p>Are you sure you want to delete this section?</p>
        ) : modalContent === 'editHeader' ? (
          <div>
            <Input
              placeholder="Logo"
              value={headerLogo}
              onChange={(e) => setHeaderLogo(e.target.value)}
              style={{ marginBottom: '10px' }}
            />
            <Input
              placeholder="Title"
              value={headerTitle}
              onChange={(e) => setHeaderTitle(e.target.value)}
            />
          </div>
        ) : (
          <Input
            placeholder="Footer Content"
            value={footerContent}
            onChange={(e) => setFooterContent(e.target.value)}
          />
        )}
      </Modal>
    </div>
  );
}

export default ConfigPage;
