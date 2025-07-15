import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const AIHelpAssistant = ({ searchResults, isLoading }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const aiSuggestions = [
    {
      id: 1,
      question: "How do I cancel my booking?",
      answer: `You can cancel your booking up to 2 hours before showtime:\n\n1. Go to 'My Bookings' in your dashboard\n2. Select the booking you want to cancel\n3. Click 'Cancel Booking'\n4. Confirm cancellation\n\nRefunds are processed within 3-5 business days.`,
      confidence: 95,
      helpful: true
    },
    {
      id: 2,
      question: "What is your refund policy?",
      answer: `Our refund policy is designed to be fair and flexible:\n\n• Full refund: Cancellation 24+ hours before showtime\n• 50% refund: Cancellation 2-24 hours before showtime\n• No refund: Cancellation less than 2 hours before showtime\n\nExceptions may apply for technical issues or theater closures.`,
      confidence: 98,
      helpful: true
    },
    {
      id: 3,
      question: "How does AI movie recommendation work?",
      answer: `Our AI analyzes multiple factors to suggest perfect movies:\n\n• Your viewing history and ratings\n• Genre preferences and mood indicators\n• Time of day and weather patterns\n• Similar user preferences\n• Current trending content\n\nYou can adjust these preferences in your AI Insights settings.`,
      confidence: 92,
      helpful: true
    }
  ];

  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
            <Icon name="Bot" size={20} color="var(--color-accent-foreground)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">AI Help Assistant</h3>
            <p className="text-sm text-muted-foreground">Instant answers to your questions</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
        >
          {isExpanded ? "Collapse" : "Expand"}
        </Button>
      </div>

      {isLoading && (
        <div className="flex items-center space-x-3 py-4">
          <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
          <span className="text-muted-foreground">AI is analyzing your question...</span>
        </div>
      )}

      {searchResults.length > 0 && (
        <div className="space-y-4 mb-6">
          {searchResults.map((result, index) => (
            <div key={index} className="bg-background rounded-lg p-4 border border-border">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-foreground">{result.question}</h4>
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <Icon name="Zap" size={12} />
                  <span>{result.confidence}% confident</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground whitespace-pre-line mb-3">
                {result.answer}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="xs" iconName="ThumbsUp" iconPosition="left">
                    Helpful
                  </Button>
                  <Button variant="ghost" size="xs" iconName="ThumbsDown" iconPosition="left">
                    Not helpful
                  </Button>
                </div>
                <Button variant="outline" size="xs" iconName="MessageCircle" iconPosition="left">
                  Ask follow-up
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isExpanded && (
        <div className="space-y-4">
          <h4 className="font-medium text-foreground">Common Questions</h4>
          {aiSuggestions.map((suggestion) => (
            <div key={suggestion.id} className="bg-background rounded-lg p-4 border border-border">
              <div className="flex items-start justify-between mb-2">
                <h5 className="font-medium text-foreground text-sm">{suggestion.question}</h5>
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <Icon name="Zap" size={12} />
                  <span>{suggestion.confidence}%</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground whitespace-pre-line mb-3">
                {suggestion.answer}
              </p>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="xs" iconName="ThumbsUp" iconPosition="left">
                  Helpful
                </Button>
                <Button variant="ghost" size="xs" iconName="MessageCircle" iconPosition="left">
                  More details
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Can't find what you're looking for?
          </span>
          <Button variant="outline" size="sm" iconName="MessageSquare" iconPosition="left">
            Chat with Human Support
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIHelpAssistant;