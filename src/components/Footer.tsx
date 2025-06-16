import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, ArrowRight, Clock } from 'lucide-react';
import Logo from '/logo-flat.png';
import { useNavigation } from '../providers/SmoothNavigationProvider';

const Footer: React.FC<{ className?: string }> = ({ className }) => {
  const { Link } = useNavigation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`bg-gray-900 text-white ${className || ''}`}>
      {/* Main footer content */}
      <div className="container mx-auto px-6 pt-16 pb-8">
        {/* Top section with logo and quick intro */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-12 border-b border-gray-800 pb-12">
          <div className="mb-8 md:mb-0 md:max-w-sm">
            <Link to="/" className="inline-block mb-6">
              <img src={Logo} alt="PA Real Estate Support Services" className="h-14 w-auto" />
            </Link>
            <p className="text-gray-400 mb-6">
              Your trusted partner in reliable transaction management, serving the Pocono Mountains and beyond.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/about" className="text-gray-400 hover:text-white transition-colors inline-flex items-center">
                    <span className="w-1 h-1 bg-[#eac87d] rounded-full mr-2"></span>
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-gray-400 hover:text-white transition-colors inline-flex items-center">
                    <span className="w-1 h-1 bg-[#eac87d] rounded-full mr-2"></span>
                    Services
                  </Link>
                </li>
                <li>
                  <Link to="/work-with-me" className="text-gray-400 hover:text-white transition-colors inline-flex items-center">
                    <span className="w-1 h-1 bg-[#eac87d] rounded-full mr-2"></span>
                    Work With Me
                  </Link>
                </li>
                <li>
                  <Link to="/agent-portal" className="text-gray-400 hover:text-white transition-colors inline-flex items-center">
                    <span className="w-1 h-1 bg-[#eac87d] rounded-full mr-2"></span>
                    Agent Portal
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">Services</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/services#transaction" className="text-gray-400 hover:text-white transition-colors inline-flex items-center">
                    <span className="w-1 h-1 bg-[#eac87d] rounded-full mr-2"></span>
                    Transaction Coordination
                  </Link>
                </li>
                <li>
                  <Link to="/services#document" className="text-gray-400 hover:text-white transition-colors inline-flex items-center">
                    <span className="w-1 h-1 bg-[#eac87d] rounded-full mr-2"></span>
                    Document Management
                  </Link>
                </li>
                <li>
                  <Link to="/services#compliance" className="text-gray-400 hover:text-white transition-colors inline-flex items-center">
                    <span className="w-1 h-1 bg-[#eac87d] rounded-full mr-2"></span>
                    Compliance Review
                  </Link>
                </li>
                <li>
                  <Link to="/services#closing" className="text-gray-400 hover:text-white transition-colors inline-flex items-center">
                    <span className="w-1 h-1 bg-[#eac87d] rounded-full mr-2"></span>
                    Closing Coordination
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info - Fixed email truncation */}
            <div className="min-w-[260px]">
              <h3 className="text-white font-semibold text-lg mb-4">Contact</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Phone className="w-5 h-5 text-[#eac87d] mt-0.5 mr-3 flex-shrink-0" />
                  <a href="tel:+5705884637" className="text-gray-400 hover:text-white transition-colors whitespace-nowrap">
                    (570) 588-4637
                  </a>
                </li>
                <li className="flex items-start">
                  <Mail className="w-5 h-5 text-[#eac87d] mt-0.5 mr-3 flex-shrink-0" />
                  <a
                    href="mailto:debbie@parealestatesupport.com"
                    className="text-gray-400 hover:text-white transition-colors whitespace-nowrap"
                  >
                    debbie@parealestatesupport.com
                  </a>
                </li>
                <li className="flex items-start">
                  <MapPin className="w-5 h-5 text-[#eac87d] mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-400 whitespace-nowrap">
                    Pocono Mountains, PA
                  </span>
                </li>
                <li className="flex items-start">
                  <Clock className="w-5 h-5 text-[#eac87d] mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-400 whitespace-nowrap">
                    Mon-Fri 9:00 AM - 5:00 PM
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom section with Agent Portal button and copyright */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-500 text-sm mb-6 md:mb-0">
            <p className="mb-2">
              &copy; {currentYear} PA Real Estate Support Services. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
              <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">
                Terms of Service
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Link
              to="/agent-portal"
              className="bg-[#eac87d] hover:bg-opacity-90 text-gray-900 font-semibold px-6 py-2.5 rounded-lg inline-flex items-center transition-colors duration-200"
            >
              Agent Portal
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Very bottom attribution */}
      <div className="bg-gray-950 py-4">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-600 text-xs">
            Crafted with care for PA real estate professionals
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;