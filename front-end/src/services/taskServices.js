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
import { transform } from '../utils/entityTypes'

const BASE_URL = 'http://localhost:5000/tarefas';

export const taskServices = {
  getAll: async () => {
    try {
      const response = await fetch(`${BASE_URL}/read`);
      if (!response.ok) throw new Error('Failed to fetch tasks');
      const data = await response.json();
      return { 
        success: true,
        data: transform(data, 'task', 'toFrontend')
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  insert: async (taskData) => {
    try {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData)
      });
      const data = await response.json();
      return {
        success: response.ok,
        message: response.ok 
          ? InsertSuccessMsg(taskData.taskType) 
          : ErrorInsertMsg(taskData.taskType),
        task: transform(data.task, 'task', 'toFrontend')
      };
    } catch (error) {
      return {
        success: false,
        message: ErrorInsertMsg(taskData.taskType)
      };
    }
  },

  update: async (id, taskData) => {
    try {
      const response = await fetch(`${BASE_URL}/update/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData)
      });
      const data = await response.json();
      return {
        success: response.ok,
        message: response.ok 
          ? EditSuccessMsg(taskData.taskType) 
          : ErrorEditMsg(taskData.taskType),
        task: transform(data.task, 'task', 'toFrontend')
      };
    } catch (error) {
      return {
        success: false,
        message: ErrorEditMsg(taskData.taskType)
      };
    }
  },

  delete: async (id, taskName) => {
    try {
      const response = await fetch(`${BASE_URL}/soft_delete/${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      return {
        success: response.ok,
        message: response.ok 
          ? SoftDeleteSuccessMsg(taskName) 
          : ErrorDeleteMsg(taskName),
        task: transform(data.task, 'task', 'toFrontend')
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
        method: 'PUT'
      });
      const data = await response.json();
      return {
        success: response.ok,
        message: response.ok 
          ? RestoreSuccessMsg(taskName) 
          : ErrorRestoreMsg(taskName),
        task: transform(data.task, 'task', 'toFrontend')
      };
    } catch (error) {
      return {
        success: false,
        message: ErrorRestoreMsg(taskName)
      };
    }
  },

  getDeletedRecords: async () => {
    try {
      const response = await fetch(`${BASE_URL}/inativos`);
      if (!response.ok) throw new Error('Failed to fetch inactive records');
      const data = await response.json();
      return { 
        success: true,
        data: transform(data, 'task', 'toFrontend')
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  permanentDelete: async (id, taskName) => {
    try {
      const response = await fetch(`${BASE_URL}/delete/${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      return {
        success: response.ok,
        message: response.ok 
          ? PermanentDeleteSuccessMsg(taskName) 
          : ErrorPermanentDeleteMsg(taskName),
        task: transform(data.task, 'task', 'toFrontend')
      };
    } catch (error) {
      return {
        success: false,
        message: ErrorPermanentDeleteMsg(taskName)
      };
    }
  }
};