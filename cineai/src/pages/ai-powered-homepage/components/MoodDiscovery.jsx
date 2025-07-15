import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

import Button from '../../../components/ui/Button';
import { getMoodBasedMovies } from '../../../services/openai';
import { useStaggerAnimation } from '../../../hooks/useGSAP';

const MoodDiscovery = () => {
  const [selectedMood, setSelectedMood] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  
  const containerRef = useStaggerAnimation(0.1, 0.8);

  const moods = [
    { id: 'happy', name: 'Happy', icon: '😊', color: 'bg-yellow-500' },
    { id: 'sad', name: 'Sad', icon: '😢', color: 'bg-blue-500' },
    { id: 'excited', name: 'Excited', icon: '🤩', color: 'bg-orange-500' },
    { id: 'romantic', name: 'Romantic', icon: '💕', color: 'bg-pink-500' },
    { id: 'adventurous', name: 'Adventurous', icon: '🏃', color: 'bg-green-500' },
    { id: 'relaxed', name: 'Relaxed', icon: '😌', color: 'bg-purple-500' },
    { id: 'curious', name: 'Curious', icon: '🤔', color: 'bg-indigo-500' },
    { id: 'nostalgic', name: 'Nostalgic', icon: '🥺', color: 'bg-amber-500' }
  ];

  const genres = [
    'Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Sci-Fi', 'Thriller', 'Documentary'
  ];

  const handleMoodSearch = async () => {
    if (!selectedMood || !selectedGenre) return;

    setLoading(true);
    try {
      const response = await getMoodBasedMovies(selectedMood, selectedGenre);
      setMovies(response.movies || []);
      setShowResults(true);
    } catch (error) {
      console.error('Error fetching mood movies:', error);
      // Fallback to mock data
      setMovies([
        {
          title: "The Pursuit of Happyness",
          description: "A struggling salesman takes custody of his son as they're both about to be evicted from their apartment.",
          moodMatch: "Perfect for lifting your spirits with an inspiring story",
          rating: 8.0,
          genres: ["Drama", "Biography"]
        },
        {
          title: "Good Will Hunting",
          description: "A janitor at M.I.T. has a gift for mathematics but needs help from a psychologist to find direction in his life.",
          moodMatch: "Heartwarming story about personal growth and friendship",
          rating: 8.3,
          genres: ["Drama"]
        }
      ]);
      setShowResults(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Icon name="Heart" size={32} color="var(--color-accent)" />
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground font-accent">
              Mood-Based Discovery
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Let AI understand your current mood and discover the perfect movie to match your feelings
          </p>
        </div>

        <div ref={containerRef} className="space-y-8">
          {/* Mood Selection */}
          <div className="bg-card rounded-2xl p-6 shadow-movie-card">
            <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center space-x-2">
              <Icon name="Smile" size={20} className="text-accent" />
              <span>How are you feeling today?</span>
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
              {moods.map((mood) => (
                <button
                  key={mood.id}
                  onClick={() => setSelectedMood(mood.id)}
                  className={`p-4 rounded-xl transition-all duration-200 ${
                    selectedMood === mood.id
                      ? `${mood.color} text-white shadow-lg scale-105`
                      : 'bg-muted hover:bg-muted/80 text-muted-foreground'
                  }`}
                >
                  <div className="text-2xl mb-2">{mood.icon}</div>
                  <div className="text-sm font-medium">{mood.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Genre Selection */}
          <div className="bg-card rounded-2xl p-6 shadow-movie-card">
            <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center space-x-2">
              <Icon name="Film" size={20} className="text-accent" />
              <span>What genre interests you?</span>
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              {genres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => setSelectedGenre(genre)}
                  className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedGenre === genre
                      ? 'bg-accent text-accent-foreground shadow-lg'
                      : 'bg-muted hover:bg-muted/80 text-muted-foreground'
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          {/* Search Button */}
          <div className="text-center">
            <Button
              onClick={handleMoodSearch}
              disabled={!selectedMood || !selectedGenre || loading}
              size="lg"
              loading={loading}
              iconName="Search"
              iconPosition="left"
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              {loading ? 'Analyzing Your Mood...' : 'Find Perfect Movies'}
            </Button>
          </div>

          {/* Results */}
          {showResults && (
            <div className="bg-card rounded-2xl p-6 shadow-movie-card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-foreground flex items-center space-x-2">
                  <Icon name="Sparkles" size={20} className="text-accent" />
                  <span>Perfect Matches for Your Mood</span>
                </h3>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                  <span>AI-Powered Results</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {movies.map((movie, index) => (
                  <div key={index} className="group bg-muted/50 rounded-xl p-4 hover:bg-muted/70 transition-colors duration-200">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-24 bg-gradient-to-br from-accent to-accent/70 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon name="Film" size={24} className="text-accent-foreground" />
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground mb-1 group-hover:text-accent transition-colors">
                          {movie.title}
                        </h4>
                        
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="flex items-center space-x-1">
                            <Icon name="Star" size={14} className="text-yellow-400" />
                            <span className="text-sm text-muted-foreground">{movie.rating}</span>
                          </div>
                          <span className="text-muted-foreground">•</span>
                          <div className="flex space-x-1">
                            {movie.genres?.slice(0, 2).map((genre, idx) => (
                              <span key={idx} className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-full">
                                {genre}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {movie.description}
                        </p>
                        
                        <div className="flex items-start space-x-2 p-2 bg-accent/10 rounded-lg mb-3">
                          <Icon name="Brain" size={12} className="text-accent mt-0.5 flex-shrink-0" />
                          <p className="text-xs text-foreground">{movie.moodMatch}</p>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Link to="/immersive-booking-interface">
                            <Button size="sm" variant="outline" className="text-xs">
                              Book Now
                            </Button>
                          </Link>
                          <Button size="sm" variant="ghost" className="text-xs">
                            <Icon name="Heart" size={12} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <Link to="/intelligent-movie-catalog">
                  <Button variant="outline" iconName="ArrowRight" iconPosition="right">
                    Explore More Movies
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MoodDiscovery;