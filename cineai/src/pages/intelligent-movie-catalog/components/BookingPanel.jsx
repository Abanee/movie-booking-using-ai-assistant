import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Image from '../../../components/AppImage';

const BookingPanel = ({ movie, isOpen, onClose, onBookingComplete }) => {
  const [selectedTheater, setSelectedTheater] = useState('');
  const [selectedShowtime, setSelectedShowtime] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [step, setStep] = useState(1); // 1: Theater/Time, 2: Seats, 3: Confirmation

  const theaters = [
    {
      value: 'cineplex-downtown',
      label: 'Cineplex Downtown',
      distance: '0.8 miles',
      amenities: ['IMAX', 'Dolby Atmos', 'Reclining Seats'],
      availability: 'high'
    },
    {
      value: 'amc-plaza',
      label: 'AMC Plaza 16',
      distance: '1.2 miles',
      amenities: ['4DX', 'Premium Dining', 'Reserved Seating'],
      availability: 'medium'
    },
    {
      value: 'regal-center',
      label: 'Regal Cinema Center',
      distance: '2.1 miles',
      amenities: ['IMAX', 'Luxury Recliners', 'Bar Service'],
      availability: 'low'
    }
  ];

  const dates = [
    { value: '2024-07-15', label: 'Today, Jul 15' },
    { value: '2024-07-16', label: 'Tomorrow, Jul 16' },
    { value: '2024-07-17', label: 'Wed, Jul 17' },
    { value: '2024-07-18', label: 'Thu, Jul 18' },
    { value: '2024-07-19', label: 'Fri, Jul 19' }
  ];

  const showtimes = [
    { value: '2:30 PM', label: '2:30 PM', availability: 'high', price: '$12.99' },
    { value: '5:15 PM', label: '5:15 PM', availability: 'medium', price: '$14.99' },
    { value: '8:00 PM', label: '8:00 PM', availability: 'low', price: '$16.99' },
    { value: '10:45 PM', label: '10:45 PM', availability: 'high', price: '$12.99' }
  ];

  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case 'high': return 'text-green-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-red-500';
      default: return 'text-muted-foreground';
    }
  };

  const getAvailabilityText = (availability) => {
    switch (availability) {
      case 'high': return 'Many seats available';
      case 'medium': return 'Limited seats';
      case 'low': return 'Few seats left';
      default: return 'Check availability';
    }
  };

  const handleContinue = () => {
    if (step === 1 && selectedTheater && selectedShowtime && selectedDate) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handleBooking = () => {
    onBookingComplete({
      movie,
      theater: selectedTheater,
      showtime: selectedShowtime,
      date: selectedDate
    });
    onClose();
  };

  if (!isOpen || !movie) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center">
      <div className="bg-background w-full sm:w-[600px] sm:max-h-[80vh] rounded-t-2xl sm:rounded-2xl overflow-hidden shadow-cinematic">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-16 rounded-lg overflow-hidden">
              <Image
                src={movie.poster}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">{movie.title}</h2>
              <p className="text-sm text-muted-foreground">{movie.year} • {movie.rating_text}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors duration-200"
          >
            <Icon name="X" size={20} className="text-muted-foreground" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 border-b border-border">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= stepNum 
                    ? 'bg-accent text-accent-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {stepNum}
                </div>
                {stepNum < 3 && (
                  <div className={`w-12 h-0.5 mx-2 ${
                    step > stepNum ? 'bg-accent' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>Select Theater & Time</span>
            <span>Choose Seats</span>
            <span>Confirm Booking</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-96 overflow-y-auto">
          {step === 1 && (
            <div className="space-y-6">
              {/* Date Selection */}
              <div>
                <Select
                  label="Select Date"
                  options={dates}
                  value={selectedDate}
                  onChange={setSelectedDate}
                  placeholder="Choose date..."
                />
              </div>

              {/* Theater Selection */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  Choose Theater
                </label>
                <div className="space-y-3">
                  {theaters.map((theater) => (
                    <div
                      key={theater.value}
                      className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                        selectedTheater === theater.value
                          ? 'border-accent bg-accent/10' :'border-border hover:border-accent/50'
                      }`}
                      onClick={() => setSelectedTheater(theater.value)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-foreground">{theater.label}</h3>
                        <span className="text-sm text-muted-foreground">{theater.distance}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {theater.amenities.map((amenity, index) => (
                          <span key={index} className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
                            {amenity}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${
                          theater.availability === 'high' ? 'bg-green-500' :
                          theater.availability === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
                        }`} />
                        <span className={`text-xs ${getAvailabilityColor(theater.availability)}`}>
                          {getAvailabilityText(theater.availability)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Showtime Selection */}
              {selectedTheater && (
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Select Showtime
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {showtimes.map((time) => (
                      <button
                        key={time.value}
                        onClick={() => setSelectedShowtime(time.value)}
                        className={`p-3 border rounded-lg text-left transition-all duration-200 ${
                          selectedShowtime === time.value
                            ? 'border-accent bg-accent/10' :'border-border hover:border-accent/50'
                        }`}
                      >
                        <div className="font-medium text-foreground">{time.label}</div>
                        <div className="text-sm text-muted-foreground">{time.price}</div>
                        <div className={`text-xs ${getAvailabilityColor(time.availability)}`}>
                          {getAvailabilityText(time.availability)}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="text-center py-8">
              <Icon name="Armchair" size={48} className="text-accent mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Seat Selection</h3>
              <p className="text-muted-foreground mb-4">
                Interactive seat selection would be implemented here with real-time availability
              </p>
              <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
                Selected: 2 seats in Row F (F7, F8)<br />
                Premium seats with extra legroom
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Booking Summary</h3>
              <div className="bg-muted/50 rounded-lg p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Movie:</span>
                  <span className="text-foreground">{movie.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Theater:</span>
                  <span className="text-foreground">Cineplex Downtown</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date & Time:</span>
                  <span className="text-foreground">Today, 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Seats:</span>
                  <span className="text-foreground">F7, F8</span>
                </div>
                <div className="border-t border-border pt-2 flex justify-between font-medium">
                  <span className="text-foreground">Total:</span>
                  <span className="text-foreground">$33.98</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-border">
          <div className="flex space-x-3">
            {step > 1 && (
              <Button
                variant="outline"
                onClick={() => setStep(step - 1)}
                iconName="ArrowLeft"
                iconPosition="left"
              >
                Back
              </Button>
            )}
            <Button
              variant="default"
              fullWidth
              onClick={step === 3 ? handleBooking : handleContinue}
              disabled={step === 1 && (!selectedTheater || !selectedShowtime || !selectedDate)}
              iconName={step === 3 ? "CreditCard" : "ArrowRight"}
              iconPosition={step === 3 ? "left" : "right"}
            >
              {step === 3 ? 'Complete Booking' : 'Continue'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPanel;