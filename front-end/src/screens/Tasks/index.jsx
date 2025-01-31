import { GridProvider } from '../../context/GridContext';
import TasksContent from './TasksContent';
import { TaskColumns, getVisibleColumns } from './columns';
import { useTaskOptions } from '../../hooks/useTaskOptions';
import { useMemo } from 'react';

const Tasks = () => {
  const { taskOptions, coordinatorOptions, unitOptions, volunteerOptions } = useTaskOptions();

  const allColumns = useMemo(() => 
    TaskColumns({ taskOptions, coordinatorOptions, unitOptions, volunteerOptions }), 
  [taskOptions, coordinatorOptions, unitOptions, volunteerOptions]); 

  const { columns, mainColumn } = useMemo(() => ({
    mainColumn: allColumns.mainColumn,
    columns: getVisibleColumns("task", allColumns.columns),
  }), [allColumns]);

  return (
    <GridProvider columns={columns} mainColumn={mainColumn}>
      <TasksContent />
    </GridProvider>
  );
};

export default Tasks;
