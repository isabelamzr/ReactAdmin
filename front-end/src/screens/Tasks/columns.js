import * as yup from 'yup';
import { getRequiredFields, validateEntityType } from '../../utils/entityTypes';

export const TaskColumns = ({ taskOptions, coordinatorOptions, unitOptions, volunteerOptions }) => ({
  mainColumn: 'taskID',
  columns: [
    {
      field: "taskNameView",
      headerName: "Tarefa",
      flex: 1,
      editable: true,
      type: 'singleSelect',
      validation: yup.string().required('Tarefa é obrigatória'),
      getOptions: () => taskOptions || [],
      required: true
    },
    {
      field: "coordinatorFKView",
      headerName: "Coordenador",
      flex: 1,
      editable: true,
      type: 'singleSelect',
      validation: yup.string().required('Coordenador é obrigatório'),
      getOptions: () => coordinatorOptions || [],
      required: true
    },
    {
      field: "unitFKView",
      headerName: "Unidade",
      flex: 1,
      editable: true,
      type: 'singleSelect',
      validation: yup.string().required('Unidade é obrigatória'),
      getOptions: () => unitOptions || [],
      required: true
    },
    {
      field: "volunteerFKView",
      headerName: "Voluntário",
      flex: 1,
      editable: true,
      type: 'singleSelect',
      validation: yup.string().required('Voluntário é obrigatório'),
      getOptions: () => volunteerOptions || [],
      required: true
    },
    {
      field: "day",
      headerName: "Dia",
      flex: 1,
      editable: true,
      validation: yup.string().required('Dia é obrigatório'),
      required: true
    },
    {
      field: "time",
      headerName: "Horário",
      flex: 1,
      editable: true,
      validation: yup.string().required('Horário é obrigatório'),
      required: true
    },
    {
      field: "location",
      headerName: "Local",
      flex: 1,
      editable: true,
      validation: yup.string().required('Local é obrigatório'),
      required: true
    }
  ]
});

export const getVisibleColumns = (entityType, columns) => {
  validateEntityType(entityType); 
  const requiredFields = getRequiredFields(entityType); 
  return columns.filter(col => requiredFields.includes(col.field)); 
};


