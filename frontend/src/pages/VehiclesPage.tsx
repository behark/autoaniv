import { SlidersHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Pagination from '@/components/ui/Pagination';
import VehicleCard from '@/components/vehicles/VehicleCard';
import VehicleFilters from '@/components/vehicles/VehicleFilters';
import type { Vehicle, VehicleFilter } from '@/types';

export default function VehiclesPage() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current: 1,
    pages: 1,
    total: 0,
    limit: 12
  });
  const [showFilters, setShowFilters] = useState(false);

  const fetchVehicles = async (filters: VehicleFilter = {}, page = 1) => {
    setLoading(true);
    try {
      const response = await vehiclesApi.getAll({
        ...filters,
        page,
        limit: pagination.limit
      });
      setVehicles(response.data.data);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error('Failed to fetch vehicles:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const filters: VehicleFilter = {};
    const page = parseInt(searchParams.get('page') || '1');

    // Extract filters from URL params
    if (searchParams.get('brand')) filters.brand = searchParams.get('brand')!;
    if (searchParams.get('search')) filters.search = searchParams.get('search')!;
    if (searchParams.get('priceFrom')) filters.priceFrom = parseInt(searchParams.get('priceFrom')!);
    if (searchParams.get('priceTo')) filters.priceTo = parseInt(searchParams.get('priceTo')!);

    fetchVehicles(filters, page);
  }, [searchParams]);

  const handleFilterChange = (filters: VehicleFilter) => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        params.set(key, value.toString());
      }
    });

    params.set('page', '1');
    setSearchParams(params);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    setSearchParams(params);
  };

  return (
    <>
      <Helmet>
        <title>{t('nav.vehicles')} - AutoAni</title>
        <meta
          name="description"
          content="Browse our extensive collection of premium vehicles. Find your perfect car from top brands including Mercedes, BMW, Audi, and more."
        />
      </Helmet>

      <div className="bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="container-custom py-8">
            <h1 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-4">
              {t('nav.vehicles')}
            </h1>
            <p className="text-xl text-gray-600">
              Discover our collection of premium vehicles
            </p>
          </div>
        </div>

        <div className="container-custom py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-1/4">
              <div className="lg:hidden mb-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2 btn-outline w-full justify-center"
                >
                  <SlidersHorizontal className="h-5 w-5" />
                  <span>Filters</span>
                </button>
              </div>

              <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
                <VehicleFilters onFilterChange={handleFilterChange} />
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:w-3/4">
              {/* Results Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <div>
                  <p className="text-gray-600">
                    Showing {vehicles.length} of {pagination.total} vehicles
                  </p>
                </div>
              </div>

              {/* Loading State */}
              {loading ? (
                <div className="flex justify-center py-12">
                  <LoadingSpinner size="lg" />
                </div>
              ) : (
                <>
                  {/* Vehicles Grid */}
                  {vehicles.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                      {vehicles.map((vehicle) => (
                        <VehicleCard key={vehicle._id} vehicle={vehicle} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="text-6xl text-gray-300 mb-4">🚗</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        No vehicles found
                      </h3>
                      <p className="text-gray-600">
                        Try adjusting your filters or search criteria
                      </p>
                    </div>
                  )}

                  {/* Pagination */}
                  {pagination.pages > 1 && (
                    <Pagination
                      currentPage={pagination.current}
                      totalPages={pagination.pages}
                      onPageChange={handlePageChange}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
