import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Globe, Car } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const navigation = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.vehicles'), href: '/vehicles' },
    { name: t('nav.about'), href: '/about' },
    { name: t('nav.services'), href: '/services' },
    { name: t('nav.financing'), href: '/financing' },
    { name: t('nav.contact'), href: '/contact' },
  ];

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'sq' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-primary-600 p-2 rounded-lg">
              <Car className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold font-heading text-gray-900">
                Auto<span className="text-primary-600">Ani</span>
              </span>
              <div className="text-xs text-gray-500 hidden sm:block">
                Premium Automotive
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Language Toggle & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors duration-200"
            >
              <Globe className="h-4 w-4" />
              <span className="text-sm font-medium uppercase">
                {i18n.language}
              </span>
            </button>

            {/* Mobile menu button */}
            <button
              type="button"
              className="lg:hidden p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100 transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md font-medium transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
