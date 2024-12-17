import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Dialog, DialogContent } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";

import DeleteHistoryModal from "./DeleteHistoryModal";
import EditVoluntario from "./EditVoluntario";
import MessageNotification from "./MessageNotification";
import TableVoluntarios from "./TableVoluntarios";
import AddVoluntario from "./AddVoluntario";

const Voluntarios = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const URL_KEY = "http://localhost:5000/voluntarios";
 
  const [voluntarios, setVoluntarios] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [deletedRecords, setDeletedRecords] = useState([]);
  const [canRestore, setCanRestore] = useState(false);

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openHistoryModal, setOpenHistoryModal] = useState(false);
  const [selectedVoluntario, setSelectedVoluntario] = useState(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [messageVisible, setMessageVisible] = useState(false);

  const fetchVoluntarios = async () => {
    try {
      const response = await fetch(`${URL_KEY}/read`);
      const data = await response.json();
      setVoluntarios(data.filter((v) => v.ativo === 1));
      setSelectedRows([]);
    } catch (error) {
      console.error("Erro ao buscar voluntários:", error);
    }
  };

  const fetchDeletedRecords = async () => {
    try {
      const response = await fetch(`${URL_KEY}/inativos`);
      const data = await response.json();
      setDeletedRecords(data);
      setCanRestore(data.length > 0);
    } catch (error) {
      console.error("Erro ao buscar registros inativos:", error);
    }
  };

  useEffect(() => {
    fetchVoluntarios();
    fetchDeletedRecords();
  }, []);

  const handleRowSelection = (newSelectionModel) => {
    setSelectedRows(newSelectionModel);
  };

  const handleOpenEditDialog = (voluntario) => {
    setSelectedVoluntario(voluntario);
    setOpenEditDialog(true);
  };

  const handleEditSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch(`${URL_KEY}/update/${selectedVoluntario.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });

      if (!response.ok) throw new Error("Erro ao atualizar voluntário");

      await fetchVoluntarios();
      setOpenEditDialog(false);
      showMessage(`Cadastro de "${values.nome}" atualizado com sucesso.`, "success");
    } catch (error) {
      showMessage(`Erro ao editar: ${error.message}`, "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      const deletedVoluntario = voluntarios.find(v => v.id === selectedRows[0]);
      const response = await fetch(`${URL_KEY}/soft_delete/${selectedRows[0]}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });

      if (!response.ok) throw new Error("Erro ao excluir voluntário");

      await fetchVoluntarios();
      await fetchDeletedRecords();
      showMessage(`Cadastro de "${deletedVoluntario.nome}" removido com sucesso.`, "delete");
    } catch (error) {
      showMessage(`Erro ao deletar: ${error.message}`, "error");
    }
  };

  const handleRestore = async (id) => {
    try {
      const restoredVoluntario = deletedRecords.find(v => v.id === id);
      const response = await fetch(`${URL_KEY}/restaurar/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" }
      });

      if (!response.ok) throw new Error("Erro ao restaurar voluntário");

      await fetchVoluntarios();
      await fetchDeletedRecords();
      showMessage(`Cadastro de "${restoredVoluntario.nome}" restaurado com sucesso.`, "success");
    } catch (error) {
      showMessage(`Erro ao restaurar: ${error.message}`, "error");
    }
  };

  const handlePermanentDelete = async (id) => {
    try {
      const permanentDeletedVoluntario = deletedRecords.find(v => v.id === id);
      const response = await fetch(`${URL_KEY}/delete/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });

      if (!response.ok) throw new Error("Erro ao excluir permanentemente");

      await fetchDeletedRecords();
      showMessage(`Cadastro de "${permanentDeletedVoluntario.nome}" excluído permanentemente 
      do banco de dados.`, "delete");
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
          Novo Voluntário
        </Button>
      </Box>

      <TableVoluntarios 
        voluntarios={voluntarios}
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
          <AddVoluntario 
            onClose={() => setOpenAddDialog(false)}
            onSuccess={(msg, type = "success") => {
              showMessage(msg, type);
              fetchVoluntarios();
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

      <EditVoluntario 
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        voluntario={selectedVoluntario}
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

export default Voluntarios;