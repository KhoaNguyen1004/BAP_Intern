import React, { useState } from 'react';
import { Button, Modal, Input, message } from 'antd';
import Header from './header';
import Footer from './footer';
import Section from './section';

const ConfigPage = () => {
  const [sections, setSections] = useState([
    { id: 1, title: `Section 1`, content1: 'Content 1', content2: 'Content 2' }
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [sectionToDelete, setSectionToDelete] = useState(null);
  const [headerTitle, setHeaderTitle] = useState('Title');
  const [headerLogo, setHeaderLogo] = useState('Logo');
  const [footerContent, setFooterContent] = useState('Made with ❤️');

  const addSection = () => {
    const newSection = {
      id: sections.length + 1,
      title: `Section ${sections.length + 1}`,
      content1: 'Content 1',
      content2: 'Content 2'
    };
    setSections(prevSections => [...prevSections, newSection]);
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
      <Header logo={headerLogo} title={headerTitle} onEdit={handleEditHeader} />
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
          <Button type="primary" onClick={addSection}>
            Add more Section
          </Button>
        </div>
      </div>
      <Footer content={footerContent} onEdit={handleEditFooter} />
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
