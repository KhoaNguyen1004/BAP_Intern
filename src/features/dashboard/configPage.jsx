import React from 'react';
import { useParams } from 'react-router-dom';

const ConfigPage = () => {
  const params = useParams();

  if (!params || !params.id) {
    return <div>No ID provided</div>; 
  }

  const { id } = params;

  return (
    <div>
      <h1>Config Page {id}</h1>
    </div>
  );
};

export default ConfigPage;
