import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";

const initialValues = {
  nome_tarefa: "",
  descricao: "",
};

const checkoutSchema = yup.object().shape({
  nome_tarefa: yup.string(),
  descricao: yup.string(),
});

const AddTipoTarefa = ({ onClose, onSuccess }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const URL_KEY = "http://localhost:5000/tipo_tarefa";

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
        throw new Error("Erro ao criar tipo-tarefa");
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
                    fontSize: touched.nome_tarefa ? '0.8rem' : '1rem',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Nome Tarefa
                </Typography>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  placeholder="Ex: Oficina de Costura"
                  onBlur={handleBlur}
                  onFocus={() => setFieldTouched('nome_tarefa', true, false)}
                  onChange={handleChange}
                  value={values.nome_tarefa}
                  name="nome_tarefa"
                  error={!!touched.nome_tarefa && !!errors.nome_tarefa}
                  helperText={touched.nome_tarefa && errors.nome_tarefa}
                />
              </Box>

              <Box sx={{ gridColumn: "span 2" }}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    mb: 1, 
                    color: 'text.secondary', 
                    fontSize: touched.descricao ? '0.8rem' : '1rem',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Descrição
                </Typography>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  placeholder="Ex: COSTURA DE ENXOVAL PARA CRIANÇAS A SEREM DISTRIBUIDOS ÀS GESTANTES DO CURSO DE GESTANTES"
                  onBlur={handleBlur}
                  onFocus={() => setFieldTouched('descricao', true, false)}
                  onChange={handleChange}
                  value={values.descricao}
                  name="descricao"
                  error={!!touched.descricao && !!errors.descricao}
                  helperText={touched.descricao && errors.descricao}
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
                Criar Novo Tipo de Tarefa
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default AddTipoTarefa;