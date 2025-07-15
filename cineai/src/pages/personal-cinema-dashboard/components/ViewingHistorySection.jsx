import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ViewingHistorySection = ({ viewingHistory }) => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const filterOptions = [
    { value: 'all', label: 'All Movies', icon: 'Film' },
    { value: 'favorites', label: 'Favorites', icon: 'Heart' },
    { value: 'rated', label: 'Rated', icon: 'Star' },
    { value: 'recent', label: 'Recent', icon: 'Clock' }
  ];

  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'alphabetical', label: 'A-Z' }
  ];

  const filteredHistory = viewingHistory.filter(movie => {
    if (filter === 'all') return true;
    if (filter === 'favorites') return movie.isFavorite;
    if (filter === 'rated') return movie.userRating > 0;
    if (filter === 'recent') return new Date(movie.watchedDate) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    return true;
  });

  const sortedHistory = [...filteredHistory].sort((a, b) => {
    if (sortBy === 'recent') return new Date(b.watchedDate) - new Date(a.watchedDate);
    if (sortBy === 'rating') return b.userRating - a.userRating;
    if (sortBy === 'alphabetical') return a.title.localeCompare(b.title);
    return 0;
  });

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name={i < rating ? "Star" : "Star"}
        size={14}
        color={i < rating ? "var(--color-accent)" : "var(--color-muted-foreground)"}
        className={i < rating ? "fill-current" : ""}
      />
    ));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="bg-card rounded-xl p-6 shadow-movie-card border border-border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Viewing History</h3>
        <div className="flex items-center space-x-2">
          <Icon name="History" size={20} color="var(--color-muted-foreground)" />
          <span className="text-sm text-muted-foreground">{viewingHistory.length} movies watched</span>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex flex-wrap gap-2">
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

        <div className="flex items-center space-x-2 sm:ml-auto">
          <Icon name="ArrowUpDown" size={16} color="var(--color-muted-foreground)" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-muted/50 text-foreground text-sm rounded-lg px-3 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-accent"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Movie Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedHistory.map((movie) => (
          <div key={movie.id} className="border border-border rounded-lg p-4 hover:shadow-movie-card transition-shadow">
            <div className="flex space-x-3">
              <div className="w-16 h-24 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-foreground text-sm truncate">{movie.title}</h4>
                  <button className="flex-shrink-0 ml-2">
                    <Icon
                      name="Heart"
                      size={16}
                      color={movie.isFavorite ? "var(--color-error)" : "var(--color-muted-foreground)"}
                      className={movie.isFavorite ? "fill-current" : ""}
                    />
                  </button>
                </div>

                <p className="text-xs text-muted-foreground mb-2">{movie.genre} • {movie.year}</p>
                
                <div className="flex items-center space-x-1 mb-2">
                  {renderStars(movie.userRating)}
                </div>

                <p className="text-xs text-muted-foreground mb-3">
                  Watched on {formatDate(movie.watchedDate)}
                </p>

                <div className="flex items-center justify-between">
                  <Button variant="ghost" size="xs" iconName="RotateCcw" iconPosition="left">
                    Watch Again
                  </Button>
                  {!movie.hasReview && (
                    <Button variant="outline" size="xs" iconName="MessageSquare" iconPosition="left">
                      Review
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {sortedHistory.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Film" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
          <p className="text-muted-foreground mb-4">No movies found for the selected filter</p>
          <Button variant="outline" onClick={() => setFilter('all')}>
            Show All Movies
          </Button>
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-border">
        <Button variant="outline" fullWidth iconName="ExternalLink" iconPosition="left">
          View Complete History
        </Button>
      </div>
    </div>
  );
};

export default ViewingHistorySection;