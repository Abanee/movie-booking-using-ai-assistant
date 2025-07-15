import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const BookingManagement = () => {
  const [bookingId, setBookingId] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);

  const mockBookings = [
    {
      id: "BK001234",
      movie: "Dune: Part Two",
      theater: "AMC Empire 25",
      date: "2025-07-20",
      time: "7:30 PM",
      seats: ["H12", "H13"],
      amount: 28.50,
      status: "confirmed",
      canCancel: true,
      canModify: true
    },
    {
      id: "BK001235",
      movie: "Oppenheimer",
      theater: "Regal Times Square",
      date: "2025-07-18",
      time: "3:15 PM",
      seats: ["F8", "F9", "F10"],
      amount: 42.75,
      status: "confirmed",
      canCancel: true,
      canModify: false
    }
  ];

  const handleBookingSearch = () => {
    const booking = mockBookings.find(b => b.id === bookingId);
    setSelectedBooking(booking);
  };

  const handleCancelBooking = (booking) => {
    // Mock cancellation logic
    alert(`Booking ${booking.id} has been cancelled. Refund will be processed within 3-5 business days.`);
  };

  const handleModifyBooking = (booking) => {
    // Mock modification logic
    alert(`Redirecting to modify booking ${booking.id}...`);
  };

  const getRefundAmount = (booking) => {
    const showDate = new Date(booking.date);
    const now = new Date();
    const hoursUntilShow = (showDate - now) / (1000 * 60 * 60);
    
    if (hoursUntilShow >= 24) return booking.amount;
    if (hoursUntilShow >= 2) return booking.amount * 0.5;
    return 0;
  };

  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
          <Icon name="Ticket" size={20} color="var(--color-primary-foreground)" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Booking Management</h3>
          <p className="text-sm text-muted-foreground">Manage your reservations and requests</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Booking Search */}
        <div className="bg-background rounded-lg p-4 border border-border">
          <h4 className="font-medium text-foreground mb-4">Find Your Booking</h4>
          <div className="flex space-x-3">
            <Input
              placeholder="Enter booking ID (e.g., BK001234)"
              value={bookingId}
              onChange={(e) => setBookingId(e.target.value)}
              className="flex-1"
            />
            <Button
              onClick={handleBookingSearch}
              iconName="Search"
              iconPosition="left"
            >
              Search
            </Button>
          </div>
        </div>

        {/* Booking Details */}
        {selectedBooking && (
          <div className="bg-background rounded-lg p-4 border border-border">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="font-medium text-foreground">{selectedBooking.movie}</h4>
                <p className="text-sm text-muted-foreground">{selectedBooking.theater}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">${selectedBooking.amount}</p>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  selectedBooking.status === 'confirmed' ?'bg-success/10 text-success' :'bg-warning/10 text-warning'
                }`}>
                  {selectedBooking.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-muted-foreground">Date & Time</p>
                <p className="text-sm font-medium text-foreground">
                  {selectedBooking.date} at {selectedBooking.time}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Seats</p>
                <p className="text-sm font-medium text-foreground">
                  {selectedBooking.seats.join(', ')}
                </p>
              </div>
            </div>

            <div className="flex space-x-3">
              {selectedBooking.canCancel && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleCancelBooking(selectedBooking)}
                  iconName="X"
                  iconPosition="left"
                >
                  Cancel Booking
                </Button>
              )}
              {selectedBooking.canModify && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleModifyBooking(selectedBooking)}
                  iconName="Edit"
                  iconPosition="left"
                >
                  Modify Booking
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                iconName="Download"
                iconPosition="left"
              >
                Download Ticket
              </Button>
            </div>

            {/* Refund Information */}
            <div className="mt-4 p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Info" size={16} color="var(--color-muted-foreground)" />
                <span className="text-sm font-medium text-foreground">Refund Policy</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Current refund amount: <span className="font-medium text-foreground">
                  ${getRefundAmount(selectedBooking).toFixed(2)}
                </span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                • Full refund: 24+ hours before showtime\n
                • 50% refund: 2-24 hours before showtime\n
                • No refund: Less than 2 hours before showtime
              </p>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-background rounded-lg p-4 border border-border text-center">
            <Icon name="RefreshCw" size={24} className="mx-auto mb-2 text-accent" />
            <h4 className="font-medium text-foreground mb-1">Transfer Tickets</h4>
            <p className="text-xs text-muted-foreground mb-3">
              Send tickets to friends or family
            </p>
            <Button variant="outline" size="sm" fullWidth>
              Transfer
            </Button>
          </div>

          <div className="bg-background rounded-lg p-4 border border-border text-center">
            <Icon name="Calendar" size={24} className="mx-auto mb-2 text-accent" />
            <h4 className="font-medium text-foreground mb-1">Reschedule</h4>
            <p className="text-xs text-muted-foreground mb-3">
              Change date or time for your booking
            </p>
            <Button variant="outline" size="sm" fullWidth>
              Reschedule
            </Button>
          </div>

          <div className="bg-background rounded-lg p-4 border border-border text-center">
            <Icon name="Users" size={24} className="mx-auto mb-2 text-accent" />
            <h4 className="font-medium text-foreground mb-1">Group Booking</h4>
            <p className="text-xs text-muted-foreground mb-3">
              Add more seats to existing booking
            </p>
            <Button variant="outline" size="sm" fullWidth>
              Add Seats
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingManagement;