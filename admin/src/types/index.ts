export interface MediaFile {
  id: string;
  filename: string;
  originalName: string;
  mimetype: string;
  type: string;
  size: number;
  url: string;
  thumbnailUrl?: string;
  alt?: string;
  title?: string;
  description?: string;
  tags: string[];
  folder?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Vehicle {
  id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  currency: string;
  mileage: number;
  fuelType: string;
  transmission: string;
  condition: string;
  location: string;
  images: string[];
  thumbnail: string;
  description: string;
  features: string[];
  isFeatured: boolean;
  isActive: boolean;
  views: number;
  favorites: number;
  exteriorColor: string;
  interiorColor: string;
  bodyType: string;
  engineSize: string;
  doors: number;
  seats: number;
  warranty: string;
  vin: string;
  licensePlate: string;
  createdAt: string;
  updatedAt: string;
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
  description: string;
  website: string;
  country: string;
  founded: number;
  isActive: boolean;
  vehicleCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor' | 'viewer';
  avatar?: string;
  isActive: boolean;
  lastLogin: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  totalVehicles: number;
  activeVehicles: number;
  featuredVehicles: number;
  totalViews: number;
  totalFavorites: number;
  totalBrands: number;
  totalUsers: number;
  recentActivity: Activity[];
}

export interface Activity {
  id: string;
  type: 'vehicle_added' | 'vehicle_updated' | 'vehicle_deleted' | 'user_login' | 'media_uploaded';
  description: string;
  userId: string;
  userName: string;
  timestamp: string;
  metadata?: Record<string, any>;
}
