import { GridProvider } from '../../context/GridContext';
import { unitColumns } from './columns';
import UnitsContent  from './UnitsContent';

const Units = () => {
  return (
    <GridProvider columns={unitColumns.columns} mainColumn={unitColumns.mainColumn}>
      <UnitsContent />
    </GridProvider>
  );
};

export default Units;