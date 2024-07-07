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
        {template.section.map((sec, index) => (
          <section key={index} className="section-content">
            <h2>{sec.title}</h2>
            {sec.type === 1 ? (
              <div className="content-single">
                <p>{sec.content || 'No content available'}</p>
              </div>
            ) : (
              <div className="content-double">
                <div className="content-part">
                  <p>{sec.content1 || 'No content available'}</p>
                </div>
                {sec.content2 ? (
                  <div className="content-part">
                    <p>{sec.content2 || 'No content available'}</p>
                  </div>
                ) : (
                  <div className="content-part">
                    <p>No second content available</p>
                  </div>
                )}
              </div>
            )}
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
