import React, { useEffect, useContext } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getAllTemplates } from './templatesSlice';
import { LoadingContext } from '../../contexts/LoadingContext';

function ConfigSection() {
  const { setIsLoading } = useContext(LoadingContext);
  const dispatch = useAppDispatch();
  const { templates, status, error } = useAppSelector(state => state.templates);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getAllTemplates())
      .unwrap()
      .then(response => {
        console.log('Fetched templates:', response);
      })
      .catch(err => {
        console.error('Error fetching templates:', err);
      })
      .finally(() => setIsLoading(false));
  }, [dispatch, setIsLoading]);

  return (
    <div>
      <h1>Config Section</h1>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>{error}</p>}

      {status === 'succeeded' && Array.isArray(templates) && (
        <ul>
          {templates.map(template => (
            <li key={template.id}>{template.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ConfigSection;
