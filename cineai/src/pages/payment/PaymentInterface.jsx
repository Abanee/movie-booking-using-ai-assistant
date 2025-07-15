import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { gsap } from 'gsap';
import { Helmet } from 'react-helmet';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Icon from '../../components/AppIcon';
import { useFadeIn, useSlideIn } from '../../hooks/useGSAP';

const PaymentInterface = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const containerRef = useFadeIn(0, 0.8);
  const formRef = useSlideIn('up', 0.3, 0.8);
  
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Get booking details from location state
  const bookingDetails = location.state?.bookingDetails || {
    movie: 'Sample Movie',
    theater: 'Sample Theater',
    date: '2025-07-15',
    time: '7:00 PM',
    seats: ['A1', 'A2'],
    total: 25.00
  };

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: 'CreditCard' },
    { id: 'upi', name: 'UPI Payment', icon: 'Smartphone' },
    { id: 'wallet', name: 'Digital Wallet', icon: 'Wallet' },
    { id: 'netbanking', name: 'Net Banking', icon: 'Building' }
  ];

  useEffect(() => {
    // Animate payment methods
    const methods = document.querySelectorAll('.payment-method');
    gsap.fromTo(methods, 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, delay: 0.5 }
    );
  }, []);

  const onSubmit = async (data) => {
    setIsLoading(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Success animation
      setShowSuccessAnimation(true);
      
      // Store booking confirmation
      const bookingId = `BK${Date.now()}`;
      localStorage.setItem('cineai_booking', JSON.stringify({
        bookingId,
        ...bookingDetails,
        paymentMethod,
        paymentData: data,
        bookedAt: new Date().toISOString()
      }));
      
      setTimeout(() => {
        navigate('/booking-success', { 
          state: { bookingId, bookingDetails } 
        });
      }, 2000);
      
    } catch (error) {
      console.error('Payment error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateUPIQR = () => {
    // Mock UPI QR code generation
    return `upi://pay?pa=cineai@paytm&pn=CineAI&am=${bookingDetails.total}&cu=USD&tn=Movie Booking`;
  };

  if (showSuccessAnimation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-600 via-green-700 to-green-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="Check" size={48} className="text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Payment Successful!</h2>
          <p className="text-white/80">Your booking has been confirmed</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Payment - CineAI</title>
        <meta name="description" content="Complete your movie booking payment securely" />
      </Helmet>

      <div ref={containerRef} className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-primary text-primary-foreground py-6">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigate(-1)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <Icon name="ArrowLeft" size={20} />
                </button>
                <h1 className="text-2xl font-bold">Complete Payment</h1>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Lock" size={16} />
                <span className="text-sm">Secure Payment</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Payment Form */}
            <div className="lg:col-span-2">
              <div ref={formRef} className="bg-card rounded-2xl p-6 shadow-movie-card">
                <h2 className="text-xl font-bold text-foreground mb-6">Payment Method</h2>

                {/* Payment Method Selection */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`payment-method p-4 rounded-xl border-2 transition-all duration-200 ${
                        paymentMethod === method.id
                          ? 'border-accent bg-accent/10 text-accent' :'border-border hover:border-accent/50 text-muted-foreground'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon name={method.icon} size={20} />
                        <span className="font-medium">{method.name}</span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Payment Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {paymentMethod === 'card' && (
                    <div className="space-y-4">
                      <div>
                        <Input
                          type="text"
                          placeholder="Card Number"
                          {...register('cardNumber', {
                            required: 'Card number is required',
                            pattern: {
                              value: /^[0-9]{16}$/,
                              message: 'Enter a valid 16-digit card number'
                            }
                          })}
                        />
                        {errors.cardNumber && (
                          <p className="text-red-500 text-sm mt-1">{errors.cardNumber.message}</p>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Input
                            type="text"
                            placeholder="MM/YY"
                            {...register('expiryDate', {
                              required: 'Expiry date is required',
                              pattern: {
                                value: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
                                message: 'Enter valid expiry date (MM/YY)'
                              }
                            })}
                          />
                          {errors.expiryDate && (
                            <p className="text-red-500 text-sm mt-1">{errors.expiryDate.message}</p>
                          )}
                        </div>
                        <div>
                          <Input
                            type="text"
                            placeholder="CVV"
                            {...register('cvv', {
                              required: 'CVV is required',
                              pattern: {
                                value: /^[0-9]{3,4}$/,
                                message: 'Enter valid CVV'
                              }
                            })}
                          />
                          {errors.cvv && (
                            <p className="text-red-500 text-sm mt-1">{errors.cvv.message}</p>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <Input
                          type="text"
                          placeholder="Cardholder Name"
                          {...register('cardholderName', {
                            required: 'Cardholder name is required'
                          })}
                        />
                        {errors.cardholderName && (
                          <p className="text-red-500 text-sm mt-1">{errors.cardholderName.message}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'upi' && (
                    <div className="space-y-4">
                      <div>
                        <Input
                          type="text"
                          placeholder="UPI ID (e.g., user@paytm)"
                          {...register('upiId', {
                            required: 'UPI ID is required',
                            pattern: {
                              value: /^[a-zA-Z0-9.\-_]{2,}@[a-zA-Z]{2,}$/,
                              message: 'Enter valid UPI ID'
                            }
                          })}
                        />
                        {errors.upiId && (
                          <p className="text-red-500 text-sm mt-1">{errors.upiId.message}</p>
                        )}
                      </div>
                      
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground mb-4">Or scan QR code</p>
                        <div className="w-48 h-48 bg-muted rounded-lg flex items-center justify-center mx-auto">
                          <div className="text-center">
                            <Icon name="QrCode" size={64} className="text-muted-foreground mx-auto mb-2" />
                            <p className="text-xs text-muted-foreground">QR Code</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'wallet' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          type="button"
                          className="p-4 border border-border rounded-lg hover:border-accent transition-colors"
                        >
                          <div className="text-center">
                            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                              <span className="text-white font-bold">P</span>
                            </div>
                            <p className="text-sm">Paytm</p>
                          </div>
                        </button>
                        <button
                          type="button"
                          className="p-4 border border-border rounded-lg hover:border-accent transition-colors"
                        >
                          <div className="text-center">
                            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-2">
                              <span className="text-white font-bold">G</span>
                            </div>
                            <p className="text-sm">Google Pay</p>
                          </div>
                        </button>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'netbanking' && (
                    <div className="space-y-4">
                      <select
                        className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                        {...register('bankName', { required: 'Please select a bank' })}
                      >
                        <option value="">Select Bank</option>
                        <option value="sbi">State Bank of India</option>
                        <option value="hdfc">HDFC Bank</option>
                        <option value="icici">ICICI Bank</option>
                        <option value="axis">Axis Bank</option>
                        <option value="kotak">Kotak Mahindra Bank</option>
                      </select>
                      {errors.bankName && (
                        <p className="text-red-500 text-sm mt-1">{errors.bankName.message}</p>
                      )}
                    </div>
                  )}

                  <Button
                    type="submit"
                    fullWidth
                    size="lg"
                    loading={isLoading}
                    iconName="CreditCard"
                    iconPosition="left"
                    className="bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    Pay ${bookingDetails.total}
                  </Button>
                </form>
              </div>
            </div>

            {/* Booking Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl p-6 shadow-movie-card sticky top-4">
                <h3 className="text-lg font-bold text-foreground mb-4">Booking Summary</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Movie</span>
                    <span className="font-medium">{bookingDetails.movie}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Theater</span>
                    <span className="font-medium">{bookingDetails.theater}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date & Time</span>
                    <span className="font-medium">{bookingDetails.date} at {bookingDetails.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Seats</span>
                    <span className="font-medium">{bookingDetails.seats?.join(', ')}</span>
                  </div>
                  
                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold">Total</span>
                      <span className="text-2xl font-bold text-accent">${bookingDetails.total}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Shield" size={16} className="text-green-500" />
                    <span className="text-sm font-medium">Secure Payment</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Your payment information is encrypted and secure
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentInterface;