import * as yup from 'yup';

export const unitColumns = {
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
        validation: yup.string()
          .required('Telefone é obrigatório')
          .matches(/^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/,
            'Telefone inválido. Use o formato (99) 99999-9999 ou (99) 9999-9999'
          )
      },
    { 
      field: "address", 
      headerName: "Endereço", 
      flex: 1, 
      editable: true,
      validation: yup.string().required('Endereço é obrigatório')
    },
    { 
      field: "neighborhood", 
      headerName: "Bairro", 
      flex: 1, 
      editable: true,
      validation: yup.string().required('Bairro é obrigatório')
    },
    { 
      field: "city", 
      headerName: "Cidade", 
      flex: 1, 
      editable: true,
      validation: yup.string().required('Cidade é obrigatória')
    },
    { 
      field: "state", 
      headerName: "UF", 
      flex: 1, 
      editable: true,
      validation: yup.string().required('UF é obrigatória')
    }
  ]
};