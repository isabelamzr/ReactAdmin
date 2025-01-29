import { useState, useEffect } from 'react';
import { transform, getRequiredFields } from '../../utils/dataTransformer';

export const FormDataTransformer = ({ children, entityType, onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({});
  const [backendData, setBackendData] = useState({});
  const requiredFields = getRequiredFields(entityType);

  useEffect(() => {
    if (Object.keys(initialData).length > 0) {
      const transformed = transform(initialData, entityType, 'toFrontend');
      setFormData(transformed);
    }
  }, [initialData, entityType]);

  const updateFormData = (newData) => {
    setFormData(newData);
    const transformedData = transform(newData, entityType, 'toBackend');
    setBackendData(transformedData);
    return transformedData;
  };

  const handleSubmit = async (values) => {
    const transformedData = updateFormData(values);
    return await onSubmit(transformedData);
  };

  return children({
    formData,
    updateFormData,
    backendData,
    requiredFields,
    onSubmit: handleSubmit
  });
};
