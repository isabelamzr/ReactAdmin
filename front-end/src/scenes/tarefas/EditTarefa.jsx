// EditTarefa.jsx

import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box } from "@mui/material";
import { Formik } from 'formik';
import * as yup from 'yup';
import { TipoTarefaDropdown, CoordenadorDropdown, UnidadeDropdown, VoluntarioDropdown } from './EditDropdowns';

const checkoutSchema = yup.object().shape({
  tipo_tarefa_id: yup.string().required("Campo obrigatório"),
  dia: yup.string().required("Campo obrigatório"),
  horario: yup.string().required("Campo obrigatório"),
  coordenador_id: yup.string().required("Campo obrigatório"),
  unidade_id: yup.string().required("Campo obrigatório"),
  voluntario_id: yup.string().required("Campo obrigatório"),
  local: yup.string().required("Campo obrigatório"),
});

const EditTarefa = ({ open, onClose, tarefa, onSubmit }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Editar Tarefa</DialogTitle>
      <DialogContent>
        <Formik
          onSubmit={onSubmit}
          initialValues={{
            tipo_tarefa_id: tarefa?.tipo_tarefa_id || '',
            dia: tarefa?.dia || '',
            horario: tarefa?.horario || '',
            coordenador_id: tarefa?.coordenador_id || '',
            unidade_id: tarefa?.unidade_id || '',
            voluntario_id: tarefa?.voluntario_id || '',
            local: tarefa?.local || ''
          }}
          validationSchema={checkoutSchema}
        >
          {({ values, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting, setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              <Box display="grid" gap="30px" gridTemplateColumns="repeat(4, minmax(0, 1fr))" sx={{ mt: 2 }}>
                <Box sx={{ gridColumn: "span 4" }}>
                  <TipoTarefaDropdown
                    value={values.tipo_tarefa_id}
                    onChange={(e) => setFieldValue('tipo_tarefa_id', e.target.value)}
                    error={!!touched.tipo_tarefa_id && !!errors.tipo_tarefa_id}
                  />
                </Box>

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

                <Box sx={{ gridColumn: "span 4" }}>
                  <CoordenadorDropdown
                    value={values.coordenador_id}
                    onChange={(e) => setFieldValue('coordenador_id', e.target.value)}
                    error={!!touched.coordenador_id && !!errors.coordenador_id}
                  />
                </Box>

                <Box sx={{ gridColumn: "span 4" }}>
                  <UnidadeDropdown
                    value={values.unidade_id}
                    onChange={(e) => setFieldValue('unidade_id', e.target.value)}
                    error={!!touched.unidade_id && !!errors.unidade_id}
                  />
                </Box>

                <Box sx={{ gridColumn: "span 4" }}>
                  <VoluntarioDropdown
                    value={values.voluntario_id}
                    onChange={(e) => setFieldValue('voluntario_id', e.target.value)}
                    error={!!touched.voluntario_id && !!errors.voluntario_id}
                  />
                </Box>

                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Local"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.local}
                  name="local"
                  error={!!touched.local && !!errors.local}
                  helperText={touched.local && errors.local}
                  sx={{ gridColumn: "span 4" }}
                />
              </Box>

              <DialogActions sx={{ mt: 3 }}>
                <Button onClick={onClose} color="secondary">
                  Cancelar
                </Button>
                <Button type="submit" color="primary" variant="contained" disabled={isSubmitting}>
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

export default EditTarefa;