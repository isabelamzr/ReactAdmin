// coordenadores index.jsx

import React, { useState, useEffect } from "react";
import { Box, Button, useTheme, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { ptBR } from "@mui/x-data-grid/locales";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { AnimatePresence, motion } from "framer-motion";

const Coordenadores = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [coordenadores, setCoordenadores] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openRestoreDialog, setOpenRestoreDialog] = useState(false);
  const [selectedName, setSelectedName] = useState("");
  const [canRestore, setCanRestore] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState("");
  const [deleteMessageVisible, setDeleteMessageVisible] = useState(false);
  const [restoreMessage, setRestoreMessage] = useState("");
  const [restoreMessageVisible, setRestoreMessageVisible] = useState(false);


    const fetchCoordenadores = async () => {
      try {
        const response = await fetch("http://localhost:5000/coordenadores/read");
        if (!response.ok) throw new Error("Erro na conexão com o back-end.");
    
        const data = await response.json();
        console.log("Resposta da API (todos os coordenadores):", data);

        setCoordenadores(data.filter((c) => c.ativo === 1));

        setSelectedRows([]);
      } catch (error) {
        console.error("Erro ao buscar coordenadores:", error);
      }
    };

    const checkInativos = async () => {
      try {
        const response = await fetch("http://localhost:5000/coordenadores/inativos");
        const data = await response.json();
        setCanRestore(data.length > 0);
      } catch (error) {
        console.error("Erro ao verificar inativos:", error);
  }};
    
    useEffect(() => {
    fetchCoordenadores();
    checkInativos();
  }, []);

  useEffect(() => {
    console.log("Coordenadores no estado:", coordenadores);
  }, [coordenadores]);

  useEffect(() => {
    checkInativos();
  }, [coordenadores]);

  useEffect(() => {
    fetch("http://localhost:5000/coordenadores/inativos")
      .then((res) => res.json())
      .then((data) => {
       setCanRestore(data.length > 0);
      })
      .catch((error) => console.error(error));
  }, [coordenadores]);


  const handleOpenDeleteDialog = (name) => {
    setSelectedName(name);
    setOpenDeleteDialog(true);
  };

  const handleDelete = async () => {
    setOpenDeleteDialog(false);
    try {
      const response = await fetch(`http://localhost:5000/coordenadores/soft_delete/${selectedRows[0]}`, 
      { method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
       });
     
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao excluir coordenador");
   }
      fetchCoordenadores();
      setDeleteMessage(`O cadastro de "${selectedName}" foi removido.`); 
      setDeleteMessageVisible(true);

      setTimeout(() => {
        setDeleteMessageVisible(false);
      }, 2000);

    } catch (error) {
      console.error("Erro ao excluir coordenador:", error);
    }
  };

  const handleOpenRestoreDialog = async () => {
    try {
      const response = await fetch("http://localhost:5000/coordenadores/inativos");
      const inativos = await response.json();

      if (inativos.length > 0) {
        const ultimoInativo = inativos.sort((a, b) => b.id - a.id)[0];
        setSelectedName(ultimoInativo.nome);
        setSelectedRows([ultimoInativo.id]); 
        setOpenRestoreDialog(true);
      }
    } catch (error) {
      console.error("Erro ao buscar coordenador inativo:", error);
}};
  
const handleRedo = async () => {
  setOpenRestoreDialog(false);
  try {
    const response = await fetch(`http://localhost:5000/coordenadores/restaurar/${selectedRows[0]}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) throw new Error("Erro ao restaurar coordenador");
    fetchCoordenadores();
    setRestoreMessage(`O cadastro de "${selectedName}" foi restaurado.`);
    setRestoreMessageVisible(true);
    setTimeout(() => setRestoreMessageVisible(false), 2000);
  } catch (error) {
    console.error("Erro ao restaurar coordenador:", error);
  }
};

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "nome", headerName: "Nome", flex: 1, cellClassName: "name-column--cell" },
    { field: "telefone", headerName: "Telefone", flex: 1 },
    { field: "email", headerName: "E-mail", flex: 1 },
    { field: "genero", headerName: "Gênero", flex: 1 },
  ];

  const customLocaleText = {
    ...ptBR.components.MuiDataGrid.defaultProps.localeText,
    filterOperatorDoesNotContain: "não contém",
    filterOperatorDoesNotEqual: "não é igual",
    filterOperatorEquals: "igual a",
  };

  const handleRowSelection = (newSelectionModel) => {
    setSelectedRows(newSelectionModel);

    const selectedCoordenador = coordenadores.find((c) => c.id === newSelectionModel[0]);
    setCanRestore(selectedCoordenador?.ativo === 0);  
  };

  return (
    <Box m="20px">
      <Header title="Coordenadores" subtitle="Gerenciamento de Coordenadores Ativos" />

      
      <AnimatePresence>
  {deleteMessageVisible && (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      style={{
        marginTop: "10px",
        padding: "10px 20px",
        borderRadius: "8px",
        textAlign: "center",
        fontWeight: "normal",
        fontSize: "0.8rem",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        maxWidth: "fit-content",
        margin: "0 auto", 
        color: theme.palette.mode === "dark" 
        ? colors.grey[100] 
        : colors.grey[900],
        backgroundColor:
          theme.palette.mode === "dark"
            ? colors.redAccent[500]
            : colors.redAccent[500], 
      }}
    >
      {deleteMessage}
    </motion.div>
  )}
</AnimatePresence>


<AnimatePresence>
  {restoreMessageVisible && (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      style={{
        marginTop: "10px",
        padding: "10px 20px",
        borderRadius: "8px",
        textAlign: "center",
        fontWeight: "normal", 
        fontSize: "0.8rem", 
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        maxWidth: "fit-content", 
        margin: "0 auto", 
        color: theme.palette.mode === "dark"
        ? colors.grey[100] 
        : colors.grey[900],
        backgroundColor: theme.palette.mode === "dark" 
        ? colors.greenAccent[700] 
        : colors.greenAccent[400],
       
      }}
    >
      {restoreMessage}
    </motion.div>
  )}
</AnimatePresence>     

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

          "& .custom-header": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },

          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },

          "& .MuiDataGrid-columnHeader": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
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
          rows={coordenadores}
          columns={columns}
          localeText={customLocaleText}
          slots={{ toolbar: GridToolbar }}
          onRowSelectionModelChange={handleRowSelection}
        />
      </Box>

      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText>Tem certeza que deseja excluir "{selectedName}" da tabela coordenadores?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancelar</Button>
          <Button onClick={handleDelete} color="error">Excluir</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openRestoreDialog} onClose={() => setOpenRestoreDialog(false)}>
        <DialogTitle>Confirmar Restauração</DialogTitle>
        <DialogContent>
          <DialogContentText>Tem certeza que deseja restaurar "{selectedName}" para a tabela coordenadores?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenRestoreDialog(false)}>Cancelar</Button>
          <Button onClick={handleRedo} color="success">Restaurar</Button>
        </DialogActions>
      </Dialog>

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
          onClick={() => handleOpenDeleteDialog(coordenadores.find(c => c.id === selectedRows[0])?.nome)}
        >
          Deletar
        </Button>

  <Button
  variant="contained"
  sx={{
    backgroundColor: canRestore ? "#2e7d32" : "#81c784",
    color: "#fff",
    cursor: canRestore ? "pointer" : "not-allowed",
    "&:hover": {
      backgroundColor: canRestore ? "#1b5e20" : "#81c784",
    },
  }}
  disabled={!canRestore}
  onClick={handleOpenRestoreDialog}
>
  Refazer
</Button>

      </Box>
    </Box>
  );
};

export default Coordenadores;
