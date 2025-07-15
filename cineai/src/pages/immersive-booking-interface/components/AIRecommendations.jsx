import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AIRecommendations = ({ selectedMovie, userPreferences, onApplyRecommendation }) => {
  const [expandedReason, setExpandedReason] = useState(null);

  // Mock AI recommendations based on user preferences
  const aiRecommendations = [
    {
      id: 'optimal-view',
      title: 'Optimal Viewing Experience',
      seats: ['E8', 'E9', 'E10'],
      reasoning: `Based on your preference for center seats and optimal screen distance, these seats offer the perfect balance of immersion and comfort. The viewing angle is ideal for ${selectedMovie.title}'s cinematic experience.`,confidence: 95,icon: 'Eye',
      benefits: ['Perfect screen distance', 'Center viewing angle', 'Optimal sound quality']
    },
    {
      id: 'accessibility',title: 'Accessibility Friendly',
      seats: ['H1', 'H2'],
      reasoning: 'These seats provide easy access with wider aisles and are located near accessible facilities. Perfect for users with mobility considerations.',confidence: 88,icon: 'Accessibility',
      benefits: ['Wide aisle access', 'Near facilities', 'Easy entry/exit']
    },
    {
      id: 'social-experience',title: 'Group Seating',
      seats: ['F6', 'F7', 'F8', 'F9'],
      reasoning: 'Ideal for group bookings with adjacent seating that maintains good viewing angles. These seats are popular among groups watching action movies.',confidence: 92,icon: 'Users',
      benefits: ['Adjacent seating', 'Group-friendly', 'Good for discussions']
    },
    {
      id: 'premium-comfort',title: 'Premium Comfort',
      seats: ['B7', 'B8'],
      reasoning: 'Premium seats with enhanced comfort features including reclining options and extra legroom. Perfect for longer movies like this one.',confidence: 85,icon: 'Crown',
      benefits: ['Reclining seats', 'Extra legroom', 'Premium amenities']
    }
  ];

  const handleApplyRecommendation = (recommendation) => {
    onApplyRecommendation(recommendation.seats);
  };

  const toggleReasoning = (id) => {
    setExpandedReason(expandedReason === id ? null : id);
  };

  return (
    <div className="bg-card rounded-xl p-6 shadow-cinematic">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Sparkles" size={24} className="text-accent" />
        <h3 className="text-xl font-semibold text-foreground">AI Seat Recommendations</h3>
      </div>

      <div className="space-y-4">
        {aiRecommendations.map((recommendation) => (
          <div key={recommendation.id} className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Icon name={recommendation.icon} size={20} className="text-accent" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-medium text-foreground">{recommendation.title}</h4>
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <Icon name="Zap" size={12} />
                      <span>{recommendation.confidence}% match</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm text-muted-foreground">Seats:</span>
                    <div className="flex space-x-1">
                      {recommendation.seats.map((seat) => (
                        <span key={seat} className="px-2 py-1 bg-accent/20 text-accent text-xs rounded">
                          {seat}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {recommendation.benefits.map((benefit, index) => (
                      <span key={index} className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                        {benefit}
                      </span>
                    ))}
                  </div>
                  
                  {expandedReason === recommendation.id && (
                    <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground">{recommendation.reasoning}</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col space-y-2 ml-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleApplyRecommendation(recommendation)}
                  iconName="Check"
                  iconPosition="left"
                >
                  Select
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleReasoning(recommendation.id)}
                  iconName={expandedReason === recommendation.id ? "ChevronUp" : "ChevronDown"}
                  iconPosition="right"
                >
                  Why?
                </Button>
              </div>
            </div>
            
            {/* Confidence Bar */}
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                <span>AI Confidence</span>
                <span>{recommendation.confidence}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-accent h-2 rounded-full transition-all duration-300"
                  style={{ width: `${recommendation.confidence}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AI Learning Notice */}
      <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/20">
        <div className="flex items-start space-x-2">
          <Icon name="Brain" size={16} className="text-accent mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">Learning from your choices</p>
            <p className="text-xs text-muted-foreground mt-1">
              Our AI improves recommendations based on your booking history and preferences. 
              Your selection will help us suggest better seats for future bookings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIRecommendations;