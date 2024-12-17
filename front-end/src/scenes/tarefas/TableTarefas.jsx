import React from 'react';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { ptBR } from "@mui/x-data-grid/locales";

const TableTarefas = ({ 
  tarefas, 
  onRowSelect, 
  handleOpenEditDialog 
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  const columns = [
    { field: "tipo_tarefa_nome", headerName: "Tarefa", flex: 1, cellClassName: "name-column--cell" },
    { field: "dia", headerName: "Dia", flex: 1 },
    { field: "horario", headerName: "Horário", flex: 1 },
    { field: "coordenador_nome", headerName: "Coordenador", flex: 1 },
    { field: "unidade_nome", headerName: "Unidade", flex: 1 },
    { field: "voluntario_nome", headerName: "Voluntário", flex: 1 },
    { field: "local", headerName: "Local", flex: 1 },
    { field: "actions",
      headerName: "Editar",
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <DriveFileRenameOutlineIcon 
          onClick={() => handleOpenEditDialog(params.row)}
          sx={{ 
            cursor: 'pointer', 
            color: colors.greenAccent[400],
            '&:hover': { color: colors.greenAccent[300] }
          }}
        />
      ),
      width: 100
    }
  ];

  const customLocaleText = {
    ...ptBR.components.MuiDataGrid.defaultProps.localeText,
    filterOperatorDoesNotContain: "não contém",
    filterOperatorDoesNotEqual: "não é igual",
    filterOperatorEquals: "igual a",
  };

  return (
    <Box
      height="75vh"
      sx={{
        "& .MuiDataGrid-root": { border: "none" },
        "& .MuiDataGrid-cell": { borderBottom: "none" },
        "& .name-column--cell": { color: colors.greenAccent[300] },
        "& .custom-header": {backgroundColor: colors.blueAccent[700], borderBottom: "none"},
        "& .MuiDataGrid-virtualScroller": {backgroundColor: colors.primary[400]},
        "& .MuiDataGrid-columnHeader": {backgroundColor: colors.blueAccent[700], borderBottom: "none"},
        "& .MuiDataGrid-footerContainer": {borderTop: "none", backgroundColor: colors.blueAccent[700]},
        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {color: `${colors.grey[100]} !important`},
      }}
    >
      <DataGrid
        getRowId={(row) => row.tarefa_id}
        checkboxSelection
        rows={tarefas}
        columns={columns}
        localeText={customLocaleText}
        slots={{ toolbar: GridToolbar }}
        onRowSelectionModelChange={onRowSelect}
      />
    </Box>
  );
};

export default TableTarefas;