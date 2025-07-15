import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const FeedbackSystem = () => {
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [showThankYou, setShowThankYou] = useState(false);

  const recentRecommendations = [
    {
      id: 1,
      title: "Dune: Part Two",
      poster: "https://images.unsplash.com/photo-1489599511986-c6c8b5b5e5b5?w=300&h=450&fit=crop",
      genre: "Sci-Fi",
      confidence: 92,
      feedback: null,
      reasons: ["You loved the first Dune movie", "Matches your sci-fi preferences", "High ratings from similar users"]
    },
    {
      id: 2,
      title: "The Batman",
      poster: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=450&fit=crop",
      genre: "Action",
      confidence: 85,
      feedback: 'helpful',
      reasons: ["You enjoy dark superhero films", "Christopher Nolan fan detected", "Perfect for evening viewing"]
    },
    {
      id: 3,
      title: "Everything Everywhere All at Once",
      poster: "https://images.unsplash.com/photo-1489599511986-c6c8b5b5e5b5?w=300&h=450&fit=crop",
      genre: "Comedy/Drama",
      confidence: 78,
      feedback: 'not_helpful',
      reasons: ["Experimental storytelling match", "Award-winning performances", "Unique narrative style"]
    },
    {
      id: 4,
      title: "Top Gun: Maverick",
      poster: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=450&fit=crop",
      genre: "Action",
      confidence: 88,
      feedback: null,
      reasons: ["Action movie preference", "Nostalgia factor detected", "High audience scores"]
    }
  ];

  const feedbackOptions = [
    {
      id: 'helpful',
      label: 'Helpful',
      icon: 'ThumbsUp',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      id: 'not_helpful',
      label: 'Not Helpful',
      icon: 'ThumbsDown',
      color: 'text-error',
      bgColor: 'bg-error/10'
    },
    {
      id: 'inappropriate',
      label: 'Inappropriate',
      icon: 'AlertTriangle',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    }
  ];

  const feedbackCategories = [
    { id: 'genre', label: 'Wrong Genre', description: 'The recommended genre doesn\'t match my preferences' },
    { id: 'mood', label: 'Wrong Mood', description: 'The movie doesn\'t fit my current mood or situation' },
    { id: 'quality', label: 'Poor Quality', description: 'The movie quality or ratings are below my standards' },
    { id: 'timing', label: 'Bad Timing', description: 'Not the right time or context for this recommendation' },
    { id: 'seen', label: 'Already Seen', description: 'I\'ve already watched this movie' },
    { id: 'other', label: 'Other', description: 'Different reason not listed above' }
  ];

  const handleFeedbackSubmit = (movieId, feedbackType) => {
    // Update the movie's feedback
    const updatedRecommendations = recentRecommendations.map(movie => 
      movie.id === movieId ? { ...movie, feedback: feedbackType } : movie
    );
    
    setShowThankYou(true);
    setTimeout(() => setShowThankYou(false), 3000);
  };

  const handleDetailedFeedback = () => {
    setShowThankYou(true);
    setFeedbackText('');
    setSelectedFeedback(null);
    setTimeout(() => setShowThankYou(false), 3000);
  };

  const ThankYouMessage = () => (
    <div className="fixed top-4 right-4 bg-success text-success-foreground px-4 py-3 rounded-lg shadow-cinematic z-50 flex items-center space-x-2">
      <Icon name="CheckCircle" size={20} />
      <span className="text-sm font-medium">Thank you for your feedback!</span>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Recent Recommendations Feedback */}
      <div className="bg-card rounded-xl p-6 border border-border">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Rate Recent Recommendations</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Help us improve by rating how helpful our recommendations were
            </p>
          </div>
          <Icon name="MessageSquare" size={24} color="var(--color-accent)" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recentRecommendations.map((movie) => (
            <div key={movie.id} className="border border-border rounded-lg p-4">
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-16 h-24 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-foreground truncate">{movie.title}</h4>
                  <p className="text-xs text-muted-foreground mb-2">{movie.genre}</p>
                  
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-accent ai-pulse"></div>
                    <span className="text-xs text-foreground font-medium">
                      {movie.confidence}% match
                    </span>
                  </div>
                  
                  <div className="space-y-1">
                    {movie.reasons.slice(0, 2).map((reason, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-1 h-1 rounded-full bg-muted-foreground"></div>
                        <span className="text-xs text-muted-foreground">{reason}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Was this helpful?</span>
                <div className="flex items-center space-x-2">
                  {feedbackOptions.slice(0, 2).map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleFeedbackSubmit(movie.id, option.id)}
                      className={`p-2 rounded-lg transition-colors duration-200 ${
                        movie.feedback === option.id
                          ? `${option.bgColor} ${option.color}`
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }`}
                    >
                      <Icon name={option.icon} size={16} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Feedback Form */}
      <div className="bg-card rounded-xl p-6 border border-border">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Detailed Feedback</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Share specific feedback to help us improve our recommendations
            </p>
          </div>
          <Icon name="Edit3" size={24} color="var(--color-accent)" />
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              What type of feedback would you like to share?
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {feedbackCategories.map((category) => (
                <label key={category.id} className="flex items-start space-x-3 p-3 rounded-lg border border-border cursor-pointer hover:bg-muted/30 transition-colors duration-200">
                  <input
                    type="radio"
                    name="feedback_category"
                    value={category.id}
                    checked={selectedFeedback === category.id}
                    onChange={(e) => setSelectedFeedback(e.target.value)}
                    className="w-4 h-4 text-accent bg-input border-border focus:ring-accent mt-0.5"
                  />
                  <div>
                    <span className="text-sm font-medium text-foreground">{category.label}</span>
                    <p className="text-xs text-muted-foreground mt-1">{category.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Additional Comments (Optional)
            </label>
            <textarea
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="Share any additional thoughts or suggestions..."
              rows={4}
              className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              Your feedback helps improve recommendations for everyone
            </p>
            <Button
              variant="default"
              iconName="Send"
              iconPosition="left"
              disabled={!selectedFeedback}
              onClick={handleDetailedFeedback}
            >
              Submit Feedback
            </Button>
          </div>
        </div>
      </div>

      {/* Feedback Statistics */}
      <div className="bg-card rounded-xl p-6 border border-border">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Your Feedback Impact</h3>
            <p className="text-sm text-muted-foreground mt-1">
              See how your feedback has helped improve the system
            </p>
          </div>
          <Icon name="TrendingUp" size={24} color="var(--color-accent)" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon name="ThumbsUp" size={24} color="var(--color-success)" />
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">89%</div>
            <p className="text-sm text-muted-foreground">Helpful Ratings</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon name="MessageSquare" size={24} color="var(--color-accent)" />
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">47</div>
            <p className="text-sm text-muted-foreground">Feedback Submitted</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon name="Target" size={24} color="var(--color-warning)" />
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">+12%</div>
            <p className="text-sm text-muted-foreground">Accuracy Improvement</p>
          </div>
        </div>
      </div>

      {showThankYou && <ThankYouMessage />}
    </div>
  );
};

export default FeedbackSystem;