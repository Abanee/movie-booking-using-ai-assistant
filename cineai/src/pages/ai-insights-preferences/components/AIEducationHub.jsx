import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AIEducationHub = () => {
  const [activeArticle, setActiveArticle] = useState(null);
  const [expandedFaq, setExpandedFaq] = useState(null);

  const educationalContent = [
    {
      id: 1,
      title: "How Movie Recommendations Work",
      category: "Machine Learning Basics",
      readTime: "5 min read",
      difficulty: "Beginner",
      icon: "Brain",
      summary: "Learn how AI analyzes your viewing patterns to suggest perfect movies",
      content: `Our recommendation system uses a combination of collaborative filtering and content-based filtering to understand your preferences.\n\nCollaborative filtering looks at users with similar tastes and suggests movies they enjoyed. If you and another user both loved "Inception" and "Interstellar," the system might recommend "Tenet" to you because the other user enjoyed it.\n\nContent-based filtering analyzes the characteristics of movies you've liked - genres, directors, actors, themes - and finds similar movies. This ensures recommendations stay relevant to your specific tastes.\n\nThe system also considers contextual factors like time of day, season, and your recent viewing history to make timely suggestions.`
    },
    {
      id: 2,
      title: "Understanding Confidence Scores",
      category: "AI Transparency",
      readTime: "3 min read",
      difficulty: "Beginner",
      icon: "Target",
      summary: "Decode what confidence percentages mean for your recommendations",
      content: `Confidence scores represent how certain our AI is that you'll enjoy a particular movie recommendation.\n\n90-100%: Extremely confident - Based on strong patterns in your viewing history and preferences\n80-89%: Very confident - Good match with some uncertainty factors\n70-79%: Moderately confident - Reasonable match but may be exploring new territory\n60-69%: Somewhat confident - Experimental recommendation to broaden your horizons\nBelow 60%: Low confidence - Highly experimental or limited data available\n\nHigher confidence doesn't always mean better recommendations - sometimes lower confidence scores introduce you to amazing movies you wouldn't have discovered otherwise!`
    },
    {
      id: 3,
      title: "Privacy and Data Protection",
      category: "Privacy & Security",
      readTime: "4 min read",
      difficulty: "Intermediate",
      icon: "Shield",
      summary: "How we protect your data while improving recommendations",
      content: `Your privacy is fundamental to how we design our recommendation system.\n\nData Minimization: We only collect data necessary for recommendations - viewing history, ratings, and explicit preferences.\n\nAnonymization: Personal identifiers are separated from behavioral data using advanced encryption techniques.\n\nLocal Processing: Many preference calculations happen on your device, not our servers.\n\nTransparency: You can see exactly what data we have and how it influences your recommendations.\n\nControl: You can export, modify, or delete your data at any time through your privacy settings.\n\nWe never sell your data to third parties or use it for purposes beyond improving your movie discovery experience.`
    },
    {
      id: 4,
      title: "Bias Prevention in AI",
      category: "Ethical AI",
      readTime: "6 min read",
      difficulty: "Advanced",
      icon: "Scale",
      summary: "How we ensure fair and diverse movie recommendations",
      content: `AI systems can inadvertently perpetuate biases, so we've implemented several safeguards:\n\nDiversity Injection: Our algorithm actively promotes diverse content across genres, cultures, and time periods.\n\nBias Detection: We continuously monitor for patterns that might favor certain types of content unfairly.\n\nInclusive Training Data: Our models are trained on diverse datasets representing global cinema.\n\nFairness Metrics: We measure recommendation diversity and adjust algorithms to prevent echo chambers.\n\nHuman Oversight: Our team regularly reviews AI decisions to identify and correct potential biases.\n\nUser Agency: You have tools to actively shape your recommendations and break out of filter bubbles.\n\nThe goal is to help you discover great movies while respecting the full spectrum of cinematic art.`
    }
  ];

  const faqs = [
    {
      id: 1,
      question: "Why do I get recommendations for movies I've already seen?",
      answer: "This can happen for a few reasons: 1) The system might not have recorded your viewing history if you watched it elsewhere, 2) You might enjoy rewatching certain types of movies, 3) The algorithm is suggesting similar movies and made an error. You can mark movies as 'already seen' to improve future recommendations."
    },
    {
      id: 2,
      question: "How can I get more diverse movie recommendations?",
      answer: "Try these strategies: 1) Rate movies from different genres and time periods, 2) Use the 'Explore' feature to discover new categories, 3) Adjust your preference settings to reduce emphasis on familiar genres, 4) Engage with our 'Hidden Gems' section, 5) Follow curated lists from diverse film critics and enthusiasts."
    },
    {
      id: 3,
      question: "What happens to my data if I delete my account?",
      answer: "When you delete your account, all personal data is permanently removed within 30 days. This includes your viewing history, ratings, preferences, and any personal information. Anonymized data used for general system improvements (without any connection to you) may be retained to help improve recommendations for other users."
    },
    {
      id: 4,
      question: "Can I see why a specific movie was recommended to me?",
      answer: "Yes! Click on any recommendation to see detailed explanations including: preference matching scores, similar movies you've enjoyed, behavioral patterns that influenced the suggestion, and confidence factors. This transparency helps you understand and improve your recommendations."
    },
    {
      id: 5,
      question: "How often does the AI update my preferences?",
      answer: "Your preferences are updated in real-time as you interact with the platform. Every rating, search, click, and viewing session provides new data points. However, significant preference changes are weighted more heavily and may take 24-48 hours to fully influence your recommendations as the system validates new patterns."
    }
  ];

  const ArticleModal = ({ article, onClose }) => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-xl max-w-2xl w-full max-h-[80vh] overflow-hidden border border-border">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Icon name={article.icon} size={20} color="var(--color-accent)" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">{article.title}</h3>
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <span>{article.category}</span>
                <span>•</span>
                <span>{article.readTime}</span>
                <span>•</span>
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  article.difficulty === 'Beginner' ? 'bg-success/20 text-success' :
                  article.difficulty === 'Intermediate'? 'bg-warning/20 text-warning' : 'bg-error/20 text-error'
                }`}>
                  {article.difficulty}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50"
          >
            <Icon name="X" size={20} />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="prose prose-sm max-w-none">
            {article.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-sm text-foreground mb-4 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Educational Articles */}
      <div className="bg-card rounded-xl p-6 border border-border">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Learn About AI Recommendations</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Understand how our AI works and how to get better recommendations
            </p>
          </div>
          <Icon name="BookOpen" size={24} color="var(--color-accent)" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {educationalContent.map((article) => (
            <div key={article.id} className="border border-border rounded-lg p-4 hover:shadow-movie-card transition-shadow duration-200">
              <div className="flex items-start space-x-3 mb-3">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={article.icon} size={20} color="var(--color-accent)" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-foreground mb-1">{article.title}</h4>
                  <p className="text-xs text-muted-foreground mb-2">{article.summary}</p>
                  
                  <div className="flex items-center space-x-3 text-xs text-muted-foreground mb-3">
                    <span>{article.category}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                    <span className={`px-2 py-0.5 rounded-full ${
                      article.difficulty === 'Beginner' ? 'bg-success/20 text-success' :
                      article.difficulty === 'Intermediate'? 'bg-warning/20 text-warning' : 'bg-error/20 text-error'
                    }`}>
                      {article.difficulty}
                    </span>
                  </div>
                </div>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                fullWidth
                iconName="ArrowRight"
                iconPosition="right"
                onClick={() => setActiveArticle(article)}
              >
                Read Article
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-card rounded-xl p-6 border border-border">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Frequently Asked Questions</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Common questions about AI recommendations and privacy
            </p>
          </div>
          <Icon name="HelpCircle" size={24} color="var(--color-accent)" />
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="border border-border rounded-lg">
              <button
                onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/30 transition-colors duration-200"
              >
                <span className="text-sm font-medium text-foreground pr-4">{faq.question}</span>
                <Icon 
                  name={expandedFaq === faq.id ? "ChevronUp" : "ChevronDown"} 
                  size={16} 
                  color="var(--color-muted-foreground)"
                  className="flex-shrink-0"
                />
              </button>
              
              {expandedFaq === faq.id && (
                <div className="px-4 pb-4 border-t border-border">
                  <p className="text-sm text-muted-foreground leading-relaxed pt-3">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Quick Tips */}
      <div className="bg-card rounded-xl p-6 border border-border">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Quick Tips for Better Recommendations</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Simple ways to improve your movie discovery experience
            </p>
          </div>
          <Icon name="Lightbulb" size={24} color="var(--color-accent)" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              icon: "Star",
              title: "Rate More Movies",
              description: "Rate at least 20 movies to get personalized recommendations"
            },
            {
              icon: "Sliders",
              title: "Adjust Preferences",
              description: "Fine-tune your genre and mood preferences regularly"
            },
            {
              icon: "MessageSquare",
              title: "Provide Feedback",
              description: "Tell us when recommendations are helpful or not"
            },
            {
              icon: "Shuffle",
              title: "Try 'Surprise Me'",
              description: "Use our random discovery feature to explore new genres"
            },
            {
              icon: "Users",
              title: "Follow Friends",
              description: "Connect with friends to get social recommendations"
            },
            {
              icon: "Calendar",
              title: "Update Mood Settings",
              description: "Change your mood preferences based on how you're feeling"
            }
          ].map((tip, index) => (
            <div key={index} className="p-4 border border-border rounded-lg text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Icon name={tip.icon} size={20} color="var(--color-accent)" />
              </div>
              <h4 className="text-sm font-medium text-foreground mb-2">{tip.title}</h4>
              <p className="text-xs text-muted-foreground">{tip.description}</p>
            </div>
          ))}
        </div>
      </div>

      {activeArticle && (
        <ArticleModal 
          article={activeArticle} 
          onClose={() => setActiveArticle(null)} 
        />
      )}
    </div>
  );
};

export default AIEducationHub;