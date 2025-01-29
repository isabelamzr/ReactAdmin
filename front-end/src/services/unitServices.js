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
  
  const BASE_URL = 'http://localhost:5000/unidades';
  
  export const unitServices = {
    getAll: async () => {
      try {
        const response = await fetch(`${BASE_URL}/read`);
        if (!response.ok) throw new Error('Failed to fetch units');
        const data = await response.json();
        return { 
          success: true,
          data: data.map(unit => ({
            id: unit.id,
            name: unit.nome,
            phone: unit.telefone,
            address: unit.endereco,
            neighborhood: unit.bairro,
            city: unit.cidade,
            state: unit.UF
          }))
        };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },
  
    insert: async (unitData) => {
      try {
        const response = await fetch(BASE_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nome: unitData.name,
            telefone: unitData.phone,
            endereco: unitData.address,
            bairro: unitData.neighborhood,
            cidade: unitData.city,
            UF: unitData.state
          })
        });
        const data = await response.json();
        return {
          success: response.ok,
          message: response.ok 
            ? InsertSuccessMsg(unitData.name) 
            : ErrorInsertMsg(unitData.name),
          unit: data.unit
        };
      } catch (error) {
        return {
          success: false,
          message: ErrorInsertMsg(unitData.name)
        };
      }
    },
  
    update: async (id, unitData) => {
      try {
        const response = await fetch(`${BASE_URL}/update/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nome: unitData.name,
            telefone: unitData.phone,
            endereco: unitData.address,
            bairro: unitData.neighborhood,
            cidade: unitData.city,
            UF: unitData.state
          })
        });
        const data = await response.json();
        return {
          success: response.ok,
          message: response.ok 
            ? EditSuccessMsg(unitData.name) 
            : ErrorEditMsg(unitData.name),
          unit: data.unit
        };
      } catch (error) {
        return {
          success: false,
          message: ErrorEditMsg(unitData.name)
        };
      }
    },
  
    delete: async (id, unitName) => {
      try {
        const response = await fetch(`${BASE_URL}/soft_delete/${id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        return {
          success: response.ok,
          message: response.ok 
            ? SoftDeleteSuccessMsg(unitName) 
            : ErrorDeleteMsg(unitName),
          unit: data.unit
        };
      } catch (error) {
        return { 
          success: false,
          message: ErrorDeleteMsg(unitName)
        };
      }
    },
  
    restore: async (id, unitName) => {
      try {
        const response = await fetch(`${BASE_URL}/restaurar/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        return {
          success: response.ok,
          message: response.ok 
            ? RestoreSuccessMsg(unitName) 
            : ErrorRestoreMsg(unitName),
          unit: data.unit 
        };
      } catch (error) {
        return {
          success: false,
          message: ErrorRestoreMsg(unitName)
        };
      }
    },
  
    permanentDelete: async (id, unitName) => {
      try {
        const response = await fetch(`${BASE_URL}/delete/${id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        return {
          success: response.ok,
          message: response.ok 
            ? PermanentDeleteSuccessMsg(unitName) 
            : ErrorPermanentDeleteMsg(unitName),
          unit: data.unit
        };
      } catch (error) {
        return {
          success: false,
          message: ErrorPermanentDeleteMsg(unitName)
        };
      }
    }
  };