import { motion } from 'framer-motion';
import {
  Award,
  Calendar,
  Car,
  CheckCircle,
  Clock,
  CreditCard,
  Phone,
  Shield,
  Users,
  Wrench
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function ServicesPage() {
  const services = [
    {
      icon: Car,
      title: 'Vehicle Sales',
      description: 'Premium new and pre-owned vehicles from trusted manufacturers with comprehensive warranties.',
      features: ['Quality Inspection', 'Vehicle History Report', 'Warranty Coverage', 'Trade-in Evaluations']
    },
    {
      icon: Wrench,
      title: 'Maintenance & Repair',
      description: 'Expert automotive service by certified technicians using genuine parts and modern equipment.',
      features: ['Oil Changes', 'Brake Service', 'Engine Diagnostics', 'Transmission Repair']
    },
    {
      icon: CreditCard,
      title: 'Financing Solutions',
      description: 'Flexible financing options with competitive rates to make your dream car affordable.',
      features: ['Auto Loans', 'Lease Options', 'Bad Credit Solutions', 'Quick Approval']
    },
    {
      icon: Shield,
      title: 'Insurance Services',
      description: 'Comprehensive insurance coverage options to protect your investment and peace of mind.',
      features: ['Full Coverage', 'Collision Protection', 'Comprehensive Plans', 'Gap Insurance']
    }
  ];

  const maintenanceServices = [
    'Oil Change & Filter',
    'Brake Inspection & Repair',
    'Tire Rotation & Balancing',
    'Engine Diagnostics',
    'Transmission Service',
    'Air Conditioning Service',
    'Battery Testing & Replacement',
    'Wheel Alignment',
    'Exhaust System Repair',
    'Electrical System Diagnosis'
  ];

  const whyChooseUs = [
    {
      icon: Award,
      title: 'Certified Technicians',
      description: 'Our team consists of factory-trained and certified automotive professionals.'
    },
    {
      icon: Clock,
      title: 'Quick Service',
      description: 'Fast turnaround times without compromising on quality or attention to detail.'
    },
    {
      icon: Shield,
      title: 'Warranty Guarantee',
      description: 'All our services come with comprehensive warranties for your peace of mind.'
    },
    {
      icon: Users,
      title: 'Customer Support',
      description: '24/7 customer support and roadside assistance for our valued clients.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Services - AutoAni</title>
        <meta name="description" content="Comprehensive automotive services including vehicle sales, maintenance, financing, and insurance. Expert service you can trust." />
      </Helmet>
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 to-gray-700 text-white py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl font-bold mb-6">Our Services</h1>
            <p className="text-xl text-gray-300 mb-8">
              From vehicle sales to comprehensive maintenance, we provide complete automotive 
              solutions under one roof. Experience professional service that exceeds expectations.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              <Calendar size={20} />
              Schedule Service
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Complete Automotive Solutions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We offer a full range of automotive services designed to meet all your vehicle needs, 
              from purchase to maintenance and everything in between.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-6">
                  <service.icon size={28} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Maintenance Services */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Professional Maintenance</h2>
              <p className="text-lg text-gray-600 mb-8">
                Keep your vehicle running at peak performance with our comprehensive maintenance services. 
                Our certified technicians use only genuine parts and follow manufacturer specifications.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {maintenanceServices.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle size={16} className="text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700">{service}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="/api/placeholder/600/500"
                alt="Auto Maintenance Service"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent rounded-lg"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose AutoAni?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              With decades of experience and thousands of satisfied customers, 
              we've earned our reputation as the premier automotive service provider.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 text-white rounded-full mb-6 group-hover:bg-blue-700 transition-colors">
                  <reason.icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{reason.title}</h3>
                <p className="text-gray-600">{reason.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Hours & Contact */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">Ready to Service Your Vehicle?</h2>
              <p className="text-xl text-blue-100 mb-8">
                Schedule your service appointment today and experience the AutoAni difference. 
                We're here to keep you on the road safely and reliably.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  <Calendar size={20} />
                  Book Service
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                >
                  <Phone size={20} />
                  Call Now
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-8"
            >
              <h3 className="text-2xl font-bold mb-6">Service Hours</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-blue-100">Monday - Friday</span>
                  <span className="font-semibold">8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-100">Saturday</span>
                  <span className="font-semibold">9:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-100">Sunday</span>
                  <span className="font-semibold">Closed</span>
                </div>
                <div className="border-t border-white/20 pt-4 mt-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Phone size={20} />
                    <span className="font-semibold">+383 44 123 456</span>
                  </div>
                  <p className="text-blue-100 text-sm">24/7 Emergency Roadside Assistance</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
