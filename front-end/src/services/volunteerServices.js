import { 
    EditSuccessMsg, 
    InsertSuccessMsg, 
    SoftDeleteSuccessMsg, 
    RestoreSuccessMsg, 
    PermanentDeleteSuccessMsg,
    ErrorEditMsg,
    ErrorInsertMsg,
    ErrorDeleteMsg,
    ErrorRestoreMsg,
    ErrorPermanentDeleteMsg
  } from '../components/Notification/MessageNotification';
  
  const BASE_URL = 'http://localhost:5000/voluntarios';
  
  export const volunteerServices = {
    getAll: async () => {
      try {
        const response = await fetch(`${BASE_URL}/read`);
        if (!response.ok) throw new Error('Falha ao buscar voluntários');
        const data = await response.json();
        return { 
          success: true,
          data: data.map(volunteer => ({
            id: volunteer.id,
            name: volunteer.nome,
            phone: volunteer.telefone,
            email: volunteer.email,
            address: volunteer.endereco,
            skillId: volunteer.habilidades_id,
            taskId: volunteer.tarefa_id,
            unitId: volunteer.unidade_id,
            observations: volunteer.observacoes,
            signedTerm: volunteer.termo_assinado,
            applying: volunteer.candidatando
          }))
        };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },
  
    insert: async (volunteerData) => {
      try {
        const response = await fetch(BASE_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nome: volunteerData.name,
            telefone: volunteerData.phone,
            email: volunteerData.email,
            endereco: volunteerData.address,
            habilidades_id: volunteerData.skillId,
            tarefa_id: volunteerData.taskId,
            unidade_id: volunteerData.unitId,
            observacoes: volunteerData.observations,
            termo_assinado: volunteerData.signedTerm,
            candidatando: volunteerData.applying
          })
        });
        const data = await response.json();
        return {
          success: response.ok,
          message: response.ok 
            ? InsertSuccessMsg(volunteerData.name) 
            : ErrorInsertMsg(volunteerData.name),
          volunteer: data.volunteer
        };
      } catch (error) {
        return {
          success: false,
          message: ErrorInsertMsg(volunteerData.name)
        };
      }
    },
  
    update: async (id, volunteerData) => {
      try {
        const response = await fetch(`${BASE_URL}/update/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nome: volunteerData.name,
            telefone: volunteerData.phone,
            email: volunteerData.email,
            endereco: volunteerData.address,
            habilidades_id: volunteerData.skillId,
            tarefa_id: volunteerData.taskId,
            unidade_id: volunteerData.unitId,
            observacoes: volunteerData.observations,
            termo_assinado: volunteerData.signedTerm,
            candidatando: volunteerData.applying
          })
        });
        const data = await response.json();
        return {
          success: response.ok,
          message: response.ok 
            ? EditSuccessMsg(volunteerData.name) 
            : ErrorEditMsg(volunteerData.name),
          volunteer: data.volunteer
        };
      } catch (error) {
        return {
          success: false,
          message: ErrorEditMsg(volunteerData.name)
        };
      }
    },
  
    delete: async (id, volunteerName) => {
      try {
        const response = await fetch(`${BASE_URL}/soft_delete/${id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        return {
          success: response.ok,
          message: response.ok 
            ? SoftDeleteSuccessMsg(volunteerName) 
            : ErrorDeleteMsg(volunteerName),
          volunteer: data.volunteer
        };
      } catch (error) {
        return { 
          success: false,
          message: ErrorDeleteMsg(volunteerName)
        };
      }
    },
  
    restore: async (id, volunteerName) => {
      try {
        const response = await fetch(`${BASE_URL}/restaurar/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        return {
          success: response.ok,
          message: response.ok 
            ? RestoreSuccessMsg(volunteerName) 
            : ErrorRestoreMsg(volunteerName),
          volunteer: data.volunteer
        };
      } catch (error) {
        return {
          success: false,
          message: ErrorRestoreMsg(volunteerName)
        };
      }
    },
  
    permanentDelete: async (id, volunteerName) => {
      try {
        const response = await fetch(`${BASE_URL}/delete/${id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        return {
          success: response.ok,
          message: response.ok 
            ? PermanentDeleteSuccessMsg(volunteerName) 
            : ErrorPermanentDeleteMsg(volunteerName),
          volunteer: data.volunteer
        };
      } catch (error) {
        return {
          success: false,
          message: ErrorPermanentDeleteMsg(volunteerName)
        };
      }
    }
  };