import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import HabilidadesDropdown, { 
  TarefaDropdown, 
  UnidadeDropdown, 
  TermoAssinadoDropdown, 
  CandidatandoDropdown 
} from "./DropdownsAdd";

const initialValues = {
  nome: "",
  telefone: "",
  email: "",
  endereco: "",
  habilidades_id: "",
  tarefa_id: "",
  unidade_id: "",
  observacoes: "",
  termo_assinado: "",
  candidatando: "",
};

const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)?[0-9]{4,5}[-]?[0-9]{4}$/;
const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const checkoutSchema = yup.object().shape({
  nome: yup.string().required("Nome é obrigatório"),
  telefone: yup.string().matches(phoneRegExp, "Número inválido"),
  email: yup.string().matches(emailRegExp, "E-mail inválido"),
  endereco: yup.string(),
  habilidades_id: yup.string(),
  tarefa_id: yup.string(),
  unidade_id: yup.string(),
  observacoes: yup.string(),
  termo_assinado: yup.string()
    .oneOf(['Sim', 'Não', 'Nulo'], "Valor inválido para termo assinado"),
    candidatando: yup.string()
  .oneOf(['Sim', 'Já encaixado', 'Não'], "Valor inválido para candidatando"),
});

const AddVoluntario = ({ onClose, onSuccess }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const URL_KEY = "http://localhost:5000/voluntarios";

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
        throw new Error(data.message || "Erro ao criar voluntário");
      }
    } catch (error) {
      alert(error.message);
      onSuccess(error.message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box p="20px" sx={{ maxWidth: "600px", height: "90vh", overflowY: "auto" }}>
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
          setFieldValue,
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
                  Email
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
                  multiline
                  rows={2}
                  placeholder="Ex: Rua Herculano Pena, 481&#10;Nova Suissa"
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
                    fontSize: touched.habilidades_id ? '0.8rem' : '1rem',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Habilidades
                </Typography>
                <HabilidadesDropdown
                  value={values.habilidades_id}
                  onChange={(e) => setFieldValue('habilidades_id', e.target.value)}
                  error={!!touched.habilidades_id && !!errors.habilidades_id}
                  helperText={touched.habilidades_id && errors.habilidades_id}
                />
              </Box>

              <Box sx={{ gridColumn: "span 2" }}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    mb: 1, 
                    color: 'text.secondary', 
                    fontSize: touched.tarefa_id ? '0.8rem' : '1rem',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Tarefa
                </Typography>
                <TarefaDropdown
                  value={values.tarefa_id}
                  onChange={(e) => setFieldValue('tarefa_id', e.target.value)}
                  error={!!touched.tarefa_id && !!errors.tarefa_id}
                  helperText={touched.tarefa_id && errors.tarefa_id}
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
                  value={values.unidade_id}
                  onChange={(e) => setFieldValue('unidade_id', e.target.value)}
                  error={!!touched.unidade_id && !!errors.unidade_id}
                  helperText={touched.unidade_id && errors.unidade_id}
                />
              </Box>

              <Box sx={{ gridColumn: "span 4" }}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    mb: 1, 
                    color: 'text.secondary', 
                    fontSize: touched.observacoes ? '0.8rem' : '1rem',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Observações
                </Typography>
                <TextField
                  fullWidth
                  variant="filled"
                  multiline
                  rows={4}
                  placeholder="Ex: Participação em reunião mediúnica nas noites durante a semana,
                  ou aos sábados em qualquer horário, como elemento de sustentação, pois ainda estou 
                  desenvolvendo minha mediunidade, tenho interesse em ser adepto de tais reuniões.
                  
                  Estou no curso do MED2 na casa."
                  onBlur={handleBlur}
                  onFocus={() => setFieldTouched('observacoes', true, false)}
                  onChange={handleChange}
                  value={values.observacoes}
                  name="observacoes"
                  error={!!touched.observacoes && !!errors.observacoes}
                  helperText={touched.observacoes && errors.observacoes}
                />
              </Box>

              <Box sx={{ gridColumn: "span 2" }}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    mb: 1, 
                    color: 'text.secondary', 
                    fontSize: touched.termo_assinado ? '0.8rem' : '1rem',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Termo Assinado
                </Typography>
                <TermoAssinadoDropdown
                  value={values.termo_assinado}
                  onChange={(e) => setFieldValue('termo_assinado', e.target.value)}
                  error={!!touched.termo_assinado && !!errors.termo_assinado}
                  helperText={touched.termo_assinado && errors.termo_assinado}
                />
              </Box>
            </Box>

            <Box sx={{ gridColumn: "span 2" }}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    mb: 1, 
                    color: 'text.secondary', 
                    fontSize: touched.candidatando ? '0.8rem' : '1rem',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Candidatando
                </Typography>
                <CandidatandoDropdown
                  value={values.candidatando}
                  onChange={(e) => setFieldValue('candidatando', e.target.value)}
                  error={!!touched.candidatando && !!errors.candidatando}
                  helperText={touched.candidatando && errors.candidatando}
                />
              </Box>

            <Box display="flex" justifyContent="end" mt="20px">
              <Button 
                type="submit" 
                color="secondary" 
                variant="contained"
                disabled={isSubmitting}
              >
                Criar Novo Voluntário
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default AddVoluntario;