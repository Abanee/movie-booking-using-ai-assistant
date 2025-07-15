import axios from 'axios';

class MoodMovieAgent {
  constructor() {
    this.apiKey = import.meta.env.VITE_TMDB_API_KEY || "62e3872ba06b5527996169c20aed51c7";
    this.baseURL = "https://api.themoviedb.org/3";
    this.imageBaseURL = "https://image.tmdb.org/t/p/w500";
    
    this.genreIds = {
      "feel_good": 35,        // Comedy
      "happy": 35,            // Comedy
      "bored": 35,            // Comedy
      "action": 28,           // Action
      "angry": 28,            // Action
      "romance": 10749,       // Romance
      "sad": 10749,           // Romance
      "drama": 18,            // Drama
      "love_failure": 18,     // Drama
      "adventure": 12,        // Adventure
      "thriller": 53,         // Thriller
      "horror": 27,           // Horror
      "animated": 16,         // Animation
      "family": 10751,        // Family
      "sci_fi": 878,          // Science Fiction
      "fantasy": 14,          // Fantasy
      "mystery": 9648,        // Mystery
      "crime": 80,            // Crime
      "documentary": 99,      // Documentary
      "music": 10402,         // Music
      "war": 10752,           // War
      "western": 37,          // Western
      "tv_movie": 10770       // TV Movie
    };
  }

  // Sentiment analysis function (simplified version of TextBlob)
  analyzeSentiment(text) {
    const positiveWords = ['happy', 'joy', 'love', 'great', 'awesome', 'wonderful', 'amazing', 'fantastic', 'excellent', 'good', 'fun', 'excited', 'cheerful'];
    const negativeWords = ['sad', 'angry', 'hate', 'terrible', 'awful', 'bad', 'horrible', 'depressed', 'upset', 'disappointed', 'frustrated', 'annoyed'];
    const actionWords = ['angry', 'rage', 'furious', 'mad', 'intense', 'energetic', 'pumped', 'aggressive'];
    
    const lowerText = text.toLowerCase();
    let sentiment = 0;
    
    positiveWords.forEach(word => {
      if (lowerText.includes(word)) sentiment += 1;
    });
    
    negativeWords.forEach(word => {
      if (lowerText.includes(word)) sentiment -= 1;
    });
    
    actionWords.forEach(word => {
      if (lowerText.includes(word)) sentiment += 0.5; // Slightly positive for action
    });
    
    return sentiment;
  }

  // Interpret mood from text
  interpretMood(text) {
    const sentiment = this.analyzeSentiment(text);
    const lowerText = text.toLowerCase();
    
    // Check for specific mood keywords first
    if (lowerText.includes('love failure') || lowerText.includes('heartbreak') || lowerText.includes('breakup')) {
      return 'love_failure';
    }
    if (lowerText.includes('angry') || lowerText.includes('rage') || lowerText.includes('furious')) {
      return 'angry';
    }
    if (lowerText.includes('bored') || lowerText.includes('boring') || lowerText.includes('nothing to do')) {
      return 'bored';
    }
    if (lowerText.includes('romantic') || lowerText.includes('romance') || lowerText.includes('love')) {
      return 'romance';
    }
    if (lowerText.includes('action') || lowerText.includes('adventure') || lowerText.includes('thriller')) {
      return 'action';
    }
    
    // Use sentiment analysis
    if (sentiment > 0.5) {
      return 'happy';
    } else if (sentiment < -0.5) {
      return 'sad';
    } else {
      return 'bored';
    }
  }

  // Get movies by genre
  async getMovies(genreId, count = 5) {
    try {
      const response = await axios.get(`${this.baseURL}/discover/movie`, {
        params: {
          api_key: this.apiKey,
          with_genres: genreId,
          sort_by: 'popularity.desc',
          page: 1
        }
      });
      
      const movies = response.data.results || [];
      return movies.slice(0, count).map(movie => ({
        id: movie.id,
        title: movie.title,
        poster: movie.poster_path ? `${this.imageBaseURL}${movie.poster_path}` : null,
        overview: movie.overview,
        releaseDate: movie.release_date,
        rating: movie.vote_average,
        voteCount: movie.vote_count,
        genres: movie.genre_ids
      }));
    } catch (error) {
      console.error('Error fetching movies:', error);
      return [];
    }
  }

  // Get trending movies
  async getTrendingMovies(count = 5) {
    try {
      const response = await axios.get(`${this.baseURL}/trending/movie/week`, {
        params: {
          api_key: this.apiKey
        }
      });
      
      const movies = response.data.results || [];
      return movies.slice(0, count).map(movie => ({
        id: movie.id,
        title: movie.title,
        poster: movie.poster_path ? `${this.imageBaseURL}${movie.poster_path}` : null,
        overview: movie.overview,
        releaseDate: movie.release_date,
        rating: movie.vote_average,
        voteCount: movie.vote_count,
        genres: movie.genre_ids
      }));
    } catch (error) {
      console.error('Error fetching trending movies:', error);
      return [];
    }
  }

  // Search movies by title
  async searchMovies(query, count = 5) {
    try {
      const response = await axios.get(`${this.baseURL}/search/movie`, {
        params: {
          api_key: this.apiKey,
          query: query,
          page: 1
        }
      });
      
      const movies = response.data.results || [];
      return movies.slice(0, count).map(movie => ({
        id: movie.id,
        title: movie.title,
        poster: movie.poster_path ? `${this.imageBaseURL}${movie.poster_path}` : null,
        overview: movie.overview,
        releaseDate: movie.release_date,
        rating: movie.vote_average,
        voteCount: movie.vote_count,
        genres: movie.genre_ids
      }));
    } catch (error) {
      console.error('Error searching movies:', error);
      return [];
    }
  }

  // Main method to suggest movies by mood
  async suggestByMood(mood) {
    const normalizedMood = mood.toLowerCase().replace(/\s+/g, '_');
    
    let genreId;
    let message;
    
    switch (normalizedMood) {
      case 'happy': case'feel_good': case'cheerful':
        genreId = this.genreIds.happy;
        message = "🎉 Feeling great? Here are some mood-lifting comedies:";
        break;
        
      case 'bored': case'boring':
        genreId = this.genreIds.bored;
        message = "😴 Feeling bored? These entertaining movies will perk you up:";
        break;
        
      case 'angry': case'mad': case'furious':
        genreId = this.genreIds.angry;
        message = "😠 Need to blow off steam? These action-packed films will help:";
        break;
        
      case 'sad': case'down': case'depressed':
        genreId = this.genreIds.sad;
        message = "💙 Feeling down? A little romance and warmth might help:";
        break;
        
      case 'love_failure': case'heartbreak': case'breakup':
        message = "💔 Heartbreak meets hope. These will help you heal:";
        const dramMovies = await this.getMovies(this.genreIds.drama, 3);
        const inspirationalMovies = [
          { title: "Good Will Hunting", poster: null, overview: "A touching story about finding yourself" },
          { title: "The Pursuit of Happyness", poster: null, overview: "Never give up on your dreams" },
          { title: "Rocky", poster: null, overview: "The ultimate underdog story" }
        ];
        return { message, movies: [...dramMovies, ...inspirationalMovies] };
        
      default:
        // Try to interpret the mood from the text
        const interpretedMood = this.interpretMood(mood);
        if (interpretedMood !== mood) {
          return await this.suggestByMood(interpretedMood);
        }
        
        // Default to trending movies
        message = "🎬 Not sure what mood you're in? Here are some trending movies:";
        const trendingMovies = await this.getTrendingMovies();
        return { message, movies: trendingMovies };
    }
    
    const movies = await this.getMovies(genreId);
    return { message, movies };
  }

  // Get movie details
  async getMovieDetails(movieId) {
    try {
      const response = await axios.get(`${this.baseURL}/movie/${movieId}`, {
        params: {
          api_key: this.apiKey
        }
      });
      
      const movie = response.data;
      return {
        id: movie.id,
        title: movie.title,
        poster: movie.poster_path ? `${this.imageBaseURL}${movie.poster_path}` : null,
        backdrop: movie.backdrop_path ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}` : null,
        overview: movie.overview,
        releaseDate: movie.release_date,
        rating: movie.vote_average,
        voteCount: movie.vote_count,
        runtime: movie.runtime,
        genres: movie.genres || [],
        director: movie.director || 'N/A',
        cast: movie.cast || []
      };
    } catch (error) {
      console.error('Error fetching movie details:', error);
      return null;
    }
  }
}

export default MoodMovieAgent;