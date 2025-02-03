import * as yup from 'yup';
import { getRequiredFields, validateEntityType } from '../../utils/entityTypes';
import { withCache } from '../../utils/helpers';

const getOptionsGenerator = (options) => () => options;

const createTaskColumns = ({ 
  taskOptions = [], 
  coordinatorOptions = [], 
  unitOptions = [], 
  volunteerOptions = [] 
} = {}) => { 
  console.log('TaskColumns chamado');

  return {
    mainColumn: 'taskNameView',
    columns: [
      {
        field: "taskNameView",
        headerName: "Tarefa",
        flex: 1,
        editable: true,
        type: 'singleSelect',
        validation: yup.string().required('Tarefa é obrigatória'),
        getOptions: getOptionsGenerator(taskOptions),
        required: true
      },
      {
        field: "coordinatorFKView",
        headerName: "Coordenador",
        flex: 1,
        editable: true,
        type: 'singleSelect',
        validation: yup.string().required('Coordenador é obrigatório'),
        getOptions: getOptionsGenerator(coordinatorOptions),
        required: true
      },
      {
        field: "unitFKView",
        headerName: "Unidade",
        flex: 1,
        editable: true,
        type: 'singleSelect',
        validation: yup.string().required('Unidade é obrigatória'),
        getOptions: getOptionsGenerator(unitOptions),
        required: true
      },
      {
        field: "volunteerFKView",
        headerName: "Voluntário",
        flex: 1,
        editable: true,
        type: 'singleSelect',
        validation: yup.string().required('Voluntário é obrigatório'),
        getOptions: getOptionsGenerator(volunteerOptions),
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
  };
};

export const TaskColumns = withCache((props) => {
  if (!props) {
    console.warn("TaskColumns chamado sem props válidas");
    return { mainColumn: 'taskNameView', columns: [] };
  }
  return createTaskColumns(props);
}, "TaskColumns");

export const getVisibleColumns = withCache((entityType, columns) => {
  validateEntityType(entityType);
  if (!columns || !Array.isArray(columns)) {
    console.warn("getVisibleColumns chamado com colunas inválidas");
    return [];
  }
  const requiredFields = getRequiredFields(entityType);
  return columns.filter(col => requiredFields.includes(col.field));
}, "getVisibleColumns");