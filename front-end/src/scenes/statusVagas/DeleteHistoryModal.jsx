import React from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Box 
} from "@mui/material";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";

const DeleteHistoryModal = ({ 
  open, 
  onClose, 
  deletedRecords, 
  onRestore, 
  onPermanentDelete 
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
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
                <span>{record.codigo_status}</span>
                <Box>
                  <Button
                    variant="contained"
                    color="success"
                    sx={{ marginRight: "10px" }}
                    onClick={() => onRestore(record.id)}
                  >
                    Restaurar
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => onPermanentDelete(record.id)}
                  >
                    Deletar
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

export default DeleteHistoryModal;