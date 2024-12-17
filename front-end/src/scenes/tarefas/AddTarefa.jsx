import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";

// removi o required e nao coloquei o dropdown nas colunas tipo id para facilitar o desenvolvimento
// .required("Campo obrigatório")
// ver se logica de dropdown precisa de um componente (provavel que sim)

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
  tipo_tarefa_id: yup.string(),
  dia: yup.string(),
  horario: yup
    .string()
    .matches(horarioRegExp, "Horário inválido. Use o formato HH:MM"),
  coordenador_id: yup.string(),
  unidade_id: yup.string(),
  voluntario_id: yup.string(),
  local: yup.string(),
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
          setFieldTouched
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
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  placeholder="Ex: Reunião Mediúnica"
                  onBlur={handleBlur}
                  onFocus={() => setFieldTouched('tipo_tarefa_id', true, false)}
                  onChange={handleChange}
                  value={values.tipo_tarefa_id}
                  name="tipo_tarefa_id"
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
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  placeholder="Ex: Maria Silva"
                  onBlur={handleBlur}
                  onFocus={() => setFieldTouched('coordenador_id', true, false)}
                  onChange={handleChange}
                  value={values.coordenador_id}
                  name="coordenador_id"
                  error={!!touched.coordenador_id && !!errors.coordenador_id}
                  helperText={touched.coordenador_id && errors.coordenador_id}
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
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  placeholder="Ex: AECX - Sede"
                  onBlur={handleBlur}
                  onFocus={() => setFieldTouched('unidade_id', true, false)}
                  onChange={handleChange}
                  value={values.unidade_id}
                  name="unidade_id"
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
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  placeholder="Ex: João Silva"
                  onBlur={handleBlur}
                  onFocus={() => setFieldTouched('voluntario_id', true, false)}
                  onChange={handleChange}
                  value={values.voluntario_id}
                  name="voluntario_id"
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