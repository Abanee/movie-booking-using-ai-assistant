import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const SearchBar = ({ onSearch, searchQuery, setSearchQuery }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  const searchSuggestions = [
    "funny movies for date night",
    "action films like John Wick",
    "romantic comedies 2024",
    "sci-fi movies with great visuals",
    "thriller movies under 2 hours",
    "family-friendly adventure films",
    "Oscar-winning dramas",
    "horror movies not too scary",
    "animated movies for adults",
    "feel-good movies when sad"
  ];

  useEffect(() => {
    if (searchQuery.length > 0) {
      const filtered = searchSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
    setIsExpanded(false);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      setShowSuggestions(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleFocus = () => {
    setIsExpanded(true);
    if (searchQuery.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsExpanded(false);
      setShowSuggestions(false);
    }, 200);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className={`relative transition-all duration-300 ${isExpanded ? 'transform scale-105' : ''}`}>
        <div className="relative">
          <Input
            ref={inputRef}
            type="search"
            placeholder="Search for 'funny movies for date night' or 'action films like John Wick'..."
            value={searchQuery}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="w-full pl-12 pr-12 py-4 text-lg bg-card border-2 border-border rounded-2xl focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-200"
          />
          <Icon
            name="Search"
            size={24}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSuggestions([]);
                setShowSuggestions(false);
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <Icon name="X" size={20} />
            </button>
          )}
        </div>

        {/* AI Search Suggestions */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-xl shadow-cinematic z-50 overflow-hidden">
            <div className="p-3 border-b border-border">
              <div className="flex items-center space-x-2">
                <Icon name="Sparkles" size={16} className="text-accent" />
                <span className="text-sm font-medium text-foreground">AI Suggestions</span>
              </div>
            </div>
            <div className="max-h-64 overflow-y-auto">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full px-4 py-3 text-left hover:bg-muted/50 transition-colors duration-200 flex items-center space-x-3"
                >
                  <Icon name="Search" size={16} className="text-muted-foreground" />
                  <span className="text-sm text-foreground">{suggestion}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quick Search Tags */}
      <div className="flex flex-wrap gap-2 mt-4">
        {['Action', 'Comedy', 'Drama', 'Sci-Fi', 'Horror', 'Romance'].map((tag) => (
          <button
            key={tag}
            onClick={() => handleSuggestionClick(`${tag.toLowerCase()} movies`)}
            className="px-3 py-1 text-sm bg-muted text-muted-foreground rounded-full hover:bg-accent hover:text-accent-foreground transition-all duration-200"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;