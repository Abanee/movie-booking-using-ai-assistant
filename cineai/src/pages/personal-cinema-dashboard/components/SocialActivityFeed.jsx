import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const SocialActivityFeed = ({ activities }) => {
  const [filter, setFilter] = useState('all');

  const filterOptions = [
    { value: 'all', label: 'All Activity', icon: 'Activity' },
    { value: 'reviews', label: 'Reviews', icon: 'MessageSquare' },
    { value: 'bookings', label: 'Bookings', icon: 'Ticket' },
    { value: 'recommendations', label: 'Recommendations', icon: 'Share' }
  ];

  const filteredActivities = activities.filter(activity => {
    if (filter === 'all') return true;
    return activity.type === filter.replace('s', ''); // Remove 's' from filter value
  });

  const getActivityIcon = (type) => {
    const icons = {
      'review': 'MessageSquare',
      'booking': 'Ticket',
      'recommendation': 'Share',
      'rating': 'Star',
      'wishlist': 'Bookmark'
    };
    return icons[type] || 'Activity';
  };

  const getActivityColor = (type) => {
    const colors = {
      'review': 'text-accent',
      'booking': 'text-success',
      'recommendation': 'text-primary',
      'rating': 'text-warning',
      'wishlist': 'text-error'
    };
    return colors[type] || 'text-muted-foreground';
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return time.toLocaleDateString();
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name="Star"
        size={12}
        color={i < rating ? "var(--color-accent)" : "var(--color-muted-foreground)"}
        className={i < rating ? "fill-current" : ""}
      />
    ));
  };

  return (
    <div className="bg-card rounded-xl p-6 shadow-movie-card border border-border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Social Activity</h3>
        <div className="flex items-center space-x-2">
          <Icon name="Users" size={20} color="var(--color-muted-foreground)" />
          <span className="text-sm text-muted-foreground">{activities.length} activities</span>
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
            <Icon name={option.icon} size={14} />
            <span>{option.label}</span>
          </button>
        ))}
      </div>

      {/* Activity Feed */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredActivities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-muted/30 rounded-lg transition-colors">
            <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={activity.user.avatar}
                alt={activity.user.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-1">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-foreground text-sm">{activity.user.name}</span>
                  <Icon 
                    name={getActivityIcon(activity.type)} 
                    size={14} 
                    color={`var(--color-${getActivityColor(activity.type).replace('text-', '')})`} 
                  />
                </div>
                <span className="text-xs text-muted-foreground flex-shrink-0">
                  {formatTimeAgo(activity.timestamp)}
                </span>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-foreground">{activity.content}</p>

                {activity.movie && (
                  <div className="flex items-center space-x-3 bg-muted/20 rounded-lg p-2">
                    <div className="w-12 h-16 rounded overflow-hidden flex-shrink-0">
                      <Image
                        src={activity.movie.poster}
                        alt={activity.movie.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="font-medium text-foreground text-sm truncate">{activity.movie.title}</h5>
                      <p className="text-xs text-muted-foreground">{activity.movie.year} • {activity.movie.genre}</p>
                      {activity.rating && (
                        <div className="flex items-center space-x-1 mt-1">
                          {renderStars(activity.rating)}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <button className="flex items-center space-x-1 hover:text-foreground transition-colors">
                    <Icon name="Heart" size={12} />
                    <span>{activity.likes || 0}</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-foreground transition-colors">
                    <Icon name="MessageCircle" size={12} />
                    <span>{activity.comments || 0}</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-foreground transition-colors">
                    <Icon name="Share2" size={12} />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredActivities.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Activity" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
          <p className="text-muted-foreground mb-4">
            {filter === 'all' ? 'No recent activity' : `No ${filter} activity found`}
          </p>
          <Button variant="outline" onClick={() => setFilter('all')}>
            Show All Activity
          </Button>
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" iconName="UserPlus" iconPosition="left">
            Find Friends
          </Button>
          <Button variant="outline" size="sm" iconName="Settings" iconPosition="left">
            Privacy Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SocialActivityFeed;