import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const GroupBookingTools = ({ onGroupUpdate, selectedSeats }) => {
  const [isGroupMode, setIsGroupMode] = useState(false);
  const [groupMembers, setGroupMembers] = useState([]);
  const [inviteEmail, setInviteEmail] = useState('');
  const [sessionLink, setSessionLink] = useState('');
  const [groupPreferences, setGroupPreferences] = useState({
    seatsTogether: true,
    priceRange: 'mixed',
    accessibility: false
  });

  // Mock group session data
  const mockGroupSession = {
    id: 'grp_abc123',
    host: 'john.doe@email.com',
    movie: 'Dune: Part Two',
    theater: 'CineAI Premium Theater 1',
    showtime: '2025-07-15T19:30:00',
    members: [
      {
        id: 1,
        email: 'john.doe@email.com',
        name: 'John Doe',
        status: 'host',
        selectedSeats: ['E8', 'E9'],
        joinedAt: new Date(Date.now() - 300000)
      },
      {
        id: 2,
        email: 'jane.smith@email.com',
        name: 'Jane Smith',
        status: 'joined',
        selectedSeats: ['E10'],
        joinedAt: new Date(Date.now() - 180000)
      },
      {
        id: 3,
        email: 'mike.wilson@email.com',
        name: 'Mike Wilson',
        status: 'pending',
        selectedSeats: [],
        joinedAt: null
      }
    ]
  };

  useEffect(() => {
    if (isGroupMode) {
      setGroupMembers(mockGroupSession.members);
      setSessionLink(`https://cineai.com/group-booking/${mockGroupSession.id}`);
    }
  }, [isGroupMode]);

  const handleStartGroupBooking = () => {
    setIsGroupMode(true);
    onGroupUpdate({ type: 'start', sessionId: mockGroupSession.id });
  };

  const handleInviteMember = () => {
    if (!inviteEmail.trim()) return;
    
    const newMember = {
      id: Date.now(),
      email: inviteEmail,
      name: inviteEmail.split('@')[0],
      status: 'pending',
      selectedSeats: [],
      joinedAt: null
    };
    
    setGroupMembers([...groupMembers, newMember]);
    setInviteEmail('');
    onGroupUpdate({ type: 'invite', member: newMember });
  };

  const handleRemoveMember = (memberId) => {
    setGroupMembers(groupMembers.filter(member => member.id !== memberId));
    onGroupUpdate({ type: 'remove', memberId });
  };

  const copySessionLink = () => {
    navigator.clipboard.writeText(sessionLink);
    // You could add a toast notification here
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'host': return 'text-accent';
      case 'joined': return 'text-green-600';
      case 'pending': return 'text-yellow-600';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'host': return 'Crown';
      case 'joined': return 'CheckCircle';
      case 'pending': return 'Clock';
      default: return 'User';
    }
  };

  if (!isGroupMode) {
    return (
      <div className="bg-card rounded-xl p-6 shadow-cinematic">
        <div className="text-center">
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Users" size={32} className="text-accent" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">Group Booking</h3>
          <p className="text-muted-foreground mb-6">
            Coordinate seat selection with friends and family in real-time
          </p>
          <Button
            variant="default"
            onClick={handleStartGroupBooking}
            iconName="Plus"
            iconPosition="left"
          >
            Start Group Booking
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl p-6 shadow-cinematic">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Users" size={24} className="text-accent" />
          <h3 className="text-xl font-semibold text-foreground">Group Session</h3>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsGroupMode(false)}
          iconName="X"
        >
          End Session
        </Button>
      </div>

      {/* Session Link */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-foreground mb-2">
          Share Session Link
        </label>
        <div className="flex space-x-2">
          <Input
            value={sessionLink}
            readOnly
            className="flex-1"
            placeholder="Session link will appear here"
          />
          <Button
            variant="outline"
            onClick={copySessionLink}
            iconName="Copy"
            iconPosition="left"
          >
            Copy
          </Button>
        </div>
      </div>

      {/* Invite Member */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-foreground mb-2">
          Invite by Email
        </label>
        <div className="flex space-x-2">
          <Input
            type="email"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            placeholder="friend@email.com"
            className="flex-1"
          />
          <Button
            variant="default"
            onClick={handleInviteMember}
            iconName="Send"
            iconPosition="left"
          >
            Invite
          </Button>
        </div>
      </div>

      {/* Group Members */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-foreground mb-3">
          Group Members ({groupMembers.length})
        </h4>
        <div className="space-y-3">
          {groupMembers.map((member) => (
            <div key={member.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                  <Icon name={getStatusIcon(member.status)} size={16} className={getStatusColor(member.status)} />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-foreground">{member.name}</span>
                    <span className={`text-xs px-2 py-1 rounded ${getStatusColor(member.status)} bg-current/10`}>
                      {member.status}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">{member.email}</div>
                  {member.selectedSeats.length > 0 && (
                    <div className="flex space-x-1 mt-1">
                      {member.selectedSeats.map((seat) => (
                        <span key={seat} className="text-xs bg-accent/20 text-accent px-1 py-0.5 rounded">
                          {seat}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              {member.status !== 'host' && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveMember(member.id)}
                  iconName="X"
                >
                  Remove
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Group Preferences */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-foreground mb-3">Group Preferences</h4>
        <div className="space-y-3">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={groupPreferences.seatsTogether}
              onChange={(e) => setGroupPreferences({
                ...groupPreferences,
                seatsTogether: e.target.checked
              })}
              className="rounded border-border"
            />
            <span className="text-sm text-foreground">Keep seats together</span>
          </label>
          
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={groupPreferences.accessibility}
              onChange={(e) => setGroupPreferences({
                ...groupPreferences,
                accessibility: e.target.checked
              })}
              className="rounded border-border"
            />
            <span className="text-sm text-foreground">Accessibility requirements</span>
          </label>
        </div>
      </div>

      {/* Real-time Activity */}
      <div className="border-t border-border pt-4">
        <h4 className="text-sm font-medium text-foreground mb-3">Recent Activity</h4>
        <div className="space-y-2 text-xs text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Icon name="UserPlus" size={12} />
            <span>Jane Smith joined the session</span>
            <span>2 min ago</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="MapPin" size={12} />
            <span>John Doe selected seats E8, E9</span>
            <span>5 min ago</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Users" size={12} />
            <span>Group session started</span>
            <span>5 min ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupBookingTools;