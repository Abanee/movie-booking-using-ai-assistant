import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BookingSummary = ({ selectedMovie, selectedSeats, seatDetails, showtime, onProceedToPayment }) => {
  const [addOns, setAddOns] = useState({
    concessions: [],
    premiumFormat: null,
    insurance: false
  });

  // Mock add-on options
  const concessionOptions = [
    {
      id: 'popcorn-large',
      name: 'Large Popcorn',
      price: 8.99,
      image: 'https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=100&h=100&fit=crop',
      description: 'Freshly popped with butter'
    },
    {
      id: 'soda-combo',
      name: 'Soda Combo (2 drinks)',
      price: 12.99,
      image: 'https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=100&h=100&fit=crop',
      description: 'Two large fountain drinks'
    },
    {
      id: 'candy-mix',
      name: 'Candy Selection',
      price: 6.99,
      image: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=100&h=100&fit=crop',
      description: 'Assorted movie theater candy'
    },
    {
      id: 'nachos',
      name: 'Loaded Nachos',
      price: 9.99,
      image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=100&h=100&fit=crop',
      description: 'Tortilla chips with cheese and jalapeños'
    }
  ];

  const premiumFormats = [
    {
      id: 'imax',
      name: 'IMAX Experience',
      price: 8.00,
      description: 'Enhanced visuals and immersive sound'
    },
    {
      id: 'dolby-atmos',
      name: 'Dolby Atmos',
      price: 5.00,
      description: 'Revolutionary 3D audio technology'
    },
    {
      id: '4dx',
      name: '4DX Motion Seats',
      price: 12.00,
      description: 'Motion seats with environmental effects'
    }
  ];

  const calculateSubtotal = () => {
    const seatTotal = selectedSeats.reduce((total, seatId) => {
      const seat = seatDetails[seatId];
      return total + (seat ? seat.price : 0);
    }, 0);

    const concessionTotal = addOns.concessions.reduce((total, item) => total + item.price, 0);
    const formatTotal = addOns.premiumFormat ? addOns.premiumFormat.price * selectedSeats.length : 0;
    const insuranceTotal = addOns.insurance ? 2.99 * selectedSeats.length : 0;

    return seatTotal + concessionTotal + formatTotal + insuranceTotal;
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.08; // 8% tax
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const handleConcessionToggle = (item) => {
    const exists = addOns.concessions.find(c => c.id === item.id);
    if (exists) {
      setAddOns({
        ...addOns,
        concessions: addOns.concessions.filter(c => c.id !== item.id)
      });
    } else {
      setAddOns({
        ...addOns,
        concessions: [...addOns.concessions, item]
      });
    }
  };

  const handleFormatSelect = (format) => {
    setAddOns({
      ...addOns,
      premiumFormat: addOns.premiumFormat?.id === format.id ? null : format
    });
  };

  const formatShowtime = (datetime) => {
    return new Date(datetime).toLocaleString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="bg-card rounded-xl p-6 shadow-cinematic">
      <h3 className="text-xl font-semibold text-foreground mb-6">Booking Summary</h3>

      {/* Movie & Showtime Info */}
      <div className="flex space-x-4 mb-6 p-4 bg-muted/50 rounded-lg">
        <img
          src={selectedMovie.poster}
          alt={selectedMovie.title}
          className="w-16 h-24 object-cover rounded"
        />
        <div className="flex-1">
          <h4 className="font-semibold text-foreground">{selectedMovie.title}</h4>
          <p className="text-sm text-muted-foreground mb-2">{selectedMovie.genre} • {selectedMovie.duration}</p>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Calendar" size={14} />
            <span>{formatShowtime(showtime)}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-1">
            <Icon name="MapPin" size={14} />
            <span>CineAI Premium Theater 1</span>
          </div>
        </div>
      </div>

      {/* Selected Seats */}
      <div className="mb-6">
        <h4 className="font-medium text-foreground mb-3">Selected Seats</h4>
        <div className="space-y-2">
          {selectedSeats.map((seatId) => {
            const seat = seatDetails[seatId];
            return (
              <div key={seatId} className="flex justify-between items-center p-2 bg-muted/30 rounded">
                <div className="flex items-center space-x-2">
                  <span className="font-medium">Seat {seatId}</span>
                  <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded">
                    {seat?.type}
                  </span>
                </div>
                <span className="font-medium">${seat?.price.toFixed(2)}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Premium Format Options */}
      <div className="mb-6">
        <h4 className="font-medium text-foreground mb-3">Premium Format</h4>
        <div className="space-y-2">
          {premiumFormats.map((format) => (
            <label key={format.id} className="flex items-center justify-between p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/30">
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="premiumFormat"
                  checked={addOns.premiumFormat?.id === format.id}
                  onChange={() => handleFormatSelect(format)}
                  className="text-accent"
                />
                <div>
                  <div className="font-medium text-foreground">{format.name}</div>
                  <div className="text-xs text-muted-foreground">{format.description}</div>
                </div>
              </div>
              <span className="font-medium">+${format.price.toFixed(2)}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Concessions */}
      <div className="mb-6">
        <h4 className="font-medium text-foreground mb-3">Pre-Order Concessions</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {concessionOptions.map((item) => {
            const isSelected = addOns.concessions.find(c => c.id === item.id);
            return (
              <div
                key={item.id}
                className={`p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                  isSelected 
                    ? 'border-accent bg-accent/10' :'border-border hover:bg-muted/30'
                }`}
                onClick={() => handleConcessionToggle(item)}
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-foreground">{item.name}</div>
                    <div className="text-xs text-muted-foreground">{item.description}</div>
                    <div className="font-medium text-accent">${item.price.toFixed(2)}</div>
                  </div>
                  {isSelected && (
                    <Icon name="Check" size={16} className="text-accent" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Ticket Insurance */}
      <div className="mb-6">
        <label className="flex items-center justify-between p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/30">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={addOns.insurance}
              onChange={(e) => setAddOns({ ...addOns, insurance: e.target.checked })}
              className="text-accent"
            />
            <div>
              <div className="font-medium text-foreground">Ticket Protection</div>
              <div className="text-xs text-muted-foreground">
                Refund or exchange tickets up to 2 hours before showtime
              </div>
            </div>
          </div>
          <span className="font-medium">$2.99 per ticket</span>
        </label>
      </div>

      {/* Price Breakdown */}
      <div className="border-t border-border pt-4 mb-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Tickets ({selectedSeats.length})</span>
            <span>${selectedSeats.reduce((total, seatId) => {
              const seat = seatDetails[seatId];
              return total + (seat ? seat.price : 0);
            }, 0).toFixed(2)}</span>
          </div>
          
          {addOns.premiumFormat && (
            <div className="flex justify-between text-sm">
              <span>{addOns.premiumFormat.name}</span>
              <span>+${(addOns.premiumFormat.price * selectedSeats.length).toFixed(2)}</span>
            </div>
          )}
          
          {addOns.concessions.length > 0 && (
            <div className="flex justify-between text-sm">
              <span>Concessions</span>
              <span>+${addOns.concessions.reduce((total, item) => total + item.price, 0).toFixed(2)}</span>
            </div>
          )}
          
          {addOns.insurance && (
            <div className="flex justify-between text-sm">
              <span>Ticket Protection</span>
              <span>+${(2.99 * selectedSeats.length).toFixed(2)}</span>
            </div>
          )}
          
          <div className="flex justify-between text-sm">
            <span>Tax</span>
            <span>${calculateTax().toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between font-semibold text-lg border-t border-border pt-2">
            <span>Total</span>
            <span>${calculateTotal().toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Proceed Button */}
      <Button
        variant="default"
        fullWidth
        onClick={() => onProceedToPayment({ addOns, total: calculateTotal() })}
        iconName="CreditCard"
        iconPosition="left"
        disabled={selectedSeats.length === 0}
      >
        Proceed to Payment
      </Button>
    </div>
  );
};

export default BookingSummary;