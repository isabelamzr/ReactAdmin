import React, { useState } from "react";
import { Box, Button, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { ptBR } from "@mui/x-data-grid/locales";
import { tokens } from "../../theme";
import { mockDataVagas } from "../../data/mockData";

const Vagas = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [vagas, setVagas] = useState(mockDataVagas);

  const [vagasDeletadas, setVagasDeletadas] = useState([]);

  const [selectedRows, setSelectedRows] = useState([]);

  const handleDelete = () => {
    if (selectedRows.length > 0) {
      const remainingVagas = vagas.filter(
        (vaga) => !selectedRows.includes(vaga.id)
      );

      const deletadas = vagas.filter((vaga) =>
        selectedRows.includes(vaga.id)
      );
      setVagasDeletadas(deletadas);

    
      setVagas(remainingVagas);

      setSelectedRows([]);

      console.log("Deletadas:", deletadas);
    }
  };


  const handleRedo = () => {
    if (vagasDeletadas.length > 0) {
   
      const restauradas = [...vagas, ...vagasDeletadas];
      setVagas(restauradas); 
      setVagasDeletadas([]); 
      console.log("Restauradas:", vagasDeletadas);
    }
  };

  const columns = [
    { field: "id", headerName: "ID" },

    {
      field: "data",
      headerName: "Data",
      flex: 1,
      cellClassName: "name-column--cell",
    },

    {
      field: "coordenador_id",
      headerName: "Coordenador",
      flex: 1,
    },

    {
      field: "unidade_id",
      headerName: "Unidade",
      flex: 1,
    },

    {
      field: "tarefa_id",
      headerName: "Tarefa",
      flex: 1,
    },

    {
        field: "dia",
        headerName: "Dia",
        flex: 1,
      },

      {
        field: "horario",
        headerName: "Horário",
        flex: 1,
      },

      {
        field: "vagas?",
        headerName: "Vagas?",
        flex: 1,
      },

      {
        field: "descricao",
        headerName: "Descrição",
        flex: 1,
      },

      {
        field: "status_vaga_id",
        headerName: "Status-Vaga",
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
          rows={vagas}
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
              vagasDeletadas.length > 0 ? "#2e7d32" : "#81c784",
            color: "#fff",
            cursor: vagasDeletadas.length > 0 ? "pointer" : "not-allowed",
            "&:hover": {
              backgroundColor:
                vagasDeletadas.length > 0 ? "#1b5e20" : "#81c784",
            },
          }}
          disabled={vagasDeletadas.length === 0}
          onClick={handleRedo}
        >
          Refazer
        </Button>
      </Box>
    </Box>
  );
};

export default Vagas;
