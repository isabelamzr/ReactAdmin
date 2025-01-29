import { GridProvider } from '../../context/GridContext';
import { taskTypeColumns } from './columns';
import TasksTypesContent from './TasksTypesContent';

const TasksTypes = () => {
  return (
    <GridProvider columns={taskTypeColumns.columns} mainColumn={taskTypeColumns.mainColumn}>
      <TasksTypesContent />
    </GridProvider>
  );
};

export default TasksTypes;