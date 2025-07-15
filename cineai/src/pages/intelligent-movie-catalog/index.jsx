import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import MovieCard from './components/MovieCard';
import BookingPanel from './components/BookingPanel';
import SortOptions from './components/SortOptions';
import MovieListView from './components/MovieListView';

const IntelligentMovieCatalog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    genres: [],
    rating: '',
    year: '',
    runtime: '',
    mood: '',
    aiRecommended: false,
    newReleases: false,
    highRated: false
  });
  const [sortBy, setSortBy] = useState('ai-recommended');
  const [viewMode, setViewMode] = useState('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock movie data
  const mockMovies = [
    {
      id: 1,
      title: "Dune: Part Two",
      year: 2024,
      rating: 8.7,
      rating_text: "PG-13",
      runtime: 166,
      genres: ["Sci-Fi", "Adventure", "Drama"],
      poster: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop",
      description: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
      cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson", "Oscar Isaac"],
      director: "Denis Villeneuve",
      aiReason: "Perfect match for your love of epic sci-fi adventures with stunning visuals and complex storytelling.",
      showtimes: ["2:30 PM", "5:45 PM", "8:30 PM", "11:15 PM"]
    },
    {
      id: 2,
      title: "The Batman",
      year: 2022,
      rating: 7.8,
      rating_text: "PG-13",
      runtime: 176,
      genres: ["Action", "Crime", "Drama"],
      poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop",
      description: "Batman ventures into Gotham City\'s underworld when a sadistic killer leaves behind a trail of cryptic clues.",
      cast: ["Robert Pattinson", "Zoë Kravitz", "Paul Dano", "Jeffrey Wright"],
      director: "Matt Reeves",
      aiReason: "Recommended because you enjoyed dark, gritty superhero films with psychological depth.",
      showtimes: ["1:15 PM", "4:30 PM", "7:45 PM", "10:30 PM"]
    },
    {
      id: 3,
      title: "Everything Everywhere All at Once",
      year: 2022,
      rating: 7.8,
      rating_text: "R",
      runtime: 139,
      genres: ["Action", "Adventure", "Comedy"],
      poster: "https://images.unsplash.com/photo-1489599735734-79b4169c4388?w=400&h=600&fit=crop",
      description: "A Chinese-American laundromat owner is swept up in an insane adventure where she alone can save the world.",
      cast: ["Michelle Yeoh", "Stephanie Hsu", "Ke Huy Quan", "Jamie Lee Curtis"],
      director: "Daniels",
      aiReason: "Matches your preference for innovative storytelling and genre-blending films with emotional depth.",
      showtimes: ["3:00 PM", "6:15 PM", "9:00 PM"]
    },
    {
      id: 4,
      title: "Top Gun: Maverick",
      year: 2022,
      rating: 8.3,
      rating_text: "PG-13",
      runtime: 130,
      genres: ["Action", "Drama"],
      poster: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=400&h=600&fit=crop",
      description: "After thirty years, Maverick is still pushing the envelope as a top naval aviator, training a new generation.",
      cast: ["Tom Cruise", "Miles Teller", "Jennifer Connelly", "Jon Hamm"],
      director: "Joseph Kosinski",
      aiReason: "Great choice for your love of high-octane action films with strong character development.",
      showtimes: ["2:00 PM", "5:30 PM", "8:15 PM", "10:45 PM"]
    },
    {
      id: 5,
      title: "Oppenheimer",
      year: 2023,
      rating: 8.4,
      rating_text: "R",
      runtime: 180,
      genres: ["Biography", "Drama", "History"],
      poster: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
      description: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
      cast: ["Cillian Murphy", "Emily Blunt", "Matt Damon", "Robert Downey Jr."],
      director: "Christopher Nolan",
      aiReason: "Recommended for your appreciation of complex historical dramas and Christopher Nolan\'s filmmaking.",
      showtimes: ["1:30 PM", "5:00 PM", "8:30 PM"]
    },
    {
      id: 6,
      title: "Spider-Man: No Way Home",
      year: 2021,
      rating: 8.2,
      rating_text: "PG-13",
      runtime: 148,
      genres: ["Action", "Adventure", "Fantasy"],
      poster: "https://images.unsplash.com/photo-1635863138275-d9864d29c6cb?w=400&h=600&fit=crop",
      description: "With Spider-Man's identity revealed, Peter asks Doctor Strange for help, but a spell goes wrong.",
      cast: ["Tom Holland", "Zendaya", "Benedict Cumberbatch", "Jacob Batalon"],
      director: "Jon Watts",
      aiReason: "Perfect for your love of Marvel superhero films with multiverse storytelling.",
      showtimes: ["2:45 PM", "6:00 PM", "9:15 PM"]
    },
    {
      id: 7,
      title: "The Menu",
      year: 2022,
      rating: 7.2,
      rating_text: "R",
      runtime: 107,
      genres: ["Comedy", "Horror", "Thriller"],
      poster: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=600&fit=crop",
      description: "A young couple travels to a remote island to eat at an exclusive restaurant where the chef has prepared a lavish menu.",
      cast: ["Anya Taylor-Joy", "Ralph Fiennes", "Nicholas Hoult", "Hong Chau"],
      director: "Mark Mylod",
      aiReason: "Matches your taste for psychological thrillers with dark comedy elements.",
      showtimes: ["4:15 PM", "7:30 PM", "10:00 PM"]
    },
    {
      id: 8,
      title: "Avatar: The Way of Water",
      year: 2022,
      rating: 7.6,
      rating_text: "PG-13",
      runtime: 192,
      genres: ["Action", "Adventure", "Fantasy"],
      poster: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=600&fit=crop",
      description: "Jake Sully lives with his newfound family formed on the extrasolar moon Pandora.",
      cast: ["Sam Worthington", "Zoe Saldana", "Sigourney Weaver", "Stephen Lang"],
      director: "James Cameron",
      aiReason: "Recommended for your love of visually stunning epic adventures with environmental themes.",
      showtimes: ["1:00 PM", "4:45 PM", "8:30 PM"]
    }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setMovies(mockMovies);
      setFilteredMovies(mockMovies);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    filterAndSortMovies();
  }, [movies, filters, sortBy, searchQuery]);

  const filterAndSortMovies = () => {
    let filtered = [...movies];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(movie =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.genres.some(genre => genre.toLowerCase().includes(searchQuery.toLowerCase())) ||
        movie.cast.some(actor => actor.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Genre filter
    if (filters.genres.length > 0) {
      filtered = filtered.filter(movie =>
        filters.genres.some(genre => movie.genres.includes(genre))
      );
    }

    // Rating filter
    if (filters.rating) {
      filtered = filtered.filter(movie => movie.rating_text === filters.rating);
    }

    // Year filter
    if (filters.year) {
      if (filters.year === '2024') {
        filtered = filtered.filter(movie => movie.year === 2024);
      } else if (filters.year === '2023') {
        filtered = filtered.filter(movie => movie.year === 2023);
      } else if (filters.year === '2022') {
        filtered = filtered.filter(movie => movie.year === 2022);
      }
    }

    // High rated filter
    if (filters.highRated) {
      filtered = filtered.filter(movie => movie.rating >= 8.0);
    }

    // Sort movies
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return b.year - a.year;
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        case 'runtime-short':
          return a.runtime - b.runtime;
        case 'runtime-long':
          return b.runtime - a.runtime;
        default:
          return 0;
      }
    });

    setFilteredMovies(filtered);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleBookNow = (movie) => {
    setSelectedMovie(movie);
    setIsBookingOpen(true);
  };

  const handleBookingComplete = (bookingData) => {
    console.log('Booking completed:', bookingData);
    // Handle booking completion
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.genres.length > 0) count++;
    if (filters.rating) count++;
    if (filters.year) count++;
    if (filters.runtime) count++;
    if (filters.mood) count++;
    if (filters.aiRecommended) count++;
    if (filters.newReleases) count++;
    if (filters.highRated) count++;
    return count;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading movie catalog...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-muted/50 to-background py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Discover Your Perfect Movie
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                AI-powered recommendations tailored to your taste. Find exactly what you're in the mood for.
              </p>
            </div>

            {/* Search Bar */}
            <SearchBar
              onSearch={handleSearch}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>
        </section>

        {/* Filters and Controls */}
        <section className="py-6 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  onClick={() => setIsFilterOpen(true)}
                  iconName="Filter"
                  iconPosition="left"
                >
                  Filters
                  {getActiveFiltersCount() > 0 && (
                    <span className="ml-2 bg-accent text-accent-foreground px-2 py-0.5 rounded-full text-xs">
                      {getActiveFiltersCount()}
                    </span>
                  )}
                </Button>
                
                {searchQuery && (
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <span>Searching for:</span>
                    <span className="bg-accent/10 text-accent px-2 py-1 rounded">
                      "{searchQuery}"
                    </span>
                  </div>
                )}
              </div>

              <div className="text-sm text-muted-foreground">
                {filteredMovies.length} movies found
              </div>
            </div>

            <SortOptions
              sortBy={sortBy}
              onSortChange={setSortBy}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />
          </div>
        </section>

        {/* Movies Grid/List */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredMovies.length === 0 ? (
              <div className="text-center py-12">
                <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No movies found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filters to find more movies.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('');
                    setFilters({
                      genres: [],
                      rating: '',
                      year: '',
                      runtime: '',
                      mood: '',
                      aiRecommended: false,
                      newReleases: false,
                      highRated: false
                    });
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredMovies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onBookNow={handleBookNow}
                  />
                ))}
              </div>
            ) : (
              <MovieListView
                movies={filteredMovies}
                onBookNow={handleBookNow}
              />
            )}
          </div>
        </section>
      </main>

      {/* Filter Panel */}
      <FilterPanel
        filters={filters}
        onFiltersChange={setFilters}
        isOpen={isFilterOpen}
        onToggle={() => setIsFilterOpen(!isFilterOpen)}
      />

      {/* Booking Panel */}
      <BookingPanel
        movie={selectedMovie}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        onBookingComplete={handleBookingComplete}
      />

      {/* Filter Overlay */}
      {isFilterOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
          onClick={() => setIsFilterOpen(false)}
        />
      )}
    </div>
  );
};

export default IntelligentMovieCatalog;