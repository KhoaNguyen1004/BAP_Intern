import React, { useEffect, useState } from 'react';
import templateService from '../../services/template.service';
import Header from '../configPage/header';
import Footer from '../configPage/footer';

const GuestUI = () => {
  const [template, setTemplate] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    templateService
      .getTemplate()
      .then(data => {
        setTemplate(data);
        console.log('Data: ', data);
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
        <Header
          logo={template.logo}
          title={template.title}
          isEditable={false}
        />
      </div>
      <div
        className="content-wrapper flex-1 px-4"
        style={{ paddingTop: '64px' }}
      >
        {/* Adjust paddingTop according to your header height */}
        {template.section.map((sec, index) => (
          <section key={index}>
            <h2>{sec.title}</h2>
            <h2>Section contents</h2>
            <p>{sec.content}</p>
          </section>
        ))}
      </div>
      <div className="footer-wrapper">
        <Footer content={template.footer} isEditable={false} />
      </div>
    </div>
  );
};

export default GuestUI;
