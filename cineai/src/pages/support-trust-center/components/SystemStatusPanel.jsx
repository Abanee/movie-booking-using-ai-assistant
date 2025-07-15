import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SystemStatusPanel = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const systemServices = [
    {
      name: "Booking System",
      status: "operational",
      uptime: "99.9%",
      lastIncident: "None in 30 days",
      description: "Movie ticket booking and seat selection"
    },
    {
      name: "Payment Processing",
      status: "operational",
      uptime: "99.8%",
      lastIncident: "None in 30 days",
      description: "Credit card and digital wallet payments"
    },
    {
      name: "AI Recommendations",
      status: "operational",
      uptime: "99.7%",
      lastIncident: "None in 30 days",
      description: "Personalized movie suggestions and matching"
    },
    {
      name: "User Authentication",
      status: "operational",
      uptime: "99.9%",
      lastIncident: "None in 30 days",
      description: "Login, registration, and account management"
    },
    {
      name: "Theater Integration",
      status: "degraded",
      uptime: "98.5%",
      lastIncident: "2 hours ago",
      description: "Real-time theater data and showtimes"
    },
    {
      name: "Mobile App API",
      status: "operational",
      uptime: "99.6%",
      lastIncident: "None in 30 days",
      description: "Mobile application backend services"
    }
  ];

  const upcomingMaintenance = [
    {
      id: 1,
      title: "Database Optimization",
      description: "Scheduled maintenance to improve booking performance",
      date: "2025-07-22",
      time: "2:00 AM - 4:00 AM EST",
      impact: "Low",
      services: ["Booking System", "User Authentication"]
    },
    {
      id: 2,
      title: "AI Model Update",
      description: "Deploying improved recommendation algorithms",
      date: "2025-07-25",
      time: "1:00 AM - 3:00 AM EST",
      impact: "None",
      services: ["AI Recommendations"]
    }
  ];

  const recentIncidents = [
    {
      id: 1,
      title: "Theater Data Sync Delay",
      description: "Some theaters experiencing delayed showtime updates",
      status: "investigating",
      startTime: "2 hours ago",
      impact: "Minor",
      updates: [
        {
          time: "2 hours ago",
          message: "Issue identified with theater API integration"
        },
        {
          time: "1 hour ago",
          message: "Engineering team working on resolution"
        },
        {
          time: "30 minutes ago",
          message: "Partial fix deployed, monitoring results"
        }
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational': return 'success';
      case 'degraded': return 'warning';
      case 'outage': return 'error';
      default: return 'muted';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'operational': return 'CheckCircle';
      case 'degraded': return 'AlertTriangle';
      case 'outage': return 'XCircle';
      default: return 'Clock';
    }
  };

  return (
    <div className="space-y-6">
      {/* Overall Status */}
      <div className="bg-card rounded-xl p-6 border border-border">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-success rounded-lg flex items-center justify-center">
              <Icon name="Activity" size={20} color="var(--color-success-foreground)" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">System Status</h3>
              <p className="text-sm text-muted-foreground">
                Last updated: {currentTime.toLocaleTimeString()}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2 mb-1">
              <Icon name="CheckCircle" size={16} color="var(--color-success)" />
              <span className="text-sm font-medium text-success">All Systems Operational</span>
            </div>
            <p className="text-xs text-muted-foreground">Overall uptime: 99.7%</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {systemServices.map((service, index) => (
            <div key={index} className="bg-background rounded-lg p-4 border border-border">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-foreground">{service.name}</h4>
                <div className="flex items-center space-x-1">
                  <Icon 
                    name={getStatusIcon(service.status)} 
                    size={16} 
                    color={`var(--color-${getStatusColor(service.status)})`} 
                  />
                  <span className={`text-xs capitalize text-${getStatusColor(service.status)}`}>
                    {service.status}
                  </span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mb-3">{service.description}</p>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Uptime</span>
                  <span className="font-medium text-foreground">{service.uptime}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Last incident</span>
                  <span className="font-medium text-foreground">{service.lastIncident}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Incidents */}
      {recentIncidents.length > 0 && (
        <div className="bg-card rounded-xl p-6 border border-border">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-warning rounded-lg flex items-center justify-center">
              <Icon name="AlertTriangle" size={20} color="var(--color-warning-foreground)" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Recent Incidents</h3>
              <p className="text-sm text-muted-foreground">Current and recent service issues</p>
            </div>
          </div>

          {recentIncidents.map((incident) => (
            <div key={incident.id} className="bg-background rounded-lg p-4 border border-border">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-medium text-foreground">{incident.title}</h4>
                  <p className="text-sm text-muted-foreground">{incident.description}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    incident.status === 'investigating' ?'bg-warning/10 text-warning' :'bg-success/10 text-success'
                  }`}>
                    {incident.status}
                  </span>
                  <p className="text-xs text-muted-foreground mt-1">{incident.startTime}</p>
                </div>
              </div>

              <div className="space-y-2">
                <h5 className="text-sm font-medium text-foreground">Updates:</h5>
                {incident.updates.map((update, index) => (
                  <div key={index} className="flex items-start space-x-3 text-sm">
                    <span className="text-muted-foreground min-w-0 flex-shrink-0">
                      {update.time}
                    </span>
                    <span className="text-foreground">{update.message}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Scheduled Maintenance */}
      <div className="bg-card rounded-xl p-6 border border-border">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="Calendar" size={20} color="var(--color-primary-foreground)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Scheduled Maintenance</h3>
            <p className="text-sm text-muted-foreground">Upcoming planned maintenance windows</p>
          </div>
        </div>

        <div className="space-y-4">
          {upcomingMaintenance.map((maintenance) => (
            <div key={maintenance.id} className="bg-background rounded-lg p-4 border border-border">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-medium text-foreground">{maintenance.title}</h4>
                  <p className="text-sm text-muted-foreground">{maintenance.description}</p>
                </div>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  maintenance.impact === 'None' ?'bg-success/10 text-success' :'bg-warning/10 text-warning'
                }`}>
                  {maintenance.impact} Impact
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Date & Time</p>
                  <p className="text-sm font-medium text-foreground">
                    {maintenance.date} • {maintenance.time}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Affected Services</p>
                  <p className="text-sm font-medium text-foreground">
                    {maintenance.services.join(', ')}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Subscribe to status updates
            </span>
            <Button variant="outline" size="sm" iconName="Bell" iconPosition="left">
              Get Notifications
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemStatusPanel;