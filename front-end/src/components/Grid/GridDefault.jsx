import React from 'react';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import { ptBR } from "@mui/x-data-grid/locales";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { EditModal } from '../Modals/EditModal';

const GridDefault = ({ 
  data, columns, onDataChange, onRowSelect, onEditSubmit, height = "75vh" }) => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedRowForEdit, setSelectedRowForEdit] = React.useState(null);

  const customLocaleText = {
    ...ptBR.components.MuiDataGrid.defaultProps.localeText,
    filterOperatorDoesNotContain: "não contém",
    filterOperatorDoesNotEqual: "não é igual",
    filterOperatorEquals: "igual a",
  };

  const gridColumns = [
    ...columns,
    {
      field: 'actions',
      headerName: 'Editar',
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <DriveFileRenameOutlineIcon 
          onClick={() => setSelectedRowForEdit(params.row)}
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

  return (
    <>
      <Box
        height={height}
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .name-column--cell": { color: colors.greenAccent[300] },
          "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400] },
          "& .MuiDataGrid-columnHeader": { backgroundColor: colors.blueAccent[700], borderBottom: "none" },
          "& .MuiDataGrid-footerContainer": { borderTop: "none", backgroundColor: colors.blueAccent[700] },
        }}
      >
        <DataGrid
          rows={data}
          columns={gridColumns}
          checkboxSelection
          slots={{ toolbar: GridToolbar }}
          localeText={customLocaleText}
          onRowSelectionModelChange={onRowSelect}
        />
      </Box>

      {selectedRowForEdit && (
        <EditModal
          open={!!selectedRowForEdit}
          onClose={() => setSelectedRowForEdit(null)}
          data={selectedRowForEdit}
          columns={columns}
          onSubmit={onEditSubmit}
          onSuccess={() => {
            setSelectedRowForEdit(null);
            onDataChange && onDataChange();
          }}
        />
      )}
    </>
  );
};

export { GridDefault };