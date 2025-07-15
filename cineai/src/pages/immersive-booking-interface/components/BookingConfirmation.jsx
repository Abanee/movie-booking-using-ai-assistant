import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BookingConfirmation = ({ bookingData, paymentData }) => {
  const [qrCode, setQrCode] = useState('');
  const [showDirections, setShowDirections] = useState(false);

  useEffect(() => {
    // Generate QR code data (mock)
    const qrData = {
      bookingId: paymentData.transactionId,
      movieTitle: bookingData.selectedMovie.title,
      seats: bookingData.selectedSeats,
      showtime: bookingData.showtime,
      theater: 'CineAI Premium Theater 1'
    };
    setQrCode(`data:image/svg+xml;base64,${btoa(`<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="white"/><text x="100" y="100" text-anchor="middle" font-size="12" fill="black">QR Code\n${paymentData.transactionId}</text></svg>`)}`);
  }, [bookingData, paymentData]);

  const theaterInfo = {
    name: 'CineAI Premium Theater 1',
    address: '123 Cinema Boulevard, San Francisco, CA 94105',
    phone: '(555) 123-4567',
    parking: 'Free parking available in the adjacent garage',
    amenities: ['IMAX Screen', 'Dolby Atmos', 'Reclining Seats', 'Concession Stand', 'Accessible Facilities']
  };

  const moviePreparationContent = [
    {
      type: 'cast-interview',
      title: 'Behind the Scenes with the Cast',
      description: 'Exclusive interviews with the main cast discussing their roles',
      duration: '8 min',
      thumbnail: 'https://images.unsplash.com/photo-1489599162946-648229b4b6d2?w=300&h=200&fit=crop'
    },
    {
      type: 'making-of',
      title: 'The Making of Dune: Part Two',
      description: 'Director Denis Villeneuve takes you behind the camera',
      duration: '12 min',
      thumbnail: 'https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?w=300&h=200&fit=crop'
    },
    {
      type: 'trivia',
      title: 'Did You Know?',
      description: 'Fascinating facts about the movie and its production',
      duration: '5 min',
      thumbnail: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=200&fit=crop'
    }
  ];

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

  const handleAddToCalendar = () => {
    const event = {
      title: `${bookingData.selectedMovie.title} - Movie Night`,
      start: new Date(bookingData.showtime),
      location: theaterInfo.address,
      description: `Seats: ${bookingData.selectedSeats.join(', ')}\nBooking ID: ${paymentData.transactionId}`
    };
    
    // Create calendar event (simplified)
    const calendarUrl = `data:text/calendar;charset=utf8,BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${new Date(bookingData.showtime).toISOString().replace(/[-:]/g, '').split('.')[0]}Z
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
END:VEVENT
END:VCALENDAR`;
    
    const link = document.createElement('a');
    link.href = calendarUrl;
    link.download = 'movie-booking.ics';
    link.click();
  };

  const handleShareBooking = () => {
    if (navigator.share) {
      navigator.share({
        title: `Movie Night: ${bookingData.selectedMovie.title}`,
        text: `I'm watching ${bookingData.selectedMovie.title} on ${formatShowtime(bookingData.showtime)}!`,
        url: window.location.href
      });
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(`I'm watching ${bookingData.selectedMovie.title} on ${formatShowtime(bookingData.showtime)} at ${theaterInfo.name}!`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Success Header */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="CheckCircle" size={32} className="text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-green-800 mb-2">Booking Confirmed!</h2>
        <p className="text-green-700">
          Your tickets have been successfully booked. Get ready for an amazing movie experience!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Booking Details */}
        <div className="bg-card rounded-xl p-6 shadow-cinematic">
          <h3 className="text-xl font-semibold text-foreground mb-4">Booking Details</h3>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Icon name="Film" size={20} className="text-accent" />
              <div>
                <div className="font-medium text-foreground">{bookingData.selectedMovie.title}</div>
                <div className="text-sm text-muted-foreground">{bookingData.selectedMovie.genre} • {bookingData.selectedMovie.duration}</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Icon name="Calendar" size={20} className="text-accent" />
              <div>
                <div className="font-medium text-foreground">{formatShowtime(bookingData.showtime)}</div>
                <div className="text-sm text-muted-foreground">Show Time</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Icon name="MapPin" size={20} className="text-accent" />
              <div>
                <div className="font-medium text-foreground">{theaterInfo.name}</div>
                <div className="text-sm text-muted-foreground">{theaterInfo.address}</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Icon name="Ticket" size={20} className="text-accent" />
              <div>
                <div className="font-medium text-foreground">Seats: {bookingData.selectedSeats.join(', ')}</div>
                <div className="text-sm text-muted-foreground">{bookingData.selectedSeats.length} ticket(s)</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Icon name="CreditCard" size={20} className="text-accent" />
              <div>
                <div className="font-medium text-foreground">Total Paid: ${paymentData.amount.toFixed(2)}</div>
                <div className="text-sm text-muted-foreground">Transaction ID: {paymentData.transactionId}</div>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-3 mt-6">
            <Button
              variant="outline"
              onClick={handleAddToCalendar}
              iconName="Calendar"
              iconPosition="left"
            >
              Add to Calendar
            </Button>
            <Button
              variant="outline"
              onClick={handleShareBooking}
              iconName="Share"
              iconPosition="left"
            >
              Share
            </Button>
          </div>
        </div>

        {/* Mobile Ticket QR Code */}
        <div className="bg-card rounded-xl p-6 shadow-cinematic">
          <h3 className="text-xl font-semibold text-foreground mb-4">Mobile Ticket</h3>
          
          <div className="text-center">
            <div className="bg-white p-4 rounded-lg inline-block mb-4">
              <img src={qrCode} alt="QR Code" className="w-48 h-48 mx-auto" />
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Show this QR code at the theater entrance for quick entry
            </p>
            <Button variant="outline" iconName="Download" iconPosition="left">
              Save to Wallet
            </Button>
          </div>
        </div>
      </div>

      {/* Theater Information */}
      <div className="bg-card rounded-xl p-6 shadow-cinematic">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-foreground">Theater Information</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowDirections(!showDirections)}
            iconName={showDirections ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            {showDirections ? 'Hide' : 'Show'} Directions
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Icon name="Phone" size={16} className="text-accent" />
                <span className="text-sm">{theaterInfo.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Car" size={16} className="text-accent" />
                <span className="text-sm">{theaterInfo.parking}</span>
              </div>
            </div>
            
            <div className="mt-4">
              <h4 className="font-medium text-foreground mb-2">Amenities</h4>
              <div className="flex flex-wrap gap-2">
                {theaterInfo.amenities.map((amenity, index) => (
                  <span key={index} className="text-xs bg-accent/20 text-accent px-2 py-1 rounded">
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {showDirections && (
            <div className="bg-muted/50 rounded-lg p-4">
              <iframe
                width="100%"
                height="200"
                loading="lazy"
                title="Theater Location"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=37.7749,-122.4194&z=14&output=embed"
                className="rounded"
              ></iframe>
            </div>
          )}
        </div>
      </div>

      {/* Movie Preparation Content */}
      <div className="bg-card rounded-xl p-6 shadow-cinematic">
        <h3 className="text-xl font-semibold text-foreground mb-4">Get Ready for Your Movie</h3>
        <p className="text-muted-foreground mb-6">
          Enhance your movie experience with exclusive behind-the-scenes content
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {moviePreparationContent.map((content, index) => (
            <div key={index} className="border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200">
              <img
                src={content.thumbnail}
                alt={content.title}
                className="w-full h-32 object-cover"
              />
              <div className="p-4">
                <h4 className="font-medium text-foreground mb-1">{content.title}</h4>
                <p className="text-xs text-muted-foreground mb-2">{content.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-accent">{content.duration}</span>
                  <Button variant="ghost" size="sm" iconName="Play">
                    Watch
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        <Button
          variant="outline"
          iconName="ArrowLeft"
          iconPosition="left"
          onClick={() => window.location.href = '/intelligent-movie-catalog'}
        >
          Book Another Movie
        </Button>
        <Button
          variant="default"
          iconName="LayoutDashboard"
          iconPosition="left"
          onClick={() => window.location.href = '/personal-cinema-dashboard'}
        >
          View My Bookings
        </Button>
      </div>
    </div>
  );
};

export default BookingConfirmation;