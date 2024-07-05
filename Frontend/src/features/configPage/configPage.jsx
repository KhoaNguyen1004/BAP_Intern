import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'antd';
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

  const deleteSection = sectionId => {
    setSections(prevSections =>
      prevSections.filter((_, index) => index !== sectionId)
    );
  };

  return (
    <div className="flex flex-col">
      <Header
        logo={templateData.logo || 'Logo'}
        title={templateData.title || 'Title'}
      />
      <div className="flex-1 mb-20">
        {sections.map((item, index) => (
          <Section key={index} onDelete={() => deleteSection(index)}>
            <h2>Config Page {id}</h2>
            <div>{item.title}</div>
            <div>{item.content1}</div>
            <div>{item.content2}</div>
          </Section>
        ))}
        <div className="flex justify-end mt-6">
          <Button type="primary" onClick={handleAddSection}>
            Add more Section
          </Button>
        </div>
      </div>
      <Footer content={templateData.footer || 'Made with ❤️'} />
    </div>
  );
};

export default ConfigPage;
