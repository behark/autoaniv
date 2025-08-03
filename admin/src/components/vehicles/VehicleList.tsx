import { List, Datagrid, TextField, NumberField, DateField, BooleanField } from 'react-admin';

const VehicleList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="title" />
      <TextField source="brand" />
      <TextField source="model" />
      <NumberField source="year" />
      <NumberField source="price" />
      <TextField source="status" />
      <BooleanField source="featured" />
      <DateField source="createdAt" />
    </Datagrid>
  </List>
);

export default VehicleList;
