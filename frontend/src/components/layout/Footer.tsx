import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { 
  Facebook, 
  Instagram, 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Car,
  Send
} from 'lucide-react';

export default function Footer() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribing(true);
    
    try {
      // Newsletter subscription logic here
      console.log('Newsletter subscription:', email);
      setEmail('');
    } catch (error) {
      console.error('Newsletter subscription failed:', error);
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="bg-primary-600 p-2 rounded-lg">
                <Car className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold font-heading">
                  Auto<span className="text-primary-600">Ani</span>
                </span>
                <div className="text-xs text-gray-400">
                  Premium Automotive
                </div>
              </div>
            </Link>
            <p className="text-gray-400 mb-4">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com/aniautosallon"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/aniautosallon"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/vehicles" 
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {t('nav.vehicles')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/services" 
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {t('nav.services')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/financing" 
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {t('nav.financing')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('contact.title')}</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary-400 mt-0.5 flex-shrink-0" />
                <div className="text-gray-400">
                  <p>Prishtinë, Kosovo</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-primary-400 mt-0.5 flex-shrink-0" />
                <div className="text-gray-400">
                  <p>+383 44 123 456</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-primary-400 mt-0.5 flex-shrink-0" />
                <div className="text-gray-400">
                  <p>info@autoani.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-primary-400 mt-0.5 flex-shrink-0" />
                <div className="text-gray-400 text-sm">
                  <p>{t('contact.monday')}</p>
                  <p>{t('contact.saturday')}</p>
                  <p>{t('contact.sunday')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.newsletter')}</h3>
            <p className="text-gray-400 mb-4 text-sm">
              {t('footer.newsletterText')}
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubscribing}
                  className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-r-md transition-colors duration-200 disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 AutoAni. {t('footer.copyright')}
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link 
                to="/privacy" 
                className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
              >
                {t('footer.privacy')}
              </Link>
              <Link 
                to="/terms" 
                className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
              >
                {t('footer.terms')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
