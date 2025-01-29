import { GridProvider } from '../../context/GridContext';
import { coordinatorColumns } from './columns';
import CoordinatorsContent from './CoordinatorsContent';

const Coordinators = () => {
  return (
    <GridProvider columns={coordinatorColumns.columns} mainColumn={coordinatorColumns.mainColumn}>
      <CoordinatorsContent />
    </GridProvider>
  );
};

export default Coordinators;