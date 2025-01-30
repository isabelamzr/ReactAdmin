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

const BASE_URL = 'http://localhost:5000/coordenadores';

export const coordinatorServices = {
  getAll: async () => {
    try {
      const response = await fetch(`${BASE_URL}/read`);
      if (!response.ok) throw new Error('Failed to fetch coordinators');
      const data = await response.json();
      return { 
        success: true,
        data: transform(data, 'coordinator', 'toFrontend')
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  insert: async (coordinatorData) => {
    try {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transform(coordinatorData, 'coordinator', 'toBackend'))
      });
      const data = await response.json();
      return {
        success: response.ok,
        message: response.ok 
          ? InsertSuccessMsg(coordinatorData.name) 
          : ErrorInsertMsg(coordinatorData.name),
        coordinator: transform(data.coordinator, 'coordinator', 'toFrontend')
      };
    } catch (error) {
      return {
        success: false,
        message: ErrorInsertMsg(coordinatorData.name)
      };
    }
  },

  update: async (id, coordinatorData) => {
    try {
      const response = await fetch(`${BASE_URL}/update/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transform(coordinatorData, 'coordinator', 'toBackend'))
      });
      const data = await response.json();
      return {
        success: response.ok,
        message: response.ok 
          ? EditSuccessMsg(coordinatorData.name) 
          : ErrorEditMsg(coordinatorData.name),
        coordinator: transform(data.coordinator, 'coordinator', 'toFrontend')
      };
    } catch (error) {
      return {
        success: false,
        message: ErrorEditMsg(coordinatorData.name)
      };
    }
  },

  delete: async (id, coordinatorName) => {
    try {
      const response = await fetch(`${BASE_URL}/soft_delete/${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      return {
        success: response.ok,
        message: response.ok 
          ? SoftDeleteSuccessMsg(coordinatorName) 
          : ErrorDeleteMsg(coordinatorName),
        coordinator: transform(data.coordinator, 'coordinator', 'toFrontend')
      };
    } catch (error) {
      return {
        success: false,
        message: ErrorDeleteMsg(coordinatorName)
      };
    }
  },

  restore: async (id, coordinatorName) => {
    try {
      const response = await fetch(`${BASE_URL}/restaurar/${id}`, {
        method: 'PUT'
      });
      const data = await response.json();
      return {
        success: response.ok,
        message: response.ok 
          ? RestoreSuccessMsg(coordinatorName) 
          : ErrorRestoreMsg(coordinatorName),
        coordinator: transform(data.coordinator, 'coordinator', 'toFrontend')
      };
    } catch (error) {
      return {
        success: false,
        message: ErrorRestoreMsg(coordinatorName)
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
        data: transform(data, 'coordinator', 'toFrontend')
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  permanentDelete: async (id, coordinatorName) => {
    try {
      const response = await fetch(`${BASE_URL}/delete/${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      return {
        success: response.ok,
        message: response.ok 
          ? PermanentDeleteSuccessMsg(coordinatorName) 
          : ErrorPermanentDeleteMsg(coordinatorName),
        coordinator: transform(data.coordinator, 'coordinator', 'toFrontend')
      };
    } catch (error) {
      return {
        success: false,
        message: ErrorPermanentDeleteMsg(coordinatorName)
      };
    }
  }
};