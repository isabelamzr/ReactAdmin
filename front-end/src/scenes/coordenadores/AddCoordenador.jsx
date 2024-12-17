import React from "react";
import { Box, Button, TextField, MenuItem, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";

const initialValues = {
  nome: "",
  telefone: "",
  email: "",
  genero: "",
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)?[0-9]{4,5}[-]?[0-9]{4}$/;

const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const checkoutSchema = yup.object().shape({
  nome: yup.string().required("Campo obrigatório"),
  telefone: yup
    .string()
    .matches(phoneRegExp, "Este número é inválido")
    .required("Campo obrigatório"),
  email: yup
    .string()
    .matches(emailRegExp, "Este e-mail é inválido")
    .required("Campo obrigatório"),
  genero: yup.string().required("Campo obrigatório"),
});

const AddCoordenador = ({ onClose, onSuccess }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const URL_KEY = "http://localhost:5000/coordenadores";

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
        throw new Error(data.message || "Erro ao criar coordenador");
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
                    fontSize: touched.nome ? '0.8rem' : '1rem',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Nome
                </Typography>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  placeholder="Ex: Maria Silva"
                  onBlur={handleBlur}
                  onFocus={() => setFieldTouched('nome', true, false)}
                  onChange={handleChange}
                  value={values.nome}
                  name="nome"
                  error={!!touched.nome && !!errors.nome}
                  helperText={touched.nome && errors.nome}
                />
              </Box>

              <Box sx={{ gridColumn: "span 2" }}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    mb: 1, 
                    color: 'text.secondary', 
                    fontSize: touched.telefone ? '0.8rem' : '1rem',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Telefone
                </Typography>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  placeholder="Ex: (31) 9 9999-9999"
                  onBlur={handleBlur}
                  onFocus={() => setFieldTouched('telefone', true, false)}
                  onChange={handleChange}
                  value={values.telefone}
                  name="telefone"
                  error={!!touched.telefone && !!errors.telefone}
                  helperText={touched.telefone && errors.telefone}
                />
              </Box>

              <Box sx={{ gridColumn: "span 2" }}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    mb: 1, 
                    color: 'text.secondary', 
                    fontSize: touched.email ? '0.8rem' : '1rem',
                    transition: 'all 0.2s ease'
                  }}
                >
                  E-mail
                </Typography>
                <TextField
                  fullWidth
                  variant="filled"
                  type="email"
                  placeholder="Ex: email@email.com"
                  onBlur={handleBlur}
                  onFocus={() => setFieldTouched('email', true, false)}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                />
              </Box>

              <Box sx={{ gridColumn: "span 2" }}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    mb: 1, 
                    color: 'text.secondary', 
                    fontSize: touched.genero ? '0.8rem' : '1rem',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Gênero
                </Typography>
                <TextField
                  select
                  fullWidth
                  variant="filled"
                  name="genero"
                  value={values.genero}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onFocus={() => setFieldTouched('genero', true, false)}
                  error={!!touched.genero && !!errors.genero}
                  helperText={touched.genero && errors.genero}
                >
                  {["Mulher Cis", "Homem Cis", "Mulher Trans", "Homem Trans", 
                  "Não-Binário", "Agênero", "Outro"].map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button 
                type="submit" 
                color="secondary" 
                variant="contained"
                disabled={isSubmitting}
              >
                Criar Novo Coordenador
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default AddCoordenador;