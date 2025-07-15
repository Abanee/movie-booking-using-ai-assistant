import React from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';

const SortOptions = ({ sortBy, onSortChange, viewMode, onViewModeChange }) => {
  const sortOptions = [
    { value: 'ai-recommended', label: 'AI Recommended' },
    { value: 'popularity', label: 'Most Popular' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest First' },
    { value: 'alphabetical', label: 'A-Z' },
    { value: 'runtime-short', label: 'Shortest Runtime' },
    { value: 'runtime-long', label: 'Longest Runtime' }
  ];

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Icon name="Sparkles" size={16} className="text-accent" />
          <span className="text-sm font-medium text-foreground">Smart Sorting</span>
        </div>
        <Select
          options={sortOptions}
          value={sortBy}
          onChange={onSortChange}
          placeholder="Sort by..."
          className="w-48"
        />
      </div>

      <div className="flex items-center space-x-2">
        <span className="text-sm text-muted-foreground">View:</span>
        <div className="flex bg-muted rounded-lg p-1">
          <button
            onClick={() => onViewModeChange('grid')}
            className={`p-2 rounded transition-colors duration-200 ${
              viewMode === 'grid' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name="Grid3X3" size={16} />
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={`p-2 rounded transition-colors duration-200 ${
              viewMode === 'list' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name="List" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SortOptions;