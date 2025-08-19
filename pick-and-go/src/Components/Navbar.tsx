import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-teal-800 to-teal-600 text-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          <Link 
            to="/" 
            className="text-2xl font-semibold hover:text-teal-100 transition-all duration-300 flex items-center"
          >
            <span className="bg-white/10 backdrop-blur-sm px-2 py-1 rounded-lg mr-2">🛒</span>
            <span className="text-white">Pick&Go</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-2">
            <Link 
              to="/" 
              className="px-3 py-2 rounded-md hover:bg-white/10 hover:shadow-sm transition-all duration-200 flex items-center text-sm font-medium"
            >
              <span className="mr-2">🏠</span> Home
            </Link>
            <Link 
              to="/products" 
              className="px-3 py-2 rounded-md hover:bg-white/10 hover:shadow-sm transition-all duration-200 flex items-center text-sm font-medium"
            >
              <span className="mr-2">📦</span> Products
            </Link>
            <Link 
              to="/about" 
              className="px-3 py-2 rounded-md hover:bg-white/10 hover:shadow-sm transition-all duration-200 flex items-center text-sm font-medium"
            >
              <span className="mr-2">👥</span> About
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden focus:outline-none p-2 rounded-md hover:bg-white/20 transition-all duration-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-3 space-y-1 animate-fadeIn">
            <Link 
              to="/" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md bg-white/10 hover:bg-white/20 transition-all duration-200 flex items-center text-sm"
            >
              <span className="mr-2">🏠</span> Home
            </Link>
            <Link 
              to="/products" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md bg-white/10 hover:bg-white/20 transition-all duration-200 flex items-center text-sm"
            >
              <span className="mr-2">📦</span> Products
            </Link>
            <Link 
              to="/about" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md bg-white/10 hover:bg-white/20 transition-all duration-200 flex items-center text-sm"
            >
              <span className="mr-2">👥</span> About Us
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}