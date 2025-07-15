import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';

const FilterPanel = ({ filters, onFiltersChange, isOpen, onToggle }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const genreOptions = [
    { value: 'action', label: 'Action' },
    { value: 'comedy', label: 'Comedy' },
    { value: 'drama', label: 'Drama' },
    { value: 'horror', label: 'Horror' },
    { value: 'romance', label: 'Romance' },
    { value: 'sci-fi', label: 'Sci-Fi' },
    { value: 'thriller', label: 'Thriller' },
    { value: 'animation', label: 'Animation' },
    { value: 'documentary', label: 'Documentary' },
    { value: 'fantasy', label: 'Fantasy' }
  ];

  const ratingOptions = [
    { value: 'g', label: 'G - General Audiences' },
    { value: 'pg', label: 'PG - Parental Guidance' },
    { value: 'pg13', label: 'PG-13 - Parents Strongly Cautioned' },
    { value: 'r', label: 'R - Restricted' },
    { value: 'nc17', label: 'NC-17 - Adults Only' }
  ];

  const yearOptions = [
    { value: '2024', label: '2024' },
    { value: '2023', label: '2023' },
    { value: '2022', label: '2022' },
    { value: '2021', label: '2021' },
    { value: '2020', label: '2020' },
    { value: '2010s', label: '2010-2019' },
    { value: '2000s', label: '2000-2009' },
    { value: '1990s', label: '1990-1999' }
  ];

  const runtimeOptions = [
    { value: 'short', label: 'Under 90 min' },
    { value: 'medium', label: '90-120 min' },
    { value: 'long', label: '120-150 min' },
    { value: 'epic', label: 'Over 150 min' }
  ];

  const moodOptions = [
    { value: 'uplifting', label: 'Uplifting' },
    { value: 'intense', label: 'Intense' },
    { value: 'relaxing', label: 'Relaxing' },
    { value: 'thought-provoking', label: 'Thought-Provoking' },
    { value: 'escapist', label: 'Escapist' },
    { value: 'emotional', label: 'Emotional' }
  ];

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...localFilters, [key]: value };
    setLocalFilters(updatedFilters);
  };

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
    onToggle();
  };

  const handleResetFilters = () => {
    const resetFilters = {
      genres: [],
      rating: '',
      year: '',
      runtime: '',
      mood: '',
      aiRecommended: false,
      newReleases: false,
      highRated: false
    };
    setLocalFilters(resetFilters);
    onFiltersChange(resetFilters);
  };

  return (
    <div className={`fixed inset-y-0 right-0 w-80 bg-background border-l border-border transform transition-transform duration-300 z-40 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={20} className="text-accent" />
            <h2 className="text-lg font-semibold text-foreground">Filters</h2>
          </div>
          <button
            onClick={onToggle}
            className="p-2 hover:bg-muted rounded-lg transition-colors duration-200"
          >
            <Icon name="X" size={20} className="text-muted-foreground" />
          </button>
        </div>

        {/* Filter Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Genre */}
          <div>
            <Select
              label="Genre"
              multiple
              searchable
              options={genreOptions}
              value={localFilters.genres}
              onChange={(value) => handleFilterChange('genres', value)}
              placeholder="Select genres..."
            />
          </div>

          {/* Rating */}
          <div>
            <Select
              label="Rating"
              options={ratingOptions}
              value={localFilters.rating}
              onChange={(value) => handleFilterChange('rating', value)}
              placeholder="Any rating"
            />
          </div>

          {/* Year */}
          <div>
            <Select
              label="Release Year"
              options={yearOptions}
              value={localFilters.year}
              onChange={(value) => handleFilterChange('year', value)}
              placeholder="Any year"
            />
          </div>

          {/* Runtime */}
          <div>
            <Select
              label="Runtime"
              options={runtimeOptions}
              value={localFilters.runtime}
              onChange={(value) => handleFilterChange('runtime', value)}
              placeholder="Any duration"
            />
          </div>

          {/* AI Mood Filter */}
          <div>
            <Select
              label="Mood (AI-Powered)"
              options={moodOptions}
              value={localFilters.mood}
              onChange={(value) => handleFilterChange('mood', value)}
              placeholder="Select mood..."
            />
            <p className="text-xs text-muted-foreground mt-1">AI analyzes your preferences</p>
          </div>

          {/* Quick Filters */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground">Quick Filters</h3>
            
            <Checkbox
              label="AI Recommended for You"
              checked={localFilters.aiRecommended}
              onChange={(e) => handleFilterChange('aiRecommended', e.target.checked)}
            />
            
            <Checkbox
              label="New Releases (Last 30 days)"
              checked={localFilters.newReleases}
              onChange={(e) => handleFilterChange('newReleases', e.target.checked)}
            />
            
            <Checkbox
              label="Highly Rated (8.0+ IMDb)"
              checked={localFilters.highRated}
              onChange={(e) => handleFilterChange('highRated', e.target.checked)}
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-border space-y-3">
          <Button
            variant="default"
            fullWidth
            onClick={handleApplyFilters}
            iconName="Check"
            iconPosition="left"
          >
            Apply Filters
          </Button>
          <Button
            variant="outline"
            fullWidth
            onClick={handleResetFilters}
            iconName="RotateCcw"
            iconPosition="left"
          >
            Reset All
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;