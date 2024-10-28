import React, { useState } from "react";
import { Box, Button, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { ptBR } from "@mui/x-data-grid/locales";
import { tokens } from "../../theme";
import { mockDataStatusVagas } from "../../data/mockData";
import Header from "../../components/Header";

const StatusVagas = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [statusVagas, setStatusVagas] = useState(mockDataStatusVagas);
  const [statusVagasDeletadas, setStatusVagasDeletadas] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleDelete = () => {
    if (selectedRows.length > 0) {
      const remainingStatusVagas = statusVagas.filter(
        (vaga) => !selectedRows.includes(vaga.id)
      );

      const deletadas = statusVagas.filter((vaga) =>
        selectedRows.includes(vaga.id)
      );

      setStatusVagasDeletadas(deletadas);
      setStatusVagas(remainingStatusVagas);
      setSelectedRows([]);
    }
  };

  const handleRedo = () => {
    if (statusVagasDeletadas.length > 0) {
      setStatusVagas([...statusVagas, ...statusVagasDeletadas]);
      setStatusVagasDeletadas([]);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "codigo_status", headerName: "Código Status", flex: 1 },
    { field: "descricao", headerName: "Descrição", flex: 1 },
  ];

  const customLocaleText = {
    ...ptBR.components.MuiDataGrid.defaultProps.localeText,
    filterOperatorDoesNotContain: "não contém",
    filterOperatorDoesNotEqual: "não é igual",
    filterOperatorEquals: "igual a",
  };

  return (
    <Box m="20px">
      <Header title="Status Vagas" subtitle="Gerencie o status das vagas disponíveis" />
      
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
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
          rows={statusVagas}
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
            backgroundColor: statusVagasDeletadas.length > 0 ? "#2e7d32" : "#81c784",
            color: "#fff",
            cursor: statusVagasDeletadas.length > 0 ? "pointer" : "not-allowed",
            "&:hover": {
              backgroundColor: statusVagasDeletadas.length > 0 ? "#1b5e20" : "#81c784",
            },
          }}
          disabled={statusVagasDeletadas.length === 0}
          onClick={handleRedo}
        >
          Refazer
        </Button>
      </Box>
    </Box>
  );
};

export default StatusVagas;