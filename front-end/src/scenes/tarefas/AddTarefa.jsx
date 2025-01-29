// componente AddTarefa.jsx

import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import CoordenadorDropdown, { 
  TipoTarefaDropdown, 
  UnidadeDropdown, 
  VoluntarioDropdown 
} from "./DropdownsAdd"; 

const initialValues = {
  tipo_tarefa_id: "",
  dia: "",
  horario: "",
  coordenador_id: "",
  unidade_id: "",
  voluntario_id: "",
  local: "",
};

const horarioRegExp = /^(?:[01]\d|2[0-3]):[0-5]\d$/;

const checkoutSchema = yup.object().shape({
  tipo_tarefa_id: yup.string().required("Tipo de tarefa é obrigatório"),
  dia: yup.string().required("Dia é obrigatório"),
  horario: yup
    .string()
    .matches(horarioRegExp, "Horário inválido. Use o formato HH:MM")
    .required("Horário é obrigatório"),
  coordenador_id: yup.string().required("Coordenador é obrigatório"),
  unidade_id: yup.string().required("Unidade é obrigatória"),
  voluntario_id: yup.string().required("Voluntário é obrigatório"),
  local: yup.string().required("Local é obrigatório"),
});

const AddTarefa = ({ onClose, onSuccess }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const URL_KEY = "http://localhost:5000/tarefas";

  const handleFormSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch(URL_KEY, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (response.ok) {
        onSuccess(data.message);
        onClose();
      } else {
        throw new Error("Erro ao criar tarefa");
      }
    } catch (error) {
      onSuccess(error.message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box p="20px">
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          setFieldTouched,
          setFieldValue
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <Box sx={{ gridColumn: "span 2" }}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    mb: 1, 
                    color: 'text.secondary', 
                    fontSize: touched.tipo_tarefa_id ? '0.8rem' : '1rem',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Tarefa
                </Typography>
                <TipoTarefaDropdown
                  value={values.tipo_tarefa_id || ''} 
                  onChange={(e) => {
                    const selectedValue = Number(e.target.value);
                    setFieldValue('tipo_tarefa_id', selectedValue);
                  }}
                  error={!!touched.tipo_tarefa_id && !!errors.tipo_tarefa_id}
                  helperText={touched.tipo_tarefa_id && errors.tipo_tarefa_id}
                />
              </Box>

              <Box sx={{ gridColumn: "span 2" }}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    mb: 1, 
                    color: 'text.secondary', 
                    fontSize: touched.dia ? '0.8rem' : '1rem',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Dia
                </Typography>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  placeholder="Ex: Segunda-feira"
                  onBlur={handleBlur}
                  onFocus={() => setFieldTouched('dia', true, false)}
                  onChange={handleChange}
                  value={values.dia}
                  name="dia"
                  error={!!touched.dia && !!errors.dia}
                  helperText={touched.dia && errors.dia}
                />
              </Box>

              <Box sx={{ gridColumn: "span 2" }}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    mb: 1, 
                    color: 'text.secondary', 
                    fontSize: touched.horario ? '0.8rem' : '1rem',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Horário
                </Typography>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  placeholder="Ex: 12:00"
                  onBlur={handleBlur}
                  onFocus={() => setFieldTouched('horario', true, false)}
                  onChange={handleChange}
                  value={values.horario}
                  name="horario"
                  error={!!touched.horario && !!errors.horario}
                  helperText={touched.horario && errors.horario}
                />
              </Box>

              <Box sx={{ gridColumn: "span 2" }}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    mb: 1, 
                    color: 'text.secondary', 
                    fontSize: touched.coordenador_id ? '0.8rem' : '1rem',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Coordenador
                </Typography>
               
                <CoordenadorDropdown
                  value={values.coordenador_id || ''} 
                  onChange={(e) => {
                    const selectedValue = Number(e.target.value);
                    setFieldValue('coordenador_id', selectedValue);
                  }}
                />
              </Box>

              <Box sx={{ gridColumn: "span 2" }}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    mb: 1, 
                    color: 'text.secondary', 
                    fontSize: touched.unidade_id ? '0.8rem' : '1rem',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Unidade
                </Typography>
                <UnidadeDropdown
                  value={values.unidade_id || ''} 
                  onChange={(e) => {
                    const selectedValue = Number(e.target.value);
                    setFieldValue('unidade_id', selectedValue);
                  }}
                  error={!!touched.unidade_id && !!errors.unidade_id}
                  helperText={touched.unidade_id && errors.unidade_id}
                />
              </Box>

              <Box sx={{ gridColumn: "span 2" }}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    mb: 1, 
                    color: 'text.secondary', 
                    fontSize: touched.voluntario_id ? '0.8rem' : '1rem',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Voluntário
                </Typography>
                <VoluntarioDropdown
                  value={values.voluntario_id || ''} 
                  onChange={(e) => {
                    const selectedValue = Number(e.target.value);
                    setFieldValue('voluntario_id', selectedValue);
                  }}
                  error={!!touched.voluntario_id && !!errors.voluntario_id}
                  helperText={touched.voluntario_id && errors.voluntario_id}
                />
              </Box>

              <Box sx={{ gridColumn: "span 2" }}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    mb: 1, 
                    color: 'text.secondary', 
                    fontSize: touched.local ? '0.8rem' : '1rem',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Local
                </Typography>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  placeholder="Ex: Sala 07"
                  onBlur={handleBlur}
                  onFocus={() => setFieldTouched('local', true, false)}
                  onChange={handleChange}
                  value={values.local}
                  name="local"
                  error={!!touched.local && !!errors.local}
                  helperText={touched.local && errors.local}
                />
              </Box>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button 
                type="submit" 
                color="secondary" 
                variant="contained"
                disabled={isSubmitting}
              >
                Criar Nova Tarefa
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default AddTarefa;