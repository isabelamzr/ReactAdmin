export const transformers = {
    task: {
       requiredFields : [
        'taskNameView',
        'coordinatorFKView', 
        'unitFKView', 
        'volunteerFKView', 
        'day', 
        'time', 
        'location'],
      toFrontend: (data) => ({
        id: data.tarefa_id || data.id,
        taskNameView: data.tipo_tarefa_nome,
        taskID: data.tipo_tarefa_id,
        coordinatorFKView: data.coordenador_nome,
        coordinatorFK: data.coordenador_id,
        unitFKView: data.unidade_nome,
        unitFK: data.unidade_id,
        volunteerFKView: data.voluntario_nome,
        volunteerFK: data.voluntario_id,
        day: data.dia,
        time: data.horario,
        location: data.local
      }),
      toBackend: (values) => ({
        ...getUpdateInfo(values),
        tipo_tarefa_id: values.taskID,
        tipo_tarefa_nome: values.taskNameView,
        coordenador_id: values.coordinatorFK,
        coordenador_nome: values.coordinatorFKView,
        unidade_id: values.unitFK,
        unidade_nome: values.unitFKView,
        voluntario_id: values.volunteerFK,  
        voluntario_nome: values.volunteerFKView,
        dia: values.day,
        horario: values.time,
        local: values.location
      })
    },

    coordinator: {
      requiredFields: ['name', 'phone', 'email', 'gender'],
      toFrontend: (data) => ({
        id: data.id,
        name: data.nome,
        phone: data.telefone,
        email: data.email,
        gender: data.genero
      }),
      toBackend: (values) => ({
        ...getUpdateInfo(values),
        nome: values.name,
        telefone: values.phone,
        email: values.email,
        genero: values.gender
      })
    },
    
    taskType: {
        requiredFields: ['taskTypeName', 'description'],
      toFrontend: (data) => ({
        id: data.id,
        taskTypeName: data.nome_tarefa,
        description: data.descricao
      }),
      toBackend: (values) => ({
        ...getUpdateInfo(values),
        nome_tarefa: values.taskTypeName,
        descricao: values.description
      })
    },

    unit: {
      requiredFields: ['name', 'phone', 'address', 'neighborhood', 'city', 'state'],
      toFrontend: (data) => ({
        id: data.id,
        name: data.nome,
        phone: data.telefone,
        address: data.endereco,
        neighborhood: data.bairro,
        city: data.cidade,
        state: data.UF
      }),
      toBackend: (values) => ({
        ...getUpdateInfo(values),
        nome: values.name,
        telefone: values.phone,
        endereco: values.address,
        bairro: values.neighborhood,
        cidade: values.city,
        UF: values.state
      })
    },

    volunteer: {
      requiredFields: [
       'name',
       'phone',
       'email',
       'address', 
       'skillFKView',
       'taskFKView',
       'unitFKView', 
       'observations',
       'signedTerm', 
       'applying'],
      toFrontend: (data) => ({
        id: data.id,
        name: data.nome,
        phone: data.telefone,
        email: data.email,
        address: data.endereco,
        skillFK: data.habilidades_id,
        skillFKView: data.habilidades_nome,
        taskFK: data.tarefa_id,
        taskFKView: data.tarefa_nome,
        unitFK: data.unidade_id,
        unitFKView: data.unidade_nome, 
        observations: data.observacoes,
        signedTerm: data.termo_assinado,
        applying: data.candidatando
      }),
      toBackend: (values) => ({
        ...getUpdateInfo(values),
        nome: values.name,
        telefone: values.phone,
        email: values.email,
        endereco: values.address,
        habilidades_id: values.skillFK,
        habilidades_nome: values.skillFKView,
        tarefa_id: values.taskFK,
        tarefa_nome: values.taskFKView,
        unidade_id: values.unitFK,
        unidade_nome: values.unitFKView,
        observacoes: values.observations,
        termo_assinado: values.signedTerm,
        candidatando: values.applying
      })
    },

    skill: {
        requiredFields: ['description', 'experts'],
        toFrontend: (data) => ({
          id: data.id,
          description: data.descricao,
          experts: data.talentos,
        }),
        toBackend: (values) => ({
          ...getUpdateInfo(values),
          description: values.description,
          talentos: values.experts,
        })
    },

    spot: {
        requiredFields: [
        'coordinatorFKView', 
        'unitFKView', 
        'taskFKView', 
        'statusVagaFKView', 
        'date', 
        'day', 
        'time',
        'spots', 
        'description', 
       ],
        toFrontend: (data) => ({
          id: data.id,
          coordinatorFKView: data.coordenador_nome,
          coordinatorFK: data.coordenador_id,
          unitFKView: data.unidade_nome,
          unitFK: data.unidade_id,
          taskFKView: data.tarefa_nome,
          taskFK: data.tarefa_id,
          statusVagaFKView: data.status_vaga,
          statusVagaFK: data.status_vaga_id,
          date: data.data,
          day: data.dia,
          time: data.horario,
          spots: data.vagas,
          description: data.descricao,
        }),
        toBackend: (values) => ({
          ...getUpdateInfo(values),
          coordenador_nome: values.description,
          coordenador_id: values.experts,
          unidade_nome: values.unitFKView,
          unidade_id: values.unitFK,
          tarefa_nome: values.taskFKView,
          tarefa_id: values.taskFK,
          status_vaga: values.statusVagaFKView,
          status_vaga_id: values.statusVagaFK,
          data: values.date,
          dia: values.day,
          horario: values.time,
          vagas: values.spots,
          descricao: values.description,
        })
    },

    spotStatus: {
        requiredFields: ['statusCode', 'description'],
        toFrontend: (data) => ({
          id: data.id,
          statusCode: data.codigo_status,
          description: data.descricao,
        }),
        toBackend: (values) => ({
          ...getUpdateInfo(values),
          codigo_status: values.statusCode,
          descricao: values.description,
        })
    },

  };

  const getUpdateInfo = (values) => (
    values.id ? { id: values.id } : {}
  );