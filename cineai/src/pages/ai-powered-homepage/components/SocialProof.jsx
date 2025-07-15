import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const SocialProof = () => {
  const [liveActivity, setLiveActivity] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [activeTab, setActiveTab] = useState('live');

  const mockLiveActivity = [
    {
      id: 1,
      user: "Sarah M.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b9e8c8b4?w=40&h=40&fit=crop&crop=face",
      action: "just booked",
      movie: "Dune: Part Two",
      theater: "IMAX Downtown",
      time: "2 minutes ago",
      location: "New York"
    },
    {
      id: 2,
      user: "Mike R.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      action: "rated 5 stars",
      movie: "Oppenheimer",
      theater: "Premium Cinema",
      time: "5 minutes ago",
      location: "Los Angeles"
    },
    {
      id: 3,
      user: "Emma L.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      action: "added to wishlist",
      movie: "Spider-Man: Across the Spider-Verse",
      theater: "Cineplex Mall",
      time: "8 minutes ago",
      location: "Chicago"
    },
    {
      id: 4,
      user: "Alex K.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      action: "just booked",
      movie: "John Wick: Chapter 4",
      theater: "Action Theater",
      time: "12 minutes ago",
      location: "Miami"
    },
    {
      id: 5,
      user: "Lisa P.",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face",
      action: "shared review",
      movie: "Everything Everywhere All at Once",
      theater: "Art House Cinema",
      time: "15 minutes ago",
      location: "Seattle"
    }
  ];

  const mockTrendingMovies = [
    {
      id: 1,
      title: "Dune: Part Two",
      poster: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=200&h=300&fit=crop",
      bookings: 1247,
      trend: "+23%",
      rating: 8.7,
      theaters: 156
    },
    {
      id: 2,
      title: "Oppenheimer",
      poster: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?w=200&h=300&fit=crop",
      bookings: 1089,
      trend: "+18%",
      rating: 8.4,
      theaters: 142
    },
    {
      id: 3,
      title: "Spider-Man: Across the Spider-Verse",
      poster: "https://images.pixabay.com/photo/2016/11/29/05/45/astronomy-1867616_1280.jpg?w=200&h=300&fit=crop",
      bookings: 967,
      trend: "+31%",
      rating: 8.9,
      theaters: 134
    },
    {
      id: 4,
      title: "John Wick: Chapter 4",
      poster: "https://images.unsplash.com/photo-1489599162946-648229197d0e?w=200&h=300&fit=crop",
      bookings: 834,
      trend: "+15%",
      rating: 7.8,
      theaters: 128
    }
  ];

  useEffect(() => {
    setLiveActivity(mockLiveActivity);
    setTrendingMovies(mockTrendingMovies);

    // Simulate real-time updates
    const interval = setInterval(() => {
      const newActivity = {
        id: Date.now(),
        user: ["John D.", "Maria S.", "David W.", "Anna K."][Math.floor(Math.random() * 4)],
        avatar: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 100000000)}?w=40&h=40&fit=crop&crop=face`,
        action: ["just booked", "rated 5 stars", "added to wishlist"][Math.floor(Math.random() * 3)],
        movie: ["Dune: Part Two", "Oppenheimer", "Spider-Man"][Math.floor(Math.random() * 3)],
        theater: "Cinema Complex",
        time: "just now",
        location: ["New York", "LA", "Chicago"][Math.floor(Math.random() * 3)]
      };

      setLiveActivity(prev => [newActivity, ...prev.slice(0, 4)]);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Join the Community
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See what movie lovers are watching and discover trending films in real-time
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-muted rounded-lg p-1">
            <button
              onClick={() => setActiveTab('live')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === 'live' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name="Activity" size={16} className="inline mr-2" />
              Live Activity
            </button>
            <button
              onClick={() => setActiveTab('trending')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === 'trending' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name="TrendingUp" size={16} className="inline mr-2" />
              Trending Now
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Live Activity Feed */}
          {activeTab === 'live' && (
            <div className="lg:col-span-2">
              <div className="bg-card rounded-xl p-6 shadow-movie-card">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-foreground flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                    Live Activity Feed
                  </h3>
                  <span className="text-sm text-muted-foreground">
                    Updates every few seconds
                  </span>
                </div>

                <div className="space-y-4">
                  {liveActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center space-x-4 p-4 bg-background rounded-lg hover:bg-muted/50 transition-colors duration-200"
                    >
                      <Image
                        src={activity.avatar}
                        alt={activity.user}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      
                      <div className="flex-1">
                        <p className="text-sm text-foreground">
                          <span className="font-semibold">{activity.user}</span>
                          <span className="text-muted-foreground"> {activity.action} </span>
                          <span className="font-medium text-accent">{activity.movie}</span>
                          <span className="text-muted-foreground"> at {activity.theater}</span>
                        </p>
                        <div className="flex items-center space-x-3 mt-1">
                          <span className="text-xs text-muted-foreground flex items-center">
                            <Icon name="Clock" size={12} className="mr-1" />
                            {activity.time}
                          </span>
                          <span className="text-xs text-muted-foreground flex items-center">
                            <Icon name="MapPin" size={12} className="mr-1" />
                            {activity.location}
                          </span>
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="ExternalLink"
                        className="text-muted-foreground hover:text-foreground"
                      />
                    </div>
                  ))}
                </div>

                <div className="text-center mt-6">
                  <Button
                    variant="outline"
                    iconName="RefreshCw"
                    iconPosition="left"
                  >
                    Load More Activity
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Trending Movies */}
          {activeTab === 'trending' && (
            <div className="lg:col-span-2">
              <div className="bg-card rounded-xl p-6 shadow-movie-card">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-foreground">
                    Trending Movies This Week
                  </h3>
                  <span className="text-sm text-muted-foreground">
                    Updated hourly
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {trendingMovies.map((movie, index) => (
                    <div
                      key={movie.id}
                      className="bg-background rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200 group"
                    >
                      <div className="relative">
                        <Image
                          src={movie.poster}
                          alt={movie.title}
                          className="w-full aspect-[2/3] object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        
                        {/* Rank Badge */}
                        <div className="absolute top-3 left-3 w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-bold text-sm">
                          {index + 1}
                        </div>

                        {/* Trend Indicator */}
                        <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
                          <Icon name="TrendingUp" size={12} className="mr-1" />
                          {movie.trend}
                        </div>
                      </div>

                      <div className="p-4">
                        <h4 className="font-semibold text-foreground mb-2 line-clamp-1">
                          {movie.title}
                        </h4>
                        
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div className="flex items-center justify-between">
                            <span className="flex items-center">
                              <Icon name="Ticket" size={14} className="mr-1" />
                              {movie.bookings.toLocaleString()} bookings
                            </span>
                            <div className="flex items-center">
                              <Icon name="Star" size={14} color="var(--color-accent)" className="mr-1" />
                              {movie.rating}
                            </div>
                          </div>
                          
                          <div className="flex items-center">
                            <Icon name="MapPin" size={14} className="mr-1" />
                            {movie.theaters} theaters
                          </div>
                        </div>

                        <Link to="/immersive-booking-interface" className="block mt-4">
                          <Button
                            variant="default"
                            size="sm"
                            fullWidth
                            iconName="Ticket"
                            iconPosition="left"
                          >
                            Book Now
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Community Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-card rounded-lg shadow-movie-card">
            <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon name="Users" size={24} color="var(--color-accent)" />
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">2.4M+</div>
            <div className="text-sm text-muted-foreground">Active Users</div>
          </div>

          <div className="text-center p-6 bg-card rounded-lg shadow-movie-card">
            <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon name="Ticket" size={24} color="var(--color-accent)" />
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">15.7K</div>
            <div className="text-sm text-muted-foreground">Tickets Today</div>
          </div>

          <div className="text-center p-6 bg-card rounded-lg shadow-movie-card">
            <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon name="Star" size={24} color="var(--color-accent)" />
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">4.8</div>
            <div className="text-sm text-muted-foreground">Avg Rating</div>
          </div>

          <div className="text-center p-6 bg-card rounded-lg shadow-movie-card">
            <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon name="MapPin" size={24} color="var(--color-accent)" />
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">850+</div>
            <div className="text-sm text-muted-foreground">Partner Theaters</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;