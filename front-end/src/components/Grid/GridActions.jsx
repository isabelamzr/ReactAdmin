import React, { useState, memo } from 'react';
import { Box, Button } from '@mui/material';
import AddModal from '../Modals/AddModal';
import { useTheme } from '@mui/material';
import { tokens } from '../../theme';
import { validateEntityType } from '../../utils/entityTypes';
import { useGridContext } from '../../hooks/useGridContext';

export const GridActions = memo(({ services, onSuccess, entityType }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  const [openAdd, setOpenAdd] = useState(false);
  const { columns } = useGridContext();
  validateEntityType(entityType);
 
  const handleAdd = async (values) => {
    const result = await services.insert(values);
    
    if (result.success) {
      onSuccess && onSuccess();
    }

    return result;
  };

  return (
    <Box display="flex" justifyContent="start" mb="20px">
      <Button
        variant="contained"
        onClick={() => setOpenAdd(true)}
        sx={{
          backgroundColor: colors.blueAccent[700],
          color: colors.grey[100],
          '&:hover': { backgroundColor: colors.blueAccent[600] }
        }}
      >
        Novo Cadastro
      </Button>
      
      <AddModal
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onSubmit={handleAdd}
        entityType={entityType}
        columns={columns}
      />
    </Box>
  );
}, (prevProps, nextProps) => 
  prevProps.services === nextProps.services &&
  prevProps.entityType === nextProps.entityType
);