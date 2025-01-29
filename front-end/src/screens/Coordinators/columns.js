import * as yup from 'yup';

export const coordinatorColumns = {
  mainColumn: 'name',
  
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
      validation: yup.string()
        .required('Telefone é obrigatório')
        .matches(
          /^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}-?[0-9]{4}$/,
          'Telefone inválido. Use o formato (99) 99999-9999 ou (99) 9999-9999'
        )
    },
    { 
      field: "email", 
      headerName: "Email", 
      flex: 1, 
      editable: true,
      validation: yup.string()
        .required('Email é obrigatório')
        .email('Email inválido')
    },
    { 
      field: "gender", 
      headerName: "Gênero", 
      flex: 1, 
      editable: true,
      type: 'singleSelect',
      validation: yup.string().required('Gênero é obrigatório'),
      options: [
        { value: 'M', label: 'Homem Cisgênero' },
        { value: 'F', label: 'Mulher Cisgênero' },
        { value: 'MT', label: 'Mulher Trans' },
        { value: 'HT', label: 'Homem Trans' },
        { value: 'NB', label: 'Não-Binário' },
        { value: 'GF', label: 'Gênero-Fluido' },
        { value: 'AG', label: 'Agênero' },
        { value: 'QG', label: 'Queer/Genderqueer' },
        { value: 'O', label: 'Outro' },
        { value: 'NI', label: 'Prefiro não informar' }
      ]
    }
  ]
};