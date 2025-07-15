import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const SecurityTrustSection = () => {
  const securityFeatures = [
    {
      icon: "Shield",
      title: "SSL Encryption",
      description: "All data transmitted between your device and our servers is encrypted using industry-standard SSL/TLS protocols.",
      status: "Active",
      color: "success"
    },
    {
      icon: "Lock",
      title: "Secure Payments",
      description: "PCI DSS compliant payment processing with tokenization and fraud detection.",
      status: "Protected",
      color: "success"
    },
    {
      icon: "Eye",
      title: "Privacy Protection",
      description: "Your personal data is protected according to GDPR and CCPA privacy regulations.",
      status: "Compliant",
      color: "success"
    },
    {
      icon: "Smartphone",
      title: "Two-Factor Authentication",
      description: "Add an extra layer of security to your account with 2FA via SMS or authenticator app.",
      status: "Available",
      color: "warning"
    }
  ];

  const trustBadges = [
    {
      name: "SSL Certificate",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=100&h=60&fit=crop",
      description: "256-bit SSL encryption"
    },
    {
      name: "PCI Compliant",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=60&fit=crop",
      description: "Payment Card Industry certified"
    },
    {
      name: "GDPR Compliant",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=100&h=60&fit=crop",
      description: "European data protection"
    },
    {
      name: "SOC 2 Type II",
      image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=100&h=60&fit=crop",
      description: "Security audit certified"
    }
  ];

  const partnerLogos = [
    {
      name: "AMC Theatres",
      image: "https://images.unsplash.com/photo-1489599735734-79b4af4e2eb5?w=120&h=60&fit=crop"
    },
    {
      name: "Regal Cinemas",
      image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=120&h=60&fit=crop"
    },
    {
      name: "Cinemark",
      image: "https://images.unsplash.com/photo-1489599735734-79b4af4e2eb5?w=120&h=60&fit=crop"
    },
    {
      name: "Visa",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=120&h=60&fit=crop"
    },
    {
      name: "Mastercard",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=120&h=60&fit=crop"
    },
    {
      name: "PayPal",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=120&h=60&fit=crop"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Security Features */}
      <div className="bg-card rounded-xl p-6 border border-border">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-success rounded-lg flex items-center justify-center">
            <Icon name="Shield" size={20} color="var(--color-success-foreground)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Security & Privacy</h3>
            <p className="text-sm text-muted-foreground">Your data and payments are protected</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {securityFeatures.map((feature, index) => (
            <div key={index} className="bg-background rounded-lg p-4 border border-border">
              <div className="flex items-start space-x-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  feature.color === 'success' ? 'bg-success/10' : 'bg-warning/10'
                }`}>
                  <Icon 
                    name={feature.icon} 
                    size={16} 
                    color={feature.color === 'success' ? 'var(--color-success)' : 'var(--color-warning)'} 
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-foreground">{feature.title}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      feature.color === 'success' ?'bg-success/10 text-success' :'bg-warning/10 text-warning'
                    }`}>
                      {feature.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Want to enhance your account security?
            </span>
            <Button variant="outline" size="sm" iconName="Settings" iconPosition="left">
              Security Settings
            </Button>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-card rounded-xl p-6 border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-6">Security Certifications</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {trustBadges.map((badge, index) => (
            <div key={index} className="bg-background rounded-lg p-4 border border-border text-center">
              <div className="w-16 h-10 mx-auto mb-2 bg-muted rounded overflow-hidden">
                <Image 
                  src={badge.image} 
                  alt={badge.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-medium text-foreground text-sm mb-1">{badge.name}</h4>
              <p className="text-xs text-muted-foreground">{badge.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Info" size={16} color="var(--color-muted-foreground)" />
            <span className="text-sm font-medium text-foreground">Data Protection Commitment</span>
          </div>
          <p className="text-sm text-muted-foreground">
            We are committed to protecting your privacy and personal information. Our security measures are regularly audited by third-party security firms, and we maintain compliance with international data protection standards.
          </p>
        </div>
      </div>

      {/* Partner Trust */}
      <div className="bg-card rounded-xl p-6 border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-6">Trusted Partners</h3>
        
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-6">
          {partnerLogos.map((partner, index) => (
            <div key={index} className="bg-background rounded-lg p-3 border border-border">
              <div className="w-full h-8 bg-muted rounded overflow-hidden">
                <Image 
                  src={partner.image} 
                  alt={partner.name}
                  className="w-full h-full object-cover opacity-60"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-4">
            We partner with industry-leading theaters and payment processors to ensure secure, reliable service.
          </p>
          <Button variant="outline" size="sm" iconName="ExternalLink" iconPosition="right">
            View All Partners
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SecurityTrustSection;