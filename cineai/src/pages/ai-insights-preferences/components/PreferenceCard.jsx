import React from 'react';
import Icon from '../../../components/AppIcon';


const PreferenceCard = ({ 
  title, 
  description, 
  icon, 
  value, 
  onChange, 
  type = 'slider',
  options = [],
  isActive = false,
  onToggle,
  children 
}) => {
  const renderControl = () => {
    switch (type) {
      case 'slider':
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Low</span>
              <span className="text-sm font-medium text-foreground">{value}%</span>
              <span className="text-sm text-muted-foreground">High</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={value}
              onChange={(e) => onChange(parseInt(e.target.value))}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, var(--color-accent) 0%, var(--color-accent) ${value}%, var(--color-muted) ${value}%, var(--color-muted) 100%)`
              }}
            />
          </div>
        );
      
      case 'toggle':
        return (
          <button
            onClick={onToggle}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
              isActive ? 'bg-accent' : 'bg-muted'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                isActive ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        );
      
      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      
      default:
        return children;
    }
  };

  return (
    <div className="bg-card rounded-xl p-6 border border-border hover:shadow-movie-card transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name={icon} size={20} color="var(--color-accent)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        {renderControl()}
      </div>
    </div>
  );
};

export default PreferenceCard;