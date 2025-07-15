import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const PreferenceAnalytics = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const genreData = [
    { name: 'Action', value: 28, color: '#FFB800' },
    { name: 'Drama', value: 22, color: '#FF8800' },
    { name: 'Comedy', value: 18, color: '#00C851' },
    { name: 'Thriller', value: 15, color: '#FF4444' },
    { name: 'Sci-Fi', value: 12, color: '#2196F3' },
    { name: 'Romance', value: 5, color: '#9C27B0' }
  ];

  const moodData = [
    { mood: 'Adventurous', jan: 65, feb: 72, mar: 68, apr: 75, may: 80, jun: 78 },
    { mood: 'Relaxed', jan: 45, feb: 52, mar: 48, apr: 55, may: 60, jun: 58 },
    { mood: 'Thoughtful', jan: 35, feb: 42, mar: 38, apr: 45, may: 50, jun: 48 },
    { mood: 'Social', jan: 55, feb: 62, mar: 58, apr: 65, may: 70, jun: 68 }
  ];

  const accuracyData = [
    { month: 'Jan', accuracy: 72 },
    { month: 'Feb', accuracy: 75 },
    { month: 'Mar', accuracy: 78 },
    { month: 'Apr', accuracy: 82 },
    { month: 'May', accuracy: 85 },
    { month: 'Jun', accuracy: 88 }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'BarChart3' },
    { id: 'genres', label: 'Genre Preferences', icon: 'PieChart' },
    { id: 'mood', label: 'Mood Patterns', icon: 'TrendingUp' },
    { id: 'accuracy', label: 'Accuracy Trends', icon: 'Target' }
  ];

  const renderOverview = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-card rounded-xl p-6 border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Preference Strength</h3>
        <div className="space-y-4">
          {[
            { category: 'Genre Preferences', strength: 85, trend: 'up' },
            { category: 'Director Affinity', strength: 72, trend: 'up' },
            { category: 'Mood Matching', strength: 78, trend: 'stable' },
            { category: 'Social Influence', strength: 45, trend: 'down' }
          ].map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">{item.category}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-foreground">{item.strength}%</span>
                  <Icon 
                    name={item.trend === 'up' ? 'TrendingUp' : item.trend === 'down' ? 'TrendingDown' : 'Minus'} 
                    size={14} 
                    color={item.trend === 'up' ? 'var(--color-success)' : item.trend === 'down' ? 'var(--color-error)' : 'var(--color-muted-foreground)'} 
                  />
                </div>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-accent rounded-full transition-all duration-500"
                  style={{ width: `${item.strength}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card rounded-xl p-6 border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Learning Progress</h3>
        <div className="space-y-4">
          <div className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="var(--color-muted)"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="var(--color-accent)"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  strokeDashoffset={`${2 * Math.PI * 40 * (1 - 0.82)}`}
                  className="transition-all duration-500"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-foreground">82%</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Profile Completeness</p>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Movies Rated</span>
              <span className="text-foreground font-medium">247</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Preferences Updated</span>
              <span className="text-foreground font-medium">15 days ago</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Accuracy Score</span>
              <span className="text-foreground font-medium">88%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderGenres = () => (
    <div className="bg-card rounded-xl p-6 border border-border">
      <h3 className="text-lg font-semibold text-foreground mb-6">Genre Distribution</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={genreData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {genreData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="space-y-4">
          {genreData.map((genre, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: genre.color }}
                ></div>
                <span className="text-sm text-foreground">{genre.name}</span>
              </div>
              <span className="text-sm font-medium text-foreground">{genre.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMood = () => (
    <div className="bg-card rounded-xl p-6 border border-border">
      <h3 className="text-lg font-semibold text-foreground mb-6">Mood Patterns Over Time</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={moodData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="mood" stroke="var(--color-muted-foreground)" />
            <YAxis stroke="var(--color-muted-foreground)" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--color-card)', 
                border: '1px solid var(--color-border)',
                borderRadius: '8px'
              }} 
            />
            <Line type="monotone" dataKey="jan" stroke="#FFB800" strokeWidth={2} />
            <Line type="monotone" dataKey="feb" stroke="#FF8800" strokeWidth={2} />
            <Line type="monotone" dataKey="mar" stroke="#00C851" strokeWidth={2} />
            <Line type="monotone" dataKey="apr" stroke="#FF4444" strokeWidth={2} />
            <Line type="monotone" dataKey="may" stroke="#2196F3" strokeWidth={2} />
            <Line type="monotone" dataKey="jun" stroke="#9C27B0" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderAccuracy = () => (
    <div className="bg-card rounded-xl p-6 border border-border">
      <h3 className="text-lg font-semibold text-foreground mb-6">Recommendation Accuracy Trends</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={accuracyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
            <YAxis stroke="var(--color-muted-foreground)" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--color-card)', 
                border: '1px solid var(--color-border)',
                borderRadius: '8px'
              }} 
            />
            <Bar dataKey="accuracy" fill="var(--color-accent)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'genres':
        return renderGenres();
      case 'mood':
        return renderMood();
      case 'accuracy':
        return renderAccuracy();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-1 bg-muted/30 p-1 rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
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
      
      {renderContent()}
    </div>
  );
};

export default PreferenceAnalytics;