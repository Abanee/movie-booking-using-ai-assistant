import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DataPrivacyControls = () => {
  const [privacySettings, setPrivacySettings] = useState({
    dataCollection: true,
    personalizedAds: false,
    socialSharing: true,
    analyticsTracking: true,
    locationData: false,
    behaviorAnalysis: true
  });

  const [showExportModal, setShowExportModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleSettingChange = (setting) => {
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const privacyOptions = [
    {
      id: 'dataCollection',
      title: 'Data Collection',
      description: 'Allow CineAI to collect viewing preferences and behavior data to improve recommendations',
      icon: 'Database',
      critical: true
    },
    {
      id: 'personalizedAds',
      title: 'Personalized Advertisements',
      description: 'Show targeted ads based on your movie preferences and viewing history',
      icon: 'Target',
      critical: false
    },
    {
      id: 'socialSharing',
      title: 'Social Sharing',
      description: 'Allow sharing of your movie ratings and reviews with friends and the community',
      icon: 'Share2',
      critical: false
    },
    {
      id: 'analyticsTracking',
      title: 'Analytics Tracking',
      description: 'Help improve the platform by sharing anonymous usage analytics',
      icon: 'BarChart3',
      critical: false
    },
    {
      id: 'locationData',
      title: 'Location Data',
      description: 'Use your location to suggest nearby theaters and local movie events',
      icon: 'MapPin',
      critical: false
    },
    {
      id: 'behaviorAnalysis',
      title: 'Behavior Analysis',
      description: 'Analyze your browsing patterns to enhance recommendation accuracy',
      icon: 'Eye',
      critical: false
    }
  ];

  const dataCategories = [
    {
      category: 'Viewing History',
      description: 'Movies watched, ratings given, and viewing timestamps',
      dataPoints: 247,
      lastUpdated: '2 hours ago'
    },
    {
      category: 'Preference Data',
      description: 'Genre preferences, director affinity, and mood settings',
      dataPoints: 156,
      lastUpdated: '1 day ago'
    },
    {
      category: 'Behavioral Patterns',
      description: 'Browsing history, search queries, and interaction data',
      dataPoints: 1834,
      lastUpdated: '5 minutes ago'
    },
    {
      category: 'Social Interactions',
      description: 'Reviews, comments, and social sharing activity',
      dataPoints: 89,
      lastUpdated: '3 days ago'
    }
  ];

  const ExportModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-xl max-w-md w-full p-6 border border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Export Your Data</h3>
          <button
            onClick={() => setShowExportModal(false)}
            className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50"
          >
            <Icon name="X" size={20} />
          </button>
        </div>
        
        <p className="text-sm text-muted-foreground mb-6">
          Download a copy of all your data including preferences, viewing history, and recommendations.
        </p>
        
        <div className="space-y-3 mb-6">
          {['Viewing History', 'Preferences', 'Recommendations', 'Reviews & Ratings'].map((item, index) => (
            <label key={index} className="flex items-center space-x-3">
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 text-accent bg-input border-border rounded focus:ring-accent"
              />
              <span className="text-sm text-foreground">{item}</span>
            </label>
          ))}
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="outline" fullWidth onClick={() => setShowExportModal(false)}>
            Cancel
          </Button>
          <Button variant="default" fullWidth iconName="Download" iconPosition="left">
            Export Data
          </Button>
        </div>
      </div>
    </div>
  );

  const DeleteModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-xl max-w-md w-full p-6 border border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-error">Delete All Data</h3>
          <button
            onClick={() => setShowDeleteModal(false)}
            className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50"
          >
            <Icon name="X" size={20} />
          </button>
        </div>
        
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="AlertTriangle" size={20} color="var(--color-error)" />
            <span className="text-sm font-medium text-error">This action cannot be undone</span>
          </div>
          <p className="text-sm text-muted-foreground">
            This will permanently delete all your data including viewing history, preferences, and recommendations. Your account will be reset to default settings.
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="outline" fullWidth onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="destructive" fullWidth iconName="Trash2" iconPosition="left">
            Delete All Data
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Privacy Settings */}
      <div className="bg-card rounded-xl p-6 border border-border">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Privacy Settings</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Control how your data is collected and used
            </p>
          </div>
          <Icon name="Shield" size={24} color="var(--color-accent)" />
        </div>
        
        <div className="space-y-4">
          {privacyOptions.map((option) => (
            <div key={option.id} className="flex items-start justify-between p-4 rounded-lg border border-border">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={option.icon} size={20} color="var(--color-accent)" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="text-sm font-medium text-foreground">{option.title}</h4>
                    {option.critical && (
                      <span className="px-2 py-0.5 bg-accent/20 text-accent text-xs rounded-full">
                        Required
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{option.description}</p>
                </div>
              </div>
              
              <button
                onClick={() => handleSettingChange(option.id)}
                disabled={option.critical}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                  privacySettings[option.id] ? 'bg-accent' : 'bg-muted'
                } ${option.critical ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                    privacySettings[option.id] ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Data Overview */}
      <div className="bg-card rounded-xl p-6 border border-border">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Your Data Overview</h3>
            <p className="text-sm text-muted-foreground mt-1">
              See what data we have collected about you
            </p>
          </div>
          <Icon name="FileText" size={24} color="var(--color-accent)" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dataCategories.map((category, index) => (
            <div key={index} className="p-4 rounded-lg border border-border">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-foreground">{category.category}</h4>
                <span className="text-sm font-medium text-accent">{category.dataPoints}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{category.description}</p>
              <p className="text-xs text-muted-foreground">Last updated: {category.lastUpdated}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Data Management Actions */}
      <div className="bg-card rounded-xl p-6 border border-border">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Data Management</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Export or delete your personal data
            </p>
          </div>
          <Icon name="Settings" size={24} color="var(--color-accent)" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border border-border text-center">
            <Icon name="Download" size={32} color="var(--color-accent)" className="mx-auto mb-3" />
            <h4 className="text-sm font-medium text-foreground mb-2">Export Data</h4>
            <p className="text-xs text-muted-foreground mb-4">
              Download a copy of all your data
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              fullWidth
              onClick={() => setShowExportModal(true)}
            >
              Export
            </Button>
          </div>
          
          <div className="p-4 rounded-lg border border-border text-center">
            <Icon name="RotateCcw" size={32} color="var(--color-warning)" className="mx-auto mb-3" />
            <h4 className="text-sm font-medium text-foreground mb-2">Reset Preferences</h4>
            <p className="text-xs text-muted-foreground mb-4">
              Clear all AI learning data
            </p>
            <Button variant="outline" size="sm" fullWidth>
              Reset
            </Button>
          </div>
          
          <div className="p-4 rounded-lg border border-border text-center">
            <Icon name="Trash2" size={32} color="var(--color-error)" className="mx-auto mb-3" />
            <h4 className="text-sm font-medium text-foreground mb-2">Delete All Data</h4>
            <p className="text-xs text-muted-foreground mb-4">
              Permanently remove all data
            </p>
            <Button 
              variant="destructive" 
              size="sm" 
              fullWidth
              onClick={() => setShowDeleteModal(true)}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>

      {showExportModal && <ExportModal />}
      {showDeleteModal && <DeleteModal />}
    </div>
  );
};

export default DataPrivacyControls;