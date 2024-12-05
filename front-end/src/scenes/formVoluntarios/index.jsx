import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useState } from "react";
import { mockDataUnidade, mockDataTarefas, mockDataVagas, mockDataHabilidades } from "../../data/mockData";

const initialValues = {
  nomeVoluntario: "",
  telefone: "",
  email: "",
  endereco: "",
  habilidades: "",
  observacoes: "",
  candidatando: "",
  tarefa: "",
  unidade: "",
  controleVagas: "",
};

const phoneRegExp = 
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)?[0-9]{4,5}[ -]?[0-9]{4}$/;

const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const checkoutSchema = yup.object().shape({
  nomeVoluntario: yup.string().required("required"),
  telefone: yup.string().matches(phoneRegExp, "Phone number is not valid").required("required"),
  email: yup.string().matches(emailRegExp, "Email is not valid").required("required"),
  endereco: yup.string().required("required"),
  habilidades: yup.string().required("required"),
  candidatando: yup.string().required("required"),
  tarefa: yup.string().required("required"),
  unidade: yup.string().required("required"),
  controleVagas: yup.string().required("required"),
});

const FormVoluntarios = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [habilidades, setHabilidades] = useState([]);
  const [tarefas, setTarefas] = useState([]);
  const [unidades, setUnidades] = useState([]);
  const [controleVagas, setControleVagas] = useState([]);

  useEffect(() => {
    const descricoesHabilidades = [...new Set(mockDataHabilidades.map(habilidade => habilidade.descricao))];
    setHabilidades(descricoesHabilidades);

    const tiposTarefas = [...new Set(mockDataTarefas.map(tarefa => tarefa.tipo_tarefa_id))];
    setTarefas(tiposTarefas);

    const nomesUnidades = [...new Set(mockDataUnidade.map(unidade => unidade.nome))];
    setUnidades(nomesUnidades);

    const coordenadorIds = [...new Set(mockDataVagas.map(vaga => vaga.coordenador_id))];
    setControleVagas(coordenadorIds);
  }, []);

  const handleFormSubmit = (values) => {
    console.log("Novo voluntário criado:", values);
  };

  return (
    <Box m="20px">
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
                label="Nome Voluntário"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.nomeVoluntario}
                name="nomeVoluntario"
                error={!!touched.nomeVoluntario && !!errors.nomeVoluntario}
                helperText={touched.nomeVoluntario && errors.nomeVoluntario}
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
                fullWidth
                variant="filled"
                type="text"
                label="Endereço"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.endereco}
                name="endereco"
                error={!!touched.endereco && !!errors.endereco}
                helperText={touched.endereco && errors.endereco}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                select
                label="Habilidades"
                fullWidth
                variant="filled"
                name="habilidades"
                value={values.habilidades}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!touched.habilidades && !!errors.habilidades}
                helperText={touched.habilidades && errors.habilidades}
                sx={{ gridColumn: "span 2" }}
              >
                {habilidades.map((habilidade, index) => (
                  <MenuItem key={index} value={habilidade}>
                    {habilidade}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Observações"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.observacoes}
                name="observacoes"
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                select
                label="Candidatando"
                fullWidth
                variant="filled"
                name="candidatando"
                value={values.candidatando}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!touched.candidatando && !!errors.candidatando}
                helperText={touched.candidatando && errors.candidatando}
                sx={{ gridColumn: "span 2" }}
              >
                <MenuItem value="sim">Sim</MenuItem>
                <MenuItem value="não">Não</MenuItem>
                <MenuItem value="já encaixado">Já Encaixado</MenuItem>
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

              <TextField
                select
                label="Unidade"
                fullWidth
                variant="filled"
                name="unidade"
                value={values.unidade}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!touched.unidade && !!errors.unidade}
                helperText={touched.unidade && errors.unidade}
                sx={{ gridColumn: "span 2" }}
              >
                {unidades.map((unidade, index) => (
                  <MenuItem key={index} value={unidade}>
                    {unidade}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                select
                label="Controle de Vagas"
                fullWidth
                variant="filled"
                name="controleVagas"
                value={values.controleVagas}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!touched.controleVagas && !!errors.controleVagas}
                helperText={touched.controleVagas && errors.controleVagas}
                sx={{ gridColumn: "span 2" }}
              >
                {controleVagas.map((vaga, index) => (
                  <MenuItem key={index} value={vaga}>
                    {vaga}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Criar Novo Voluntário
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default FormVoluntarios;