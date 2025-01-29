import { useState, useEffect } from 'react';
import { transform, getRequiredFields } from '../utils/dataTransformer';

export const useFormTransformer = (entityType, initialData = {}) => {
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

  return {
    formData,
    backendData,
    requiredFields,
    updateFormData,
    getBackendData: () => backendData,
    getFrontendData: () => formData
  };
};
