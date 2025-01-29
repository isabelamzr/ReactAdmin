// src/screens/Volunteer/columns.js

import * as yup from 'yup';
import { skillServices } from '../../services/skillServices'
import { taskTypeServices } from '../../services/taskTypeServices'
import { unitServices } from '../../services/unitServices'

export const volunteerColumns = {
  mainColumn: 'nome',
  
  columns: [
    {
      field: "name",
      headerName: "Nome",
      flex: 1,
      cellClassName: "name-column--cell",
      editable: true,
      validation: yup.string().required('Nome é obrigatório')
    },
    {
      field: "phone",
      headerName: "Telefone",
      flex: 1,
      editable: true,
      validation: yup.string().required('Telefone é obrigatório')
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      editable: true,
      validation: yup.string().email('Email inválido').required('Email é obrigatório')
    },
    {
      field: "address",
      headerName: "Endereço",
      flex: 1,
      editable: true,
      validation: yup.string().required('Endereço é obrigatório')
    },
    {
      field: "skillId",
      headerName: "Habilidade",
      flex: 1,
      editable: true,
      type: 'singleSelect',
      validation: yup.string().required('Habilidade é obrigatória'),
      getOptions: async () => {
        const { success, data } = await skillServices.getAll();
        return success ? data.map(skill => ({
          value: skill.id,
          label: skill.descricao
        })) : [];
      }
    },
    {
      field: "taskId",
      headerName: "Tarefa",
      flex: 1,
      editable: true,
      type: 'singleSelect',
      validation: yup.string().required('Tarefa é obrigatória'),
      getOptions: async () => {
        const { success, data } = await taskTypeServices.getAll();
        return success ? data.map(task => ({
          value: task.id,
          label: task.nome_tarefa
        })) : [];
      }
    },
    {
      field: "unitId",
      headerName: "Unidade",
      flex: 1,
      editable: true,
      type: 'singleSelect',
      validation: yup.string().required('Unidade é obrigatória'),
      getOptions: async () => {
        const { success, data } = await unitServices.getAll();
        return success ? data.map(unit => ({
          value: unit.id,
          label: unit.nome
        })) : [];
      }
    },
    {
      field: "observations",
      headerName: "Observações",
      flex: 1,
      editable: true,
      validation: yup.string()
    },
    {
      field: "signedTerm",
      headerName: "Termo Assinado",
      flex: 1,
      editable: true,
      type: 'singleSelect',
      validation: yup.string().required('Status do termo é obrigatório'),
      getOptions: async () => {
        return [
          { value: 'Sim', label: 'Sim' },
          { value: 'Não', label: 'Não' },
          { value: 'Nulo', label: 'Nulo' }
        ];
      }
    },
    {
      field: "applying",
      headerName: "Candidatando",
      flex: 1,
      editable: true,
      type: 'singleSelect',
      validation: yup.string().required('Status de candidatura é obrigatório'),
      getOptions: async () => {
        return [
          { value: 'Sim', label: 'Sim' },
          { value: 'Já encaixado', label: 'Já encaixado' },
          { value: 'Não', label: 'Não' }
        ];
      }
    }
  ]
};