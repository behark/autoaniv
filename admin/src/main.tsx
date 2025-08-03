import React from 'react';
import ReactDOM from 'react-dom/client';
import { Admin, Resource, fetchUtils } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import { DirectionsCar, Category, Dashboard, ContactMail } from '@mui/icons-material';

// Import components
import VehicleList from './components/vehicles/VehicleList';
import VehicleEdit from './components/vehicles/VehicleEdit';
import VehicleCreate from './components/vehicles/VehicleCreate';
import BrandList from './components/brands/BrandList';
import AdminDashboard from './components/Dashboard';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Configure HTTP client with authentication
const httpClient = (url: string, options: any = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }
  const token = localStorage.getItem('token');
  if (token) {
    options.headers.set('Authorization', `Bearer ${token}`);
  }
  return fetchUtils.fetchJson(url, options);
};

const dataProvider = jsonServerProvider(API_URL, httpClient);

const App = () => (
  <Admin 
    dataProvider={dataProvider}
    dashboard={AdminDashboard}
    title="AutoAni Admin"
  >
    <Resource
      name="vehicles"
      list={VehicleList}
      edit={VehicleEdit}
      create={VehicleCreate}
      icon={DirectionsCar}
    />
    <Resource
      name="brands"
      list={BrandList}
      icon={Category}
    />
  </Admin>
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
