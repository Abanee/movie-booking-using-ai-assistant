import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const WishlistSection = ({ wishlistItems }) => {
  const [filter, setFilter] = useState('all');

  const filterOptions = [
    { value: 'all', label: 'All', count: wishlistItems.length },
    { value: 'available', label: 'Available Now', count: wishlistItems.filter(item => item.status === 'available').length },
    { value: 'coming-soon', label: 'Coming Soon', count: wishlistItems.filter(item => item.status === 'coming-soon').length },
    { value: 'pre-order', label: 'Pre-order', count: wishlistItems.filter(item => item.status === 'pre-order').length }
  ];

  const filteredItems = wishlistItems.filter(item => {
    if (filter === 'all') return true;
    return item.status === filter;
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      'available': { color: 'bg-success/10 text-success', icon: 'CheckCircle', text: 'Available Now' },
      'coming-soon': { color: 'bg-accent/10 text-accent', icon: 'Clock', text: 'Coming Soon' },
      'pre-order': { color: 'bg-warning/10 text-warning', icon: 'Calendar', text: 'Pre-order' }
    };
    return statusConfig[status] || statusConfig['coming-soon'];
  };

  const formatReleaseDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const getDaysUntilRelease = (releaseDate) => {
    const now = new Date();
    const release = new Date(releaseDate);
    const diffTime = release - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 0) return 'Released';
    if (diffDays === 1) return '1 day';
    if (diffDays < 30) return `${diffDays} days`;
    
    const months = Math.floor(diffDays / 30);
    return months === 1 ? '1 month' : `${months} months`;
  };

  return (
    <div className="bg-card rounded-xl p-6 shadow-movie-card border border-border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">My Wishlist</h3>
        <div className="flex items-center space-x-2">
          <Icon name="Bookmark" size={20} color="var(--color-muted-foreground)" />
          <span className="text-sm text-muted-foreground">{wishlistItems.length} movies</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {filterOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setFilter(option.value)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === option.value
                ? 'bg-accent text-accent-foreground'
                : 'bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <span>{option.label}</span>
            <span className="bg-background/20 px-2 py-0.5 rounded-full text-xs">
              {option.count}
            </span>
          </button>
        ))}
      </div>

      {/* Wishlist Items */}
      <div className="space-y-4">
        {filteredItems.map((item) => {
          const statusBadge = getStatusBadge(item.status);
          const daysUntilRelease = getDaysUntilRelease(item.releaseDate);
          
          return (
            <div key={item.id} className="border border-border rounded-lg p-4 hover:shadow-movie-card transition-shadow">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-24 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={item.poster}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-foreground">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.genre} • {item.year}</p>
                    </div>
                    <button className="flex-shrink-0 ml-2 p-1 hover:bg-muted/50 rounded">
                      <Icon name="X" size={16} color="var(--color-muted-foreground)" />
                    </button>
                  </div>

                  <div className="flex items-center space-x-2 mb-3">
                    <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-md text-xs font-medium ${statusBadge.color}`}>
                      <Icon name={statusBadge.icon} size={12} />
                      <span>{statusBadge.text}</span>
                    </span>
                    {item.status !== 'available' && (
                      <span className="text-xs text-muted-foreground">
                        {daysUntilRelease} to go
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <Icon name="Calendar" size={14} color="var(--color-muted-foreground)" />
                      <span className="text-foreground">{formatReleaseDate(item.releaseDate)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Star" size={14} color="var(--color-muted-foreground)" />
                      <span className="text-foreground">{item.expectedRating}/10 expected</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {item.notificationsEnabled && (
                        <div className="flex items-center space-x-1 text-xs text-accent">
                          <Icon name="Bell" size={12} />
                          <span>Notifications on</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      {item.status === 'available' ? (
                        <Button variant="default" size="sm" iconName="Ticket" iconPosition="left">
                          Book Now
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm" iconName="Bell" iconPosition="left">
                          {item.notificationsEnabled ? 'Notifying' : 'Notify Me'}
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" iconName="Share" iconPosition="left">
                        Share
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Bookmark" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
          <p className="text-muted-foreground mb-4">
            {filter === 'all' ? 'Your wishlist is empty' : `No ${filter.replace('-', ' ')} movies in your wishlist`}
          </p>
          <Button variant="outline" iconName="Plus" iconPosition="left">
            Browse Movies
          </Button>
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {wishlistItems.filter(item => item.notificationsEnabled).length} movies with notifications enabled
          </span>
          <Button variant="ghost" size="sm" iconName="Settings" iconPosition="left">
            Manage Notifications
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WishlistSection;