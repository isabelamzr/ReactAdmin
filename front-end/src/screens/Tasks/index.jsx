import { GridProvider } from '../../context/GridContext';
import { taskColumns } from './columns';
import TasksContent from './TasksContent';

const Tasks = () => {
  return (
    <GridProvider columns={taskColumns.columns} mainColumn={taskColumns.mainColumn}>
      <TasksContent />
    </GridProvider>
  );
};

export default Tasks;