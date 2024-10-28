import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { mockDataTarefas } from "../../data/mockData";

const initialValues = {
  nome: "",
  telefone: "",
  email: "",
  genero: "",
  tarefa: "",
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)?[0-9]{4,5}[-]?[0-9]{4}$/;

const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const checkoutSchema = yup.object().shape({
  nome: yup.string().required("required"),
  telefone: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  email: yup
    .string()
    .matches(emailRegExp, "Email is not valid")
    .required("required"),
  genero: yup.string().required("required"),
  tarefa: yup.string().required("required"),
});

const FormCoordenadores = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [tarefas, setTarefas] = useState([]);

  useEffect(() => {
    const tiposTarefas = [...new Set(mockDataTarefas.map((tarefa) => tarefa.tipo_tarefa_id))];
    setTarefas(tiposTarefas);
  }, []);

  const handleFormSubmit = (values) => {
    console.log("Novo coordenador criado:", values);
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
                {["Mulher Cis", "Homem Cis", "Mulher Transgênero", "Homem Transgênero", "Não-Binário", "Agênero", "Outro"].map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                select
                label="Tarefa"
                fullWidth
                variant="filled"
                name="tarefa"
                value={values.tarefa}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!touched.tarefa && !!errors.tarefa}
                helperText={touched.tarefa && errors.tarefa}
                sx={{ gridColumn: "span 2" }}
              >
                {tarefas.map((tarefa, index) => (
                  <MenuItem key={index} value={tarefa}>
                    {tarefa}
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