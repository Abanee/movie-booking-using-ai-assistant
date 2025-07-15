import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const HelpSearchBar = ({ onSearch, isLoading }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const popularSearches = [
    'How to cancel booking',
    'Refund policy',
    'Change seats',
    'Group booking',
    'Payment issues'
  ];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative mb-6">
        <Input
          type="search"
          placeholder="Search for help topics, booking issues, or account questions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pr-12"
        />
        <Button
          type="submit"
          variant="ghost"
          size="icon"
          loading={isLoading}
          className="absolute right-2 top-1/2 -translate-y-1/2"
        >
          <Icon name="Search" size={20} />
        </Button>
      </form>

      <div className="flex flex-wrap gap-2 justify-center">
        <span className="text-sm text-muted-foreground mr-2">Popular searches:</span>
        {popularSearches.map((search, index) => (
          <button
            key={index}
            onClick={() => {
              setSearchQuery(search);
              onSearch(search);
            }}
            className="text-sm text-accent hover:text-accent-foreground bg-accent/10 hover:bg-accent/20 px-3 py-1 rounded-full transition-colors duration-200"
          >
            {search}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HelpSearchBar;