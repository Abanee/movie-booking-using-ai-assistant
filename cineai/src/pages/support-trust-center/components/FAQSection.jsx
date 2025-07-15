import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const FAQSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedItems, setExpandedItems] = useState(new Set());

  const faqCategories = [
    { id: 'all', name: 'All Topics', count: 24 },
    { id: 'booking', name: 'Booking', count: 8 },
    { id: 'payment', name: 'Payment', count: 6 },
    { id: 'account', name: 'Account', count: 4 },
    { id: 'ai', name: 'AI Features', count: 3 },
    { id: 'technical', name: 'Technical', count: 3 }
  ];

  const faqItems = [
    {
      id: 1,
      category: 'booking',
      question: "How do I cancel or modify my booking?",
      answer: `You can cancel or modify your booking through several methods:\n\n**Online:**\n1. Log into your account and go to 'My Bookings'\n2. Select the booking you want to change\n3. Choose 'Cancel' or 'Modify' option\n4. Follow the prompts to complete the process\n\n**Mobile App:**\n1. Open the CineAI app\n2. Tap 'My Tickets' in the bottom menu\n3. Select your booking and tap 'Manage'\n\n**Cancellation Policy:**\n• Full refund: 24+ hours before showtime\n• 50% refund: 2-24 hours before showtime\n• No refund: Less than 2 hours before showtime`,
      helpful: 156,
      notHelpful: 12
    },
    {
      id: 2,
      category: 'payment',
      question: "What payment methods do you accept?",
      answer: `We accept a wide variety of payment methods for your convenience:\n\n**Credit & Debit Cards:**\n• Visa, Mastercard, American Express, Discover\n• Both domestic and international cards accepted\n\n**Digital Wallets:**\n• Apple Pay, Google Pay, Samsung Pay\n• PayPal and PayPal Credit\n\n**Other Methods:**\n• Gift cards and promotional codes\n• Buy now, pay later options (Klarna, Afterpay)\n• Corporate accounts for business bookings\n\nAll payments are processed securely with 256-bit SSL encryption and PCI DSS compliance.`,
      helpful: 203,
      notHelpful: 8
    },
    {
      id: 3,
      category: 'ai',
      question: "How does the AI recommendation system work?",
      answer: `Our AI recommendation engine uses advanced machine learning to suggest movies you'll love:\n\n**Data Sources:**\n• Your viewing history and ratings\n• Genre preferences and mood indicators\n• Time of day and seasonal patterns\n• Similar user preferences (anonymized)\n• Current trending content\n\n**Personalization Factors:**\n• Movie ratings and reviews you've given\n• Directors and actors you follow\n• Preferred movie lengths and showtimes\n• Social recommendations from friends\n\n**Privacy:**\n• All data is anonymized and encrypted\n• You can adjust privacy settings anytime\n• Recommendations improve over time with your feedback\n\nYou can fine-tune your preferences in the AI Insights section of your account.`,
      helpful: 89,
      notHelpful: 15
    },
    {
      id: 4,
      category: 'booking',
      question: "Can I book tickets for a group?",
      answer: `Yes! We offer several group booking options:\n\n**Standard Group Booking:**\n• Book up to 20 seats in one transaction\n• Automatic seat clustering for best experience\n• Group discount applies for 10+ tickets\n\n**Advanced Group Features:**\n• Send booking links to friends for individual payment\n• Coordinate preferences with group polling\n• Split payments across multiple cards\n• Group chat for planning and coordination\n\n**Corporate & Event Bookings:**\n• Special rates for companies and organizations\n• Dedicated account manager for large groups\n• Custom billing and reporting options\n\nContact our group sales team for bookings over 50 people.`,
      helpful: 134,
      notHelpful: 7
    },
    {
      id: 5,
      category: 'account',
      question: "How do I reset my password?",
      answer: `You can reset your password in several ways:\n\n**Online Reset:**\n1. Go to the login page and click 'Forgot Password'\n2. Enter your email address\n3. Check your email for reset instructions\n4. Click the reset link and create a new password\n\n**Mobile App Reset:**\n1. Open the app and tap 'Sign In'\n2. Tap 'Forgot Password' below the login form\n3. Follow the same email verification process\n\n**Security Tips:**\n• Use a strong password with mixed characters\n• Enable two-factor authentication for extra security\n• Don't share your password with others\n• Update your password regularly\n\nIf you don't receive the reset email, check your spam folder or contact support.`,
      helpful: 178,
      notHelpful: 5
    },
    {
      id: 6,
      category: 'technical',
      question: "Why is the website/app running slowly?",
      answer: `Several factors can affect performance. Here are troubleshooting steps:\n\n**Browser Issues:**\n• Clear your browser cache and cookies\n• Disable browser extensions temporarily\n• Try using an incognito/private window\n• Update to the latest browser version\n\n**Mobile App Issues:**\n• Force close and restart the app\n• Check for app updates in your app store\n• Restart your device\n• Ensure you have stable internet connection\n\n**Network Issues:**\n• Test your internet speed (minimum 5 Mbps recommended)\n• Try switching between WiFi and mobile data\n• Move closer to your WiFi router\n\n**System Requirements:**\n• Browser: Chrome 90+, Safari 14+, Firefox 88+\n• Mobile: iOS 13+ or Android 8+\n\nIf problems persist, check our system status page or contact support.`,
      helpful: 92,
      notHelpful: 23
    }
  ];

  const toggleExpanded = (id) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const filteredFAQs = faqItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleVote = (id, type) => {
    alert(`Thank you for your feedback! This helps us improve our help content.`);
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="bg-card rounded-xl p-6 border border-border">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
            <Icon name="HelpCircle" size={20} color="var(--color-accent-foreground)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Frequently Asked Questions</h3>
            <p className="text-sm text-muted-foreground">Find answers to common questions</p>
          </div>
        </div>

        <div className="space-y-4">
          <Input
            type="search"
            placeholder="Search FAQ topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <div className="flex flex-wrap gap-2">
            {faqCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-background text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Items */}
      <div className="space-y-4">
        {filteredFAQs.map((item) => (
          <div key={item.id} className="bg-card rounded-xl border border-border overflow-hidden">
            <button
              onClick={() => toggleExpanded(item.id)}
              className="w-full px-6 py-4 text-left hover:bg-muted/50 transition-colors duration-200"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-foreground pr-4">{item.question}</h4>
                <Icon 
                  name={expandedItems.has(item.id) ? "ChevronUp" : "ChevronDown"} 
                  size={20} 
                  color="var(--color-muted-foreground)" 
                />
              </div>
            </button>

            {expandedItems.has(item.id) && (
              <div className="px-6 pb-6">
                <div className="pt-4 border-t border-border">
                  <div className="prose prose-sm max-w-none">
                    <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                      {item.answer}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-muted-foreground">Was this helpful?</span>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleVote(item.id, 'helpful')}
                          iconName="ThumbsUp"
                          iconPosition="left"
                        >
                          Yes ({item.helpful})
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleVote(item.id, 'not-helpful')}
                          iconName="ThumbsDown"
                          iconPosition="left"
                        >
                          No ({item.notHelpful})
                        </Button>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="MessageCircle"
                      iconPosition="left"
                    >
                      Still need help?
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredFAQs.length === 0 && (
        <div className="bg-card rounded-xl p-8 border border-border text-center">
          <Icon name="Search" size={48} className="mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No results found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search terms or browse different categories
          </p>
          <Button variant="outline" onClick={() => setSearchQuery('')}>
            Clear Search
          </Button>
        </div>
      )}

      {/* Still Need Help */}
      <div className="bg-card rounded-xl p-6 border border-border">
        <div className="text-center">
          <Icon name="MessageSquare" size={32} className="mx-auto mb-4 text-accent" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Still need help?</h3>
          <p className="text-muted-foreground mb-4">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="default" iconName="MessageCircle" iconPosition="left">
              Start Live Chat
            </Button>
            <Button variant="outline" iconName="Mail" iconPosition="left">
              Send Email
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;