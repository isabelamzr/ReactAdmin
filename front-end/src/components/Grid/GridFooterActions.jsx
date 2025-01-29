import React, { useState, useEffect, useCallback } from 'react';
import { Typography, Box, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../../theme';
import { DeleteHistoryModal } from '../Modals/DeleteHistoryModal';

export const GridFooterActions = ({ services, selectedRows, onSuccess, onDelete }) => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  const [openHistoryModal, setOpenHistoryModal] = useState(false);
  const [deletedRecords, setDeletedRecords] = useState([]);

  const fetchDeletedRecords = useCallback(async () => {
    const result = await services.getDeletedRecords();
    if (result.success) {
      setDeletedRecords(result.data);
    }
  }, [services]);

  useEffect(() => {
    if (openHistoryModal) {
      fetchDeletedRecords();
    }
  }, [openHistoryModal, fetchDeletedRecords]);

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" mt="20px">
      <Typography
        variant="body2"
        onClick={() => setOpenHistoryModal(true)}
        sx={{
          cursor: 'pointer',
          color: colors.greenAccent[400],
          '&:hover': {
            textDecoration: 'underline',
            color: colors.greenAccent[300]
          }
        }}
      >
        Mostrar histórico de exclusões
      </Typography>

      <Box display="flex" justifyContent="end">
        <Button
          variant="contained"
          disabled={selectedRows.length === 0}
          onClick={onDelete}
          sx={{
            backgroundColor: selectedRows.length > 0 ? "#d32f2f" : "#e57373",
            color: "#fff",
            marginRight: "10px"
          }}
        >
          Deletar
        </Button>
        
        <Button
          variant="contained"
          onClick={() => setOpenHistoryModal(true)}
          sx={{
            backgroundColor: "#2e7d32",
            color: "#fff"
          }}
        >
          Refazer
        </Button>
      </Box>

      <DeleteHistoryModal
        open={openHistoryModal}
        onClose={() => setOpenHistoryModal(false)}
        services={services}
        onSuccess={() => {
          fetchDeletedRecords();
          onSuccess?.();
        }}
        deletedRecords={deletedRecords}
      />
    </Box>
  );
};
