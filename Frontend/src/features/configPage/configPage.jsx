import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'antd';
import Header from './header';
import Footer from './footer';
import Section from './section';

const ConfigPage = () => {
  const params = useParams();
  const { id } = params;

  const [sections, setSections] = useState([{ id: 1, title: `Section 1` }]);

  const addSection = () => {
    const newSection = {
      id: sections.length + 1,
      title: `Section ${sections.length + 1}`
    };
    setSections(prevSections => [...prevSections, newSection]);
  };

  const deleteSection = sectionId => {
    if (sections.length > 1) {
      setSections(prevSections =>
        prevSections.filter(section => section.id !== sectionId)
      );
    }
  };

  return (
    <div className="flex flex-col">
      <Header logo={'Logo'} title={'Title'} />
      <div className="flex-1 mb-20">
        {sections.map(section => (
          <Section
            key={section.id}
            title={section.title}
            onDelete={() => deleteSection(section.id)}
          >
            <div>
              <h1>Config Page {id}</h1>
            </div>
          </Section>
        ))}
        <div className="flex justify-end mt-6">
          <Button type="primary" onClick={addSection}>
            Add more Section
          </Button>
        </div>
      </div>
      <Footer content={'Made with ❤️'} />
    </div>
  );
};

export default ConfigPage;
