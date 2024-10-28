import React, { useState } from "react";
import { Box, Button, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { ptBR } from "@mui/x-data-grid/locales";
import { tokens } from "../../theme";
import { mockDataHabilidades } from "../../data/mockData";
import Header from "../../components/Header";

const Habilidades = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [habilidades, setHabilidades] = useState(mockDataHabilidades);
  const [habilidadesDeletadas, setHabilidadesDeletadas] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleDelete = () => {
    if (selectedRows.length > 0) {
      const remainingHabilidades = habilidades.filter(
        (habilidade) => !selectedRows.includes(habilidade.id)
      );

      const deletadas = habilidades.filter((habilidade) =>
        selectedRows.includes(habilidade.id)
      );

      setHabilidadesDeletadas(deletadas);
      setHabilidades(remainingHabilidades);
      setSelectedRows([]);
    }
  };

  const handleRedo = () => {
    if (habilidadesDeletadas.length > 0) {
      setHabilidades([...habilidades, ...habilidadesDeletadas]);
      setHabilidadesDeletadas([]);
    }
  };
  
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "descricao", headerName: "Descrição", flex: 1 },
    { field: "talentos", headerName: "Talentos", flex: 1 },
  ];

  const customLocaleText = {
    ...ptBR.components.MuiDataGrid.defaultProps.localeText,
    filterOperatorDoesNotContain: "não contém",
    filterOperatorDoesNotEqual: "não é igual",
    filterOperatorEquals: "igual a",
  };

  return (
    <Box m="20px">
      <Header title="Habilidades" subtitle="Gerencie as competências e especialidades dos voluntários" />
      
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
          rows={habilidades}
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
            backgroundColor: habilidadesDeletadas.length > 0 ? "#2e7d32" : "#81c784",
            color: "#fff",
            cursor: habilidadesDeletadas.length > 0 ? "pointer" : "not-allowed",
            "&:hover": {
              backgroundColor: habilidadesDeletadas.length > 0 ? "#1b5e20" : "#81c784",
            },
          }}
          disabled={habilidadesDeletadas.length === 0}
          onClick={handleRedo}
        >
          Refazer
        </Button>
      </Box>
    </Box>
  );
};

export default Habilidades;
