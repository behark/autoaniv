import { Card, CardHeader, CardContent } from '@mui/material';

const AdminDashboard = () => {
  return (
    <div style={{ padding: 24 }}>
      <Card>
        <CardHeader title="Welcome to AutoAni Admin Dashboard" />
        <CardContent>
          <p>Manage your vehicle inventory, brands, and website content from here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
