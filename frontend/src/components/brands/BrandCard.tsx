import { Link } from 'react-router-dom';
import type { Brand } from '@/types';

interface BrandCardProps {
  brand: Brand;
  className?: string;
}

export default function BrandCard({ brand, className = '' }: BrandCardProps) {
  return (
    <Link 
      to={`/brand/${brand.name.toLowerCase()}`}
      className={`block group ${className}`}
    >
      <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
        <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-gray-50 rounded-full group-hover:bg-primary-50 transition-colors duration-300">
          <img
            src={brand.logo}
            alt={`${brand.name} logo`}
            className="w-10 h-10 object-contain"
          />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-200">
          {brand.name}
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          {brand.vehicleCount} vehicles
        </p>
      </div>
    </Link>
  );
}
