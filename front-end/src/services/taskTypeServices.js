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
  
  const BASE_URL = 'http://localhost:5000/tipo_tarefa';
  
  export const taskTypeServices = {
    getAll: async () => {
      try {
        const response = await fetch(`${BASE_URL}/read`);
        if (!response.ok) throw new Error('Falha ao buscar tipos de tarefas');
        const data = await response.json();
        return { 
          success: true,
          data: data.map(taskType => ({
            id: taskType.id,
            taskName: taskType.nome_tarefa,
            description: taskType.descricao
          }))
        };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },
  
    insert: async (taskTypeData) => {
      try {
        const response = await fetch(BASE_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nome_tarefa: taskTypeData.taskName,
            descricao: taskTypeData.description
          })
        });
        const data = await response.json();
        return {
          success: response.ok,
          message: response.ok 
            ? InsertSuccessMsg(taskTypeData.taskName) 
            : ErrorInsertMsg(taskTypeData.taskName),
          taskType: data.taskType
        };
      } catch (error) {
        return {
          success: false,
          message: ErrorInsertMsg(taskTypeData.taskName)
        };
      }
    },
  
    update: async (id, taskTypeData) => {
      try {
        const response = await fetch(`${BASE_URL}/update/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nome_tarefa: taskTypeData.taskName,
            descricao: taskTypeData.description
          })
        });
        const data = await response.json();
        return {
          success: response.ok,
          message: response.ok 
            ? EditSuccessMsg(taskTypeData.taskName) 
            : ErrorEditMsg(taskTypeData.taskName),
          taskType: data.taskType
        };
      } catch (error) {
        return {
          success: false,
          message: ErrorEditMsg(taskTypeData.taskName)
        };
      }
    },
  
    delete: async (id, taskName) => {
      try {
        const response = await fetch(`${BASE_URL}/soft_delete/${id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        return {
          success: response.ok,
          message: response.ok 
            ? SoftDeleteSuccessMsg(taskName) 
            : ErrorDeleteMsg(taskName),
          taskType: data.taskType
        };
      } catch (error) {
        return { 
          success: false,
          message: ErrorDeleteMsg(taskName)
        };
      }
    },
  
    restore: async (id, taskName) => {
      try {
        const response = await fetch(`${BASE_URL}/restaurar/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        return {
          success: response.ok,
          message: response.ok 
            ? RestoreSuccessMsg(taskName) 
            : ErrorRestoreMsg(taskName),
          taskType: data.taskType
        };
      } catch (error) {
        return {
          success: false,
          message: ErrorRestoreMsg(taskName)
        };
      }
    },
  
    permanentDelete: async (id, taskName) => {
      try {
        const response = await fetch(`${BASE_URL}/delete/${id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        return {
          success: response.ok,
          message: response.ok 
            ? PermanentDeleteSuccessMsg(taskName) 
            : ErrorPermanentDeleteMsg(taskName),
          taskType: data.taskType
        };
      } catch (error) {
        return {
          success: false,
          message: ErrorPermanentDeleteMsg(taskName)
        };
      }
    }
  };