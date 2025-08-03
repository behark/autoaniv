import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { brandsApi, vehiclesApi } from '@/services/api';
import { motion } from 'framer-motion';
import { ArrowRight, Award, Car, CreditCard, Users as Handshake, Phone, Shield } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
export default function HomePage() {
  const [featuredVehicles, setFeaturedVehicles] = useState<any[]>([]);
  const [featuredBrands, setFeaturedBrands] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Sample featured vehicles data (similar to Sherreti.com)
  const sampleVehicles = [
    {
      _id: '1',
      title: 'LAMBORGHINI URUS SE',
      brand: 'Lamborghini',
      model: 'Urus SE',
      year: 2025,
      mileage: 0,
      price: 450000,
      images: ['/api/placeholder/600/400'],
      slug: 'lamborghini-urus-se',
      featured: true
    },
    {
      _id: '2', 
      title: 'FERRARI SF90 SPIDER',
      brand: 'Ferrari',
      model: 'SF90 Spider',
      year: 2025,
      mileage: 0,
      price: 520000,
      images: ['/api/placeholder/600/400'],
      slug: 'ferrari-sf90-spider',
      featured: true
    },
    {
      _id: '3',
      title: 'ROLLS ROYCE CULLINAN II',
      brand: 'Rolls Royce',
      model: 'Cullinan II',
      year: 2025,
      mileage: 0,
      price: 680000,
      images: ['/api/placeholder/600/400'],
      slug: 'rolls-royce-cullinan-ii',
      featured: true
    },
    {
      _id: '4',
      title: 'MERCEDES G63 AMG 4×4²',
      brand: 'Mercedes',
      model: 'G63 AMG 4×4²',
      year: 2025,
      mileage: 0,
      price: 280000,
      images: ['/api/placeholder/600/400'],
      slug: 'mercedes-g63-amg-4x4',
      featured: true
    },
    {
      _id: '5',
      title: 'AUDI RSQ8 4.0 TFSI',
      brand: 'Audi',
      model: 'RSQ8 4.0 TFSI',
      year: 2025,
      mileage: 0,
      price: 150000,
      images: ['/api/placeholder/600/400'],
      slug: 'audi-rsq8-4-0-tfsi',
      featured: true
    },
    {
      _id: '6',
      title: 'PORSCHE 911 4GTS',
      brand: 'Porsche',
      model: '911 4GTS',
      year: 2025,
      mileage: 7000,
      price: 185000,
      images: ['/api/placeholder/600/400'],
      slug: 'porsche-911-4gts',
      featured: true
    }
  ];

  // Sample brands data
  const sampleBrands = [
    { _id: '1', name: 'Lamborghini', logo: '/api/placeholder/120/80', vehicleCount: 8 },
    { _id: '2', name: 'Ferrari', logo: '/api/placeholder/120/80', vehicleCount: 12 },
    { _id: '3', name: 'Rolls Royce', logo: '/api/placeholder/120/80', vehicleCount: 6 },
    { _id: '4', name: 'BMW', logo: '/api/placeholder/120/80', vehicleCount: 25 },
    { _id: '5', name: 'Mercedes Benz', logo: '/api/placeholder/120/80', vehicleCount: 30 },
    { _id: '6', name: 'Audi', logo: '/api/placeholder/120/80', vehicleCount: 22 },
    { _id: '7', name: 'Porsche', logo: '/api/placeholder/120/80', vehicleCount: 18 },
    { _id: '8', name: 'Bentley', logo: '/api/placeholder/120/80', vehicleCount: 5 }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Try to fetch real data, fallback to sample data
        const [vehiclesResponse, brandsResponse] = await Promise.all([
          vehiclesApi.getFeatured(6).catch(() => ({ data: sampleVehicles })),
          brandsApi.getFeatured().catch(() => ({ data: sampleBrands }))
        ]);

        setFeaturedVehicles(vehiclesResponse.data.length ? vehiclesResponse.data : sampleVehicles);
        setFeaturedBrands(brandsResponse.data.length ? brandsResponse.data : sampleBrands);
      } catch (error) {
        console.error('Failed to fetch homepage data:', error);
        // Use sample data as fallback
        setFeaturedVehicles(sampleVehicles);
        setFeaturedBrands(sampleBrands);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const services = [
    {
      icon: Award,
      title: 'I shpërblyer Superbrand',
      description: 'Një nga kompaniet që ka fituar 3 herë radhazi çmimin "Superbrand" në Kosovë është AutoAni.',
      titleEn: 'Superbrand Award Winner',
      descriptionEn: 'One of the companies that has won the "Superbrand" award 3 times in a row in Kosovo is AutoAni.'
    },
    {
      icon: Handshake,
      title: 'Ndërro Veturën',
      description: 'Blini një veturë të re nga inventari ynë duke paguar vetëm diferencën e vlerës midis veturës së re dhe veturës tuaj aktuale.',
      titleEn: 'Trade-In Service',
      descriptionEn: 'Buy a new car from our inventory by paying only the value difference between the new car and your current car.'
    },
    {
      icon: CreditCard,
      title: 'Lizing',
      description: 'Vetura me lizing nga banka të njohura në Kosovë. Kjo mundësi e jashtëzakonshme ju lejon të blini një veturë të re në një kohë më të shpejtë.',
      titleEn: 'Financing',
      descriptionEn: 'Vehicle financing from well-known banks in Kosovo. This exceptional opportunity allows you to buy a new car faster.'
    },
    {
      icon: Shield,
      title: 'Blej me Besim – Veturë me Garancion',
      description: 'Të gjitha automjetet tona vijnë me garancion të plotë pas shitjes, në përputhje me standardet evropiane.',
      titleEn: 'Buy with Confidence – Warranty',
      descriptionEn: 'All our vehicles come with full after-sales warranty, in accordance with European standards.'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>AutoAni - Premium Automotive Dealership | Makinat më të mira në Kosovë</title>
        <meta
          name="description"
          content="AutoAni - Lider në rajon me përvojë në tregtinë e makinave. Zbuloni automjete premium nga markat kryesore duke përfshirë Mercedes, BMW, Audi, Lamborghini, Ferrari dhe shumë të tjera."
        />
        <meta name="keywords" content="autoani, makina, veturat, mercedes, bmw, audi, lamborghini, ferrari, kosova, prishtina" />
      </Helmet>

      {/* Hero Section - Identical to Sherreti.com */}
      <section className="relative py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center opacity-20" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Me kënaqësi ju prezantojmë{' '}
              <span className="text-blue-400">AutoAni</span>, si lider në rajon me përvojë në tregtinë e makinave nga 2024
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Shfletoni gamën e gjerë të makinave nga ato ekonomike deri në klasën më ekskluzive.
            </p>
            <Link 
              to="/vehicles" 
              className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-lg transition-colors duration-200"
            >
              KLIKO KËTU PËR VETURAT
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Vehicles Section - Identical to Sherreti.com */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Automjetet e veçuara
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Nëse dëshironi të shihni veturat e veçanta që posedojmë dhe janë të disponueshme për shitje, këtu janë disa nga opsionet që kemi në dispozicion
            </p>
          </motion.div>

          {/* Vehicle Grid - Identical Layout to Sherreti */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredVehicles.map((vehicle, index) => (
              <motion.div
                key={vehicle._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={vehicle.images?.[0] || '/api/placeholder/600/400'}
                    alt={vehicle.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {vehicle.year}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {vehicle.title}
                  </h3>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-500">
                      {vehicle.mileage === 0 ? '0 km' : `${vehicle.mileage.toLocaleString()} km`}
                    </span>
                    <span className="text-lg font-bold text-blue-600">
                      €{vehicle.price?.toLocaleString()}
                    </span>
                  </div>
                  <Link
                    to={`/vehicle/${vehicle.slug}`}
                    className="block w-full text-center bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-lg font-semibold transition-colors duration-200"
                  >
                    Shiko Detajet
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link 
              to="/vehicles" 
              className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-lg transition-colors duration-200"
            >
              Shiko të gjitha veturat në stok
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section - Identical to Sherreti.com */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-6 mx-auto">
                  <service.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Introduction - Like Sherreti */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Gjeni makinën tuaj të ëndrrave në showroom-in tonë.
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Ne kemi një gamë të plotë automjetesh luksoze me çmime konkuruese, duke përfshirë oferta krejt të reja nga prodhuesit e makinave të nivelit të lartë të zgjedhura me kujdes për të përmbushur nevojat dhe personalitetin e klientit.
            </p>
          </motion.div>
          
          <div className="text-center">
            <Link
              to="/about"
              className="inline-flex items-center px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white text-lg font-semibold rounded-lg transition-colors duration-200"
            >
              Më shumë rreth nesh
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Browse by Brand Section - Identical to Sherreti */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Shfleto sipas Markës
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Importojmë të gjitha llojet e veturave nga brendet: Lamborghini, Ferrari, Rolls-Royce, Audi, BMW, Mercedes, Volkswagen e të tjera.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 mb-12">
            {featuredBrands.map((brand, index) => (
              <motion.div
                key={brand._id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center"
              >
                <img
                  src={brand.logo || '/api/placeholder/120/80'}
                  alt={brand.name}
                  className="h-12 w-auto object-contain mb-4"
                />
                <h3 className="text-sm font-semibold text-gray-900 text-center">
                  {brand.name}
                </h3>
                {brand.vehicleCount && (
                  <p className="text-xs text-gray-500 mt-1">
                    {brand.vehicleCount} vehicles
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Kontaktoni për më shumë informacione
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Ekipi ynë profesional është gati t'ju ndihmojë të gjeni veturën perfekte për ju.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 hover:bg-gray-100 font-semibold rounded-lg transition-colors duration-200"
              >
                <Phone className="mr-2 h-5 w-5" />
                Kontaktoni Tani
              </Link>
              <Link
                to="/vehicles"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold rounded-lg transition-colors duration-200"
              >
                <Car className="mr-2 h-5 w-5" />
                Shiko Inventarin
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
