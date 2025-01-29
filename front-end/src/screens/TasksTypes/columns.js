import * as yup from 'yup';

export const taskTypeColumns = {
  mainColumn: 'nome_tarefa',
  
  columns: [
    { 
      field: "taskName", 
      headerName: "Nome da Tarefa", 
      flex: 1, 
      cellClassName: "name-column--cell", 
      editable: true,
      validation: yup.string().required('Nome da tarefa é obrigatório')
    },
    { 
      field: "description", 
      headerName: "Descrição", 
      flex: 1, 
      editable: true,
      validation: yup.string().required('Descrição é obrigatória')
    }
  ]
};