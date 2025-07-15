import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const AIRecommendationsCard = ({ recommendations }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showExplanation, setShowExplanation] = useState({});

  const currentRec = recommendations[currentIndex];

  const nextRecommendation = () => {
    setCurrentIndex((prev) => (prev + 1) % recommendations.length);
  };

  const prevRecommendation = () => {
    setCurrentIndex((prev) => (prev - 1 + recommendations.length) % recommendations.length);
  };

  const toggleExplanation = (id) => {
    setShowExplanation(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-success';
    if (confidence >= 75) return 'text-accent';
    if (confidence >= 60) return 'text-warning';
    return 'text-muted-foreground';
  };

  const getMatchReasons = (reasons) => {
    const reasonIcons = {
      'genre': 'Tag',
      'director': 'User',
      'actor': 'Users',
      'mood': 'Smile',
      'rating': 'Star',
      'similar-users': 'UserCheck',
      'trending': 'TrendingUp',
      'time-preference': 'Clock'
    };

    return reasons.map(reason => ({
      ...reason,
      icon: reasonIcons[reason.type] || 'Info'
    }));
  };

  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="bg-card rounded-xl p-6 shadow-movie-card border border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">AI Recommendations</h3>
          <Icon name="Sparkles" size={20} color="var(--color-accent)" />
        </div>
        <div className="text-center py-8">
          <Icon name="Brain" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
          <p className="text-muted-foreground mb-4">Building your personalized recommendations...</p>
          <Button variant="outline" iconName="RefreshCw" iconPosition="left">
            Refresh Recommendations
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl p-6 shadow-movie-card border border-border">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-semibold text-foreground">AI Recommendations</h3>
          <div className="ai-pulse">
            <Icon name="Sparkles" size={20} color="var(--color-accent)" />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            {currentIndex + 1} of {recommendations.length}
          </span>
          <div className="flex items-center space-x-1">
            <button
              onClick={prevRecommendation}
              className="p-1 hover:bg-muted/50 rounded transition-colors"
              disabled={recommendations.length <= 1}
            >
              <Icon name="ChevronLeft" size={16} color="var(--color-muted-foreground)" />
            </button>
            <button
              onClick={nextRecommendation}
              className="p-1 hover:bg-muted/50 rounded transition-colors"
              disabled={recommendations.length <= 1}
            >
              <Icon name="ChevronRight" size={16} color="var(--color-muted-foreground)" />
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-start space-x-4">
          <div className="w-20 h-30 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={currentRec.poster}
              alt={currentRec.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="font-semibold text-foreground text-lg">{currentRec.title}</h4>
                <p className="text-sm text-muted-foreground">{currentRec.genre} • {currentRec.year} • {currentRec.duration}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <div className={`text-sm font-medium ${getConfidenceColor(currentRec.confidence)}`}>
                  {currentRec.confidence}% Match
                </div>
                <div className="text-xs text-muted-foreground">AI Confidence</div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              {currentRec.description}
            </p>

            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-1">
                <Icon name="Star" size={16} color="var(--color-accent)" className="fill-current" />
                <span className="text-sm font-medium text-foreground">{currentRec.rating}</span>
                <span className="text-sm text-muted-foreground">({currentRec.reviewCount} reviews)</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Clock" size={16} color="var(--color-muted-foreground)" />
                <span className="text-sm text-foreground">{currentRec.duration}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={() => toggleExplanation(currentRec.id)}
                className="flex items-center space-x-2 text-sm text-accent hover:text-accent/80 transition-colors"
              >
                <Icon name="Info" size={14} />
                <span>Why this recommendation?</span>
                <Icon 
                  name={showExplanation[currentRec.id] ? "ChevronUp" : "ChevronDown"} 
                  size={14} 
                />
              </button>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" iconName="Bookmark" iconPosition="left">
                  Save
                </Button>
                <Button variant="default" size="sm" iconName="Ticket" iconPosition="left">
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* AI Explanation */}
        {showExplanation[currentRec.id] && (
          <div className="bg-muted/30 rounded-lg p-4 border border-border">
            <h5 className="text-sm font-medium text-foreground mb-3">AI Recommendation Analysis</h5>
            <div className="space-y-2">
              {getMatchReasons(currentRec.matchReasons).map((reason, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Icon name={reason.icon} size={14} color="var(--color-accent)" />
                  <span className="text-sm text-foreground">{reason.text}</span>
                  <span className="text-xs text-accent font-medium ml-auto">
                    {reason.weight}% influence
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-border">
              <p className="text-xs text-muted-foreground">
                This recommendation is based on your viewing history, preferences, and similar users' choices. 
                You can adjust these factors in your AI preferences.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Recommendation Actions */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Icon name="ThumbsUp" size={14} />
              <span>Good recommendation</span>
            </button>
            <button className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Icon name="ThumbsDown" size={14} />
              <span>Not interested</span>
            </button>
          </div>
          <Button variant="outline" size="sm" iconName="RefreshCw" iconPosition="left">
            More Recommendations
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIRecommendationsCard;