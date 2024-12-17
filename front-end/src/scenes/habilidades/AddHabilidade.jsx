import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";

const initialValues = {
  descricao: "",
  talentos: "",
};

const checkoutSchema = yup.object().shape({
  descricao: yup.string().required("Campo obrigatório"),
  talentos: yup.string().required("Campo obrigatório"),
});

const AddHabilidade = ({ onClose, onSuccess }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const URL_KEY = "http://localhost:5000/habilidades";

  const handleFormSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch(`${URL_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (response.ok) {
        onSuccess(data.message);
        onClose();
      } else {
        throw new Error("Erro ao criar habilidade");
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
                  placeholder="Ex: Advogado (a)"
                  onBlur={handleBlur}
                  onFocus={() => setFieldTouched('descricao', true, false)}
                  onChange={handleChange}
                  value={values.descricao}
                  name="descricao"
                  error={!!touched.descricao && !!errors.descricao}
                  helperText={touched.descricao && errors.descricao}
                />
              </Box>

              <Box sx={{ gridColumn: "span 2" }}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    mb: 1, 
                    color: 'text.secondary', 
                    fontSize: touched.talentos ? '0.8rem' : '1rem',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Talentos
                </Typography>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  placeholder="Ex: João Silva"
                  onBlur={handleBlur}
                  onFocus={() => setFieldTouched('talentos', true, false)}
                  onChange={handleChange}
                  value={values.talentos}
                  name="talentos"
                  error={!!touched.talentos && !!errors.talentos}
                  helperText={touched.talentos && errors.talentos}
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
                Criar Nova Habilidade
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default AddHabilidade;