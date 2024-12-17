import React from 'react';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { ptBR } from "@mui/x-data-grid/locales";

const TableTiposTarefas = ({
    tiposTarefas,
    onRowSelect,
    handleOpenEditDialog
}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const columns = [
        { field: "nome_tarefa", headerName: "Nome Tarefa", flex: 1, cellClassName: "name-column--cell" },
        { field: "descricao", headerName: "Descrição", flex: 1 },
        {
            field: "actions",
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
            m="40px 0 0 0"
            height="75vh"
            sx={{"& .MuiDataGrid-root": {border: "none",},
                "& .MuiDataGrid-cell": {borderBottom: "none",},
                "& .name-column--cell": {color: colors.greenAccent[300],},
                "& .MuiDataGrid-columnHeaders, & .custom-header, & .MuiDataGrid-columnHeader": {
                backgroundColor: colors.blueAccent[700],
                borderBottom: "none",},
                "& .MuiDataGrid-virtualScroller": {backgroundColor: colors.primary[400],},
                "& .MuiDataGrid-footerContainer": {borderTop: "none", backgroundColor: colors.blueAccent[700],},
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {color: `${colors.grey[100]} !important`,},
            }}
        >
            <DataGrid
                rows={tiposTarefas}
                columns={columns}
                components={{ Toolbar: GridToolbar }}
                localeText={customLocaleText}
                onRowSelectionModelChange={onRowSelect}
                checkboxSelection
            />
        </Box>
    );
};

export default TableTiposTarefas;