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

const EditCoordenador = ({ 
  open, 
  onClose, 
  coordenador, 
  onSubmit 
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Editar Coordenador</DialogTitle>
      <DialogContent>
        <Formik
          onSubmit={onSubmit}
          initialValues={{
            nome: coordenador?.nome || '',
            telefone: coordenador?.telefone || '',
            email: coordenador?.email || '',
            genero: coordenador?.genero || ''
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

export default EditCoordenador;