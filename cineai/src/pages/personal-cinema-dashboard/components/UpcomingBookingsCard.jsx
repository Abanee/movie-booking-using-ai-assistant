import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const UpcomingBookingsCard = ({ bookings }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const calculateCountdown = (showtime) => {
    const now = currentTime;
    const showDate = new Date(showtime);
    const diff = showDate - now;

    if (diff <= 0) return 'Show Started';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const getWeatherSuggestion = (weather) => {
    const suggestions = {
      'rainy': { icon: 'CloudRain', text: 'Perfect weather for indoor cinema!' },
      'sunny': { icon: 'Sun', text: 'Great day for a matinee show!' },
      'cloudy': { icon: 'Cloud', text: 'Cozy weather for movie watching!' }
    };
    return suggestions[weather] || suggestions['cloudy'];
  };

  if (!bookings || bookings.length === 0) {
    return (
      <div className="bg-card rounded-xl p-6 shadow-movie-card border border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Upcoming Bookings</h3>
          <Icon name="Calendar" size={20} color="var(--color-muted-foreground)" />
        </div>
        <div className="text-center py-8">
          <Icon name="CalendarX" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
          <p className="text-muted-foreground mb-4">No upcoming bookings</p>
          <Button variant="outline" iconName="Plus" iconPosition="left">
            Book a Movie
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl p-6 shadow-movie-card border border-border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Upcoming Bookings</h3>
        <div className="flex items-center space-x-2">
          <Icon name="Calendar" size={20} color="var(--color-muted-foreground)" />
          <span className="text-sm text-muted-foreground">{bookings.length} booking{bookings.length !== 1 ? 's' : ''}</span>
        </div>
      </div>

      <div className="space-y-4">
        {bookings.map((booking) => {
          const weatherSuggestion = getWeatherSuggestion(booking.weather);
          const countdown = calculateCountdown(booking.showtime);
          
          return (
            <div key={booking.id} className="border border-border rounded-lg p-4 hover:shadow-movie-card transition-shadow">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-24 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={booking.poster}
                    alt={booking.movieTitle}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-foreground truncate">{booking.movieTitle}</h4>
                      <p className="text-sm text-muted-foreground">{booking.theater}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-sm font-medium text-accent">{countdown}</div>
                      <div className="text-xs text-muted-foreground">remaining</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div className="flex items-center space-x-2">
                      <Icon name="Calendar" size={14} color="var(--color-muted-foreground)" />
                      <span className="text-sm text-foreground">{booking.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Clock" size={14} color="var(--color-muted-foreground)" />
                      <span className="text-sm text-foreground">{booking.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="MapPin" size={14} color="var(--color-muted-foreground)" />
                      <span className="text-sm text-foreground">{booking.seats}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Users" size={14} color="var(--color-muted-foreground)" />
                      <span className="text-sm text-foreground">{booking.tickets} ticket{booking.tickets !== 1 ? 's' : ''}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <Icon name={weatherSuggestion.icon} size={14} />
                      <span>{weatherSuggestion.text}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" iconName="Edit" iconPosition="left">
                        Modify
                      </Button>
                      <Button variant="outline" size="sm" iconName="Navigation" iconPosition="left">
                        Directions
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <Button variant="outline" fullWidth iconName="Plus" iconPosition="left">
          Book Another Movie
        </Button>
      </div>
    </div>
  );
};

export default UpcomingBookingsCard;