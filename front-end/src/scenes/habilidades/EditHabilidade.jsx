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

const checkoutSchema = yup.object().shape({
  descricao: yup.string().required("Campo obrigatório"),
  talentos: yup.string().required("Campo obrigatório"),
});

const EditHabilidade = ({ 
  open, 
  onClose, 
  habilidade, 
  onSubmit 
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Editar Tipos Tarefas</DialogTitle>
      <DialogContent>
        <Formik
          onSubmit={onSubmit}
          initialValues={{
            descricao: habilidade?.descricao || '',
            talentos: habilidade?.talentos || '',
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
                  label="Descrição"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.descricao}
                  name="descricao"
                  error={!!touched.descricao && !!errors.descricao}
                  helperText={touched.descricao && errors.descricao}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Talentos"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.talentos}
                  name="talentos"
                  error={!!touched.talentos && !!errors.talentos}
                  helperText={touched.talentos && errors.talentos}
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

export default EditHabilidade;