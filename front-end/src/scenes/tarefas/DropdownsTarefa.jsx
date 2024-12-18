import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const CoordenadorDropdown = ({ value, onChange, error, helperText }) => {
  const [coordenadores, setCoordenadores] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/coordenadores/read')
      .then(response => response.json())
      .then(data => setCoordenadores(data))
      .catch(error => console.error('Erro ao buscar coordenadores:', error));
  }, []);

  return (
    <FormControl fullWidth variant="filled" error={!!error}>
      <InputLabel>Coordenador</InputLabel>
      <Select
        name="coordenador_id"
        value={value}
        label="Coordenador"
        onChange={onChange}
        error={!!error}
      >
        {coordenadores.map((coordenador) => (
          <MenuItem
            key={coordenador.id}
            value={coordenador.id}
          >
            {coordenador.nome}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export const TipoTarefaDropdown = ({ value, onChange, error, helperText }) => {
  const [tiposTarefa, setTiposTarefa] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/tipo_tarefa/read')
      .then(response => response.json())
      .then(data => setTiposTarefa(data))
      .catch(error => console.error('Erro ao buscar tipos de tarefa:', error));
  }, []);

  return (
    <FormControl fullWidth error={error}>
      <InputLabel>Tipo de Tarefa</InputLabel>
      <Select
        value={value}
        label="Tipo de Tarefa"
        onChange={onChange}
        helperText={helperText}
      >
        {tiposTarefa.map((tipo) => (
          <MenuItem key={tipo.id} value={tipo.id}>
            {tipo.nome_tarefa}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export const UnidadeDropdown = ({ value, onChange, error, helperText }) => {
  const [unidades, setUnidades] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/unidades/read')
      .then(response => response.json())
      .then(data => setUnidades(data))
      .catch(error => console.error('Erro ao buscar unidades:', error));
  }, []);

  return (
    <FormControl fullWidth error={error}>
      <InputLabel>Unidade</InputLabel>
      <Select
        value={value}
        label="Unidade"
        onChange={onChange}
        helperText={helperText}
      >
        {unidades.map((unidade) => (
          <MenuItem key={unidade.id} value={unidade.id}>
            {unidade.nome}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export const VoluntarioDropdown = ({ value, onChange, error, helperText }) => {
  const [voluntarios, setVoluntarios] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/voluntarios/read')
      .then(response => response.json())
      .then(data => setVoluntarios(data))
      .catch(error => console.error('Erro ao buscar voluntários:', error));
  }, []);

  return (
    <FormControl fullWidth error={error}>
      <InputLabel>Voluntário</InputLabel>
      <Select
        value={value}
        label="Voluntário"
        onChange={onChange}
        helperText={helperText}
      >
        {voluntarios.map((voluntario) => (
          <MenuItem key={voluntario.id} value={voluntario.id}>
            {voluntario.nome}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CoordenadorDropdown;