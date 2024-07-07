import React, { useEffect, useState } from 'react';
import templateService from '../../services/template.service';
import Header from '../configPage/header';
import Footer from '../configPage/footer';
import Section from '../configPage/section';

const GuestUI = () => {
  const [template, setTemplate] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    templateService
      .getTemplate()
      .then(data => {
        console.log('API data: ', data);
        if (data && data.section) {
          const updatedSections = data.section.map(sec => ({
            ...sec,
            type: Number(sec.type)
          }));
          console.log('Updated Sections: ', updatedSections);
          setTemplate({ ...data, section: updatedSections });
        } else {
          setError('Invalid template data');
        }
      })
      .catch(() => setError('Failed to fetch template'));
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!template) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="header-wrapper">
        <Header logo={template.logo} title={template.title} isEditable={false} />
      </div>
      <div className="flex-1 mb-20 px-4">
        {template.section.map((sec, index) => (
          <Section
            key={index}
            type={sec.type}
            title={sec.title}
            content1={sec.content1}
            content2={sec.content2}
            isEditable={false}
          />
        ))}
      </div>
      <div className="footer-wrapper">
        <Footer content={template.footer} isEditable={false} />
      </div>
    </div>
  );
};

export default GuestUI;
