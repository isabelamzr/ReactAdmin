// coordenadores index.jsx

import React, { useState, useEffect } from "react";
import { Box, Button, useTheme, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { ptBR } from "@mui/x-data-grid/locales";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { AnimatePresence, motion } from "framer-motion";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import * as yup from 'yup';
import { Formik } from 'formik';


const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)?[0-9]{4,5}[-]?[0-9]{4}$/;
const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const checkoutSchema = yup.object().shape({
  nome: yup.string().required("Campo obrigatório"),
  telefone: yup
    .string()
    .matches(phoneRegExp, "Este número é inválido")
    .required("Campo obrigatório"),
  email: yup
    .string()
    .matches(emailRegExp, "Este e-mail é inválido")
    .required("Campo obrigatório"),
  genero: yup.string().required("Campo obrigatório"),
});

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
  const [showHistory, setShowHistory] = useState(false);
  const [deletedRecords, setDeletedRecords] = useState([]);
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
  const [permanentDeleteId, setPermanentDeleteId] = useState(null);
  const [confirmDeleteMessage, setConfirmDeleteMessage] = useState("");
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedCoordenador, setSelectedCoordenador] = useState(null);
  const [editMessage, setEditMessage] = useState("");
  const [editMessageVisible, setEditMessageVisible] = useState(false);


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
    
  // use effects repetitivos inativos e coordenadores fetchcoordenadores? 

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
      const response = await fetch(`http://localhost:5000/coordenadores/soft_delete/${selectedRows[0]}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao excluir coordenador");
      }
  
      // Atualiza os registros ativos e inativos
      await fetchCoordenadores();
      await fetchDeletedRecords();
  
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
  

const handleRedo = async (id) => {
  setOpenRestoreDialog(false);
  try {

    const coordenadorToRestore = deletedRecords.find(record => record.id === id);
    const nameToRestore = coordenadorToRestore?.nome || "Coordenador";

    const response = await fetch(`http://localhost:5000/coordenadores/restaurar/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao restaurar coordenador");
    }

    // Atualiza os registros ativos e inativos
    await fetchCoordenadores();
    await fetchDeletedRecords();

    setRestoreMessage(`O cadastro de "${nameToRestore}" foi restaurado com sucesso.`);
    setRestoreMessageVisible(true);

    setTimeout(() => {
      setRestoreMessageVisible(false);
    }, 2000);
  } catch (error) {
    console.error("Erro ao restaurar coordenador:", error);
  }
};


const fetchDeletedRecords = async () => {
  try {
    const response = await fetch("http://localhost:5000/coordenadores/inativos");
    const data = await response.json();
    console.log("Registros inativos recebidos:", data); // Debug
    setDeletedRecords(data);
  } catch (error) {
    console.error("Erro ao buscar registros inativos:", error);
  }
};


const handlePermanentDelete = async () => {
  try {
    if (!permanentDeleteId) {
      console.error("ID do coordenador não fornecido");
      return;
    }

    const coordenadorToDelete = deletedRecords.find(record => record.id === permanentDeleteId);
    const nameToDelete = coordenadorToDelete?.nome || "Coordenador";

    console.log(`Tentando excluir coordenador ID: ${permanentDeleteId}`); 

    const response = await fetch(`http://localhost:5000/coordenadores/delete/${permanentDeleteId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log("Resposta da API:", data); 

    if (!response.ok) {
      throw new Error(data.error || "Erro ao excluir permanentemente o cadastro");
    }

    // Atualiza os registros
    await fetchDeletedRecords();
    
    setDeleteMessage(`O cadastro de "${nameToDelete}" foi excluído permanentemente do banco de dados.`);
    setDeleteMessageVisible(true);
    
    setTimeout(() => {
      setDeleteMessageVisible(false);
    }, 2000);

    setConfirmDeleteDialog(false);
    setPermanentDeleteId(null);
    
  } catch (error) {
    console.error("Erro detalhado ao excluir permanentemente:", error);
    
    // Mensagem de erro mais específica
    setDeleteMessage(`Erro ao excluir: ${error.message}`);
    setDeleteMessageVisible(true);
    
    setTimeout(() => {
      setDeleteMessageVisible(false);
    }, 3000);
}
};    

const handleOpenHistory = async () => {
  await fetchDeletedRecords(); // Atualiza os registros inativos
  setShowHistory(true); // Exibe o modal
};

const handleOpenEditDialog = (coordenador) => {
  setSelectedCoordenador(coordenador);
  setOpenEditDialog(true);
};

const handleEditSubmit = async (values, { setSubmitting }) => {
  try {

    const response = await fetch(`http://localhost:5000/coordenadores/update/${selectedCoordenador.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: values.nome,
        telefone: values.telefone, 
        email: values.email,
        genero: values.genero
      })
    });

    console.log("Resposta do servidor:", response);

    if (!response.ok) {
      const errorData = await response.json();
      console.log("Erro detalhado:", errorData); // Verifique o erro detalhado
      throw new Error(errorData.error || "Erro ao atualizar coordenador");
    }

    // Atualiza os registros
    await fetchCoordenadores();

    // Mensagem de sucesso
    setEditMessage(`Cadastro de "${values.nome}" atualizado com sucesso.`);
    setEditMessageVisible(true);
    
    setTimeout(() => {
      setEditMessageVisible(false);
    }, 2000);

    setOpenEditDialog(false);
  } catch (error) {
    console.error("Erro ao editar coordenador:", error);
  } finally {
    setSubmitting(false);
}};

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "nome", headerName: "Nome", flex: 1, cellClassName: "name-column--cell" },
    { field: "telefone", headerName: "Telefone", flex: 1 },
    { field: "email", headerName: "E-mail", flex: 1 },
    { field: "genero", headerName: "Gênero", flex: 1 },
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
}]; 

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

      {/* edit  */}

      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Editar Coordenador</DialogTitle>
        <DialogContent>
          <Formik
            onSubmit={handleEditSubmit}
            initialValues={{
              nome: selectedCoordenador?.nome || '',
              telefone: selectedCoordenador?.telefone || '',
              email: selectedCoordenador?.email || '',
              genero: selectedCoordenador?.genero || ''
            }}
            validationSchema={checkoutSchema}
          >
            {({ 
              values, 
              errors, 
              touched, 
              handleBlur, 
              handleChange, 
              handleSubmit,
              isSubmitting 
            }) => (
              <form onSubmit={handleSubmit}>
                <Box display="grid" gap="30px" gridTemplateColumns="repeat(4, minmax(0, 1fr))">
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Nome"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.nome}
                    name="nome"
                    error={!!touched.nome && !!errors.nome}
                    helperText={touched.nome && errors.nome}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Telefone"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.telefone}
                    name="telefone"
                    error={!!touched.telefone && !!errors.telefone}
                    helperText={touched.telefone && errors.telefone}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="E-mail"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={!!touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Gênero"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.genero}
                    name="genero"
                    error={!!touched.genero && !!errors.genero}
                    helperText={touched.genero && errors.genero}
                    sx={{ gridColumn: "span 4" }}
                  />
                </Box>
                <DialogActions>
                  <Button onClick={() => setOpenEditDialog(false)} color="secondary">
                    Cancelar
                  </Button>
                  <Button 
                    type="submit" 
                    color="primary" 
                    variant="contained"
                    disabled={isSubmitting}
                  >
                    Salvar
                  </Button>
                </DialogActions>
              </form>
            )}
          </Formik>
        </DialogContent>
    </Dialog>

      
    {/* Mensagem de deletar/refazer/editar bem sucedidos */}

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

<AnimatePresence>
        {editMessageVisible && (
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
            {editMessage}
          </motion.div>
        )}
      </AnimatePresence>


    {/* Tabela */}
      
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

        {/* Modal Histórico de exclusão */}

      <Dialog open={showHistory} onClose={() => setShowHistory(false)} maxWidth="sm" fullWidth>
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
                <span>{record.nome}</span>
                <Box>
                  <Button
                    variant="contained"
                    color="success"
                    sx={{ marginRight: "10px" }}
                    onClick={() => handleRedo(record.id)}
                  >
                    Restaurar
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      setConfirmDeleteDialog(true);
                      setPermanentDeleteId(record.id);
                      setConfirmDeleteMessage(`Esse cadastro será excluído permanentemente do banco de dados. Deseja continuar com a exclusão de ${record.nome}?`);
                    }}
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
        <Button onClick={() => setShowHistory(false)} color="primary">
          Fechar
        </Button>
      </DialogActions>
    </Dialog>

      
    {/* Mensagens de confirmação de histórico/deletar/refazer */}

      <Dialog open={confirmDeleteDialog} onClose={() => setConfirmDeleteDialog(false)}>
        <DialogTitle>Confirmar Exclusão Permanente</DialogTitle>
        <DialogContent>
        <DialogContentText>{confirmDeleteMessage}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setConfirmDeleteDialog(false)}>Cancelar</Button>
        <Button onClick={handlePermanentDelete} color="error">Excluir</Button>
      </DialogActions>
    </Dialog>


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

    {/* Botões de histórico/deletar/refazer */}

          <Button
        onClick={handleOpenHistory}
        sx={{
          marginLeft: "10px",
          textTransform: "none",
          color: colors.blueAccent[700],
          "&:hover": {
            textDecoration: "underline",
          },
        }}
      >
        Mostrar histórico de exclusão
      </Button>


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
