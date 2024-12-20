// DropdownsVagas.jsx

import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const CoordenadorDropdown = ({ value, onChange, error }) => {
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
      >
        {coordenadores.map((coordenador) => (
          <MenuItem key={coordenador.id} value={coordenador.id}>
            {coordenador.nome}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export const UnidadeDropdown = ({ value, onChange, error }) => {
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

export const TipoTarefaDropdown = ({ value, onChange, error }) => {
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

export const StatusVagaDropdown = ({ value, onChange, error }) => {
  const [statusVagas, setStatusVagas] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/status_vaga/read')
      .then(response => response.json())
      .then(data => setStatusVagas(data))
      .catch(error => console.error('Erro ao buscar status de vagas:', error));
  }, []);

  return (
    <FormControl fullWidth error={error}>
      <InputLabel>Status da Vaga</InputLabel>
      <Select
        value={value}
        label="Status da Vaga"
        onChange={onChange}
      >
        {statusVagas.map((status) => (
          <MenuItem key={status.id} value={status.id}>
            {status.descricao}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CoordenadorDropdown;