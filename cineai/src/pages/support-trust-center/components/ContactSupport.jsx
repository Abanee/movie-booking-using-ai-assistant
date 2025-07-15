import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const ContactSupport = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const supportCategories = [
    { value: 'booking', label: 'Booking Issues' },
    { value: 'payment', label: 'Payment Problems' },
    { value: 'account', label: 'Account Management' },
    { value: 'technical', label: 'Technical Support' },
    { value: 'refund', label: 'Refunds & Cancellations' },
    { value: 'other', label: 'Other Questions' }
  ];

  const contactMethods = [
    {
      type: "Live Chat",
      icon: "MessageCircle",
      availability: "24/7",
      responseTime: "< 2 minutes",
      description: "Get instant help from our support team",
      status: "online",
      action: "Start Chat"
    },
    {
      type: "Email Support",
      icon: "Mail",
      availability: "24/7",
      responseTime: "< 4 hours",
      description: "Send us a detailed message",
      status: "available",
      action: "Send Email"
    },
    {
      type: "Phone Support",
      icon: "Phone",
      availability: "Mon-Sun 6AM-12AM EST",
      responseTime: "< 5 minutes",
      description: "Speak directly with our team",
      status: "available",
      action: "Call Now"
    },
    {
      type: "Video Call",
      icon: "Video",
      availability: "Mon-Fri 9AM-6PM EST",
      responseTime: "Schedule required",
      description: "Screen sharing for technical issues",
      status: "schedule",
      action: "Schedule Call"
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Support ticket submitted successfully! We\'ll get back to you within 4 hours.');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'success';
      case 'available': return 'primary';
      case 'schedule': return 'warning';
      default: return 'muted';
    }
  };

  return (
    <div className="space-y-8">
      {/* Contact Methods */}
      <div className="bg-card rounded-xl p-6 border border-border">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="Headphones" size={20} color="var(--color-primary-foreground)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Contact Support</h3>
            <p className="text-sm text-muted-foreground">Choose your preferred way to get help</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contactMethods.map((method, index) => (
            <div key={index} className="bg-background rounded-lg p-4 border border-border">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-${getStatusColor(method.status)}/10`}>
                    <Icon 
                      name={method.icon} 
                      size={16} 
                      color={`var(--color-${getStatusColor(method.status)})`} 
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{method.type}</h4>
                    <p className="text-xs text-muted-foreground">{method.availability}</p>
                  </div>
                </div>
                <div className={`w-2 h-2 rounded-full bg-${getStatusColor(method.status)}`}></div>
              </div>

              <p className="text-sm text-muted-foreground mb-3">{method.description}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  Response: {method.responseTime}
                </span>
                <Button 
                  variant={method.status === 'online' ? 'default' : 'outline'} 
                  size="sm"
                  iconName={method.icon}
                  iconPosition="left"
                >
                  {method.action}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Support Form */}
      <div className="bg-card rounded-xl p-6 border border-border">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
            <Icon name="FileText" size={20} color="var(--color-accent-foreground)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Submit Support Ticket</h3>
            <p className="text-sm text-muted-foreground">Describe your issue in detail</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              required
            />
            <Input
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your.email@example.com"
              required
            />
          </div>

          <Select
            label="Issue Category"
            options={supportCategories}
            value={selectedCategory}
            onChange={setSelectedCategory}
            placeholder="Select the type of issue"
            required
          />

          <Input
            label="Subject"
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            placeholder="Brief description of your issue"
            required
          />

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Message *
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Please provide detailed information about your issue..."
              rows={6}
              required
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
            />
          </div>

          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} color="var(--color-muted-foreground)" />
              <span className="text-sm text-muted-foreground">
                Expected response within 4 hours
              </span>
            </div>
            <Button type="submit" iconName="Send" iconPosition="right">
              Submit Ticket
            </Button>
          </div>
        </form>
      </div>

      {/* Quick Help */}
      <div className="bg-card rounded-xl p-6 border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Quick Help</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-background rounded-lg p-4 border border-border text-center">
            <Icon name="Book" size={24} className="mx-auto mb-2 text-accent" />
            <h4 className="font-medium text-foreground mb-1">Help Center</h4>
            <p className="text-xs text-muted-foreground mb-3">
              Browse our comprehensive FAQ
            </p>
            <Button variant="outline" size="sm" fullWidth>
              Browse FAQ
            </Button>
          </div>

          <div className="bg-background rounded-lg p-4 border border-border text-center">
            <Icon name="Users" size={24} className="mx-auto mb-2 text-accent" />
            <h4 className="font-medium text-foreground mb-1">Community</h4>
            <p className="text-xs text-muted-foreground mb-3">
              Get help from other users
            </p>
            <Button variant="outline" size="sm" fullWidth>
              Join Community
            </Button>
          </div>

          <div className="bg-background rounded-lg p-4 border border-border text-center">
            <Icon name="PlayCircle" size={24} className="mx-auto mb-2 text-accent" />
            <h4 className="font-medium text-foreground mb-1">Video Tutorials</h4>
            <p className="text-xs text-muted-foreground mb-3">
              Watch step-by-step guides
            </p>
            <Button variant="outline" size="sm" fullWidth>
              Watch Videos
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSupport;