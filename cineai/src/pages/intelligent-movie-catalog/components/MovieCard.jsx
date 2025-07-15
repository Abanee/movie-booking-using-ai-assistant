import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import { useHoverAnimation } from '../../../hooks/useGSAP';

const MovieCard = ({ movie, onBookNow }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useHoverAnimation({ scale: 1.05, duration: 0.3 });

  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const getMatchScore = () => {
    return Math.floor(Math.random() * 20) + 80; // Mock AI match score 80-100%
  };

  const getRatingColor = (rating) => {
    if (rating >= 8.0) return 'text-green-500';
    if (rating >= 7.0) return 'text-yellow-500';
    if (rating >= 6.0) return 'text-orange-500';
    return 'text-red-500';
  };

  return (
    <div
      ref={cardRef}
      className="group relative bg-card rounded-xl overflow-hidden shadow-movie-card hover:shadow-cinematic transition-all duration-300 movie-card-hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Movie Poster */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <Image
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* AI Match Score Badge */}
        <div className="absolute top-3 left-3 bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
          <Icon name="Sparkles" size={12} />
          <span>{getMatchScore()}% Match</span>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
          <Icon name="Star" size={12} className={getRatingColor(movie.rating)} />
          <span className="text-foreground">{movie.rating}</span>
        </div>

        {/* Hover Overlay */}
        <div className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              variant="default"
              size="sm"
              iconName="Play"
              iconPosition="left"
              className="mb-2 bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              Watch Trailer
            </Button>
          </div>
          
          {/* Quick Info */}
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <div className="flex items-center space-x-4 text-xs mb-2">
              <span className="flex items-center space-x-1">
                <Icon name="Clock" size={12} />
                <span>{formatRuntime(movie.runtime)}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Icon name="Calendar" size={12} />
                <span>{movie.year}</span>
              </span>
              <span className="bg-white/20 px-2 py-0.5 rounded text-xs">{movie.rating_text}</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {movie.genres?.slice(0, 3).map((genre, index) => (
                <span key={index} className="bg-accent/80 text-accent-foreground px-2 py-0.5 rounded-full text-xs">
                  {genre}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Movie Info */}
      <div className="p-4">
        <h3 className="font-semibold text-foreground mb-1 line-clamp-1 group-hover:text-accent transition-colors duration-200">
          {movie.title}
        </h3>
        
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {movie.description}
        </p>

        {/* AI Recommendation Reason */}
        <div className="flex items-start space-x-2 mb-3 p-2 bg-accent/10 rounded-lg">
          <Icon name="Brain" size={14} className="text-accent mt-0.5 flex-shrink-0" />
          <p className="text-xs text-foreground">
            {movie.aiReason || "AI recommends this based on your viewing history and preferences"}
          </p>
        </div>

        {/* Cast */}
        <div className="mb-3">
          <p className="text-xs text-muted-foreground">
            <span className="font-medium">Cast:</span> {movie.cast?.slice(0, 3).join(', ')}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Link to="/immersive-booking-interface" className="flex-1">
            <Button
              variant="default"
              size="sm"
              fullWidth
              onClick={() => onBookNow?.(movie)}
              iconName="Ticket"
              iconPosition="left"
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              Book Now
            </Button>
          </Link>
          <Button
            variant="outline"
            size="sm"
            iconName="Heart"
            className="hover:bg-red-500 hover:text-white hover:border-red-500"
          >
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Share"
            className="hover:bg-blue-500 hover:text-white hover:border-blue-500"
          >
          </Button>
        </div>

        {/* Showtimes Preview */}
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-foreground">Next Showtimes</span>
            <span className="text-xs text-muted-foreground">Today</span>
          </div>
          <div className="flex space-x-2">
            {(movie.showtimes || ['2:00 PM', '5:30 PM', '8:00 PM']).slice(0, 3).map((time, index) => (
              <button
                key={index}
                className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;