import React from 'react';
import { useParams } from 'react-router-dom';

const ConfigPage = () => {
  const params = useParams();

  if (!params || !params.id) {
    return <div>No ID provided</div>;
  }

  const { id } = params;

  // TODO: Call api fetch data by id

  return (
    <div>
      <h1>Config Page {id}</h1>
      <a href="/admin/dashboard">Back to Dashboard</a>
    </div>
  );
};

export default ConfigPage;
