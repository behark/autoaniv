import { motion } from 'framer-motion';
import { Car, Filter, Search, SlidersHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Pagination from '@/components/ui/Pagination';
import VehicleCard from '@/components/vehicles/VehicleCard';
import VehicleFilters from '@/components/vehicles/VehicleFilters';
import { vehiclesApi } from '@/services/api';
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

  const fetchVehicles = async (_filters: VehicleFilter = {}, _page = 1) => {
    setLoading(true);
    try {
      const response = await vehiclesApi.getAll();
      setVehicles(response.data);
      setPagination({
        current: 1,
        pages: 1,
        total: response.data.length,
        limit: 12
      });
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

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 to-gray-700 text-white py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <Car className="text-blue-400" size={32} />
              <h1 className="text-5xl font-bold">Our Vehicle Collection</h1>
            </div>
            <p className="text-xl text-gray-300 mb-8">
              Discover premium vehicles from trusted manufacturers. Every car in our inventory 
              is carefully inspected and comes with our quality guarantee.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold"
              >
                <Search size={20} />
                <span>{pagination.total} Vehicles Available</span>
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors"
              >
                <Filter size={20} />
                Filter Results
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="bg-gray-50 min-h-screen py-8">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}
            >
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
                  <SlidersHorizontal className="text-blue-600" size={24} />
                  <h2 className="text-xl font-bold text-gray-900">Filter Vehicles</h2>
                </div>
                <VehicleFilters onFilterChange={handleFilterChange} />
              </div>
            </motion.div>

            {/* Main Content */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-3"
            >
              {/* Mobile Filter Toggle */}
              <div className="lg:hidden mb-6">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 flex items-center justify-center gap-2 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <SlidersHorizontal size={20} />
                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                </button>
              </div>

              {/* Results Header */}
              <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {loading ? 'Loading vehicles...' : `${pagination.total} vehicles found`}
                    </h3>
                    <p className="text-gray-600">Showing page {pagination.current} of {pagination.pages}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Sort by:</span>
                    <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="newest">Newest First</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="year">Year</option>
                      <option value="mileage">Mileage</option>
                    </select>
                  </div>
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
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8"
                    >
                      {vehicles.map((vehicle, index) => (
                        <motion.div
                          key={vehicle._id}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                          <VehicleCard vehicle={vehicle} />
                        </motion.div>
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6 }}
                      className="bg-white rounded-xl shadow-lg p-12 text-center"
                    >
                      <div className="text-6xl text-gray-300 mb-4">🚗</div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        No vehicles found
                      </h3>
                      <p className="text-gray-600 mb-6 max-w-md mx-auto">
                        We couldn't find any vehicles matching your criteria. 
                        Try adjusting your filters or search terms.
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={() => window.location.reload()}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                      >
                        Reset Filters
                      </motion.button>
                    </motion.div>
                  )}

                  {/* Pagination */}
                  {pagination.pages > 1 && (
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                    >
                      <Pagination
                        currentPage={pagination.current}
                        totalPages={pagination.pages}
                        onPageChange={handlePageChange}
                      />
                    </motion.div>
                  )}
                </>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
