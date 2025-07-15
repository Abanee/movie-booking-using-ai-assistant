import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import ThemeToggle from '../ThemeToggle';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: 'Discover', path: '/ai-powered-homepage', icon: 'Sparkles' },
    { name: 'Movies', path: '/intelligent-movie-catalog', icon: 'Film' },
    { name: 'Book Now', path: '/immersive-booking-interface', icon: 'Calendar' },
    { name: 'Assistant', path: '/movie-assistant', icon: 'Bot' },
    { name: 'Dashboard', path: '/personal-cinema-dashboard', icon: 'LayoutDashboard' },
    { name: 'Preferences', path: '/ai-insights-preferences', icon: 'Settings' },
    { name: 'Support', path: '/support-trust-center', icon: 'HelpCircle' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-md shadow-cinematic border-b border-border' 
          : 'bg-transparent'
      }`}
    >
      <div className="w-full">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link 
            to="/ai-powered-homepage" 
            className="flex items-center space-x-2 group"
            onClick={closeMenu}
          >
            <div className="relative">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <Icon name="Film" size={20} color="var(--color-accent-foreground)" strokeWidth={2.5} />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full ai-pulse"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-foreground font-accent">CineAI</span>
              <span className="text-xs text-muted-foreground -mt-1">Intelligent Cinema</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActivePath(item.path)
                    ? 'bg-accent text-accent-foreground shadow-movie-card'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <Icon name={item.icon} size={16} />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            <ThemeToggle />
            <Button variant="ghost" size="sm" iconName="Search" iconPosition="left">
              Search
            </Button>
            <Link to="/auth/login">
              <Button variant="outline" size="sm" iconName="User" iconPosition="left">
                Sign In
              </Button>
            </Link>
            <Link to="/immersive-booking-interface">
              <Button variant="default" size="sm" iconName="Ticket" iconPosition="left">
                Book Now
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            <Icon name={isMenuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`lg:hidden transition-all duration-300 ease-cinematic ${
            isMenuOpen 
              ? 'max-h-screen opacity-100' :'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className="bg-background/95 backdrop-blur-md border-t border-border">
            <nav className="px-4 py-4 space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMenu}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActivePath(item.path)
                      ? 'bg-accent text-accent-foreground shadow-movie-card'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <Icon name={item.icon} size={18} />
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>

            {/* Mobile Actions */}
            <div className="px-4 py-4 border-t border-border space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">Theme</span>
                <ThemeToggle />
              </div>
              <Button variant="ghost" fullWidth iconName="Search" iconPosition="left">
                Search Movies
              </Button>
              <Link to="/auth/login">
                <Button variant="outline" fullWidth iconName="User" iconPosition="left">
                  Sign In
                </Button>
              </Link>
              <Link to="/immersive-booking-interface">
                <Button variant="default" fullWidth iconName="Ticket" iconPosition="left">
                  Book Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;