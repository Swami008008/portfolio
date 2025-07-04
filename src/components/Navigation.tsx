
import React, { useState, useEffect } from 'react';
import { Menu, X, User, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavigationProps {
  isOwnerView: boolean;
  setIsOwnerView: (value: boolean) => void;
}

const Navigation = ({ isOwnerView, setIsOwnerView }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'glass-effect shadow-2xl border-b border-white/20' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg animate-glow">
                <span className="text-white font-bold text-sm">TN</span>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-30 animate-pulse"></div>
            </div>
            <span className="font-bold text-gray-800 text-lg gradient-text">Talla Narayana Swami</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className="relative text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
            
            {/* Owner View Toggle */}
            <Button
              variant={isOwnerView ? "default" : "outline"}
              size="sm"
              onClick={() => setIsOwnerView(!isOwnerView)}
              className={`ml-4 transition-all duration-300 ${
                isOwnerView 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg' 
                  : 'glass-effect border-blue-200/50 hover:bg-white/90'
              }`}
            >
              {isOwnerView ? <User className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
              {isOwnerView ? 'Owner' : 'Visitor'}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant={isOwnerView ? "default" : "outline"}
              size="sm"
              onClick={() => setIsOwnerView(!isOwnerView)}
              className={isOwnerView 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600' 
                : 'glass-effect border-blue-200/50'
              }
            >
              {isOwnerView ? <User className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600 hover:text-blue-600 transition-colors rounded-lg hover:bg-white/50"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden glass-effect border-t border-white/20 rounded-b-2xl shadow-2xl">
            <div className="py-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-white/50 transition-all duration-200 rounded-lg mx-2"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
