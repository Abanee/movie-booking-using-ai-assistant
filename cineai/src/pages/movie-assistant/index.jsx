import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import MoodMovieAgent from '../../services/MoodMovieAgent';

const MovieAssistant = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hello! I'm your AI movie assistant. I can help you discover movies based on your mood, search for specific titles, or show you what's trending. What are you in the mood for today? 🎬",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const chatInputRef = useRef(null);
  const movieAgent = useRef(new MoodMovieAgent());

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (chatInputRef.current) {
      chatInputRef.current.focus();
    }
  }, []);

  const handleSendMessage = async (message) => {
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    setIsLoading(true);

    try {
      // Simulate typing delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      let response;
      
      // Check if user is asking for movie search
      if (message.toLowerCase().includes('search') || message.toLowerCase().includes('find movie')) {
        const searchQuery = message.replace(/search|find movie|for/gi, '').trim();
        if (searchQuery) {
          const searchResults = await movieAgent.current.searchMovies(searchQuery, 6);
          response = {
            message: `🔍 Here are movies matching "${searchQuery}":`,
            movies: searchResults
          };
        } else {
          response = {
            message: "Please tell me what movie you'd like to search for!",
            movies: []
          };
        }
      } else if (message.toLowerCase().includes('trending') || message.toLowerCase().includes('popular')) {
        const trendingMovies = await movieAgent.current.getTrendingMovies(6);
        response = {
          message: "🔥 Here are the trending movies this week:",
          movies: trendingMovies
        };
      } else {
        // Get mood-based recommendations
        response = await movieAgent.current.suggestByMood(message);
      }

      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        content: response.message,
        movies: response.movies || [],
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error getting movie recommendations:', error);
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: "I\'m having trouble getting movie recommendations right now. Please try again later! 🎬",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
      setIsLoading(false);
    }
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  const handleQuickAction = (action) => {
    handleSendMessage(action);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const MovieCard = ({ movie }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-xl p-4 shadow-movie-card hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="flex space-x-4">
        {movie.poster ? (
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-16 h-24 object-cover rounded-lg shadow-md"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        ) : (
          <div className="w-16 h-24 bg-muted rounded-lg flex items-center justify-center">
            <Icon name="Film" size={24} className="text-muted-foreground" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-foreground truncate mb-1">{movie.title}</h4>
          {movie.rating && (
            <div className="flex items-center space-x-1 mb-2">
              <Icon name="Star" size={14} className="text-yellow-500 fill-current" />
              <span className="text-sm text-muted-foreground">
                {movie.rating?.toFixed(1)}
              </span>
              {movie.voteCount && (
                <span className="text-xs text-muted-foreground">
                  ({movie.voteCount} votes)
                </span>
              )}
            </div>
          )}
          {movie.releaseDate && (
            <p className="text-sm text-muted-foreground mb-2">
              {new Date(movie.releaseDate).getFullYear()}
            </p>
          )}
          {movie.overview && (
            <p className="text-sm text-muted-foreground line-clamp-3">
              {movie.overview}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );

  const quickActions = [
    { label: "I\'m feeling happy 😊", action: "happy", icon: "Smile" },
    { label: "I\'m bored 😴", action: "bored", icon: "Coffee" },
    { label: "Need action movies 💥", action: "angry", icon: "Zap" },
    { label: "Feeling romantic 💕", action: "romance", icon: "Heart" },
    { label: "Show trending 🔥", action: "trending movies", icon: "TrendingUp" },
    { label: "I\'m sad 😢", action: "sad", icon: "CloudRain" }
  ];

  return (
    <>
      <Helmet>
        <title>Movie Assistant - CineAI</title>
        <meta 
          name="description" 
          content="Get personalized movie recommendations based on your mood with CineAI's intelligent movie assistant. Discover your next favorite film!" 
        />
        <meta name="keywords" content="movie recommendations, AI assistant, mood-based movies, film discovery" />
        <meta property="og:title" content="Movie Assistant - CineAI" />
        <meta property="og:description" content="Your AI-powered movie recommendation assistant" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/movie-assistant" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <div className="pt-16 pb-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Hero Section */}
            <div className="text-center py-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon name="Bot" size={40} className="text-accent-foreground" />
                </div>
                <h1 className="text-4xl font-bold text-foreground mb-4">
                  AI Movie Assistant
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Your personal movie recommendation assistant powered by AI. Tell me your mood, and I'll find the perfect films for you!
                </p>
              </motion.div>
            </div>

            {/* Chat Interface */}
            <div className="bg-card border border-border rounded-xl shadow-movie-card overflow-hidden">
              {/* Chat Header */}
              <div className="bg-accent text-accent-foreground p-4 border-b border-border">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-accent-foreground/20 rounded-full flex items-center justify-center">
                    <Icon name="Film" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold">Movie Assistant</h3>
                    <p className="text-sm opacity-90">Powered by TMDB API</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="h-96 overflow-y-auto p-6 space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                      <div
                        className={`rounded-xl px-4 py-3 ${
                          message.type === 'user' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground'
                        }`}
                      >
                        {message.content}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1 px-1">
                        {formatTime(message.timestamp)}
                      </div>
                      
                      {/* Movie Grid */}
                      {message.movies && message.movies.length > 0 && (
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                          {message.movies.map((movie, index) => (
                            <MovieCard key={movie.id || index} movie={movie} />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-muted text-muted-foreground rounded-xl px-4 py-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Actions */}
              <div className="px-6 py-4 border-t border-border">
                <p className="text-sm text-muted-foreground mb-3">Quick suggestions:</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickAction(action.action)}
                      className="text-left justify-start"
                      iconName={action.icon}
                      iconPosition="left"
                    >
                      {action.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Input */}
              <div className="p-6 border-t border-border">
                <form onSubmit={handleInputSubmit} className="flex space-x-3">
                  <input
                    ref={chatInputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Tell me your mood, search for movies, or ask for trending films..."
                    className="flex-1 px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent"
                    disabled={isLoading}
                  />
                  <Button
                    type="submit"
                    disabled={!inputValue.trim() || isLoading}
                    className="px-6"
                  >
                    {isLoading ? (
                      <Icon name="Loader2" size={20} className="animate-spin" />
                    ) : (
                      <Icon name="Send" size={20} />
                    )}
                  </Button>
                </form>
              </div>
            </div>

            {/* Features Section */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Sparkles" size={24} className="text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Mood-Based Recommendations</h3>
                <p className="text-muted-foreground">
                  Tell me how you're feeling and I'll suggest movies that match your mood perfectly.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Search" size={24} className="text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Smart Search</h3>
                <p className="text-muted-foreground">
                  Search for specific movies or ask for trending films with natural language.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="TrendingUp" size={24} className="text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Real-Time Data</h3>
                <p className="text-muted-foreground">
                  Get the latest movie information, ratings, and trending films from TMDB.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieAssistant;