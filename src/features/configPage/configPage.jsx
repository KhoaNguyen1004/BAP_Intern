import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Modal, Input } from 'antd';
import Header from './header';
import Footer from './footer';
import Section from './section';
// import { getTemplate } from '../dashboard/templatesSlice';
// import { addSection, deleteSection, editSection } from './sectionSlice';
// import { editHeader, editFooter } from '../dashboard/templatesSlice';
// import { useAppDispatch } from '../../store/hooks';
import { LoadingContext } from '../../contexts/LoadingContext';
import { NotificationContext } from '../../contexts/NotificationContext';

const ConfigPage = () => {
  const { id } = useParams();
  // const dispatch = useAppDispatch();
  const [templateData, setTemplateData] = useState({
    logo: "sample_logo.png",
    title: "Sample Title",
    footer: "Sample Footer",
  });
  const [sections, setSections] = useState([
    { section_id: 1, type: 1, title: "Sample Section 1", content1: "Content 1", content2: "" },
    { section_id: 2, type: 2, title: "Sample Section 2", content1: "Content 1", content2: "Content 2" }
  ]);
  const { setIsLoading } = useContext(LoadingContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [sectionToDelete, setSectionToDelete] = useState(null);
  const [headerTitle, setHeaderTitle] = useState(templateData.title);
  const [headerLogo, setHeaderLogo] = useState(templateData.logo);
  const [footerContent, setFooterContent] = useState(templateData.footer);
  const { openNotification } = useContext(NotificationContext);

  // useEffect(() => {
  //   fetchSections();
  // }, [id]);

  // const fetchSections = () => {
  //   dispatch(getTemplate(id))
  //     .unwrap()
  //     .then(response => {
  //       setTemplateData(response);
  //       setSections(response.section || []);
  //       console.log('response:', response);
  //       console.log('response.footer:', response.footer);
  //     })
  //     .catch(error => {
  //       console.error('Failed to fetch sections:', error);
  //     });
  // };

  const handleAddSection = () => {
    const newSection = {
      section_id: sections.length + 1,
      type: 1,
      title: `New Section ${sections.length + 1}`,
      content1: "New Content 1",
      content2: ""
    };
    setSections(prevSections => [...prevSections, newSection]);
    openNotification({
      message: 'Section added successfully',
      type: 'success',
      title: 'Success'
    });
    // fetchSections();
  };

  const confirmDeleteSection = sectionId => {
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
    setSections(prevSections =>
      prevSections.filter(section => section.section_id !== sectionToDelete)
    );
    openNotification({
      message: 'Section deleted successfully',
      type: 'success',
      title: 'Success'
    });
    // fetchSections();
    setIsModalVisible(false);
    setSectionToDelete(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSectionToDelete(null);
  };

  const handleEditSection = (
    id,
    newTitle,
    newContent1,
    newContent2,
    newType
  ) => {
    setSections(prevSections =>
      prevSections.map(section =>
        section.section_id === id
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
    // fetchSections();
  };

  const handleEditHeader = (newLogo, newTitle) => {
    setHeaderTitle(newTitle);
    setHeaderLogo(newLogo);
    openNotification({
      message: 'Header edited successfully',
      type: 'success',
      title: 'Success'
    });
    // fetchSections();
    setIsModalVisible(false);
  };

  const handleEditFooter = newContent => {
    setFooterContent(newContent);
    openNotification({
      message: 'Footer edited successfully',
      type: 'success',
      title: 'Success'
    });
    // fetchSections();
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
            key={section.section_id}
            type={Number(section.type)}
            title={section.title}
            content1={section.content1}
            content2={section.content2}
            onDelete={() => {
              console.log('Deleting section with id:', section.id);
              console.log(
                'Deleting section with section.section_id:',
                section.section_id
              );
              confirmDeleteSection(section.section_id);
            }}
            onEdit={(newTitle, newContent1, newContent2, newType) =>
              handleEditSection(
                section.section_id,
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
