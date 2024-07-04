import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'antd';
import Header from './header';
import Footer from './footer';
import Section from './section';

const ConfigPage = () => {
  const params = useParams();
  const { id } = params;

  const [sectionCount, setSectionCount] = useState(1);

  const addSection = () => {
    setSectionCount(prevCount => prevCount + 1);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header logo={'Logo'} title={'Title'} />
      <div className="flex-1">
        {[...Array(sectionCount)].map((_, index) => (
          <Section key={index} title={`Section ${index + 1}`}>
            <div>
              <h1>Config Page {id}</h1>
              <a href="/admin/dashboard" className="text-blue-500 block mb-1">
                Back to Dashboard
              </a>
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
