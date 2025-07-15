import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RecommendationExplanation = ({ recommendation }) => {
  const [showDetails, setShowDetails] = useState(false);

  const confidenceColor = recommendation.confidence >= 80 ? 'text-success' : 
                         recommendation.confidence >= 60 ? 'text-warning' : 'text-error';

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="p-6">
        <div className="flex items-start space-x-4">
          <div className="w-16 h-24 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={recommendation.poster}
              alt={recommendation.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-lg font-semibold text-foreground truncate">
                  {recommendation.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {recommendation.year} • {recommendation.genre}
                </p>
              </div>
              
              <div className="flex items-center space-x-2 flex-shrink-0">
                <div className={`text-sm font-medium ${confidenceColor}`}>
                  {recommendation.confidence}%
                </div>
                <div className="w-2 h-2 rounded-full bg-accent ai-pulse"></div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Icon name="Target" size={16} color="var(--color-accent)" />
                <span className="text-sm text-foreground font-medium">Why recommended:</span>
              </div>
              
              <div className="space-y-2">
                {recommendation.reasons.map((reason, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                    <span className="text-sm text-muted-foreground">{reason}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Icon name="Users" size={14} color="var(--color-muted-foreground)" />
                    <span className="text-xs text-muted-foreground">
                      {recommendation.similarUsers} similar users liked this
                    </span>
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  iconName={showDetails ? "ChevronUp" : "ChevronDown"}
                  iconPosition="right"
                  onClick={() => setShowDetails(!showDetails)}
                >
                  Details
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {showDetails && (
          <div className="mt-6 pt-6 border-t border-border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-foreground mb-3">Preference Matching</h4>
                <div className="space-y-2">
                  {recommendation.preferenceMatch.map((match, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{match.category}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-accent rounded-full transition-all duration-300"
                            style={{ width: `${match.score}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-foreground font-medium w-8">
                          {match.score}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-foreground mb-3">Similar Movies You Liked</h4>
                <div className="space-y-2">
                  {recommendation.similarMovies.map((movie, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-6 h-8 rounded overflow-hidden flex-shrink-0">
                        <Image
                          src={movie.poster}
                          alt={movie.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground truncate">{movie.title}</p>
                        <p className="text-xs text-muted-foreground">Rated {movie.rating}/5</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="px-6 py-4 bg-muted/30 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" iconName="ThumbsUp" iconPosition="left">
              Helpful
            </Button>
            <Button variant="ghost" size="sm" iconName="ThumbsDown" iconPosition="left">
              Not Helpful
            </Button>
          </div>
          
          <Button variant="outline" size="sm" iconName="Calendar" iconPosition="left">
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecommendationExplanation;