import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import { getMovieRecommendations } from '../../../services/openai';
import { useStaggerAnimation } from '../../../hooks/useGSAP';

const AIRecommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const containerRef = useStaggerAnimation(0.1, 0.8);

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      // Get user preferences from localStorage or use defaults
      const userPreferences = JSON.parse(localStorage.getItem('cineai_preferences') || JSON.stringify({
        favoriteGenres: ['Action', 'Drama', 'Comedy'],
        preferredRatings: ['PG-13', 'R'],
        watchHistory: ['The Dark Knight', 'Inception', 'Interstellar']
      }));

      const response = await getMovieRecommendations(userPreferences);
      setRecommendations(response.recommendations || []);
    } catch (err) {
      console.error('Error fetching recommendations:', err);
      setError('Failed to load recommendations');
      // Fallback to mock data
      setRecommendations([
        {
          title: "The Dark Knight",
          genre: ["Action", "Drama"],
          rating: 9.0,
          description: "Batman raises the stakes in his war on crime with the help of Lt. Jim Gordon and District Attorney Harvey Dent.",
          cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
          aiReason: "Based on your love for complex superhero stories and psychological thrillers",
          poster: "https://images.unsplash.com/photo-1489599917821-3ef70ebba2f4?w=400&h=600&fit=crop",
          runtime: 152,
          year: 2008
        },
        {
          title: "Inception",
          genre: ["Sci-Fi", "Action"],
          rating: 8.8,
          description: "A thief who enters people's dreams to steal secrets from their subconscious gets a final job.",
          cast: ["Leonardo DiCaprio", "Marion Cotillard", "Tom Hardy"],
          aiReason: "Perfect match for your preference for mind-bending narratives and visual spectacle",
          poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
          runtime: 148,
          year: 2010
        },
        {
          title: "Parasite",
          genre: ["Drama", "Thriller"],
          rating: 8.6,
          description: "A poor family schemes to become employed by a wealthy family by infiltrating their household.",
          cast: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong"],
          aiReason: "Recommended for your appreciation of socially conscious storytelling and suspense",
          poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=600&fit=crop",
          runtime: 132,
          year: 2019
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(recommendations.length / 3));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(recommendations.length / 3)) % Math.ceil(recommendations.length / 3));
  };

  if (loading) {
    return (
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 font-accent">
              AI-Powered Recommendations
            </h2>
            <div className="flex justify-center items-center space-x-2">
              <div className="w-6 h-6 bg-accent rounded-full animate-pulse"></div>
              <p className="text-muted-foreground">Analyzing your preferences...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Icon name="AlertCircle" size={48} className="text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">Unable to Load Recommendations</h3>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={fetchRecommendations} variant="outline">
              Try Again
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Icon name="Sparkles" size={32} color="var(--color-accent)" />
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground font-accent">
              AI-Powered Recommendations
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover your next favorite movie with personalized recommendations powered by artificial intelligence
          </p>
        </div>

        {/* Recommendations Carousel */}
        <div ref={containerRef} className="relative">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2">
              <Icon name="Brain" size={20} className="text-accent" />
              <h3 className="text-xl font-semibold text-foreground">Curated For You</h3>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={prevSlide}
                className="p-2"
              >
                <Icon name="ChevronLeft" size={16} />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={nextSlide}
                className="p-2"
              >
                <Icon name="ChevronRight" size={16} />
              </Button>
            </div>
          </div>

          {/* Movies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.slice(currentSlide * 3, (currentSlide + 1) * 3).map((movie, index) => (
              <div 
                key={index}
                className="group bg-card rounded-xl overflow-hidden shadow-movie-card hover:shadow-cinematic transition-all duration-300 movie-card-hover"
              >
                {/* Movie Poster */}
                <div className="relative aspect-[2/3] overflow-hidden">
                  <Image
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  
                  {/* AI Badge */}
                  <div className="absolute top-3 left-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                    <Icon name="Sparkles" size={12} />
                    <span>AI Pick</span>
                  </div>

                  {/* Rating */}
                  <div className="absolute top-3 right-3 bg-black/80 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                    <Icon name="Star" size={12} className="text-yellow-400" />
                    <span>{movie.rating}</span>
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Link to="/immersive-booking-interface">
                      <Button 
                        variant="default" 
                        size="sm"
                        iconName="Ticket"
                        iconPosition="left"
                        className="bg-accent hover:bg-accent/90 text-accent-foreground"
                      >
                        Book Now
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Movie Info */}
                <div className="p-4">
                  <h4 className="font-semibold text-foreground mb-2 line-clamp-1">
                    {movie.title}
                  </h4>
                  
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                    <span>{movie.year}</span>
                    <span>•</span>
                    <span>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</span>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {movie.genre?.slice(0, 2).map((genre, idx) => (
                      <span key={idx} className="bg-muted text-muted-foreground px-2 py-1 rounded-full text-xs">
                        {genre}
                      </span>
                    ))}
                  </div>

                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {movie.description}
                  </p>

                  {/* AI Reason */}
                  <div className="flex items-start space-x-2 p-3 bg-accent/10 rounded-lg">
                    <Icon name="Brain" size={14} className="text-accent mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-foreground">{movie.aiReason}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-8">
            <Link to="/intelligent-movie-catalog">
              <Button
                variant="outline"
                size="lg"
                iconName="ArrowRight"
                iconPosition="right"
                className="hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
              >
                View All AI Recommendations
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIRecommendations;