import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PaymentInterface = ({ bookingDetails, onPaymentComplete }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [billingAddress, setBillingAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
    country: 'US'
  });
  const [savedCards, setSavedCards] = useState([
    {
      id: 1,
      last4: '4242',
      brand: 'visa',
      expiry: '12/26',
      name: 'John Doe'
    },
    {
      id: 2,
      last4: '5555',
      brand: 'mastercard',
      expiry: '08/25',
      name: 'John Doe'
    }
  ]);
  const [selectedSavedCard, setSelectedSavedCard] = useState(null);
  const [saveCard, setSaveCard] = useState(false);
  const [processing, setProcessing] = useState(false);

  const paymentMethods = [
    { value: 'card', label: 'Credit/Debit Card', icon: 'CreditCard' },
    { value: 'paypal', label: 'PayPal', icon: 'Wallet' },
    { value: 'apple-pay', label: 'Apple Pay', icon: 'Smartphone' },
    { value: 'google-pay', label: 'Google Pay', icon: 'Smartphone' }
  ];

  const stateOptions = [
    { value: 'CA', label: 'California' },
    { value: 'NY', label: 'New York' },
    { value: 'TX', label: 'Texas' },
    { value: 'FL', label: 'Florida' }
  ];

  const handleCardInputChange = (field, value) => {
    setCardDetails({ ...cardDetails, [field]: value });
  };

  const handleBillingChange = (field, value) => {
    setBillingAddress({ ...billingAddress, [field]: value });
  };

  const handlePayment = async () => {
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      onPaymentComplete({
        paymentMethod,
        transactionId: 'txn_' + Math.random().toString(36).substr(2, 9),
        amount: bookingDetails.total,
        timestamp: new Date().toISOString()
      });
    }, 3000);
  };

  const formatCardNumber = (value) => {
    return value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiry = (value) => {
    return value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
  };

  const getCardBrandIcon = (brand) => {
    switch (brand) {
      case 'visa': return 'CreditCard';
      case 'mastercard': return 'CreditCard';
      case 'amex': return 'CreditCard';
      default: return 'CreditCard';
    }
  };

  return (
    <div className="bg-card rounded-xl p-6 shadow-cinematic">
      <h3 className="text-xl font-semibold text-foreground mb-6">Payment Details</h3>

      {/* Payment Method Selection */}
      <div className="mb-6">
        <h4 className="font-medium text-foreground mb-3">Payment Method</h4>
        <div className="grid grid-cols-2 gap-3">
          {paymentMethods.map((method) => (
            <button
              key={method.value}
              onClick={() => setPaymentMethod(method.value)}
              className={`p-3 border rounded-lg flex items-center space-x-2 transition-all duration-200 ${
                paymentMethod === method.value
                  ? 'border-accent bg-accent/10' :'border-border hover:bg-muted/30'
              }`}
            >
              <Icon name={method.icon} size={20} />
              <span className="text-sm font-medium">{method.label}</span>
            </button>
          ))}
        </div>
      </div>

      {paymentMethod === 'card' && (
        <>
          {/* Saved Cards */}
          {savedCards.length > 0 && (
            <div className="mb-6">
              <h4 className="font-medium text-foreground mb-3">Saved Cards</h4>
              <div className="space-y-2">
                {savedCards.map((card) => (
                  <label
                    key={card.id}
                    className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                      selectedSavedCard === card.id
                        ? 'border-accent bg-accent/10' :'border-border hover:bg-muted/30'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="savedCard"
                        checked={selectedSavedCard === card.id}
                        onChange={() => setSelectedSavedCard(card.id)}
                        className="text-accent"
                      />
                      <Icon name={getCardBrandIcon(card.brand)} size={20} />
                      <div>
                        <div className="font-medium">•••• •••• •••• {card.last4}</div>
                        <div className="text-xs text-muted-foreground">
                          {card.name} • Expires {card.expiry}
                        </div>
                      </div>
                    </div>
                  </label>
                ))}
                <button
                  onClick={() => setSelectedSavedCard(null)}
                  className="text-sm text-accent hover:underline"
                >
                  Use a different card
                </button>
              </div>
            </div>
          )}

          {/* New Card Details */}
          {!selectedSavedCard && (
            <div className="mb-6">
              <h4 className="font-medium text-foreground mb-3">Card Information</h4>
              <div className="space-y-4">
                <Input
                  label="Card Number"
                  type="text"
                  value={cardDetails.number}
                  onChange={(e) => handleCardInputChange('number', formatCardNumber(e.target.value))}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Expiry Date"
                    type="text"
                    value={cardDetails.expiry}
                    onChange={(e) => handleCardInputChange('expiry', formatExpiry(e.target.value))}
                    placeholder="MM/YY"
                    maxLength={5}
                  />
                  <Input
                    label="CVV"
                    type="text"
                    value={cardDetails.cvv}
                    onChange={(e) => handleCardInputChange('cvv', e.target.value.replace(/\D/g, ''))}
                    placeholder="123"
                    maxLength={4}
                  />
                </div>
                
                <Input
                  label="Cardholder Name"
                  type="text"
                  value={cardDetails.name}
                  onChange={(e) => handleCardInputChange('name', e.target.value)}
                  placeholder="John Doe"
                />
                
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={saveCard}
                    onChange={(e) => setSaveCard(e.target.checked)}
                    className="text-accent"
                  />
                  <span className="text-sm text-foreground">Save card for future purchases</span>
                </label>
              </div>
            </div>
          )}

          {/* Billing Address */}
          <div className="mb-6">
            <h4 className="font-medium text-foreground mb-3">Billing Address</h4>
            <div className="space-y-4">
              <Input
                label="Street Address"
                type="text"
                value={billingAddress.street}
                onChange={(e) => handleBillingChange('street', e.target.value)}
                placeholder="123 Main Street"
              />
              
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="City"
                  type="text"
                  value={billingAddress.city}
                  onChange={(e) => handleBillingChange('city', e.target.value)}
                  placeholder="San Francisco"
                />
                <Select
                  label="State"
                  options={stateOptions}
                  value={billingAddress.state}
                  onChange={(value) => handleBillingChange('state', value)}
                  placeholder="Select state"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="ZIP Code"
                  type="text"
                  value={billingAddress.zip}
                  onChange={(e) => handleBillingChange('zip', e.target.value.replace(/\D/g, ''))}
                  placeholder="94105"
                  maxLength={5}
                />
                <Input
                  label="Country"
                  type="text"
                  value="United States"
                  disabled
                />
              </div>
            </div>
          </div>
        </>
      )}

      {/* Alternative Payment Methods */}
      {paymentMethod === 'paypal' && (
        <div className="mb-6 p-4 bg-muted/50 rounded-lg text-center">
          <Icon name="Wallet" size={48} className="mx-auto mb-2 text-accent" />
          <p className="text-foreground">You will be redirected to PayPal to complete your payment</p>
        </div>
      )}

      {(paymentMethod === 'apple-pay' || paymentMethod === 'google-pay') && (
        <div className="mb-6 p-4 bg-muted/50 rounded-lg text-center">
          <Icon name="Smartphone" size={48} className="mx-auto mb-2 text-accent" />
          <p className="text-foreground">
            Use your {paymentMethod === 'apple-pay' ? 'Touch ID or Face ID' : 'fingerprint or PIN'} to complete payment
          </p>
        </div>
      )}

      {/* Order Summary */}
      <div className="mb-6 p-4 bg-muted/50 rounded-lg">
        <h4 className="font-medium text-foreground mb-3">Order Summary</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Movie Tickets</span>
            <span>${(bookingDetails.total - bookingDetails.total * 0.08).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>${(bookingDetails.total * 0.08).toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg border-t border-border pt-2">
            <span>Total</span>
            <span>${bookingDetails.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="mb-6 p-3 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={16} className="text-green-600" />
          <span className="text-sm text-green-800">
            Your payment information is encrypted and secure
          </span>
        </div>
      </div>

      {/* Payment Button */}
      <Button
        variant="default"
        fullWidth
        onClick={handlePayment}
        loading={processing}
        iconName={processing ? "Loader" : "Lock"}
        iconPosition="left"
        disabled={processing}
      >
        {processing ? 'Processing Payment...' : `Pay $${bookingDetails.total.toFixed(2)}`}
      </Button>

      {/* Terms */}
      <p className="text-xs text-muted-foreground text-center mt-4">
        By completing this purchase, you agree to our{' '}
        <a href="#" className="text-accent hover:underline">Terms of Service</a> and{' '}
        <a href="#" className="text-accent hover:underline">Privacy Policy</a>
      </p>
    </div>
  );
};

export default PaymentInterface;