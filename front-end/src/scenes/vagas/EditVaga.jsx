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
  tarefa_id: yup.string().required("Campo obrigatório"),
  vagas: yup.string().required("Campo obrigatório"),
  unidade_id: yup.string().required("Campo obrigatório"),
  dia: yup.string().required("Campo obrigatório"),
  horario: yup.string().required("Campo obrigatório"),
  coordenador_id: yup.string().required("Campo obrigatório"),
  data: yup.string().required("Campo obrigatório"),
  status_vaga_id: yup.string().required("Campo obrigatório"),
  descricao: yup.string().required("Campo obrigatório")
});

const EditVaga = ({ 
  open, 
  onClose, 
  vaga, 
  onSubmit 
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Editar Vaga</DialogTitle>
      <DialogContent>
        <Formik
          onSubmit={onSubmit}
          initialValues={{
            tarefa_id: vaga?.tarefa_id || '',
            vagas: vaga?.vagas || '',
            unidade_id: vaga?.unidade_id || '',
            dia: vaga?.dia || '',
            horario: vaga?.horario || '',
            coordenador_id: vaga?.coordenador_id || '',
            data: vaga?.data || '',
            status_vaga_id: vaga?.status_vaga_id || '',
            descricao: vaga?.descricao || ''
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
                  label="Vagas"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.vagas}
                  name="vagas"
                  error={!!touched.vagas && !!errors.vagas}
                  helperText={touched.vagas && errors.vagas}
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
                  label="Dia"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.dia}
                  name="dia"
                  error={!!touched.dia && !!errors.dia}
                  helperText={touched.dia && errors.dia}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Horário"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.horario}
                  name="horario"
                  error={!!touched.horario && !!errors.horario}
                  helperText={touched.horario && errors.horario}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Coordenador"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.coordenador_id}
                  name="coordenador_id"
                  error={!!touched.coordenador_id && !!errors.coordenador_id}
                  helperText={touched.coordenador_id && errors.coordenador_id}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="date"
                  label="Data"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.data}
                  name="data"
                  error={!!touched.data && !!errors.data}
                  helperText={touched.data && errors.data}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Status"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.status_vaga_id}
                  name="status_vaga_id"
                  error={!!touched.status_vaga_id && !!errors.status_vaga_id}
                  helperText={touched.status_vaga_id && errors.status_vaga_id}
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

export default EditVaga;