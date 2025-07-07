
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, User, LogOut, Shield } from 'lucide-react';
import AuthDialog from './AuthDialog';
import { useToast } from '@/hooks/use-toast';

interface NavigationProps {
  isOwnerView: boolean;
  setIsOwnerView: (value: boolean) => void;
}

const Navigation = ({ isOwnerView, setIsOwnerView }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  // Check authentication status on component mount
  useEffect(() => {
    const authToken = localStorage.getItem('portfolioAuthToken');
    const authTime = localStorage.getItem('portfolioAuthTime');
    
    if (authToken && authTime) {
      const timeDiff = Date.now() - parseInt(authTime);
      const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds
      
      if (timeDiff < oneHour) {
        setIsAuthenticated(true);
        setIsOwnerView(true);
      } else {
        // Session expired
        localStorage.removeItem('portfolioAuthToken');
        localStorage.removeItem('portfolioAuthTime');
        setIsAuthenticated(false);
        setIsOwnerView(false);
      }
    }
  }, [setIsOwnerView]);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setIsOwnerView(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('portfolioAuthToken');
    localStorage.removeItem('portfolioAuthTime');
    setIsAuthenticated(false);
    setIsOwnerView(false);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const handleOwnerModeToggle = () => {
    if (isAuthenticated) {
      setIsOwnerView(!isOwnerView);
    } else {
      setShowAuthDialog(true);
    }
  };

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Education', href: '#education' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Achievements', href: '#achievements' },
    { label: 'Activities', href: '#activities' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Talla Narayana Swami
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Control Buttons */}
            <div className="flex items-center space-x-3">
              {isAuthenticated && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsOwnerView(!isOwnerView)}
                  className={isOwnerView ? "bg-blue-50 border-blue-200" : ""}
                >
                  <Shield className="w-4 h-4 mr-2" />
                  {isOwnerView ? 'Owner Mode' : 'Visitor Mode'}
                </Button>
              )}

              <Button
                variant="outline"
                size="sm"
                onClick={isAuthenticated ? handleLogout : handleOwnerModeToggle}
                className="hidden sm:flex"
              >
                {isAuthenticated ? (
                  <>
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </>
                ) : (
                  <>
                    <User className="w-4 h-4 mr-2" />
                    Owner Login
                  </>
                )}
              </Button>

              {/* Mobile menu button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden"
              >
                {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-200/50">
              <div className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-gray-700 hover:text-blue-600 transition-colors font-medium px-2 py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                
                <div className="border-t border-gray-200/50 pt-3 mt-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={isAuthenticated ? handleLogout : handleOwnerModeToggle}
                    className="w-full"
                  >
                    {isAuthenticated ? (
                      <>
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </>
                    ) : (
                      <>
                        <User className="w-4 h-4 mr-2" />
                        Owner Login
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      <AuthDialog
        isOpen={showAuthDialog}
        onClose={() => setShowAuthDialog(false)}
        onAuth={handleAuthSuccess}
      />
    </>
  );
};

export default Navigation;
