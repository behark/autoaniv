import axios from 'axios';
import type { 
  Vehicle, 
  VehicleFilter, 
  PaginatedResponse, 
  ContactForm, 
  NewsletterSubscription,
  Brand,
  ApiResponse 
} from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

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
