import * as yup from 'yup';
import { taskTypeServices } from '../../services/taskTypeServices';
import { coordinatorServices } from '../../services/coordinatorServices';
import { unitServices } from '../../services/unitServices';
import { volunteerServices } from '../../services/volunteerServices';
import { getRequiredFields } from '../../utils/entityTypes';

export const taskColumns = {
  mainColumn: 'taskID',
  columns: [
    {
      field: "taskNameView",
      headerName: "Tarefa",
      flex: 1,
      editable: true,
      type: 'singleSelect',
      validation: yup.string().required('Tarefa é obrigatória'),
      getOptions: async () => {
        const { success, data } = await taskTypeServices.getAll();
        return success ? data.map(type => ({
          value: type.id,
          label: type.taskNameView
        })) : [];
      },
      required: true
    },
    {
      field: "coordinatorFKView",
      headerName: "Coordenador",
      flex: 1,
      editable: true,
      type: 'singleSelect',
      validation: yup.string().required('Coordenador é obrigatório'),
      getOptions: async () => {
        const { success, data } = await coordinatorServices.getAll();
        return success ? data.map(coord => ({
          value: coord.id,
          label: coord.name
        })) : [];
      },
      required: true
    },
    {
      field: "unitFKView",
      headerName: "Unidade",
      flex: 1,
      editable: true,
      type: 'singleSelect',
      validation: yup.string().required('Unidade é obrigatória'),
      getOptions: async () => {
        const { success, data } = await unitServices.getAll();
        return success ? data.map(unit => ({
          value: unit.id,
          label: unit.name
        })) : [];
      },
      required: true
    },
    {
      field: "volunteerFKView",
      headerName: "Voluntário",
      flex: 1,
      editable: true,
      type: 'singleSelect',
      validation: yup.string().required('Voluntário é obrigatório'),
      getOptions: async () => {
        const { success, data } = await volunteerServices.getAll();
        return success ? data.map(vol => ({
          value: vol.id,
          label: vol.name
        })) : [];
      },
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

export const getVisibleColumns = (type) => {
  const requiredFields = getRequiredFields(type);
  return taskColumns.columns.filter(col => 
    requiredFields.includes(col.field)
  );
};
