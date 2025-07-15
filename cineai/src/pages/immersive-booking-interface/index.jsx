import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import TheaterVisualization from './components/TheaterVisualization';
import AIRecommendations from './components/AIRecommendations';
import GroupBookingTools from './components/GroupBookingTools';
import BookingSummary from './components/BookingSummary';
import PaymentInterface from './components/PaymentInterface';
import BookingConfirmation from './components/BookingConfirmation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ImmersiveBookingInterface = () => {
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState('seat-selection');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatDetails, setSeatDetails] = useState({});
  const [showtime, setShowtime] = useState('2025-07-15T19:30:00');
  const [aiRecommendations, setAiRecommendations] = useState(['E8', 'E9', 'E10', 'F6', 'F7', 'F8', 'F9', 'B7', 'B8', 'H1', 'H2']);
  const [groupBookingData, setGroupBookingData] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [paymentData, setPaymentData] = useState(null);

  // Mock movie data - in real app this would come from props or API
  const mockMovie = {
    id: 1,
    title: "Dune: Part Two",
    genre: "Sci-Fi, Adventure",
    duration: "2h 46m",
    rating: "PG-13",
    poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=450&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?w=1200&h=600&fit=crop",
    description: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
    director: "Denis Villeneuve",
    cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson", "Oscar Isaac"],
    releaseDate: "2024-03-01"
  };

  useEffect(() => {
    // Get movie data from navigation state or use mock data
    const movieData = location.state?.movie || mockMovie;
    setSelectedMovie(movieData);
    
    // Set showtime from navigation state or use default
    const selectedShowtime = location.state?.showtime || '2025-07-15T19:30:00';
    setShowtime(selectedShowtime);
  }, [location.state]);

  const steps = [
    { id: 'seat-selection', title: 'Select Seats', icon: 'MapPin' },
    { id: 'add-ons', title: 'Add-ons & Summary', icon: 'ShoppingCart' },
    { id: 'payment', title: 'Payment', icon: 'CreditCard' },
    { id: 'confirmation', title: 'Confirmation', icon: 'CheckCircle' }
  ];

  const handleSeatSelect = (seatId, seatInfo) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seatId));
      const newSeatDetails = { ...seatDetails };
      delete newSeatDetails[seatId];
      setSeatDetails(newSeatDetails);
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
      setSeatDetails({ ...seatDetails, [seatId]: seatInfo });
    }
  };

  const handleAIRecommendationApply = (recommendedSeats) => {
    // Clear current selection and apply AI recommendations
    setSelectedSeats([]);
    setSeatDetails({});
    
    // Simulate applying recommended seats with their details
    const newSeatDetails = {};
    recommendedSeats.forEach(seatId => {
      // Mock seat details based on seat position
      const row = seatId.charAt(0);
      let seatInfo = {
        available: true,
        type: 'standard',
        price: 18.99,
        accessibility: false,
        aiRecommended: true
      };
      
      if (['A', 'B'].includes(row)) {
        seatInfo = { ...seatInfo, type: 'premium', price: 25.99 };
      } else if (['H', 'I', 'J'].includes(row)) {
        seatInfo = { ...seatInfo, type: 'economy', price: 14.99 };
      }
      
      newSeatDetails[seatId] = seatInfo;
    });
    
    setSelectedSeats(recommendedSeats);
    setSeatDetails(newSeatDetails);
  };

  const handleGroupUpdate = (updateData) => {
    setGroupBookingData(updateData);
  };

  const handleProceedToPayment = (bookingData) => {
    setBookingDetails(bookingData);
    setCurrentStep('payment');
  };

  const handlePaymentComplete = (payment) => {
    setPaymentData(payment);
    setCurrentStep('confirmation');
  };

  const handleStepNavigation = (stepId) => {
    if (stepId === 'seat-selection') {
      setCurrentStep(stepId);
    } else if (stepId === 'add-ons' && selectedSeats.length > 0) {
      setCurrentStep(stepId);
    } else if (stepId === 'payment' && bookingDetails) {
      setCurrentStep(stepId);
    }
  };

  const canProceedToNextStep = () => {
    switch (currentStep) {
      case 'seat-selection':
        return selectedSeats.length > 0;
      case 'add-ons':
        return true;
      case 'payment':
        return false; // Payment handles its own completion
      default:
        return false;
    }
  };

  const getNextStep = () => {
    const currentIndex = steps.findIndex(step => step.id === currentStep);
    return currentIndex < steps.length - 1 ? steps[currentIndex + 1].id : null;
  };

  if (!selectedMovie) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <Icon name="Loader" size={48} className="animate-spin text-accent mx-auto mb-4" />
            <p className="text-muted-foreground">Loading movie details...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-16">
        {/* Hero Section with Movie Info */}
        <div 
          className="relative h-64 bg-cover bg-center"
          style={{ backgroundImage: `url(${selectedMovie.backdrop})` }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
            <div className="flex items-center space-x-6">
              <img
                src={selectedMovie.poster}
                alt={selectedMovie.title}
                className="w-24 h-36 object-cover rounded-lg shadow-lg"
              />
              <div className="text-white">
                <h1 className="text-3xl font-bold mb-2">{selectedMovie.title}</h1>
                <p className="text-lg opacity-90 mb-2">{selectedMovie.genre} • {selectedMovie.duration}</p>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <Icon name="Calendar" size={16} />
                    <span>{new Date(showtime).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={16} />
                    <span>{new Date(showtime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="MapPin" size={16} />
                    <span>CineAI Premium Theater 1</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="bg-card border-b border-border">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => {
                const isActive = step.id === currentStep;
                const isCompleted = steps.findIndex(s => s.id === currentStep) > index;
                const isClickable = step.id === 'seat-selection' || 
                                  (step.id === 'add-ons' && selectedSeats.length > 0) ||
                                  (step.id === 'payment' && bookingDetails);
                
                return (
                  <div key={step.id} className="flex items-center">
                    <button
                      onClick={() => isClickable && handleStepNavigation(step.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                        isActive
                          ? 'bg-accent text-accent-foreground'
                          : isCompleted
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : isClickable
                          ? 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                          : 'text-muted-foreground/50 cursor-not-allowed'
                      }`}
                      disabled={!isClickable}
                    >
                      <Icon 
                        name={isCompleted ? 'CheckCircle' : step.icon} 
                        size={20} 
                      />
                      <span className="font-medium">{step.title}</span>
                    </button>
                    {index < steps.length - 1 && (
                      <Icon name="ChevronRight" size={16} className="mx-2 text-muted-foreground" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          {currentStep === 'seat-selection' && (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2">
                <TheaterVisualization
                  selectedMovie={selectedMovie}
                  onSeatSelect={handleSeatSelect}
                  selectedSeats={selectedSeats}
                  aiRecommendations={aiRecommendations}
                />
              </div>
              <div className="space-y-6">
                <AIRecommendations
                  selectedMovie={selectedMovie}
                  userPreferences={{}}
                  onApplyRecommendation={handleAIRecommendationApply}
                />
                <GroupBookingTools
                  onGroupUpdate={handleGroupUpdate}
                  selectedSeats={selectedSeats}
                />
              </div>
            </div>
          )}

          {currentStep === 'add-ons' && (
            <div className="max-w-2xl mx-auto">
              <BookingSummary
                selectedMovie={selectedMovie}
                selectedSeats={selectedSeats}
                seatDetails={seatDetails}
                showtime={showtime}
                onProceedToPayment={handleProceedToPayment}
              />
            </div>
          )}

          {currentStep === 'payment' && bookingDetails && (
            <div className="max-w-2xl mx-auto">
              <PaymentInterface
                bookingDetails={bookingDetails}
                onPaymentComplete={handlePaymentComplete}
              />
            </div>
          )}

          {currentStep === 'confirmation' && paymentData && (
            <BookingConfirmation
              bookingData={{
                selectedMovie,
                selectedSeats,
                seatDetails,
                showtime,
                ...bookingDetails
              }}
              paymentData={paymentData}
            />
          )}

          {/* Navigation Buttons */}
          {currentStep !== 'confirmation' && (
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-border">
              <Button
                variant="outline"
                onClick={() => {
                  const currentIndex = steps.findIndex(step => step.id === currentStep);
                  if (currentIndex > 0) {
                    setCurrentStep(steps[currentIndex - 1].id);
                  }
                }}
                iconName="ArrowLeft"
                iconPosition="left"
                disabled={currentStep === 'seat-selection'}
              >
                Previous
              </Button>

              {currentStep === 'seat-selection' && (
                <Button
                  variant="default"
                  onClick={() => setCurrentStep('add-ons')}
                  iconName="ArrowRight"
                  iconPosition="right"
                  disabled={!canProceedToNextStep()}
                >
                  Continue to Summary
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImmersiveBookingInterface;