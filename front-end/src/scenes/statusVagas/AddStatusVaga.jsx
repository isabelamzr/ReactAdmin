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
  codigo_status: yup.string().required('Código-Status é obrigatório'),
  descricao: yup.string().required('Descrição é obrigatória')
});

const AddStatusVaga = ({ 
  open, 
  onClose, 
  onSuccess 
}) => {
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch('http://localhost:5000/status_vagas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });

      const data = await response.json();

      if (response.ok) {
        onSuccess(data.message || 'Status de vaga criado com sucesso!');
        onClose();
      } else {
        onSuccess(data.message || 'Erro ao criar status de vaga', 'error');
      }
    } catch (error) {
      onSuccess('Erro ao criar status de vaga', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Criar Novo Status-Vaga</DialogTitle>
      <DialogContent>
        <Formik
          onSubmit={handleSubmit}
          initialValues={{
            codigo_status: '',
            descricao: ''
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
                  placeholder="Ex: 4"
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
                  placeholder="Ex: PAUSADA - NÃO DIVULGANDO"
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
                  Criar Novo Status-Vaga
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default AddStatusVaga;