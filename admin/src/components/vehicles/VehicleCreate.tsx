import { Create, SimpleForm, TextInput, NumberInput, SelectInput, BooleanInput } from 'react-admin';

const VehicleCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="title" required />
      <TextInput source="brand" required />
      <TextInput source="model" required />
      <NumberInput source="year" required />
      <NumberInput source="price" required />
      <SelectInput
        source="status"
        choices={[
          { id: 'Available', name: 'Available' },
          { id: 'Sold', name: 'Sold' },
          { id: 'Reserved', name: 'Reserved' },
          { id: 'Coming Soon', name: 'Coming Soon' },
        ]}
        defaultValue="Available"
      />
      <BooleanInput source="featured" />
    </SimpleForm>
  </Create>
);

export default VehicleCreate;
