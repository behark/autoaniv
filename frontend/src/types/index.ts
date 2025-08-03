export interface Vehicle {
  _id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  currency: 'EUR' | 'USD';
  mileage: number;
  transmission: 'Manual' | 'Automatic' | 'CVT';
  fuelType: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
  bodyType: 'Sedan' | 'SUV' | 'Hatchback' | 'Coupe' | 'Convertible' | 'Wagon' | 'Pickup';
  color: string;
  engineSize: number;
  horsepower: number;
  description: string;
  features: string[];
  images: VehicleImage[];
  status: 'Available' | 'Sold' | 'Reserved' | 'Coming Soon';
  featured: boolean;
  createdAt: string;
  updatedAt: string;
  slug: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
}

export interface VehicleImage {
  _id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
  order: number;
}

export interface VehicleFilter {
  brand?: string;
  model?: string;
  yearFrom?: number;
  yearTo?: number;
  priceFrom?: number;
  priceTo?: number;
  mileageFrom?: number;
  mileageTo?: number;
  transmission?: string;
  fuelType?: string;
  bodyType?: string;
  search?: string;
  featured?: boolean;
  status?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    current: number;
    pages: number;
    total: number;
    limit: number;
  };
}

export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  vehicleId?: string;
  inquiryType: 'general' | 'vehicle' | 'financing' | 'trade-in';
}

export interface NewsletterSubscription {
  email: string;
  language: 'en' | 'sq';
}

export interface Brand {
  _id: string;
  name: string;
  logo: string;
  description: string;
  vehicleCount: number;
  featured: boolean;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface User {
  _id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor';
  avatar?: string;
  createdAt: string;
  lastLogin?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}
