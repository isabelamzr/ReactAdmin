import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const HabilidadesDropdown = ({ value, onChange, error, helperText }) => {
  const [habilidades, setHabilidades] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/habilidades/read')
      .then(response => response.json())
      .then(data => setHabilidades(data))
      .catch(error => console.error('Erro ao buscar habilidades:', error));
  }, []);

  return (
    <FormControl fullWidth variant="filled" error={!!error}>
      <InputLabel>Habilidade</InputLabel>
      <Select
        name="habilidades_id"
        value={value}
        label="Habilidade"
        onChange={onChange}
        error={!!error}
      >
        {habilidades.map((habilidade) => (
          <MenuItem
            key={habilidade.id}
            value={habilidade.id}
          >
            {habilidade.descricao}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export const TarefaDropdown = ({ value, onChange, error, helperText }) => {
    const [tarefas, setTarefas] = useState([]);
  
    useEffect(() => {
      fetch('http://localhost:5000/tipo_tarefa/read')
        .then(response => response.json())
        .then(data => setTarefas(data))
        .catch(error => console.error('Erro ao buscar tarefas:', error));
    }, []);
  
    return (
      <FormControl fullWidth error={error}>
        <InputLabel>Tarefa</InputLabel>
        <Select
          value={value}
          label="Tarefa"
          onChange={onChange}
          helperText={helperText}
        >
          {tarefas.map((tarefa) => (
            <MenuItem key={tarefa.id} value={tarefa.id}>
              {tarefa.nome_tarefa}
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

export const TermoAssinadoDropdown = ({ value, onChange, error, helperText }) => {
  return (
    <FormControl fullWidth error={error}>
      <InputLabel>Termo Assinado</InputLabel>
      <Select
        value={value}
        label="Termo Assinado"
        onChange={onChange}
        helperText={helperText}
      >
        <MenuItem value="Sim">Sim</MenuItem>
        <MenuItem value="Não">Não</MenuItem>
        <MenuItem value="Nulo">Nulo</MenuItem>
      </Select>
    </FormControl>
  );
};

export const CandidatandoDropdown = ({ value, onChange, error, helperText }) => {
    return (
      <FormControl fullWidth error={error}>
        <InputLabel>Candidatando</InputLabel>
        <Select
          value={value}
          label="Candidatando"
          onChange={onChange}
          helperText={helperText}
        >
          <MenuItem value="Sim">Sim</MenuItem>
          <MenuItem value="Já encaixado">Já encaixado</MenuItem>
          <MenuItem value="Não">Não</MenuItem>
        </Select>
      </FormControl>
    );
  };

export default HabilidadesDropdown;