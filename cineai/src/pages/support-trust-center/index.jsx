import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import HelpSearchBar from './components/HelpSearchBar';
import AIHelpAssistant from './components/AIHelpAssistant';
import BookingManagement from './components/BookingManagement';
import SecurityTrustSection from './components/SecurityTrustSection';
import SystemStatusPanel from './components/SystemStatusPanel';
import ContactSupport from './components/ContactSupport';
import FAQSection from './components/FAQSection';

const SupportTrustCenter = () => {
  const [activeTab, setActiveTab] = useState('help');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const tabs = [
    { id: 'help', name: 'Help Center', icon: 'HelpCircle' },
    { id: 'booking', name: 'Manage Bookings', icon: 'Ticket' },
    { id: 'security', name: 'Security & Trust', icon: 'Shield' },
    { id: 'status', name: 'System Status', icon: 'Activity' },
    { id: 'contact', name: 'Contact Support', icon: 'MessageSquare' },
    { id: 'faq', name: 'FAQ', icon: 'Book' }
  ];

  const handleSearch = async (query) => {
    setIsSearching(true);
    
    // Mock search results
    setTimeout(() => {
      const mockResults = [
        {
          question: `How to ${query.toLowerCase()}?`,
          answer: `Here's how you can ${query.toLowerCase()}:\n\n1. Navigate to your account dashboard\n2. Look for the relevant section\n3. Follow the step-by-step instructions\n4. Contact support if you need additional help\n\nThis process typically takes 2-3 minutes to complete.`,
          confidence: 92
        }
      ];
      
      setSearchResults(mockResults);
      setIsSearching(false);
    }, 1500);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'help':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-foreground mb-4">
                How can we help you today?
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Get instant answers with our AI-powered help system
              </p>
              <HelpSearchBar onSearch={handleSearch} isLoading={isSearching} />
            </div>
            <AIHelpAssistant searchResults={searchResults} isLoading={isSearching} />
          </div>
        );
      case 'booking':
        return <BookingManagement />;
      case 'security':
        return <SecurityTrustSection />;
      case 'status':
        return <SystemStatusPanel />;
      case 'contact':
        return <ContactSupport />;
      case 'faq':
        return <FAQSection />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-primary via-primary/90 to-secondary py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center">
                  <Icon name="Headphones" size={32} color="var(--color-accent-foreground)" />
                </div>
                <div className="text-left">
                  <h1 className="text-4xl font-bold text-primary-foreground font-accent">
                    Support & Trust Center
                  </h1>
                  <p className="text-xl text-primary-foreground/80">
                    We're here to help you every step of the way
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-6 border border-primary-foreground/20">
                  <Icon name="Zap" size={32} className="mx-auto mb-4 text-accent" />
                  <h3 className="text-lg font-semibold text-primary-foreground mb-2">
                    AI-Powered Help
                  </h3>
                  <p className="text-primary-foreground/80 text-sm">
                    Get instant answers to your questions with our intelligent help system
                  </p>
                </div>
                
                <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-6 border border-primary-foreground/20">
                  <Icon name="Clock" size={32} className="mx-auto mb-4 text-accent" />
                  <h3 className="text-lg font-semibold text-primary-foreground mb-2">
                    24/7 Support
                  </h3>
                  <p className="text-primary-foreground/80 text-sm">
                    Round-the-clock assistance through chat, email, and phone support
                  </p>
                </div>
                
                <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-6 border border-primary-foreground/20">
                  <Icon name="Shield" size={32} className="mx-auto mb-4 text-accent" />
                  <h3 className="text-lg font-semibold text-primary-foreground mb-2">
                    Secure & Trusted
                  </h3>
                  <p className="text-primary-foreground/80 text-sm">
                    Your data and payments are protected with enterprise-grade security
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-card border-b border-border sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-1 overflow-x-auto py-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-accent text-accent-foreground shadow-movie-card'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <Icon name={tab.icon} size={16} />
                  <span>{tab.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderTabContent()}
        </div>

        {/* Quick Actions Footer */}
        <div className="bg-card border-t border-border mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Need immediate assistance?
              </h2>
              <p className="text-muted-foreground mb-6">
                Choose the fastest way to get help based on your needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-background rounded-lg p-4 border border-border text-center">
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Icon name="MessageCircle" size={24} color="var(--color-success)" />
                </div>
                <h3 className="font-medium text-foreground mb-2">Live Chat</h3>
                <p className="text-xs text-muted-foreground mb-3">
                  Average response: &lt; 2 minutes
                </p>
                <Button variant="success" size="sm" fullWidth>
                  Start Chat
                </Button>
              </div>

              <div className="bg-background rounded-lg p-4 border border-border text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Icon name="Phone" size={24} color="var(--color-primary)" />
                </div>
                <h3 className="font-medium text-foreground mb-2">Call Support</h3>
                <p className="text-xs text-muted-foreground mb-3">
                  Available 6AM-12AM EST
                </p>
                <Button variant="outline" size="sm" fullWidth>
                  Call Now
                </Button>
              </div>

              <div className="bg-background rounded-lg p-4 border border-border text-center">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Icon name="Mail" size={24} color="var(--color-accent)" />
                </div>
                <h3 className="font-medium text-foreground mb-2">Email Support</h3>
                <p className="text-xs text-muted-foreground mb-3">
                  Response within 4 hours
                </p>
                <Button variant="outline" size="sm" fullWidth>
                  Send Email
                </Button>
              </div>

              <div className="bg-background rounded-lg p-4 border border-border text-center">
                <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Icon name="Book" size={24} color="var(--color-warning)" />
                </div>
                <h3 className="font-medium text-foreground mb-2">Help Center</h3>
                <p className="text-xs text-muted-foreground mb-3">
                  Self-service resources
                </p>
                <Button variant="outline" size="sm" fullWidth>
                  Browse Help
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Icon name="Film" size={24} color="var(--color-accent)" />
              <span className="text-xl font-bold font-accent">CineAI</span>
            </div>
            <p className="text-primary-foreground/80 text-sm">
              © {new Date().getFullYear()} CineAI. All rights reserved. | 
              <span className="mx-2">•</span>
              Your trusted partner in cinematic experiences
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SupportTrustCenter;