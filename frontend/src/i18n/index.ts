import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
  en: {
    translation: {
      // Navigation
      nav: {
        home: 'Home',
        vehicles: 'Vehicles',
        about: 'About',
        contact: 'Contact',
        financing: 'Financing',
        services: 'Services',
        admin: 'Admin'
      },
      
      // Homepage
      hero: {
        title: 'Find Your Dream Car',
        subtitle: 'Premium automotive dealership with over 25 years of experience',
        cta: 'Browse Vehicles',
        learnMore: 'Learn More'
      },
      
      // Featured section
      featured: {
        title: 'Featured Vehicles',
        subtitle: 'Discover our handpicked selection of premium automobiles',
        viewAll: 'View All Vehicles'
      },
      
      // Services
      services: {
        title: 'Our Services',
        financing: {
          title: 'Financing',
          description: 'Vehicle financing through trusted banks in Kosovo'
        },
        tradeIn: {
          title: 'Trade-In',
          description: 'Trade your current vehicle for a new one, paying only the difference'
        },
        warranty: {
          title: 'Warranty',
          description: 'All our vehicles come with comprehensive warranty coverage'
        },
        superbrand: {
          title: 'Superbrand Award',
          description: 'Recognized as a leading automotive company in the region'
        }
      },
      
      // Vehicle details
      vehicle: {
        price: 'Price',
        year: 'Year',
        mileage: 'Mileage',
        transmission: 'Transmission',
        fuelType: 'Fuel Type',
        bodyType: 'Body Type',
        color: 'Color',
        engine: 'Engine',
        horsepower: 'Horsepower',
        features: 'Features',
        description: 'Description',
        contactUs: 'Contact Us',
        inquire: 'Make Inquiry',
        available: 'Available',
        sold: 'Sold',
        reserved: 'Reserved',
        comingSoon: 'Coming Soon'
      },
      
      // Filters
      filters: {
        search: 'Search vehicles...',
        brand: 'Brand',
        model: 'Model',
        year: 'Year',
        price: 'Price',
        mileage: 'Mileage',
        transmission: 'Transmission',
        fuelType: 'Fuel Type',
        bodyType: 'Body Type',
        reset: 'Reset Filters',
        apply: 'Apply Filters'
      },
      
      // Contact
      contact: {
        title: 'Contact Us',
        subtitle: 'Get in touch with our team',
        name: 'Name',
        email: 'Email',
        phone: 'Phone',
        subject: 'Subject',
        message: 'Message',
        send: 'Send Message',
        success: 'Message sent successfully!',
        error: 'Failed to send message. Please try again.',
        address: 'Address',
        workingHours: 'Working Hours',
        monday: 'Monday - Friday: 8:00 - 18:00',
        saturday: 'Saturday: 9:00 - 16:00',
        sunday: 'Sunday: Closed'
      },
      
      // About
      about: {
        title: 'About AutoAni',
        subtitle: 'Leading automotive dealership since 1995',
        mission: 'Our Mission',
        vision: 'Our Vision',
        values: 'Our Values'
      },
      
      // Footer
      footer: {
        description: 'Premium automotive dealership offering luxury vehicles from top brands.',
        quickLinks: 'Quick Links',
        socialMedia: 'Social Media',
        newsletter: 'Newsletter',
        newsletterText: 'Subscribe to our newsletter for updates',
        subscribe: 'Subscribe',
        copyright: 'All rights reserved',
        privacy: 'Privacy Policy',
        terms: 'Terms of Service'
      },
      
      // Common
      common: {
        loading: 'Loading...',
        error: 'Something went wrong',
        retry: 'Try Again',
        readMore: 'Read More',
        showLess: 'Show Less',
        next: 'Next',
        previous: 'Previous',
        close: 'Close',
        open: 'Open',
        save: 'Save',
        cancel: 'Cancel',
        delete: 'Delete',
        edit: 'Edit',
        add: 'Add',
        remove: 'Remove'
      }
    }
  },
  sq: {
    translation: {
      // Navigation
      nav: {
        home: 'Ballina',
        vehicles: 'Veturat',
        about: 'Rreth Nesh',
        contact: 'Kontakti',
        financing: 'Financimi',
        services: 'Shërbimet',
        admin: 'Admin'
      },
      
      // Homepage
      hero: {
        title: 'Gjeni Makinën e Ëndrrës',
        subtitle: 'Tregtues premium automjetesh me mbi 25 vjet përvojë',
        cta: 'Shfletoni Veturat',
        learnMore: 'Mësoni Më Shumë'
      },
      
      // Featured section
      featured: {
        title: 'Automjetet e Veçuara',
        subtitle: 'Zbuloni përzgjedhjen tonë të automjeteve premium',
        viewAll: 'Shikoni Të Gjitha Veturat'
      },
      
      // Services
      services: {
        title: 'Shërbimet Tona',
        financing: {
          title: 'Lizing',
          description: 'Financim automjetesh përmes bankave të besueshme në Kosovë'
        },
        tradeIn: {
          title: 'Ndërro Veturën',
          description: 'Ndërroni veturën tuaj aktuale me një të re, duke paguar vetëm diferencën'
        },
        warranty: {
          title: 'Garancion',
          description: 'Të gjitha automjetet tona vijnë me garancion të plotë'
        },
        superbrand: {
          title: 'Çmimi Superbrand',
          description: 'I njohur si kompani lider automotive në rajon'
        }
      },
      
      // Vehicle details
      vehicle: {
        price: 'Çmimi',
        year: 'Viti',
        mileage: 'Kilometrazhi',
        transmission: 'Transmisioni',
        fuelType: 'Lloji i Karburantit',
        bodyType: 'Lloji i Karocerisë',
        color: 'Ngjyra',
        engine: 'Motori',
        horsepower: 'Fuqia',
        features: 'Veçoritë',
        description: 'Përshkrimi',
        contactUs: 'Na Kontaktoni',
        inquire: 'Bëni Pyetje',
        available: 'I Disponueshëm',
        sold: 'I Shitur',
        reserved: 'I Rezervuar',
        comingSoon: 'Së Shpejti'
      },
      
      // Filters
      filters: {
        search: 'Kërkoni veturat...',
        brand: 'Marka',
        model: 'Modeli',
        year: 'Viti',
        price: 'Çmimi',
        mileage: 'Kilometrazhi',
        transmission: 'Transmisioni',
        fuelType: 'Karburanti',
        bodyType: 'Karoceria',
        reset: 'Rivendos Filtrat',
        apply: 'Aplikoni Filtrat'
      },
      
      // Contact
      contact: {
        title: 'Na Kontaktoni',
        subtitle: 'Lidhuni me ekipin tonë',
        name: 'Emri',
        email: 'Email-i',
        phone: 'Telefoni',
        subject: 'Tema',
        message: 'Mesazhi',
        send: 'Dërgo Mesazhin',
        success: 'Mesazhi u dërgua me sukses!',
        error: 'Dështoi dërgimi i mesazhit. Ju lutemi provoni përsëri.',
        address: 'Adresa',
        workingHours: 'Orët e Punës',
        monday: 'E Hënë - E Premte: 8:00 - 18:00',
        saturday: 'E Shtunë: 9:00 - 16:00',
        sunday: 'E Diel: Mbyllur'
      },
      
      // About
      about: {
        title: 'Rreth AutoAni',
        subtitle: 'Tregtues lider automjetesh që nga viti 1995',
        mission: 'Misioni Ynë',
        vision: 'Vizioni Ynë',
        values: 'Vlerat Tona'
      },
      
      // Footer
      footer: {
        description: 'Tregtues premium automjetesh që ofron veturat luksoze nga markat më të mira.',
        quickLinks: 'Lidhje të Shpejta',
        socialMedia: 'Rrjetet Sociale',
        newsletter: 'Newsletter',
        newsletterText: 'Pajtohuni në newsletter për përditësime',
        subscribe: 'Pajtohuni',
        copyright: 'Të gjitha të drejtat e rezervuara',
        privacy: 'Politika e Privatësisë',
        terms: 'Kushtet e Shërbimit'
      },
      
      // Common
      common: {
        loading: 'Duke u ngarkuar...',
        error: 'Diçka shkoi keq',
        retry: 'Provoni Përsëri',
        readMore: 'Lexoni Më Shumë',
        showLess: 'Tregoni Më Pak',
        next: 'Tjetër',
        previous: 'Mëparshëm',
        close: 'Mbyll',
        open: 'Hap',
        save: 'Ruaj',
        cancel: 'Anulo',
        delete: 'Fshi',
        edit: 'Përpuno',
        add: 'Shto',
        remove: 'Hiq'
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n;
