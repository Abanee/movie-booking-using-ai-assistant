import React from 'react';
import Icon from '../../../components/AppIcon';

const ViewingPersonalityCard = ({ personalityData }) => {
  const { type, description, topGenres, moodPreference, viewingStyle, confidence } = personalityData;

  const getPersonalityIcon = (type) => {
    const icons = {
      'Explorer': 'Compass',
      'Comfort Seeker': 'Heart',
      'Thrill Chaser': 'Zap',
      'Intellectual': 'Brain',
      'Social Butterfly': 'Users'
    };
    return icons[type] || 'User';
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 80) return 'text-success';
    if (confidence >= 60) return 'text-accent';
    return 'text-warning';
  };

  return (
    <div className="bg-card rounded-xl p-6 shadow-movie-card border border-border">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name={getPersonalityIcon(type)} size={24} color="var(--color-accent)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{type}</h3>
            <p className="text-sm text-muted-foreground">Your Cinema Personality</p>
          </div>
        </div>
        <div className="text-right">
          <div className={`text-sm font-medium ${getConfidenceColor(confidence)}`}>
            {confidence}% Match
          </div>
          <div className="text-xs text-muted-foreground">AI Confidence</div>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        {description}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <h4 className="text-xs font-medium text-foreground uppercase tracking-wide">Top Genres</h4>
          <div className="flex flex-wrap gap-1">
            {topGenres.map((genre, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-md"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-xs font-medium text-foreground uppercase tracking-wide">Mood Style</h4>
          <div className="flex items-center space-x-2">
            <Icon name="Smile" size={16} color="var(--color-muted-foreground)" />
            <span className="text-sm text-foreground">{moodPreference}</span>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-xs font-medium text-foreground uppercase tracking-wide">Viewing Style</h4>
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} color="var(--color-muted-foreground)" />
            <span className="text-sm text-foreground">{viewingStyle}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Last updated: 2 days ago</span>
          <button className="text-xs text-accent hover:text-accent/80 transition-colors">
            Update Preferences
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewingPersonalityCard;