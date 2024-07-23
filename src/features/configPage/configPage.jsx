
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const handleClick = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  };
  const handleMouseEnter = () => {
    setShow(true);
  };

  const handleMouseLeave = () => {
    setShow(false);
  };

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
  const [show, setShow] = useState(false);

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
    dispatch(addSection(templateId))
      .unwrap()
      .then((response) => {
        setSections((prevSections) => [...prevSections, response.section]);
        openNotification({
          message: t('ADD_SECTION.Success', {ns: 'notification'}),
          type: 'success',
          title: t('NOTI.Success', {ns: 'notification'})
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
    if (sections.length > 1) {
      setIsModalVisible(true);
      setSectionToDelete(sectionId);
      setModalContent('deleteSection');
    } else {
      openNotification({
        message: t('DELETE_SECTION.One_Section', {ns: 'notification'}),
        type: 'error',
        title: t('NOTI.Error', {ns: 'notification'})
      });
    }
  };

  const handleDeleteSection = () => {
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
          message: t('DELETE_SECTION.Success', {ns: 'notification'}),
          type: 'success',
          title: t('NOTI.Success', {ns: 'notification'})
        });
        fetchSections();
      })
      .catch((error) => {
        openNotification({
          message: t('DELETE_SECTION.Error', {ns: 'notification'}),
          type: 'error',
          title: t('NOTI.Error', {ns: 'notification'})
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
    const payload = {
      title: newTitle,
      content1: newContent1,
      content2: newContent2,
      type: Number(newType)
    };

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
          message: t('EDIT_SECTION.Success', {ns: 'notification'}),
          type: 'success',
          title: t('NOTI.Success', {ns: 'notification'})
        });
        fetchSections();
      })
      .catch((error) => {
        openNotification({
          message: t('EDIT_SECTION.Empty', {ns: 'notification'}),
          type: 'error',
          title: t('NOTI.Error', {ns: 'notification'})
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
          message: t('EDIT_HEADER.Success', {ns: 'notification'}),
          type: 'success',
          title: t('NOTI.Success', {ns: 'notification'})
        });
        setHeaderTitle(newTitle);
        fetchSections();
      })
      .catch((error) => {
        openNotification({
          message: t('EDIT_HEADER.Empty', {ns: 'notification'}),
          type: 'error',
          title: t('NOTI.Error', {ns: 'notification'})
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
          message: t('EDIT_FOOTER.Success', {ns: 'notification'}),
          type: 'success',
          title: t('NOTI.Success', {ns: 'notification'})
        });
        setFooterContent(newContent);
      })
      .catch((error) => {
        openNotification({
          message: t('EDIT_FOOTER.Empty', {ns: 'notification'}),
          type: 'error',
          title: t('NOTI.Error', {ns: 'notification'})
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
      {templateData.header_type === undefined ? (
        <Header
          logo={templateData.logo || headerLogo}
          title={templateData.title || headerTitle}
          onEdit={handleEditHeader}
          ava_path={templateData.ava_path || headerAva}
        />
      ) : (
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
            className={`absolute bg-white min-w-[160px] shadow-lg z-10 ${show ? 'block' : 'hidden'}`}
            role="menu"
          >
            {sections.map((section) => (
              <a
                className="block text-black p-3 no-underline hover:bg-gray-200"
                key={section.section_id}
                id={section.id}
                onClick={() => handleClick(section.id)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleClick(section.id); }}
                role="menuitem"
                tabIndex={0}
              >
                {section.title}
              </a>
            ))}
          </div>
        </div>
      )}


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
        <div className="flex justify-end mt-28">
          <Button type="primary" onClick={handleAddSection}>
           {t('CONFIG/PAGE.ADD_MORE_SECTION')}
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
            ? t('CONFIG/PAGE.DELETE_SECTION.Confirm')
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
        cancelText={t('BUTTON.Cancel')}
      >
        {modalContent === 'deleteSection' ? (
          <p>{t('CONFIG/PAGE.DELETE_SECTION.Content')}</p>
        ) : modalContent === 'editHeader' ? (
          <div>
            <Input
              placeholder="Logo"
              value={headerLogo}
              onChange={(e) => setHeaderLogo(e.target.value)}
              style={{ marginBottom: '10px' }}
            />
            <Input
              placeholder={t('CONFIG/PAGE.EDIT_HEADER.Title_Placeholder')}
              rules={[
                {
                  required: true,
                  message: t('CONFIG/PAGE.EDIT_HEADER.Title_Required')
                }
              ]}
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
