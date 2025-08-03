// Demo API for AutoAni deployment
import { demoApi } from './demoApi';

// Always use demo mode for this deployment
console.log('🎭 Running AutoAni in DEMO mode - using sample luxury vehicles');

// Vehicles API - using demo data
export const vehiclesApi = {
  getAll: () => demoApi.getVehicles(),
  getById: (id: string) => demoApi.getVehicle(id),
  getBySlug: (slug: string) => demoApi.getVehicle(slug),
  getFeatured: (limit = 6) => {
    return demoApi.getVehicles().then(response => ({
      data: response.data.filter(v => v.featured).slice(0, limit)
    }));
  },
  getRelated: (_vehicleId: string, limit = 4) => {
    return demoApi.getVehicles().then(response => ({
      data: response.data.slice(0, limit)
    }));
  },
  search: (params: any) => demoApi.searchVehicles(params)
};

// Brands API - using demo data
export const brandsApi = {
  getAll: () => demoApi.getBrands(),
  getFeatured: () => demoApi.getBrands(),
  getById: (id: string) => demoApi.getBrand(id),
  getBySlug: (slug: string) => demoApi.getBrand(slug),
  getVehicles: (brandSlug: string) => demoApi.getVehiclesByBrand(brandSlug)
};

// Contact API - using demo data
export const contactApi = {
  submit: (data: any) => demoApi.contactForm(data),
  subscribe: (_data: any) => Promise.resolve({ success: true, message: 'Subscribed successfully!' })
};

// Stats API - using demo data
export const statsApi = {
  getHomepage: () => Promise.resolve({
    data: {
      totalVehicles: 3,
      featuredVehicles: 2,
      brandsCount: 3,
      happyCustomers: 5000
    }
  }),
  getDashboard: () => Promise.resolve({
    data: {
      totalVehicles: 3,
      totalBrands: 3,
      featuredVehicles: 2,
      recentViews: 156
    }
  })
};

// Upload API - demo implementation
export const uploadApi = {
  uploadImages: (files: File[]) => Promise.resolve({
    data: {
      success: true,
      files: files.map((file, index) => ({
        url: `https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop&crop=center&auto=format&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FyfGVufDB8fDB8fHww&${index}`,
        alt: file.name,
        order: index + 1
      }))
    }
  })
};

// SEO API - demo implementation
export const seoApi = {
  getPageMeta: (page: string) => Promise.resolve({
    data: {
      title: `AutoAni - ${page}`,
      description: 'Premium automotive dealership in Kosovo',
      keywords: ['AutoAni', 'cars', 'luxury', 'Kosovo'],
      image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800'
    }
  })
};

// Export default for compatibility
export default {
  vehiclesApi,
  brandsApi,
  contactApi,
  statsApi,
  uploadApi,
  seoApi
};