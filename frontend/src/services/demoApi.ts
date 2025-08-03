// Demo data service for immediate deployment
import type { Brand, Vehicle } from '@/types';

export const demoVehicles: Vehicle[] = [
  {
    _id: "1",
    title: "Mercedes-Benz S-Class S63 AMG",
    brand: "Mercedes-Benz",
    model: "S-Class",
    year: 2024,
    price: 120000,
    currency: "EUR" as const,
    mileage: 5000,
    transmission: "Automatic" as const,
    fuelType: "Petrol" as const,
    bodyType: "Sedan" as const,
    color: "Black",
    engineSize: 4.0,
    horsepower: 630,
    description: "Luxury sedan with exceptional performance and comfort. This pristine S63 AMG combines elegant design with powerful performance.",
    features: ["Leather Seats", "Navigation System", "Sunroof", "Bluetooth", "Premium Sound", "Heated Seats"],
    images: [
      {
        _id: "img1",
        url: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800",
        alt: "Mercedes S63 AMG Front View",
        isPrimary: true,
        order: 1
      }
    ],
    status: "Available" as const,
    featured: true,
    slug: "mercedes-benz-s-class-s63-amg",
    seoTitle: "Mercedes-Benz S63 AMG - Luxury Sedan for Sale",
    seoDescription: "Premium Mercedes-Benz S63 AMG with 630hp. Luxury sedan with exceptional performance.",
    seoKeywords: ["Mercedes", "S63", "AMG", "luxury", "sedan"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: "2",
    title: "BMW X5 M50i xDrive",
    brand: "BMW",
    model: "X5",
    year: 2023,
    price: 85000,
    currency: "EUR" as const,
    mileage: 12000,
    transmission: "Automatic" as const,
    fuelType: "Petrol" as const,
    bodyType: "SUV" as const,
    color: "Alpine White",
    engineSize: 4.4,
    horsepower: 523,
    description: "Dynamic and luxurious SUV perfect for both city driving and adventure. Features BMW's latest technology and premium comfort.",
    features: ["All-Wheel Drive", "Panoramic Roof", "Premium Audio", "Navigation", "Heated Seats", "Wireless Charging"],
    images: [
      {
        _id: "img2",
        url: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800",
        alt: "BMW X5 Front View",
        isPrimary: true,
        order: 1
      }
    ],
    status: "Available" as const,
    featured: true,
    slug: "bmw-x5-m50i-xdrive",
    seoTitle: "BMW X5 M50i xDrive - Premium SUV for Sale",
    seoDescription: "Powerful BMW X5 M50i with xDrive all-wheel drive system. Perfect luxury SUV.",
    seoKeywords: ["BMW", "X5", "M50i", "SUV", "xDrive"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: "3",
    title: "Audi A8 60 TFSI quattro",
    brand: "Audi",
    model: "A8",
    year: 2024,
    price: 95000,
    currency: "EUR" as const,
    mileage: 8000,
    transmission: "Automatic" as const,
    fuelType: "Petrol" as const,
    bodyType: "Sedan" as const,
    color: "Phantom Black",
    engineSize: 4.0,
    horsepower: 460,
    description: "Executive luxury sedan with cutting-edge technology and supreme comfort. The flagship of Audi's luxury lineup.",
    features: ["quattro AWD", "Virtual Cockpit", "Matrix LED", "Massage Seats", "Bang & Olufsen", "Adaptive Suspension"],
    images: [
      {
        _id: "img3",
        url: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800",
        alt: "Audi A8 Front View",
        isPrimary: true,
        order: 1
      }
    ],
    status: "Available" as const,
    featured: false,
    slug: "audi-a8-60-tfsi-quattro",
    seoTitle: "Audi A8 60 TFSI quattro - Executive Luxury Sedan",
    seoDescription: "Premium Audi A8 with TFSI engine and quattro all-wheel drive. Executive luxury redefined.",
    seoKeywords: ["Audi", "A8", "TFSI", "quattro", "luxury"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const demoBrands: Brand[] = [
  {
    _id: "1",
    name: "Mercedes-Benz",
    logo: "https://logos-world.net/wp-content/uploads/2020/05/Mercedes-Benz-Logo.png",
    description: "Luxury German automotive manufacturer known for innovation and quality",
    featured: true,
    vehicleCount: 8
  },
  {
    _id: "2",
    name: "BMW",
    logo: "https://logos-world.net/wp-content/uploads/2020/03/BMW-Logo.png",
    description: "Premium German luxury vehicles with ultimate driving pleasure",
    featured: true,
    vehicleCount: 6
  },
  {
    _id: "3",
    name: "Audi",
    logo: "https://logos-world.net/wp-content/uploads/2021/03/Audi-Logo.png",
    description: "German luxury automobile manufacturer with Vorsprung durch Technik",
    featured: true,
    vehicleCount: 5
  }
];

// Demo API service that works without backend
export const demoApi = {
  getVehicles: () => Promise.resolve({ data: demoVehicles }),
  getVehicle: (id: string) => Promise.resolve({ data: demoVehicles.find(v => v._id === id) }),
  getBrands: () => Promise.resolve({ data: demoBrands }),
  getBrand: (slug: string) => Promise.resolve({ data: demoBrands.find(b => b.name.toLowerCase().replace(/[^a-z0-9]/g, '-') === slug) }),
  getVehiclesByBrand: (brandSlug: string) => {
    const brand = demoBrands.find(b => b.name.toLowerCase().replace(/[^a-z0-9]/g, '-') === brandSlug);
    const vehicles = demoVehicles.filter(v => v.brand === brand?.name);
    return Promise.resolve({ data: vehicles });
  },
  searchVehicles: (query: any) => {
    let results = [...demoVehicles];
    if (query.brand) {
      results = results.filter(v => v.brand.toLowerCase().includes(query.brand.toLowerCase()));
    }
    if (query.minPrice) {
      results = results.filter(v => v.price >= query.minPrice);
    }
    if (query.maxPrice) {
      results = results.filter(v => v.price <= query.maxPrice);
    }
    return Promise.resolve({ data: results });
  },
  contactForm: (_data: any) => Promise.resolve({ success: true, message: "Message sent successfully!" })
};
