import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Calendar, Gauge, Car, Euro } from 'lucide-react';
import type { Vehicle } from '@/types';

interface VehicleCardProps {
  vehicle: Vehicle;
  className?: string;
}

export default function VehicleCard({ vehicle, className = '' }: VehicleCardProps) {
  const { t } = useTranslation();

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat('en-US').format(mileage);
  };

  const primaryImage = vehicle.images.find(img => img.isPrimary) || vehicle.images[0];

  return (
    <div className={`card hover:shadow-xl transition-all duration-300 group ${className}`}>
      <Link to={`/vehicle/${vehicle.slug}`}>
        <div className="relative overflow-hidden">
          <img
            src={primaryImage?.url || '/placeholder-car.jpg'}
            alt={primaryImage?.alt || vehicle.title}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Status Badge */}
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              vehicle.status === 'Available' 
                ? 'bg-green-100 text-green-800' 
                : vehicle.status === 'Sold'
                ? 'bg-red-100 text-red-800'
                : vehicle.status === 'Reserved'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-blue-100 text-blue-800'
            }`}>
              {t(`vehicle.${vehicle.status.toLowerCase().replace(' ', '')}`)}
            </span>
          </div>

          {/* Featured Badge */}
          {vehicle.featured && (
            <div className="absolute top-4 right-4">
              <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                Featured
              </span>
            </div>
          )}

          {/* Price Overlay */}
          <div className="absolute bottom-4 left-4">
            <div className="bg-black/70 text-white px-3 py-2 rounded-lg backdrop-blur-sm">
              <div className="flex items-center space-x-1">
                <Euro className="h-4 w-4" />
                <span className="text-lg font-bold">
                  {formatPrice(vehicle.price, vehicle.currency)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">
            {vehicle.title}
          </h3>
          
          <p className="text-gray-600 mb-4 line-clamp-2">
            {vehicle.description}
          </p>

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>{vehicle.year}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Gauge className="h-4 w-4" />
              <span>{formatMileage(vehicle.mileage)} km</span>
            </div>
            <div className="flex items-center space-x-2">
              <Car className="h-4 w-4" />
              <span>{vehicle.transmission}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-4 h-4 rounded-full border-2" style={{ backgroundColor: vehicle.color.toLowerCase() }} />
              <span>{vehicle.color}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
