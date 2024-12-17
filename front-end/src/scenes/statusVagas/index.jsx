import React, { useState, useEffect, useCallback } from "react";
import { Box, Button, Typography, Dialog, DialogContent } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";

// Importações dos componentes
import DeleteHistoryModal from "./DeleteHistoryModal";
import EditStatusVaga from "./EditStatusVaga";
import MessageNotification from "./MessageNotification";
import TableStatusVagas from "./TableStatusVagas";
import AddStatusVaga from "./AddStatusVaga";

const StatusVagas = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const URL_KEY = "http://localhost:5000/status_vagas";
 
  // Estados
  const [statusVagas, setStatusVagas] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [deletedRecords, setDeletedRecords] = useState([]);
  const [canRestore, setCanRestore] = useState(false);

  // Estados para modais e mensagens
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openHistoryModal, setOpenHistoryModal] = useState(false);
  const [selectedStatusVaga, setSelectedStatusVaga] = useState(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  
  // Estados de mensagens
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [messageVisible, setMessageVisible] = useState(false);

  // Fetch methods
  const fetchStatusVagas = useCallback(async () => {
    try {
      const response = await fetch(`${URL_KEY}/read`);
      console.log('Response:', response)
      const data = await response.json();
      console.log('Data:', data)
      setStatusVagas(data.filter((c) => c.ativo === 1));
      setSelectedRows([]);
    } catch (error) {
      console.error("Erro ao buscar status de vagas:", error);
      showMessage("Erro ao buscar status de vagas", "error");
    }
  }, []);

  const fetchDeletedRecords = useCallback(async () => {
    try {
      const response = await fetch(`${URL_KEY}/inativos`);
      const data = await response.json();
      setDeletedRecords(data);
      setCanRestore(data.length > 0);
    } catch (error) {
      console.error("Erro ao buscar registros inativos:", error);
      showMessage("Erro ao buscar registros inativos", "error");
    }
  }, []);

  useEffect(() => {
    fetchStatusVagas();
    fetchDeletedRecords();
  }, [fetchStatusVagas, fetchDeletedRecords]);

  const handleRowSelection = (newSelectionModel) => {
    setSelectedRows(newSelectionModel);
  };

  const handleOpenEditDialog = (statusVaga) => {
    setSelectedStatusVaga(statusVaga);
    setOpenEditDialog(true);
  };

  const handleEditSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch(`${URL_KEY}/update/${selectedStatusVaga.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });

      if (!response.ok) throw new Error("Erro ao atualizar status da vaga");

      await fetchStatusVagas();
      setOpenEditDialog(false);
      showMessage(`Cadastro de "${values.codigo_status}" atualizado com sucesso.`, "success");
    } catch (error) {
      showMessage(`Erro ao editar: ${error.message}`, "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      const deletedStatusVaga = statusVagas.find(c => c.id === selectedRows[0]);
      const response = await fetch(`${URL_KEY}/soft_delete/${selectedRows[0]}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });

      if (!response.ok) throw new Error("Erro ao excluir status da vaga");

      await fetchStatusVagas();
      await fetchDeletedRecords();
      showMessage(`Cadastro de "${deletedStatusVaga.codigo_status}" removido com sucesso.`, "delete");
    } catch (error) {
      showMessage(`Erro ao deletar: ${error.message}`, "error");
    }
  };

  const handleRestore = async (id) => {
    try {
      const restoredStatusVaga = deletedRecords.find(c => c.id === id);
      const response = await fetch(`${URL_KEY}/restaurar/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" }
      });

      if (!response.ok) throw new Error("Erro ao restaurar status da vaga");

      await fetchStatusVagas();
      await fetchDeletedRecords();
      showMessage(`Cadastro de "${restoredStatusVaga.codigo_status}" restaurado com sucesso.`, "success");
    } catch (error) {
      showMessage(`Erro ao restaurar: ${error.message}`, "error");
    }
  };

  const handlePermanentDelete = async (id) => {
    try {
      const permanentDeletedStatusVaga = deletedRecords.find(c => c.id === id);
      const response = await fetch(`${URL_KEY}/delete/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });

      if (!response.ok) throw new Error("Erro ao excluir permanentemente");

      await fetchDeletedRecords();
      showMessage(`Cadastro de "${permanentDeletedStatusVaga.codigo_status}" 
        excluído permanentemente do banco de dados.`, "delete");
    } catch (error) {
      showMessage(`Erro ao excluir: ${error.message}`, "error");
    }
  };

  const showMessage = (text, type = "success", duration = 2000) => {
    setMessage(text);
    setMessageType(type === "delete" ? "error" : type); 
    setMessageVisible(true);
    setTimeout(() => setMessageVisible(false), duration);
  };

  return (
    <Box m="10px">
      {messageVisible && (
        <Box 
          mb="20px" 
          display="flex" 
          justifyContent="center" 
          width="100%"
        >
          <MessageNotification 
            message={message}
            type={messageType}
            visible={messageVisible}
          />
        </Box>
      )}

      <Box display="flex" justifyContent="start" mb="20px">
        <Button
          variant="contained"
          onClick={() => setOpenAddDialog(true)}
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            '&:hover': {
              backgroundColor: colors.blueAccent[600],
            }
          }}
        >
          Novo Status-Vaga
        </Button>
      </Box>

      <TableStatusVagas 
        status_vagas={statusVagas}
        onRowSelect={handleRowSelection}
        handleOpenEditDialog={handleOpenEditDialog}
      />

      <Dialog 
        open={openAddDialog} 
        onClose={() => setOpenAddDialog(false)}
        PaperProps={{
          style: {
            width: '40%',
            maxWidth: 'none',
            maxHeight: 'none',
            borderRadius: '8px'
          }
        }}
      >
        <DialogContent>
          <AddStatusVaga 
            open={openAddDialog}
            onClose={() => setOpenAddDialog(false)}
            onSuccess={(msg, type = "success") => {
              showMessage(msg, type);
              fetchStatusVagas();
            }}
          />
        </DialogContent>
      </Dialog>

      <Typography 
        variant="body2" 
        color="primary" 
        onClick={() => setOpenHistoryModal(true)}
        sx={{
          position: 'absolute',
          cursor: 'pointer', 
          mr: 2,
          mt: 2,
          color: colors.greenAccent[400],
          '&:hover': { 
            textDecoration: 'underline',
            color: colors.greenAccent[300] 
          }
        }}
      >
        Mostrar histórico de exclusões
      </Typography>

      <EditStatusVaga 
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        statusVaga={selectedStatusVaga}
        onSubmit={handleEditSubmit}
      />

      <DeleteHistoryModal 
        open={openHistoryModal}
        onClose={() => setOpenHistoryModal(false)}
        deletedRecords={deletedRecords}
        onRestore={handleRestore}
        onPermanentDelete={handlePermanentDelete}
      />

      <Box display="flex" justifyContent="end" mt="20px">
        <Button
          variant="contained"
          disabled={selectedRows.length === 0}
          onClick={handleDelete}
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
          disabled={!canRestore}
          onClick={() => setOpenHistoryModal(true)}
          sx={{
            backgroundColor: canRestore ? "#2e7d32" : "#81c784",
            color: "#fff"
          }}
        >
          Refazer
        </Button>
      </Box>
    </Box>
  );
};

export default StatusVagas;