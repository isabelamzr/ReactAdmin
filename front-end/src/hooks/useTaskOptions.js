import { useState, useEffect } from 'react';
import { taskServices } from '../services/taskServices';
import { coordinatorServices } from '../services/coordinatorServices';
import { unitServices } from '../services/unitServices';
import { volunteerServices } from '../services/volunteerServices';

export const useTaskOptions = () => {
  const [taskOptions, setTaskOptions] = useState([]);
  const [coordinatorOptions, setCoordinatorOptions] = useState([]);
  const [unitOptions, setUnitOptions] = useState([]);
  const [volunteerOptions, setVolunteerOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const taskResult = await taskServices.getAll();
        setTaskOptions(taskResult?.data?.map(task => ({
          value: task.id,
          label: task.taskName
        })) || []);

        const coordinatorResult = await coordinatorServices.getAll();
        setCoordinatorOptions(coordinatorResult?.data?.map(coord => ({
          value: coord.id,
          label: coord.name
        })) || []);

        const unitResult = await unitServices.getAll();
        setUnitOptions(unitResult?.data?.map(unit =>({
          value: unit.id,
          label: unit.name
        })) || []);

        const volunteerResult = await volunteerServices.getAll();
        setVolunteerOptions(volunteerResult?.data?.map(vol => ({
          value: vol.id,
          label: vol.name
        })) || []);
      } catch (error) {
        console.error('Erro ao buscar opções:', error);
      }
    };

    fetchData();
  }, []);

  return { taskOptions, coordinatorOptions, unitOptions, volunteerOptions };
};