import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";

const initialValues = {
  DataDaDivulgacao: "",
  coordenador: "",
  unidade: "",
  tarefa: "",
  dia: "",
  horario: "",
  numeroVagas: "",
  descricaoVagas: "",
};

const checkoutSchema = yup.object().shape({
  DataDaDivulgacao: yup.date().required("required"),
  coordenador: yup.string().required("required"),
  unidade: yup.string().required("required"),
  tarefa: yup.string().required("required"),
  dia: yup.string().required("required"),
  horario: yup.string().required("required"),
  numeroVagas: yup.string().required("required"),
  descricaoVagas: yup.string().required("required"),
});

const FormVagas = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [coordenadores, setCoordenadores] = useState([]);
  const [unidades, setUnidades] = useState([]);
  const [tarefas, setTarefas] = useState([]);
  const [dias, setDias] = useState([]);
  const [horarios, setHorarios] = useState([]);


  return (
    <Box m="20px">
      <Formik
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
                type="date"
                label="Data da Divulgação"
                slotProps={{
                  inputLabel: { shrink: true },
                }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.DataDaDivulgacao}
                name="DataDaDivulgacao"
                error={!!touched.DataDaDivulgacao && !!errors.DataDaDivulgacao}
                helperText={touched.DataDaDivulgacao && errors.DataDaDivulgacao}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                select
                label="Coordenador"
                fullWidth
                variant="filled"
                name="coordenador"
                value={values.coordenador}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!touched.coordenador && !!errors.coordenador}
                helperText={touched.coordenador && errors.coordenador}
                sx={{ gridColumn: "span 2" }}
              >
                {coordenadores.map((nome, index) => (
                  <MenuItem key={index} value={nome}>
                    {nome}
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
                label="Dia"
                fullWidth
                variant="filled"
                name="dia"
                value={values.dia}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!touched.dia && !!errors.dia}
                helperText={touched.dia && errors.dia}
                sx={{ gridColumn: "span 2" }}
              >
                {dias.map((dia, index) => (
                  <MenuItem key={index} value={dia}>
                    {dia}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                select
                label="Horário"
                fullWidth
                variant="filled"
                name="horario"
                value={values.horario}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!touched.horario && !!errors.horario}
                helperText={touched.horario && errors.horario}
                sx={{ gridColumn: "span 2" }}
              >
                {horarios.map((horario, index) => (
                  <MenuItem key={index} value={horario}>
                    {horario}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Número Vagas"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.numeroVagas}
                name="numeroVagas"
                error={!!touched.numeroVagas && !!errors.numeroVagas}
                helperText={touched.numeroVagas && errors.numeroVagas}
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Descrição Vagas"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.descricaoVagas}
                name="descricaoVagas"
                error={!!touched.descricaoVagas && !!errors.descricaoVagas}
                helperText={touched.descricaoVagas && errors.descricaoVagas}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Criar nova vaga
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default FormVagas;
