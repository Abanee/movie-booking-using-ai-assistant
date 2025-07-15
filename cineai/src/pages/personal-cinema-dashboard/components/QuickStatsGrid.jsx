import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickStatsGrid = ({ stats }) => {
  const statItems = [
    {
      id: 'movies-watched',
      label: 'Movies Watched',
      value: stats.moviesWatched,
      change: stats.moviesWatchedChange,
      icon: 'Film',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      id: 'total-spent',
      label: 'Total Spent',
      value: `$${stats.totalSpent}`,
      change: stats.totalSpentChange,
      icon: 'DollarSign',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      id: 'favorite-genre',
      label: 'Favorite Genre',
      value: stats.favoriteGenre,
      subValue: `${stats.favoriteGenrePercentage}% of watches`,
      icon: 'Heart',
      color: 'text-error',
      bgColor: 'bg-error/10'
    },
    {
      id: 'avg-rating',
      label: 'Avg Rating Given',
      value: `${stats.avgRating}/5`,
      subValue: `${stats.totalReviews} reviews`,
      icon: 'Star',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      id: 'upcoming-bookings',
      label: 'Upcoming Bookings',
      value: stats.upcomingBookings,
      subValue: stats.nextBookingDate ? `Next: ${stats.nextBookingDate}` : 'None scheduled',
      icon: 'Calendar',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      id: 'loyalty-points',
      label: 'Loyalty Points',
      value: stats.loyaltyPoints.toLocaleString(),
      subValue: `${stats.loyaltyTier} Member`,
      icon: 'Award',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    }
  ];

  const getChangeIcon = (change) => {
    if (change > 0) return { icon: 'TrendingUp', color: 'text-success' };
    if (change < 0) return { icon: 'TrendingDown', color: 'text-error' };
    return { icon: 'Minus', color: 'text-muted-foreground' };
  };

  const formatChange = (change) => {
    if (change === 0) return 'No change';
    const prefix = change > 0 ? '+' : '';
    return `${prefix}${change}% this month`;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {statItems.map((stat) => (
        <div key={stat.id} className="bg-card rounded-xl p-6 shadow-movie-card border border-border hover:shadow-cinematic transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
              <Icon name={stat.icon} size={24} color={`var(--color-${stat.color.replace('text-', '')})`} />
            </div>
            {stat.change !== undefined && (
              <div className="flex items-center space-x-1">
                <Icon 
                  name={getChangeIcon(stat.change).icon} 
                  size={16} 
                  color={`var(--color-${getChangeIcon(stat.change).color.replace('text-', '')})`} 
                />
                <span className={`text-xs font-medium ${getChangeIcon(stat.change).color}`}>
                  {Math.abs(stat.change)}%
                </span>
              </div>
            )}
          </div>

          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-foreground">{stat.value}</h3>
            <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
            {stat.subValue && (
              <p className="text-xs text-muted-foreground">{stat.subValue}</p>
            )}
            {stat.change !== undefined && (
              <p className="text-xs text-muted-foreground">{formatChange(stat.change)}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickStatsGrid;