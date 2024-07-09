import { useState } from 'react';

const useTemplateModals = (fetchTemplates, chosen) => {
  const [selectedTemplate, setSelectedTemplate] = useState(chosen);
  const [selectedTemplateId, setSelectedTemplateId] = useState('');
  const [selectedTemplatesToDelete, setSelectedTemplatesToDelete] = useState(
    []
  );
  const [isAddTemplateModalOpen, setIsAddTemplateModalOpen] = useState(false);
  const [isDeleteTemplateModalOpen, setIsDeleteTemplateModalOpen] =
    useState(false);
  const [isConfigTemplateModalOpen, setIsConfigTemplateModalOpen] =
    useState(false);
  const [isCloneTemplate, setIsCloneTemplate] = useState(true);
  const [, setShowPopconfirm] = useState(false);

  const handleConfirmDelete = () => {
    setShowPopconfirm(true);
  };

  const showAddTemplateModal = () => {
    setIsAddTemplateModalOpen(true);
  };

  const showDeleteTemplateModal = () => {
    setIsDeleteTemplateModalOpen(true);
  };

  const showConfigTemplateModal = () => {
    setIsConfigTemplateModalOpen(true);
  };

  const handleCancel = () => {
    setIsAddTemplateModalOpen(false);
    setIsDeleteTemplateModalOpen(false);
    setIsConfigTemplateModalOpen(false);
    fetchTemplates();
    setSelectedTemplatesToDelete([]);
  };

  const handleOk = () => {
    setIsAddTemplateModalOpen(false);
    setIsConfigTemplateModalOpen(false);
    setShowPopconfirm(false);
  };

  const handleTemplateChange = e => {
    setSelectedTemplate(e.target.value);
  };
  const handleTemplateIdChange = e => {
    setSelectedTemplateId(e.target.value);
  };

  return {
    selectedTemplate,
    selectedTemplatesToDelete,
    isAddTemplateModalOpen,
    isDeleteTemplateModalOpen,
    isConfigTemplateModalOpen,
    isCloneTemplate,
    selectedTemplateId,
    handleTemplateChange,
    handleConfirmDelete,
    showAddTemplateModal,
    showDeleteTemplateModal,
    showConfigTemplateModal,
    handleCancel,
    handleOk,
    setIsCloneTemplate,
    setShowPopconfirm,
    setIsDeleteTemplateModalOpen,
    setIsAddTemplateModalOpen,
    setSelectedTemplate,
    setSelectedTemplatesToDelete,
    setSelectedTemplateId,
    handleTemplateIdChange
  };
};

export default useTemplateModals;
