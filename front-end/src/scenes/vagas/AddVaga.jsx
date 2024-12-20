// AddVaga.jsx

import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import CoordenadorDropdown, { 
  UnidadeDropdown, 
  TipoTarefaDropdown, 
  StatusVagaDropdown 
} from "./AddDropdowns";

const initialValues = {
  tarefa_id: "",
  vagas: "",
  unidade_id: "",
  dia: "",
  horario: "",
  coordenador_id: "",
  data: "",
  status_vaga_id: "",
  descricao: "",
};

const horarioRegExp = /^(?:[01]\d|2[0-3]):[0-5]\d$/;

const checkoutSchema = yup.object().shape({
  tarefa_id: yup.string().required("Campo obrigatório"),
  vagas: yup.number().required("Campo obrigatório").positive().integer(),
  unidade_id: yup.string().required("Campo obrigatório"),
  dia: yup.string().required("Campo obrigatório"),
  horario: yup
    .string()
    .matches(horarioRegExp, "Horário inválido")
    .required("Campo obrigatório"),
  coordenador_id: yup.string().required("Campo obrigatório"),
  data: yup.string().required("Campo obrigatório"),
  status_vaga_id: yup.string().required("Campo obrigatório"),
  descricao: yup.string(),
});

const AddVaga = ({ onClose, onSuccess }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const URL_KEY = "http://localhost:5000/vagas";

  const handleFormSubmit = async (values, { setSubmitting }) => {
    console.log('Início do handleFormSubmit');
    console.log('Valores enviados:', {
        ...values,
        tarefa_id: Number(values.tarefa_id)
    });
    
    try {
        console.log('URL da requisição:', URL_KEY);
        console.log('Iniciando fetch com método:', {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                ...values,
                tarefa_id: Number(values.tarefa_id)
            })
        });
 
        const response = await fetch(URL_KEY, {
            method: "POST", 
            headers: { 
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            credentials: 'include',
            body: JSON.stringify({
                ...values,
                tarefa_id: Number(values.tarefa_id)
            })
        });
        
        console.log('Response completa:', response);
        console.log('Response status:', response.status);
        
        if (!response.ok) {
            const errorData = await response.text();
            console.error('Erro na resposta:', errorData);
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Data recebida:', data);
        
        onSuccess(data.message);
        onClose();
    } catch (error) {
        console.error('Erro detalhado:', error);
        onSuccess(error.message, "error");
    } finally {
        console.log('Finally executado');
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
                    fontSize: touched.tarefa_id ? '0.8rem' : '1rem',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Tarefa
                </Typography>
                <TipoTarefaDropdown
                  value={values.tarefa_id || ''} 
                  onChange={(e) => {
                    const selectedValue = Number(e.target.value);
                    setFieldValue('tarefa_id', selectedValue);
                  }}
                  error={!!touched.tarefa_id && !!errors.tarefa_id}
                />
              </Box>

              <Box sx={{ gridColumn: "span 2" }}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    mb: 1, 
                    color: 'text.secondary', 
                    fontSize: touched.vagas ? '0.8rem' : '1rem',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Vagas
                </Typography>
                <TextField
                  fullWidth
                  variant="filled"
                  type="number"
                  placeholder="Ex: 7"
                  onBlur={handleBlur}
                  onFocus={() => setFieldTouched('vagas', true, false)}
                  onChange={handleChange}
                  value={values.vagas}
                  name="vagas"
                  error={!!touched.vagas && !!errors.vagas}
                  helperText={touched.vagas && errors.vagas}
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
                  value={values.unidade_id || ''} 
                  onChange={(e) => {
                    const selectedValue = Number(e.target.value);
                    setFieldValue('unidade_id', selectedValue);
                  }}
                  error={!!touched.unidade_id && !!errors.unidade_id}
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
                  placeholder="Ex: Quarta-feira"
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
                <CoordenadorDropdown
                  value={values.coordenador_id || ''} 
                  onChange={(e) => {
                    const selectedValue = Number(e.target.value);
                    setFieldValue('coordenador_id', selectedValue);
                  }}
                  error={!!touched.coordenador_id && !!errors.coordenador_id}
                />
              </Box>

              <Box sx={{ gridColumn: "span 2" }}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    mb: 1, 
                    color: 'text.secondary', 
                    fontSize: touched.data ? '0.8rem' : '1rem',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Data
                </Typography>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  placeholder="Ex: 11/05/23"
                  onBlur={handleBlur}
                  onFocus={() => setFieldTouched('data', true, false)}
                  onChange={handleChange}
                  value={values.data}
                  name="data"
                  error={!!touched.data && !!errors.data}
                  helperText={touched.data && errors.data}
                />
              </Box>

              <Box sx={{ gridColumn: "span 2" }}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    mb: 1, 
                    color: 'text.secondary', 
                    fontSize: touched.status_vaga_id ? '0.8rem' : '1rem',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Status da Vaga
                </Typography>
                <StatusVagaDropdown
                  value={values.status_vaga_id || ''} 
                  onChange={(e) => {
                    setFieldValue('status_vaga_id', e.target.value);
                  }}
                  error={!!touched.status_vaga_id && !!errors.status_vaga_id}
                />
              </Box>

              <Box sx={{ gridColumn: "span 4" }}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    mb: 1, 
                    color: 'text.secondary', 
                    fontSize: touched.descricao ? '0.8rem' : '1rem',
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
                  placeholder="Ex: Biblioteca já em funcionamento desde 04/09/2023"
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
                Criar Nova Vaga
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default AddVaga;