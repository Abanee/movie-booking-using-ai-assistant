import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from './AppIcon';
import Button from './ui/Button';
import MoodMovieAgent from '../services/MoodMovieAgent';

const MovieChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hi! I\'m your AI movie assistant. Tell me how you\'re feeling and I\'ll recommend the perfect movies for your mood! 🎬",
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
    if (isOpen && chatInputRef.current) {
      chatInputRef.current.focus();
    }
  }, [isOpen]);

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
          const searchResults = await movieAgent.current.searchMovies(searchQuery, 5);
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
      className="bg-card border border-border rounded-lg p-3 min-w-[200px] shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex space-x-3">
        {movie.poster ? (
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-12 h-16 object-cover rounded"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        ) : (
          <div className="w-12 h-16 bg-muted rounded flex items-center justify-center">
            <Icon name="Film" size={16} className="text-muted-foreground" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm text-foreground truncate">{movie.title}</h4>
          {movie.rating && (
            <div className="flex items-center space-x-1 mt-1">
              <Icon name="Star" size={12} className="text-yellow-500 fill-current" />
              <span className="text-xs text-muted-foreground">
                {movie.rating?.toFixed(1)}
              </span>
            </div>
          )}
          {movie.releaseDate && (
            <p className="text-xs text-muted-foreground mt-1">
              {new Date(movie.releaseDate).getFullYear()}
            </p>
          )}
        </div>
      </div>
      {movie.overview && (
        <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
          {movie.overview}
        </p>
      )}
    </motion.div>
  );

  const quickActions = [
    { label: "I\'m feeling happy", action: "happy" },
    { label: "I\'m bored", action: "bored" },
    { label: "Need action movies", action: "angry" },
    { label: "Feeling romantic", action: "romance" },
    { label: "Show trending", action: "trending movies" }
  ];

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 bg-accent text-accent-foreground rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center ${isOpen ? 'hidden' : 'block'}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      >
        <Icon name="MessageCircle" size={24} />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
          <Icon name="Film" size={12} className="text-primary-foreground" />
        </div>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", damping: 25, stiffness: 500 }}
            className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-background border border-border rounded-lg shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-accent text-accent-foreground p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-accent-foreground/20 rounded-full flex items-center justify-center">
                  <Icon name="Film" size={16} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Movie Assistant</h3>
                  <p className="text-xs opacity-90">Powered by AI</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-accent-foreground hover:bg-accent-foreground/20"
              >
                <Icon name="X" size={16} />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                    <div
                      className={`rounded-lg px-3 py-2 text-sm ${
                        message.type === 'user' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground'
                      }`}
                    >
                      {message.content}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 px-1">
                      {formatTime(message.timestamp)}
                    </div>
                    
                    {/* Movie Cards */}
                    {message.movies && message.movies.length > 0 && (
                      <div className="mt-3 space-y-2">
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
                  <div className="bg-muted text-muted-foreground rounded-lg px-3 py-2 text-sm">
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
            {messages.length <= 1 && (
              <div className="px-4 py-2 border-t border-border">
                <p className="text-xs text-muted-foreground mb-2">Quick suggestions:</p>
                <div className="flex flex-wrap gap-1">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickAction(action.action)}
                      className="text-xs"
                    >
                      {action.label}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-border">
              <form onSubmit={handleInputSubmit} className="flex space-x-2">
                <input
                  ref={chatInputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Tell me your mood or search for movies..."
                  className="flex-1 px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  size="sm"
                  disabled={!inputValue.trim() || isLoading}
                  className="px-3"
                >
                  {isLoading ? (
                    <Icon name="Loader2" size={16} className="animate-spin" />
                  ) : (
                    <Icon name="Send" size={16} />
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MovieChatbot;