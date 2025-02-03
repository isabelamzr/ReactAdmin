import { useState, useEffect, useMemo } from 'react';
import { taskServices } from '../../services/taskServices';
import { coordinatorServices } from '../../services/coordinatorServices';
import { unitServices } from '../../services/unitServices';
import { volunteerServices } from '../../services/volunteerServices';
import { arrayCompare, useDeepCompare } from '../useDeepCompare';

const transformToOptions = (data) => 
  data?.map(item => ({
    value: item.id,
    label: item.name || item.taskName
  })) || [];

export const useTaskOptions = () => {
  const [rawTaskOptions, setRawTaskOptions] = useState([]);
  const [rawCoordinatorOptions, setRawCoordinatorOptions] = useState([]);
  const [rawUnitOptions, setRawUnitOptions] = useState([]);
  const [rawVolunteerOptions, setRawVolunteerOptions] = useState([]);

 const taskOptions = useDeepCompare(transformToOptions(rawTaskOptions));
 const coordinatorOptions = useDeepCompare(transformToOptions(rawCoordinatorOptions));
 const unitOptions = useDeepCompare(transformToOptions(rawUnitOptions));
 const volunteerOptions = useDeepCompare(transformToOptions(rawVolunteerOptions));

  useEffect(() => {    
    const fetchData = async () => {
      try {
        const [taskResult, coordinatorResult, unitResult, volunteerResult] = await Promise.all([
          taskServices.getAll(),
          coordinatorServices.getAll(),
          unitServices.getAll(),
          volunteerServices.getAll()
        ]);

         setRawTaskOptions(prev => arrayCompare(prev, taskResult?.data) ? prev : taskResult?.data || []);
         setRawCoordinatorOptions(prev => arrayCompare(prev, coordinatorResult?.data) ? prev : coordinatorResult?.data || []);
         setRawUnitOptions(prev => arrayCompare(prev, unitResult?.data) ? prev : unitResult?.data || []);
         setRawVolunteerOptions(prev => arrayCompare(prev, volunteerResult?.data) ? prev : volunteerResult?.data || []);       
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };

    fetchData();
  }, []);

  return useMemo(() => ({
    taskOptions,
    coordinatorOptions,
    unitOptions,
    volunteerOptions,
    rawTaskData: rawTaskOptions,
    rawCoordinatorData: rawCoordinatorOptions,
    rawUnitData: rawUnitOptions,
    rawVolunteerData: rawVolunteerOptions
  }), [taskOptions, coordinatorOptions, unitOptions, volunteerOptions, 
rawTaskOptions, rawCoordinatorOptions, rawUnitOptions, rawVolunteerOptions]);
};