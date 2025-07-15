import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const QuickActions = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('New York, NY');
  const [isSearching, setIsSearching] = useState(false);

  const quickActionItems = [
    {
      id: 'search',
      title: 'Smart Search',
      description: 'Find movies with natural language',
      icon: 'Search',
      color: 'bg-blue-500',
      placeholder: 'Try "funny movies for date night"'
    },
    {
      id: 'nearby',
      title: 'Theaters Near Me',
      description: 'Discover local cinema experiences',
      icon: 'MapPin',
      color: 'bg-green-500',
      action: 'Find Theaters'
    },
    {
      id: 'tonight',
      title: 'Movies Tonight',
      description: 'Available showtimes for today',
      icon: 'Clock',
      color: 'bg-purple-500',
      action: 'Show Tonight'
    },
    {
      id: 'wishlist',
      title: 'My Wishlist',
      description: 'Saved movies and notifications',
      icon: 'Heart',
      color: 'bg-pink-500',
      action: 'View Wishlist'
    }
  ];

  const popularSearches = [
    "Action movies this weekend",
    "Romantic comedies near me",
    "IMAX theaters downtown",
    "Movies like Inception",
    "Family-friendly films",
    "Horror movies tonight"
  ];

  const handleSearch = async (query = searchQuery) => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    // Simulate search
    setTimeout(() => {
      setIsSearching(false);
      // Navigate to search results
    }, 1500);
  };

  const handleQuickSearch = (query) => {
    setSearchQuery(query);
    handleSearch(query);
  };

  return (
    <section className="py-16 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Quick Actions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get instant access to the most popular features and find what you're looking for faster
          </p>
        </div>

        {/* Smart Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="bg-card rounded-xl p-6 shadow-movie-card">
            <div className="flex items-center space-x-2 mb-4">
              <Icon name="Sparkles" size={20} color="var(--color-accent)" />
              <h3 className="text-lg font-semibold text-foreground">
                AI-Powered Search
              </h3>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <Input
                  type="search"
                  placeholder="Try 'funny movies for date night' or 'action films like John Wick'"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="text-base"
                />
              </div>
              <Button
                variant="default"
                size="default"
                iconName="Search"
                iconPosition="left"
                loading={isSearching}
                onClick={() => handleSearch()}
                className="bg-accent hover:bg-accent/90"
              >
                Search
              </Button>
            </div>

            {/* Popular Searches */}
            <div className="mt-4">
              <p className="text-sm text-muted-foreground mb-2">Popular searches:</p>
              <div className="flex flex-wrap gap-2">
                {popularSearches.slice(0, 4).map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickSearch(search)}
                    className="text-xs bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground px-3 py-1 rounded-full transition-colors duration-200"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Action Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {quickActionItems.map((item) => (
            <div
              key={item.id}
              className="bg-card rounded-xl p-6 shadow-movie-card hover:shadow-lg transition-all duration-300 group cursor-pointer"
            >
              <div className={`w-12 h-12 ${item.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                <Icon name={item.icon} size={24} color="white" />
              </div>
              
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {item.title}
              </h3>
              
              <p className="text-sm text-muted-foreground mb-4">
                {item.description}
              </p>

              {item.id === 'search' ? (
                <Input
                  type="text"
                  placeholder={item.placeholder}
                  className="text-sm"
                  onFocus={() => document.querySelector('input[type="search"]').focus()}
                />
              ) : (
                <Link to={
                  item.id === 'nearby' ? '/intelligent-movie-catalog' :
                  item.id === 'tonight' ? '/intelligent-movie-catalog' :
                  item.id === 'wishlist' ? '/personal-cinema-dashboard' : '#'
                }>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="ArrowRight"
                    iconPosition="right"
                    fullWidth
                  >
                    {item.action}
                  </Button>
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Location & Preferences */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Current Location */}
          <div className="bg-card rounded-xl p-6 shadow-movie-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center">
                <Icon name="MapPin" size={20} className="mr-2" />
                Your Location
              </h3>
              <Button
                variant="ghost"
                size="sm"
                iconName="Edit"
                className="text-muted-foreground hover:text-foreground"
              />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                  <Icon name="MapPin" size={20} color="var(--color-success)" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{selectedLocation}</p>
                  <p className="text-sm text-muted-foreground">Current location</p>
                </div>
              </div>
              
              <div className="pt-3 border-t border-border">
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>12 theaters</strong> within 5 miles
                </p>
                <Link to="/intelligent-movie-catalog">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="ExternalLink"
                    iconPosition="right"
                  >
                    View All Theaters
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Preferences */}
          <div className="bg-card rounded-xl p-6 shadow-movie-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center">
                <Icon name="Settings" size={20} className="mr-2" />
                Quick Preferences
              </h3>
              <Link to="/ai-insights-preferences">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="ExternalLink"
                  className="text-muted-foreground hover:text-foreground"
                />
              </Link>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Notifications</span>
                <div className="w-10 h-6 bg-accent rounded-full flex items-center justify-end px-1">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Auto-book preferred seats</span>
                <div className="w-10 h-6 bg-muted rounded-full flex items-center px-1">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">AI recommendations</span>
                <div className="w-10 h-6 bg-accent rounded-full flex items-center justify-end px-1">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickActions;