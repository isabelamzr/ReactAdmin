import React, { useState } from "react";
import { Box, Button, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { ptBR } from "@mui/x-data-grid/locales";
import { tokens } from "../../theme";
import { mockDataTarefas } from "../../data/mockData";
import Header from "../../components/Header";

const Tarefas = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  
  const [tarefas, setTarefas] = useState(mockDataTarefas);

  const [tarefasDeletadas, setTarefasDeletadas] = useState([]);
  
  const [selectedRows, setSelectedRows] = useState([]);
  
  const handleDelete = () => {
    if (selectedRows.length > 0) {
     
      const remainingTarefas = tarefas.filter(
        (tarefa) => !selectedRows.includes(tarefa.id)
      );

      const deletadas = tarefas.filter((tarefa) =>
        selectedRows.includes(tarefa.id)
      );
      setTarefasDeletadas(deletadas); 

      setTarefas(remainingTarefas);

    
      setSelectedRows([]);

      console.log("Deletadas:", deletadas);
    }
  };

  const handleRedo = () => {
    if (tarefasDeletadas.length > 0) {
     
      const restauradas = [...tarefas, ...tarefasDeletadas];
      setTarefas(restauradas); 
      setTarefasDeletadas([]); 
      console.log("Restauradas:", tarefasDeletadas);
    }
  };


  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "dia",
      headerName: "Dia",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    { field: "horario", headerName: "Horário", flex: 1 },
    { field: "tipo_tarefa_id", headerName: "Tarefa", flex: 1 },
    { field: "coordenador_id", headerName: "Coordenador", flex: 1 },
    { field: "unidade_id", headerName: "Unidade", flex: 1 },
    { field: "voluntario_id", headerName: "Voluntário", flex: 1 },
    { field: "local", headerName: "Local", flex: 1 },
  ];

  const customLocaleText = {
    ...ptBR.components.MuiDataGrid.defaultProps.localeText,
    filterOperatorDoesNotContain: "não contém",
    filterOperatorDoesNotEqual: "não é igual",
    filterOperatorEquals: "igual a",
  };

  return (
    <Box m="20px">
      <Header title="Tarefas" subtitle="Gerenciador de tarefas" />
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
          rows={tarefas}
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
              tarefasDeletadas.length > 0 ? "#2e7d32" : "#81c784",
            color: "#fff",
            cursor: tarefasDeletadas.length > 0 ? "pointer" : "not-allowed",
            "&:hover": {
              backgroundColor:
                tarefasDeletadas.length > 0 ? "#1b5e20" : "#81c784",
            },
          }}
          disabled={tarefasDeletadas.length === 0}
          onClick={handleRedo}
        >
          Refazer
        </Button>
      </Box>
    </Box>
  );
};

export default Tarefas;
