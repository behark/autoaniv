import { Category, DirectionsCar } from '@mui/icons-material';
import jsonServerProvider from 'ra-data-json-server';
import React from 'react';
import { Admin, Resource, fetchUtils } from 'react-admin';
import ReactDOM from 'react-dom/client';

// Import components
import BrandList from './components/brands/BrandList';
import AdminDashboard from './components/Dashboard';
import VehicleCreate from './components/vehicles/VehicleCreate';
import VehicleEdit from './components/vehicles/VehicleEdit';
import VehicleList from './components/vehicles/VehicleList';

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
