import { transformers } from './dataTransformer';

export const ENTITY_TYPES = {
  TASK: 'task',
  COORDINATOR: 'coordinator',
  TASK_TYPE: 'taskType',
  UNIT: 'unit',
  VOLUNTEER: 'volunteer',
  SKILL: 'skill',
  SPOT: 'spot',
  SPOT_STATUS: 'spotStatus'
};

export const validateEntityType = (entityType) => {
  if (!Object.values(ENTITY_TYPES).includes(entityType)) {
    throw new Error(`Invalid entity type: "${entityType}"`);
  }
  return entityType;
};

export const getEntityDefinition = (entityType) => {
  validateEntityType(entityType);
  return {
    transformer: transformers[entityType],
    requiredFields: transformers[entityType].requiredFields
  };
};

export const transform = (data, entityType, direction) => {
  validateEntityType(entityType);
  const transformer = transformers[entityType][direction];
  
  if (!transformer) {
    throw new Error(`Invalid transformation: direction "${direction}" not found for entity type "${entityType}"`);
  }
  
  return Array.isArray(data) ? data.map(transformer) : transformer(data);
};

export const getRequiredFields = (entityType) => {
  validateEntityType(entityType);
  return transformers[entityType].requiredFields;
};