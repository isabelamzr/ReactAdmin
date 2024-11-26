import { useEffect, useState } from "react";
import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

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
    .required("required"),
  genero: yup.string().required("Campo obrigatório"),
});

const FormCoordenadores = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = async (values) => {
      console.log("Enviando dados:", values); 

    try {
      const response = await fetch("http://localhost:5000/coordenadores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values), 
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
      } else {
        throw new Error(data.message || "Erro ao criar coordenador");
      }
    } catch (error) {
      console.error("Erro ao criar coordenador:", error);
      alert("Erro ao criar coordenador");
    }
  };

  return (
    <Box m="20px">
      <Header title="Formulário Coordenadores" subtitle="Adicionar um novo coordenador" />
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
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Nome"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.nome}
                name="nome"
                error={!!touched.nome && !!errors.nome}
                helperText={touched.nome && errors.nome}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Telefone"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.telefone}
                name="telefone"
                error={!!touched.telefone && !!errors.telefone}
                helperText={touched.telefone && errors.telefone}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="email"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                select
                label="Gênero"
                fullWidth
                variant="filled"
                name="genero"
                value={values.genero}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!touched.genero && !!errors.genero}
                helperText={touched.genero && errors.genero}
                sx={{ gridColumn: "span 2" }}
              >
                {["Mulher Cis", "Homem Cis", "Mulher Trans", "Homem Trans", "Não-Binário", "Agênero", "Outro"].map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Criar Novo Coordenador
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default FormCoordenadores;