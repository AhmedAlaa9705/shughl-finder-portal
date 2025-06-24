
import { useState } from 'react';
import { Menu, X, LogIn, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';

interface ResponsiveNavbarProps {
  title: string;
  primaryAction: {
    label: string;
    icon: React.ReactNode;
    onClick: () => void;
  };
}

const ResponsiveNavbar = ({ title, primaryAction }: ResponsiveNavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">{title}</h1>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <LogIn className="ml-2 h-4 w-4" />
                تسجيل الدخول
              </Button>
              <Button variant="outline" size="sm">
                <UserPlus className="ml-2 h-4 w-4" />
                حساب جديد
              </Button>
              <Button 
                className={primaryAction.label.includes('عمل') ? 'bg-blue-600 hover:bg-blue-700' : 
                          primaryAction.label.includes('وظائف') ? 'bg-green-600 hover:bg-green-700' : 
                          'bg-orange-600 hover:bg-orange-700'}
                onClick={primaryAction.onClick}
              >
                {primaryAction.icon}
                {primaryAction.label}
              </Button>
            </div>
            <Logo />
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <Logo />
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className="p-2"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t pt-4">
            <div className="flex flex-col gap-3">
              <Button 
                variant="outline" 
                size="sm" 
                className="justify-start"
                onClick={() => setIsMenuOpen(false)}
              >
                <LogIn className="ml-2 h-4 w-4" />
                تسجيل الدخول
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="justify-start"
                onClick={() => setIsMenuOpen(false)}
              >
                <UserPlus className="ml-2 h-4 w-4" />
                حساب جديد
              </Button>
              <Button 
                className={`justify-start ${
                  primaryAction.label.includes('عمل') ? 'bg-blue-600 hover:bg-blue-700' : 
                  primaryAction.label.includes('وظائف') ? 'bg-green-600 hover:bg-green-700' : 
                  'bg-orange-600 hover:bg-orange-700'
                }`}
                onClick={() => {
                  primaryAction.onClick();
                  setIsMenuOpen(false);
                }}
              >
                {primaryAction.icon}
                {primaryAction.label}
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default ResponsiveNavbar;
