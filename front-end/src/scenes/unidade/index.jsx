import React, { useState } from "react";
import { Box, Button, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { ptBR } from "@mui/x-data-grid/locales";
import { tokens } from "../../theme";
import { mockDataUnidade } from "../../data/mockData";

const Unidade = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [unidades, setUnidades] = useState(mockDataUnidade);
  const [unidadesDeletadas, setUnidadesDeletadas] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleDelete = () => {
    if (selectedRows.length > 0) {
      const remainingUnidades = unidades.filter(
        (unidade) => !selectedRows.includes(unidade.id)
      );

      const deletadas = unidades.filter((unidade) =>
        selectedRows.includes(unidade.id)
      );

      setUnidadesDeletadas(deletadas);
      setUnidades(remainingUnidades);
      setSelectedRows([]);
    }
  };

  const handleRedo = () => {
    if (unidadesDeletadas.length > 0) {
      setUnidades([...unidades, ...unidadesDeletadas]);
      setUnidadesDeletadas([]);
    }
  };
  
  const columns = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "nome", headerName: "Nome", flex: 1 },
    { field: "endereco", headerName: "Endereço", flex: 1.5 },
    { field: "telefone", headerName: "Telefone", flex: 1 },
    { field: "bairro", headerName: "Bairro", flex: 1 },
    { field: "cidade", headerName: "Cidade", flex: 1 },
    { field: "UF", headerName: "UF", flex: 0.5 },
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
          rows={unidades}
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
            backgroundColor: unidadesDeletadas.length > 0 ? "#2e7d32" : "#81c784",
            color: "#fff",
            cursor: unidadesDeletadas.length > 0 ? "pointer" : "not-allowed",
            "&:hover": {
              backgroundColor: unidadesDeletadas.length > 0 ? "#1b5e20" : "#81c784",
            },
          }}
          disabled={unidadesDeletadas.length === 0}
          onClick={handleRedo}
        >
          Refazer
        </Button>
      </Box>
    </Box>
  );
};

export default Unidade;