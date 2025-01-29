import { volunteerColumns } from './columns';
import { GridProvider } from '../../context/GridContext';
import VolunteersContent from './VolunteersContent';

const Volunteers = () => {
  return (
    <GridProvider columns={volunteerColumns.columns} mainColumn={volunteerColumns.mainColumn}>
      <VolunteersContent />
    </GridProvider>
  );
};

export default Volunteers;