import { Edit, SimpleForm, TextInput, NumberInput, SelectInput, BooleanInput } from 'react-admin';

const VehicleEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="title" />
      <TextInput source="brand" />
      <TextInput source="model" />
      <NumberInput source="year" />
      <NumberInput source="price" />
      <SelectInput
        source="status"
        choices={[
          { id: 'Available', name: 'Available' },
          { id: 'Sold', name: 'Sold' },
          { id: 'Reserved', name: 'Reserved' },
          { id: 'Coming Soon', name: 'Coming Soon' },
        ]}
      />
      <BooleanInput source="featured" />
    </SimpleForm>
  </Edit>
);

export default VehicleEdit;
