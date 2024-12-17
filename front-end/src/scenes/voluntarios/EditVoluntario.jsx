import React from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  TextField, 
  Box 
} from "@mui/material";
import { Formik } from 'formik';
import * as yup from 'yup';

// removi .required("Campo obrigatório") para facilitar a logica de desenvolvimento, ver depois se volta

const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)?[0-9]{4,5}[-]?[0-9]{4}$/;
const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const checkoutSchema = yup.object().shape({
  nome: yup.string(),
  telefone: yup.string().matches(phoneRegExp, "Este número é inválido"),
  email: yup.string().matches(emailRegExp, "Este e-mail é inválido"),
  endereco: yup.string(),
  habilidades_id: yup.string(),
  tarefa_id: yup.string(),
  unidade_id: yup.string(),
  observacoes: yup.string(),
  termo_assinado: yup.string()
});

const EditVoluntario = ({ 
  open, 
  onClose, 
  voluntario, 
  onSubmit 
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Editar Voluntário</DialogTitle>
      <DialogContent>
        <Formik
          onSubmit={onSubmit}
          initialValues={{
            nome: voluntario?.nome || '',
            telefone: voluntario?.telefone || '',
            email: voluntario?.email || '',
            endereco: voluntario?.endereco || '',
            habilidades_id: voluntario?.habilidades_id || '',
            tarefa_id: voluntario?.tarefa_id || '',
            unidade_id: voluntario?.unidade_id || '',
            observacoes: voluntario?.observacoes || '',
            termo_assinado: voluntario?.termo_assinado || ''
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
                  label="Endereço"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.endereco}
                  name="endereco"
                  error={!!touched.endereco && !!errors.endereco}
                  helperText={touched.endereco && errors.endereco}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Habilidades"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.habilidades_id}
                  name="habilidades_id"
                  error={!!touched.habilidades_id && !!errors.habilidades_id}
                  helperText={touched.habilidades_id && errors.habilidades_id}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Tarefa"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.tarefa_id}
                  name="tarefa_id"
                  error={!!touched.tarefa_id && !!errors.tarefa_id}
                  helperText={touched.tarefa_id && errors.tarefa_id}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Unidade"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.unidade_id}
                  name="unidade_id"
                  error={!!touched.unidade_id && !!errors.unidade_id}
                  helperText={touched.unidade_id && errors.unidade_id}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Observações"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.observacoes}
                  name="observacoes"
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Termo Assinado"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.termo_assinado}
                  name="termo_assinado"
                  error={!!touched.termo_assinado && !!errors.termo_assinado}
                  helperText={touched.termo_assinado && errors.termo_assinado}
                  sx={{ gridColumn: "span 4" }}
                />
              </Box>

              <DialogActions>
                <Button onClick={onClose} color="secondary">
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
  );
};

export default EditVoluntario;