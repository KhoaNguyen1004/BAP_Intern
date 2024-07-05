import { useState } from 'react';

const useTemplateModals = (fetchTemplates, chosen) => {
  const [selectedTemplate, setSelectedTemplate] = useState(chosen);
  const [selectedTemplatesToDelete, setSelectedTemplatesToDelete] = useState(
    []
  );
  const [isAddTemplateModalOpen, setIsAddTemplateModalOpen] = useState(false);
  const [isDeleteTemplateModalOpen, setIsDeleteTemplateModalOpen] =
    useState(false);
  const [isConfigTemplateModalOpen, setIsConfigTemplateModalOpen] =
    useState(false);
  const [, setCloneTemplate] = useState(true);
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

  const handleTemplateDelete = checkedValues => {
    setSelectedTemplatesToDelete(checkedValues);
  };

  const handleTemplateChange = e => {
    setSelectedTemplate(e.target.value);
  };

  return {
    selectedTemplate,
    selectedTemplatesToDelete,
    isAddTemplateModalOpen,
    isDeleteTemplateModalOpen,
    isConfigTemplateModalOpen,
    handleTemplateChange,
    handleTemplateDelete,
    handleConfirmDelete,
    showAddTemplateModal,
    showDeleteTemplateModal,
    showConfigTemplateModal,
    handleCancel,
    handleOk,
    setCloneTemplate,
    setShowPopconfirm,
    setIsDeleteTemplateModalOpen,
    setIsAddTemplateModalOpen,
    setSelectedTemplate
  };
};

export default useTemplateModals;
