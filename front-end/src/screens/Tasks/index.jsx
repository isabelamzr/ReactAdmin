import { GridProvider } from '../../context/GridContext';
import TasksContent from './TasksContent';
import { TaskColumns, getVisibleColumns } from './columns';
import { useTaskOptions } from '../../hooks/useOptions/useTaskOptions';
import { useMemo, memo } from 'react';
import { useRenderLogger } from '../../hooks/useRenderLogger';

const Tasks = () => {
  useRenderLogger('Tasks');

  const { taskOptions, coordinatorOptions, unitOptions, volunteerOptions } = useTaskOptions();

  const { columns, mainColumn } = useMemo(() => {
    const result = TaskColumns({ taskOptions, coordinatorOptions, unitOptions, volunteerOptions });
    return result && result.columns?.length ? result : { mainColumn: 'taskID', columns: [] }; 
  }, [taskOptions, coordinatorOptions, unitOptions, volunteerOptions]);

  const visibleColumns = useMemo(() => {
    return columns.length ? getVisibleColumns("task", columns) : [];
  }, [columns]);

  const gridProps = useMemo(() => ({
    mainColumn,
    columns: visibleColumns
  }), [mainColumn, visibleColumns]);

  return (
    <GridProvider {...gridProps}>
      <TasksContent />
    </GridProvider>
  );
};

export default memo(Tasks);
