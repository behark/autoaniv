import { List, Datagrid, TextField, BooleanField, NumberField } from 'react-admin';

const BrandList = () => (
  <List>
    <Datagrid>
      <TextField source="name" />
      <TextField source="description" />
      <BooleanField source="featured" />
      <NumberField source="vehicleCount" />
    </Datagrid>
  </List>
);

export default BrandList;
