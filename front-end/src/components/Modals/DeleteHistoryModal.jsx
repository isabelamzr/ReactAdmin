import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box } from "@mui/material";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import { useGridContext } from '../../context/GridContext';
import MessageNotification from '../Notification/MessageNotification';

const DeleteHistoryModal = ({ open, onClose, deletedRecords = [], services, onSuccess }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { mainColumn } = useGridContext();

  const [message, setMessage] = useState({
    text: '',
    type: '',
    visible: false
  });

  const handleRestore = async (id, name) => {
    const result = await services.restore(id, name);
    
    setMessage({
      text: result.message,
      type: result.success ? 'success' : 'error',
      visible: true
    });

    if (result.success) {
      setTimeout(() => {
        onSuccess && onSuccess();
        setMessage({ text: '', type: '', visible: false });
      }, 2000);
    }
  };

  const handlePermanentDelete = async (id, name) => {
    const result = await services.permanentDelete(id, name);
    
    setMessage({
      text: result.message,
      type: result.success ? 'delete' : 'error',
      visible: true
    });

    if (result.success) {
      setTimeout(() => {
        onSuccess && onSuccess();
        setMessage({ text: '', type: '', visible: false });
      }, 2000);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      {message.visible && (
        <Box px={3} pt={2}>
          <MessageNotification 
            message={message.text}
            type={message.type}
            visible={message.visible}
          />
        </Box>
      )}

      <DialogTitle>Histórico de Exclusões</DialogTitle>

      <DialogContent>
        <Box sx={{ maxHeight: "50vh", overflowY: "auto" }}>
          {deletedRecords.length > 0 ? ( 
            deletedRecords.map((record) => (
              <Box
                key={record.id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px",
                  borderBottom: `1px solid ${colors.grey[700]}`,
                }}
              >
                <span>{record[mainColumn]}</span>

                <Box>
                  <Button
                    variant="contained"
                    color="success"
                    sx={{ marginRight: "10px" }}
                    onClick={() => handleRestore(record.id, record[mainColumn])}
                  >
                    Restaurar
                  </Button>
                  
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handlePermanentDelete(record.id, record[mainColumn])}
                  >
                    Deletar Permanentemente
                  </Button>
                </Box>
              </Box>
            ))
          ) : (
            <span>Nenhum registro encontrado.</span>
          )}
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="primary">
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { DeleteHistoryModal };
