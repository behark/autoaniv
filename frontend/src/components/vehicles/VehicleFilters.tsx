import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { VehicleFilter } from '@/types';

interface VehicleFiltersProps {
  onFilterChange: (filters: VehicleFilter) => void;
}

export default function VehicleFilters({ onFilterChange }: VehicleFiltersProps) {
  const { t } = useTranslation();
  const [filters, setFilters] = useState<VehicleFilter>({});

  const handleFilterChange = (key: keyof VehicleFilter, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4">{t('filters.apply')}</h3>
      
      {/* Search */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('filters.search')}
        </label>
        <input
          type="text"
          placeholder={t('filters.search')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          onChange={(e) => handleFilterChange('search', e.target.value)}
        />
      </div>

      {/* Brand */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('filters.brand')}
        </label>
        <select
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          onChange={(e) => handleFilterChange('brand', e.target.value)}
        >
          <option value="">All Brands</option>
          <option value="Mercedes">Mercedes</option>
          <option value="BMW">BMW</option>
          <option value="Audi">Audi</option>
          <option value="Porsche">Porsche</option>
        </select>
      </div>

      {/* Price Range */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('filters.price')}
        </label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Min"
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            onChange={(e) => handleFilterChange('priceFrom', parseInt(e.target.value))}
          />
          <input
            type="number"
            placeholder="Max"
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            onChange={(e) => handleFilterChange('priceTo', parseInt(e.target.value))}
          />
        </div>
      </div>

      {/* Year Range */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('filters.year')}
        </label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="From"
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            onChange={(e) => handleFilterChange('yearFrom', parseInt(e.target.value))}
          />
          <input
            type="number"
            placeholder="To"
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            onChange={(e) => handleFilterChange('yearTo', parseInt(e.target.value))}
          />
        </div>
      </div>

      <button
        onClick={() => {
          setFilters({});
          onFilterChange({});
        }}
        className="w-full btn-outline"
      >
        {t('filters.reset')}
      </button>
    </div>
  );
}
