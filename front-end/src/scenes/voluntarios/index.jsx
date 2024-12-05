import React, { useState } from "react";
import { Box, Button, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { ptBR } from "@mui/x-data-grid/locales";
import { tokens } from "../../theme";
import { mockDataVoluntarios } from "../../data/mockData";

const Voluntarios = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [voluntarios, setVoluntarios] = useState(mockDataVoluntarios);

  const [voluntariosDeletados, setVoluntariosDeletados] = useState([]);

  const [selectedRows, setSelectedRows] = useState([]);

  const handleDelete = () => {
    if (selectedRows.length > 0) {
      const remainingVoluntarios = voluntarios.filter(
        (voluntario) => !selectedRows.includes(voluntario.id)
      );

      const deletados = voluntarios.filter((voluntario) =>
        selectedRows.includes(voluntario.id)
      );
      setVoluntariosDeletados(deletados);

    
      setVoluntarios(remainingVoluntarios);

      setSelectedRows([]);

      console.log("Deletados:", deletados);
    }
  };


  const handleRedo = () => {
    if (voluntariosDeletados.length > 0) {
   
      const restauradas = [...voluntarios, ...voluntariosDeletados];
      setVoluntarios(restauradas); 
      setVoluntariosDeletados([]); 
      console.log("Restaurados:", voluntariosDeletados);
    }
  };

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "nome",
      headerName: "Nome",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "telefone",
      headerName: "Telefone",
      flex: 1,
    },
    {
      field: "email",
      headerName: "E-mail",
      flex: 1,
    },
    {
      field: "endereco",
      headerName: "Endereço",
      flex: 1,
    },

    {
      field: "habilidades_id",
      headerName: "Habilidades",
      flex: 1,
    },

    {
      field: "tarefa_id",
      headerName: "Tarefa",
      flex: 1,
    },

    {
      field: "unidade_id",
      headerName: "Unidade",
      flex: 1,
    },

    {
      field: "observacoes",
      headerName: "Observações",
      flex: 1,
    },

    {
      field: "termo_assinado",
      headerName: "Termo-assinado",
      flex: 1,
    },

    {
      field: "candidatando",
      headerName: "Candidatando",
      flex: 1,
    },

    {
      field: "createdBy",
      headerName: "Created By",
      flex: 1,
    },

    {
      field: "dataCriação",
      headerName: "Data Criação",
      flex: 1,
    },

    {
      field: "controleVagas",
      headerName: "Controle Vagas",
      flex: 1,
    },
  ];

  const customLocaleText = {
    ...ptBR.components.MuiDataGrid.defaultProps.localeText,
    filterOperatorDoesNotContain: "não contém",
    filterOperatorDoesNotEqual: "não é igual",
    filterOperatorEquals: "igual a",
  };

  return (
    <Box m="20px">
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },

          "& .custom-header": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },

          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },

          "& .MuiDataGrid-columnHeader": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },

          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },

          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          checkboxSelection
          rows={voluntarios}
          columns={columns}
          localeText={customLocaleText}
          slots={{ toolbar: GridToolbar }}
          onRowSelectionModelChange={(newSelectionModel) => {
            setSelectedRows(newSelectionModel);
          }}
        />
      </Box>
      <Box display="flex" justifyContent="end" mt="20px">
        <Button
          variant="contained"
          sx={{
            backgroundColor: selectedRows.length > 0 ? "#d32f2f" : "#e57373",
            color: "#fff",
            cursor: selectedRows.length > 0 ? "pointer" : "not-allowed",
            marginRight: "10px",
            "&:hover": {
              backgroundColor: selectedRows.length > 0 ? "#c62828" : "#e57373",
            },
          }}
          disabled={selectedRows.length === 0}
          onClick={handleDelete}
        >
          Deletar
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor:
              voluntariosDeletados.length > 0 ? "#2e7d32" : "#81c784",
            color: "#fff",
            cursor: voluntariosDeletados.length > 0 ? "pointer" : "not-allowed",
            "&:hover": {
              backgroundColor:
                voluntariosDeletados.length > 0 ? "#1b5e20" : "#81c784",
            },
          }}
          disabled={voluntariosDeletados.length === 0}
          onClick={handleRedo}
        >
          Refazer
        </Button>
      </Box>
    </Box>
  );
};

export default Voluntarios;
