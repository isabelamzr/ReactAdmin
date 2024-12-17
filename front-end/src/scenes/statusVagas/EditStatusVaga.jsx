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
  codigo_status: yup.string(),
  descricao: yup.string(),
});

const EditStatusVaga = ({ 
  open, 
  onClose, 
  statusVaga, 
  onSubmit 
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Editar Status-Vaga</DialogTitle>
      <DialogContent>
        <Formik
          onSubmit={onSubmit}
          initialValues={{
            codigo_status: statusVaga?.codigo_status || '',
            descricao: statusVaga?.descricao || ''
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
                    label="Código-Status"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.codigo_status}
                    name="codigo_status"
                    error={!!touched.codigo_status && !!errors.codigo_status}
                    helperText={touched.codigo_status && errors.codigo_status}
                    sx={{ gridColumn: "span 4" }}
                  />
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

export default EditStatusVaga;