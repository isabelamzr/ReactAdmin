import React, { useState } from "react";
import { Box, Button, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { ptBR } from "@mui/x-data-grid/locales";
import { tokens } from "../../theme";
import { mockDataCoordenadores } from "../../data/mockData";
import Header from "../../components/Header";

const Coordenadores = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [coordenadores, setCoordenadores] = useState(mockDataCoordenadores);

  const [coordenadoresDeletados, setCoordenadoresDeletados] = useState([]);

  const [selectedRows, setSelectedRows] = useState([]);

  const handleDelete = () => {
    if (selectedRows.length > 0) {
      const remainingCoordenadores = coordenadores.filter(
        (coordenador) => !selectedRows.includes(coordenador.id)
      );

      const deletados = coordenadores.filter((coordenador) =>
        selectedRows.includes(coordenador.id)
      );
      setCoordenadoresDeletados(deletados);

    
      setCoordenadores(remainingCoordenadores);

      setSelectedRows([]);

      console.log("Deletados:", deletados);
    }
  };


  const handleRedo = () => {
    if (coordenadoresDeletados.length > 0) {
   
      const restauradas = [...coordenadores, ...coordenadoresDeletados];
      setCoordenadores(restauradas); 
      setCoordenadoresDeletados([]); 
      console.log("Restaurados:", coordenadoresDeletados);
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
      field: "genero",
      headerName: "Gênero",
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
      <Header title="Coordenadores" subtitle="Gerenciamento de Coordenadores Ativos" />
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
          rows={coordenadores}
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
              coordenadoresDeletados.length > 0 ? "#2e7d32" : "#81c784",
            color: "#fff",
            cursor: coordenadoresDeletados.length > 0 ? "pointer" : "not-allowed",
            "&:hover": {
              backgroundColor:
                coordenadoresDeletados.length > 0 ? "#1b5e20" : "#81c784",
            },
          }}
          disabled={coordenadoresDeletados.length === 0}
          onClick={handleRedo}
        >
          Refazer
        </Button>
      </Box>
    </Box>
  );
};

export default Coordenadores;
