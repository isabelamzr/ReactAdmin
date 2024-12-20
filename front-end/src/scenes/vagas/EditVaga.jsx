// EditVaga.jsx
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box } from "@mui/material";
import { Formik } from 'formik';
import * as yup from 'yup';
import { CoordenadorDropdown, UnidadeDropdown, TipoTarefaDropdown, StatusVagaDropdown } from './EditDropdowns';

const horarioRegExp = /^(?:[01]\d|2[0-3]):[0-5]\d$/;

const checkoutSchema = yup.object().shape({
  tarefa_id: yup.string().required("Campo obrigatório"),
  vagas: yup.number().required("Campo obrigatório").positive().integer(),
  unidade_id: yup.string().required("Campo obrigatório"),
  dia: yup.string().required("Campo obrigatório"),
  horario: yup.string().matches(horarioRegExp, "Horário inválido").required("Campo obrigatório"),
  coordenador_id: yup.string().required("Campo obrigatório"),
  data: yup.string().required("Campo obrigatório"),
  status_vaga_id: yup.string().required("Campo obrigatório"),
  descricao: yup.string()
});

const EditVaga = ({ open, onClose, vaga, onSubmit }) => {
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
          {({ values, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting, setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              <Box display="grid" gap="30px" gridTemplateColumns="repeat(4, minmax(0, 1fr))">
                <TipoTarefaDropdown
                  value={values.tarefa_id}
                  onChange={(e) => setFieldValue('tarefa_id', e.target.value)}
                  error={!!touched.tarefa_id && !!errors.tarefa_id}
                />

                <TextField
                  fullWidth
                  variant="filled"
                  type="number"
                  label="Vagas"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.vagas}
                  name="vagas"
                  error={!!touched.vagas && !!errors.vagas}
                  helperText={touched.vagas && errors.vagas}
                />

                <UnidadeDropdown
                  value={values.unidade_id}
                  onChange={(e) => setFieldValue('unidade_id', e.target.value)}
                  error={!!touched.unidade_id && !!errors.unidade_id}
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
                />

                <CoordenadorDropdown
                  value={values.coordenador_id}
                  onChange={(e) => setFieldValue('coordenador_id', e.target.value)}
                  error={!!touched.coordenador_id && !!errors.coordenador_id}
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
                  InputLabelProps={{ shrink: true }}
                />

                <StatusVagaDropdown
                  value={values.status_vaga_id}
                  onChange={(e) => setFieldValue('status_vaga_id', e.target.value)}
                  error={!!touched.status_vaga_id && !!errors.status_vaga_id}
                />

                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Observações"
                  multiline
                  rows={4}
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

export default EditVaga;