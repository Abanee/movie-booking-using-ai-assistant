import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import PreferenceCard from './components/PreferenceCard';
import RecommendationExplanation from './components/RecommendationExplanation';
import PreferenceAnalytics from './components/PreferenceAnalytics';
import DataPrivacyControls from './components/DataPrivacyControls';
import FeedbackSystem from './components/FeedbackSystem';
import AIEducationHub from './components/AIEducationHub';

const AIInsightsPreferences = () => {
  const [activeTab, setActiveTab] = useState('preferences');
  const [preferences, setPreferences] = useState({
    genreWeight: 75,
    directorAffinity: 60,
    moodMatching: 80,
    socialInfluence: 30,
    newReleases: 65,
    criticsScore: 45,
    audienceScore: 70,
    runtime: 90
  });

  const [aiSettings, setAiSettings] = useState({
    explainRecommendations: true,
    diversityMode: false,
    experimentalSuggestions: true,
    socialRecommendations: false,
    trendingBoost: true,
    seasonalAdjustments: true
  });

  useEffect(() => {
    // Simulate loading user preferences
    const savedPreferences = localStorage.getItem('aiPreferences');
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences));
    }
  }, []);

  const handlePreferenceChange = (key, value) => {
    const updatedPreferences = { ...preferences, [key]: value };
    setPreferences(updatedPreferences);
    localStorage.setItem('aiPreferences', JSON.stringify(updatedPreferences));
  };

  const handleAiSettingToggle = (setting) => {
    setAiSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const sampleRecommendations = [
    {
      id: 1,
      title: "Oppenheimer",
      year: 2023,
      genre: "Biography/Drama",
      poster: "https://images.unsplash.com/photo-1489599511986-c6c8b5b5e5b5?w=300&h=450&fit=crop",
      confidence: 92,
      reasons: [
        "You rated \'Dunkirk\' 5 stars",
        "Christopher Nolan is in your favorite directors",
        "Historical dramas match your preferences",
        "High critical acclaim (94% critics score)"
      ],
      similarUsers: 1247,
      preferenceMatch: [
        { category: "Genre", score: 88 },
        { category: "Director", score: 95 },
        { category: "Mood", score: 82 },
        { category: "Critics Score", score: 94 }
      ],
      similarMovies: [
        { title: "Dunkirk", poster: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=50&h=75&fit=crop", rating: 5 },
        { title: "Interstellar", poster: "https://images.unsplash.com/photo-1489599511986-c6c8b5b5e5b5?w=50&h=75&fit=crop", rating: 5 },
        { title: "The Dark Knight", poster: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=50&h=75&fit=crop", rating: 4 }
      ]
    },
    {
      id: 2,
      title: "Everything Everywhere All at Once",
      year: 2022,
      genre: "Comedy/Sci-Fi",
      poster: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=450&fit=crop",
      confidence: 78,
      reasons: [
        "Experimental storytelling matches your taste",
        "You enjoy genre-blending films",
        "Award-winning performances",
        "Unique visual style"
      ],
      similarUsers: 892,
      preferenceMatch: [
        { category: "Genre", score: 72 },
        { category: "Innovation", score: 89 },
        { category: "Mood", score: 75 },
        { category: "Awards", score: 91 }
      ],
      similarMovies: [
        { title: "Swiss Army Man", poster: "https://images.unsplash.com/photo-1489599511986-c6c8b5b5e5b5?w=50&h=75&fit=crop", rating: 4 },
        { title: "The Matrix", poster: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=50&h=75&fit=crop", rating: 5 },
        { title: "Eternal Sunshine", poster: "https://images.unsplash.com/photo-1489599511986-c6c8b5b5e5b5?w=50&h=75&fit=crop", rating: 4 }
      ]
    }
  ];

  const tabs = [
    { id: 'preferences', label: 'Preferences', icon: 'Sliders' },
    { id: 'explanations', label: 'Explanations', icon: 'MessageSquare' },
    { id: 'analytics', label: 'Analytics', icon: 'BarChart3' },
    { id: 'privacy', label: 'Privacy', icon: 'Shield' },
    { id: 'feedback', label: 'Feedback', icon: 'MessageCircle' },
    { id: 'education', label: 'Learn', icon: 'BookOpen' }
  ];

  const renderPreferences = () => (
    <div className="space-y-8">
      {/* AI Recommendation Settings */}
      <div className="bg-card rounded-xl p-6 border border-border">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">AI Recommendation Settings</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Control how our AI personalizes your movie recommendations
            </p>
          </div>
          <div className="w-2 h-2 rounded-full bg-accent ai-pulse"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries({
            explainRecommendations: {
              title: "Explain Recommendations",
              description: "Show why movies are recommended to you",
              icon: "MessageSquare"
            },
            diversityMode: {
              title: "Diversity Mode",
              description: "Prioritize diverse content across genres and cultures",
              icon: "Globe"
            },
            experimentalSuggestions: {
              title: "Experimental Suggestions",
              description: "Include surprising recommendations outside your usual taste",
              icon: "Zap"
            },
            socialRecommendations: {
              title: "Social Recommendations",
              description: "Consider what friends and similar users are watching",
              icon: "Users"
            },
            trendingBoost: {
              title: "Trending Boost",
              description: "Factor in currently popular movies",
              icon: "TrendingUp"
            },
            seasonalAdjustments: {
              title: "Seasonal Adjustments",
              description: "Adapt recommendations based on time of year",
              icon: "Calendar"
            }
          }).map(([key, setting]) => (
            <PreferenceCard
              key={key}
              title={setting.title}
              description={setting.description}
              icon={setting.icon}
              type="toggle"
              isActive={aiSettings[key]}
              onToggle={() => handleAiSettingToggle(key)}
            />
          ))}
        </div>
      </div>

      {/* Preference Weights */}
      <div className="bg-card rounded-xl p-6 border border-border">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Preference Weights</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Adjust how much each factor influences your recommendations
            </p>
          </div>
          <Icon name="Target" size={24} color="var(--color-accent)" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries({
            genreWeight: {
              title: "Genre Preferences",
              description: "How much your favorite genres influence suggestions",
              icon: "Film"
            },
            directorAffinity: {
              title: "Director Affinity",
              description: "Weight given to directors you've enjoyed",
              icon: "User"
            },
            moodMatching: {
              title: "Mood Matching",
              description: "Adapt recommendations to your current mood",
              icon: "Heart"
            },
            socialInfluence: {
              title: "Social Influence",
              description: "Consider what similar users are watching",
              icon: "Users"
            },
            newReleases: {
              title: "New Releases",
              description: "Prioritize recently released movies",
              icon: "Clock"
            },
            criticsScore: {
              title: "Critics Score",
              description: "Weight given to professional critic ratings",
              icon: "Award"
            },
            audienceScore: {
              title: "Audience Score",
              description: "Importance of general audience ratings",
              icon: "Star"
            },
            runtime: {
              title: "Runtime Preference",
              description: "Preferred movie length in minutes",
              icon: "Timer"
            }
          }).map(([key, setting]) => (
            <PreferenceCard
              key={key}
              title={setting.title}
              description={setting.description}
              icon={setting.icon}
              type="slider"
              value={preferences[key]}
              onChange={(value) => handlePreferenceChange(key, value)}
            />
          ))}
        </div>
      </div>

      {/* Real-time Preview */}
      <div className="bg-card rounded-xl p-6 border border-border">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Recommendation Preview</h3>
            <p className="text-sm text-muted-foreground mt-1">
              See how your preference changes affect recommendations in real-time
            </p>
          </div>
          <Icon name="Eye" size={24} color="var(--color-accent)" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {['Action Thriller', 'Indie Drama', 'Sci-Fi Epic'].map((genre, index) => (
            <div key={index} className="p-4 border border-border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">{genre}</span>
                <span className="text-sm text-accent font-medium">
                  {Math.floor(Math.random() * 20) + 70}%
                </span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-accent rounded-full transition-all duration-500"
                  style={{ width: `${Math.floor(Math.random() * 20) + 70}%` }}
                ></div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Match probability based on current settings
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderExplanations = () => (
    <div className="space-y-6">
      <div className="bg-card rounded-xl p-6 border border-border">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Recent Recommendations Explained</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Understand why these movies were suggested to you
            </p>
          </div>
          <Icon name="Brain" size={24} color="var(--color-accent)" />
        </div>
      </div>
      
      <div className="space-y-6">
        {sampleRecommendations.map((recommendation) => (
          <RecommendationExplanation 
            key={recommendation.id} 
            recommendation={recommendation} 
          />
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'preferences':
        return renderPreferences();
      case 'explanations':
        return renderExplanations();
      case 'analytics':
        return <PreferenceAnalytics />;
      case 'privacy':
        return <DataPrivacyControls />;
      case 'feedback':
        return <FeedbackSystem />;
      case 'education':
        return <AIEducationHub />;
      default:
        return renderPreferences();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>AI Insights & Preferences - CineAI</title>
        <meta name="description" content="Understand and control your AI-powered movie recommendations. Adjust preferences, view explanations, and manage your data privacy." />
      </Helmet>

      <Header />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-primary/95 to-secondary text-primary-foreground py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
                  <Icon name="Brain" size={24} color="var(--color-accent-foreground)" />
                </div>
                <div className="w-3 h-3 bg-accent rounded-full ai-pulse"></div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 font-accent">
                AI Insights & Preferences
              </h1>
              <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto mb-8">
                Understand how our AI works, control your recommendations, and shape your personalized movie discovery experience with complete transparency.
              </p>
              
              <div className="flex items-center justify-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <Icon name="Shield" size={16} />
                  <span>Privacy First</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Eye" size={16} />
                  <span>Full Transparency</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Settings" size={16} />
                  <span>Complete Control</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <section className="bg-background border-b border-border sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-1 py-4 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-accent text-accent-foreground shadow-movie-card'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <Icon name={tab.icon} size={16} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {renderContent()}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="py-12 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-card rounded-xl p-8 border border-border text-center">
              <Icon name="Sparkles" size={48} color="var(--color-accent)" className="mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Ready to Discover Your Perfect Movie?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Your preferences have been optimized. Let our AI find movies that match your unique taste and current mood.
              </p>
              
              <div className="flex items-center justify-center space-x-4">
                <Button variant="default" size="lg" iconName="Film" iconPosition="left">
                  Get Recommendations
                </Button>
                <Button variant="outline" size="lg" iconName="Search" iconPosition="left">
                  Browse Movies
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                  <Icon name="Film" size={20} color="var(--color-accent-foreground)" />
                </div>
                <span className="text-xl font-bold font-accent">CineAI</span>
              </div>
              <p className="text-sm text-primary-foreground/80">
                Intelligent movie recommendations powered by advanced AI technology.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">AI Features</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li>Personalized Recommendations</li>
                <li>Preference Learning</li>
                <li>Mood-Based Suggestions</li>
                <li>Transparent Explanations</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Privacy & Control</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li>Data Privacy Controls</li>
                <li>Preference Management</li>
                <li>Feedback System</li>
                <li>Export Your Data</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li>Help Center</li>
                <li>AI Education</li>
                <li>Contact Support</li>
                <li>Community Forum</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
            <p className="text-sm text-primary-foreground/60">
              © {new Date().getFullYear()} CineAI. All rights reserved. Powered by ethical AI.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AIInsightsPreferences;