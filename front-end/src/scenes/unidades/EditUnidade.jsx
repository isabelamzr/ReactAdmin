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

const checkoutSchema = yup.object().shape({
  nome: yup.string().required("Campo obrigatório"),
  telefone: yup.string()
  .matches(phoneRegExp, "Este número é inválido")
  .required("Campo obrigatório"),
  endereco: yup.string().required("Campo obrigatório"),
  bairro: yup.string().required("Campo obrigatório"),
  cidade: yup.string().required("Campo obrigatório"),
  uf: yup.string().required("Campo obrigatório"),
});

const EditUnidade = ({ 
  open, 
  onClose, 
  unidade, 
  onSubmit 
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Editar Unidade</DialogTitle>
      <DialogContent>
        <Formik
          onSubmit={onSubmit}
          initialValues={{
            nome: unidade?.nome || '',
            telefone: unidade?.telefone || '',
            endereco: unidade?.endereco || '',
            bairro: unidade?.bairro || '',
            cidade: unidade?.cidade || '',
            uf: unidade?.uf || ''
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
                    label="Bairro"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.bairro}
                    name="bairro"
                    error={!!touched.bairro && !!errors.bairro}
                    helperText={touched.bairro && errors.bairro}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Cidade"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.cidade}
                    name="cidade"
                    error={!!touched.cidade && !!errors.cidade}
                    helperText={touched.cidade && errors.cidade}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="UF"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.uf}
                    name="uf"
                    error={!!touched.uf && !!errors.uf}
                    helperText={touched.uf && errors.uf}
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

export default EditUnidade;