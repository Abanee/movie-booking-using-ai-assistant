import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MovieListView = ({ movies, onBookNow }) => {
  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const getMatchScore = () => {
    return Math.floor(Math.random() * 20) + 80;
  };

  const getRatingColor = (rating) => {
    if (rating >= 8.0) return 'text-green-500';
    if (rating >= 7.0) return 'text-yellow-500';
    if (rating >= 6.0) return 'text-orange-500';
    return 'text-red-500';
  };

  return (
    <div className="space-y-4">
      {movies.map((movie) => (
        <div key={movie.id} className="bg-card rounded-xl p-6 shadow-movie-card hover:shadow-cinematic transition-all duration-300">
          <div className="flex space-x-6">
            {/* Movie Poster */}
            <div className="w-24 h-36 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={movie.poster}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Movie Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-1">{movie.title}</h3>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>{movie.year}</span>
                    <span>{formatRuntime(movie.runtime)}</span>
                    <span className="bg-muted px-2 py-1 rounded">{movie.rating_text}</span>
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={14} className={getRatingColor(movie.rating)} />
                      <span className="text-foreground font-medium">{movie.rating}</span>
                    </div>
                  </div>
                </div>

                {/* AI Match Score */}
                <div className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
                  <Icon name="Sparkles" size={14} />
                  <span>{getMatchScore()}% Match</span>
                </div>
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-2 mb-3">
                {movie.genres.map((genre, index) => (
                  <span key={index} className="bg-muted text-muted-foreground px-2 py-1 rounded-full text-xs">
                    {genre}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="text-muted-foreground mb-4 line-clamp-2">
                {movie.description}
              </p>

              {/* AI Recommendation */}
              <div className="flex items-start space-x-2 mb-4 p-3 bg-accent/10 rounded-lg">
                <Icon name="Brain" size={16} className="text-accent mt-0.5 flex-shrink-0" />
                <p className="text-sm text-foreground">
                  {movie.aiReason}
                </p>
              </div>

              {/* Cast */}
              <div className="mb-4">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Cast:</span> {movie.cast.slice(0, 4).join(', ')}
                </p>
              </div>

              {/* Showtimes and Actions */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground mb-2">Next Showtimes Today:</p>
                  <div className="flex space-x-2">
                    {movie.showtimes.slice(0, 4).map((time, index) => (
                      <button
                        key={index}
                        className="px-3 py-1 text-sm bg-muted text-muted-foreground rounded hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Heart"
                  >
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Share"
                  >
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => onBookNow(movie)}
                    iconName="Ticket"
                    iconPosition="left"
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieListView;