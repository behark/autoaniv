import type {
  ApiResponse,
  Brand,
  ContactForm,
  NewsletterSubscription,
  PaginatedResponse,
  Vehicle,
  VehicleFilter
} from '@/types';
import axios from 'axios';

import { demoApi } from './demoApi';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://autoani-api-demo.railway.app/api';
const DEMO_MODE = import.meta.env.VITE_DEMO_MODE === 'true';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// If in demo mode, use demo API instead of real API
if (DEMO_MODE) {
  console.log('🎭 Running in DEMO mode - using sample data');
}

// Vehicle API
export const vehicleApi = {
  getAll: () => DEMO_MODE ? demoApi.getVehicles() : api.get('/vehicles'),
  getById: (id: string) => DEMO_MODE ? demoApi.getVehicle(id) : api.get(`/vehicles/${id}`),
  getBySlug: (slug: string) => DEMO_MODE ? demoApi.getVehicle(slug) : api.get(`/vehicles/slug/${slug}`),
  search: (params: any) => DEMO_MODE ? demoApi.searchVehicles(params) : api.get('/vehicles/search', { params }),
  create: (data: any) => DEMO_MODE ? Promise.resolve({ data: { success: true } }) : api.post('/vehicles', data),
  update: (id: string, data: any) => DEMO_MODE ? Promise.resolve({ data: { success: true } }) : api.put(`/vehicles/${id}`, data),
  delete: (id: string) => DEMO_MODE ? Promise.resolve({ data: { success: true } }) : api.delete(`/vehicles/${id}`),
};

// Brand API
export const brandApi = {
  getAll: () => DEMO_MODE ? demoApi.getBrands() : api.get('/brands'),
  getBySlug: (slug: string) => DEMO_MODE ? demoApi.getBrand(slug) : api.get(`/brands/slug/${slug}`),
  getVehicles: (brandSlug: string) => DEMO_MODE ? demoApi.getVehiclesByBrand(brandSlug) : api.get(`/brands/${brandSlug}/vehicles`),
  create: (data: any) => DEMO_MODE ? Promise.resolve({ data: { success: true } }) : api.post('/brands', data),
  update: (id: string, data: any) => DEMO_MODE ? Promise.resolve({ data: { success: true } }) : api.put(`/brands/${id}`, data),
  delete: (id: string) => DEMO_MODE ? Promise.resolve({ data: { success: true } }) : api.delete(`/brands/${id}`),
};

// Contact API
export const contactApi = {
  submit: (data: any) => DEMO_MODE ? demoApi.contactForm(data) : api.post('/contact', data),
};

// Upload API
export const uploadApi = {
  uploadImages: (files: File[]) => {
    if (DEMO_MODE) {
      return Promise.resolve({
        data: {
          success: true,
          files: files.map((file, index) => ({
            url: `https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop&crop=center&auto=format&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FyfGVufDB8fDB8fHww&${index}`,
            alt: file.name,
            order: index + 1
          }))
        }
      });
    }

    const formData = new FormData();
    files.forEach(file => formData.append('images', file));
    return api.post('/upload/images', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  }
};

// Stats API
export const statsApi = {
  getDashboard: () => {
    if (DEMO_MODE) {
      return Promise.resolve({
        data: {
          totalVehicles: 3,
          totalBrands: 3,
          featuredVehicles: 2,
          recentViews: 156
        }
      });
    }
    return api.get('/stats/dashboard');
  }
};

export default api;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Vehicles API
export const vehiclesApi = {
  getAll: (params?: VehicleFilter & { page?: number; limit?: number }) =>
    api.get<PaginatedResponse<Vehicle>>('/vehicles', { params }),

  getById: (id: string) =>
    api.get<Vehicle>(`/vehicles/${id}`),

  getBySlug: (slug: string) =>
    api.get<Vehicle>(`/vehicles/slug/${slug}`),

  getFeatured: (limit = 6) =>
    api.get<Vehicle[]>(`/vehicles/featured?limit=${limit}`),

  getRelated: (vehicleId: string, limit = 4) =>
    api.get<Vehicle[]>(`/vehicles/${vehicleId}/related?limit=${limit}`),

  search: (query: string, filters?: VehicleFilter) =>
    api.get<PaginatedResponse<Vehicle>>('/vehicles/search', {
      params: { q: query, ...filters }
    }),
};

// Brands API
export const brandsApi = {
  getAll: () =>
    api.get<Brand[]>('/brands'),

  getFeatured: () =>
    api.get<Brand[]>('/brands/featured'),

  getById: (id: string) =>
    api.get<Brand>(`/brands/${id}`),

  getVehicles: (brandId: string, params?: VehicleFilter) =>
    api.get<PaginatedResponse<Vehicle>>(`/brands/${brandId}/vehicles`, { params }),
};

// Contact API
export const contactApi = {
  submit: (data: ContactForm) =>
    api.post<ApiResponse>('/contact', data),

  subscribe: (data: NewsletterSubscription) =>
    api.post<ApiResponse>('/newsletter/subscribe', data),
};

// Stats API for homepage
export const statsApi = {
  getHomepage: () =>
    api.get<{
      totalVehicles: number;
      featuredVehicles: number;
      brandsCount: number;
      happyCustomers: number;
    }>('/stats/homepage'),
};

// SEO API
export const seoApi = {
  getPageMeta: (page: string) =>
    api.get<{
      title: string;
      description: string;
      keywords: string[];
      image?: string;
    }>(`/seo/${page}`),
};

export default api;
