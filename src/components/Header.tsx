
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const links = [
    { label: 'Home', path: '/' },
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Candidates', path: '/candidates' },
    { label: 'Assessment', path: '/assessment' }
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ease-in-out",
        {
          "bg-background/80 backdrop-blur-md shadow-sm": isScrolled,
          "bg-transparent": !isScrolled
        }
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center space-x-2 text-2xl font-medium tracking-tight transition-opacity duration-200 hover:opacity-80"
        >
          <span className="text-primary">Skill</span>
          <span>Snapshot</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "text-base font-medium transition-colors duration-200 hover:text-primary",
                location.pathname === link.path ? "text-primary" : "text-foreground/80"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Button 
            size="sm" 
            className="ml-4 bg-primary text-white hover:bg-primary/90 rounded-full px-6 transition-all duration-300 ease-in-out hover:shadow-md"
          >
            Sign In
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border animate-slide-down">
          <nav className="flex flex-col space-y-4 p-6">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-base font-medium transition-colors duration-200 hover:text-primary py-2",
                  location.pathname === link.path ? "text-primary" : "text-foreground/80"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Button 
              size="sm" 
              className="mt-4 bg-primary text-white hover:bg-primary/90 rounded-full"
            >
              Sign In
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
