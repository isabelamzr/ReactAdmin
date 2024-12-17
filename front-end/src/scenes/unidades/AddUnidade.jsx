import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";

const initialValues = {
  nome: "",
  telefone: "",
  endereco: "",
  bairro: "",
  cidade: "",
  UF: "",
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)?[0-9]{4,5}[-]?[0-9]{4}$/;

const checkoutSchema = yup.object().shape({
  nome: yup.string().required("Campo obrigatório"),
  telefone: yup
    .string()
    .matches(phoneRegExp, "Este número é inválido")
    .required("Campo obrigatório"),
  endereco: yup.string().required("Campo obrigatório"),
  bairro: yup.string().required("Campo obrigatório"),
  cidade: yup.string().required("Campo obrigatório"),
  UF: yup.string().required("Campo obrigatório"),
});

const AddUnidade = ({ onClose, onSuccess }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const URL_KEY = "http://localhost:5000/unidades";

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
        throw new Error("Erro ao criar unidade");
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
                  placeholder="Ex: Nova Luz"
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
                  placeholder="Ex: (31) 99999-9999"
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
                    fontSize: touched.endereco ? '0.8rem' : '1rem',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Endereço
                </Typography>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  placeholder="Ex: Rua das Camélias, 1110"
                  onBlur={handleBlur}
                  onFocus={() => setFieldTouched('endereco', true, false)}
                  onChange={handleChange}
                  value={values.endereco}
                  name="endereco"
                  error={!!touched.endereco && !!errors.endereco}
                  helperText={touched.endereco && errors.endereco}
                />
              </Box>

              <Box sx={{ gridColumn: "span 2" }}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    mb: 1, 
                    color: 'text.secondary', 
                    fontSize: touched.bairro ? '0.8rem' : '1rem',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Bairro
                </Typography>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  placeholder="Ex: Rosaneves"
                  onBlur={handleBlur}
                  onFocus={() => setFieldTouched('bairro', true, false)}
                  onChange={handleChange}
                  value={values.bairro}
                  name="bairro"
                  error={!!touched.bairro && !!errors.bairro}
                  helperText={touched.bairro && errors.bairro}
                />
              </Box>

              <Box sx={{ gridColumn: "span 2" }}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    mb: 1, 
                    color: 'text.secondary', 
                    fontSize: touched.cidade ? '0.8rem' : '1rem',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Cidade
                </Typography>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  placeholder="Ex: Ribeirão das Neves"
                  onBlur={handleBlur}
                  onFocus={() => setFieldTouched('cidade', true, false)}
                  onChange={handleChange}
                  value={values.cidade}
                  name="cidade"
                  error={!!touched.cidade && !!errors.cidade}
                  helperText={touched.cidade && errors.cidade}
                />
              </Box>

              <Box sx={{ gridColumn: "span 2" }}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    mb: 1, 
                    color: 'text.secondary', 
                    fontSize: touched.UF ? '0.8rem' : '1rem',
                    transition: 'all 0.2s ease'
                  }}
                >
                  UF
                </Typography>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  placeholder="Ex: MG"
                  onBlur={handleBlur}
                  onFocus={() => setFieldTouched('UF', true, false)}
                  onChange={handleChange}
                  value={values.UF}
                  name="UF"
                  error={!!touched.UF && !!errors.UF}
                  helperText={touched.UF && errors.UF}
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
                Criar Nova Unidade
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default AddUnidade;