import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ShoppingBag,
  Truck,
  CreditCard,
  Check,
  ChevronRight,
  MapPin,
  Phone,
  Mail,
  User,
  Building,
  Package,
  Shield,
  Lock,
  Clock,
  Loader2,
  CheckCircle2,
} from 'lucide-react';
import { useCartStore } from '@/stores/useCartStore';
import { useAuthStore } from '@/stores/useAuthStore';
import { formatPrice } from '@/lib/pricing';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

// ============================================
// TYPES
// ============================================

interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  apartment: string;
  city: string;
  postalCode: string;
  company: string;
  nip: string;
}

interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
  icon: React.ReactNode;
}

interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  popular?: boolean;
}

type CheckoutStep = 'cart' | 'shipping' | 'payment' | 'confirmation';

// ============================================
// CONSTANTS
// ============================================

const SHIPPING_METHODS: ShippingMethod[] = [
  {
    id: 'inpost',
    name: 'InPost Paczkomat',
    description: 'Odbiór w paczkomacie 24/7',
    price: 12.99,
    estimatedDays: '1-2 dni robocze',
    icon: <Package className="w-5 h-5" />,
  },
  {
    id: 'dpd',
    name: 'Kurier DPD',
    description: 'Dostawa pod wskazany adres',
    price: 14.99,
    estimatedDays: '1-2 dni robocze',
    icon: <Truck className="w-5 h-5" />,
  },
  {
    id: 'dhl',
    name: 'Kurier DHL',
    description: 'Szybka dostawa kurierska',
    price: 15.99,
    estimatedDays: '1-2 dni robocze',
    icon: <Truck className="w-5 h-5" />,
  },
  {
    id: 'free',
    name: 'Darmowa dostawa',
    description: 'Przy zamówieniach powyżej 150 zł',
    price: 0,
    estimatedDays: '2-3 dni robocze',
    icon: <Package className="w-5 h-5" />,
  },
];

const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'blik',
    name: 'BLIK',
    description: 'Szybka płatność kodem BLIK',
    icon: (
      <svg className="w-8 h-6" viewBox="0 0 60 32" fill="none">
        <rect width="60" height="32" rx="4" fill="#E6007E" />
        <text x="10" y="22" fill="white" fontSize="14" fontWeight="bold">BLIK</text>
      </svg>
    ),
    popular: true,
  },
  {
    id: 'card',
    name: 'Karta płatnicza',
    description: 'Visa, Mastercard, Maestro',
    icon: (
      <div className="flex gap-1">
        <svg className="w-8 h-6" viewBox="0 0 48 32" fill="none">
          <rect width="48" height="32" rx="4" fill="#1A1F71" />
          <text x="8" y="20" fill="white" fontSize="10" fontWeight="bold">VISA</text>
        </svg>
        <svg className="w-8 h-6" viewBox="0 0 48 32" fill="none">
          <rect width="48" height="32" rx="4" fill="#EB001B" />
          <circle cx="20" cy="16" r="10" fill="#EB001B" />
          <circle cx="28" cy="16" r="10" fill="#F79E1B" />
        </svg>
      </div>
    ),
  },
  {
    id: 'przelewy24',
    name: 'Przelewy24',
    description: 'Szybki przelew online',
    icon: (
      <svg className="w-10 h-6" viewBox="0 0 60 32" fill="none">
        <rect width="60" height="32" rx="4" fill="#D13239" />
        <text x="10" y="20" fill="white" fontSize="10" fontWeight="bold">P24</text>
      </svg>
    ),
  },
  {
    id: 'paypo',
    name: 'PayPo',
    description: 'Kup teraz, zapłać za 30 dni',
    icon: (
      <svg className="w-12 h-6" viewBox="0 0 60 32" fill="none">
        <rect width="60" height="32" rx="4" fill="#00D066" />
        <text x="8" y="20" fill="white" fontSize="10" fontWeight="bold">PayPo</text>
      </svg>
    ),
  },
  {
    id: 'gpay',
    name: 'Google Pay',
    description: 'Płatność przez Google Pay',
    icon: (
      <svg className="w-12 h-6" viewBox="0 0 60 32" fill="none">
        <rect width="60" height="32" rx="4" fill="#FFFFFF" stroke="#E0E0E0" />
        <text x="8" y="20" fill="#5F6368" fontSize="9" fontWeight="500">G Pay</text>
      </svg>
    ),
  },
  {
    id: 'applepay',
    name: 'Apple Pay',
    description: 'Płatność przez Apple Pay',
    icon: (
      <svg className="w-12 h-6" viewBox="0 0 60 32" fill="none">
        <rect width="60" height="32" rx="4" fill="#000000" />
        <text x="8" y="20" fill="white" fontSize="9" fontWeight="500"> Pay</text>
      </svg>
    ),
  },
];

// ============================================
// CHECKOUT PAGE COMPONENT
// ============================================

export function CheckoutPage() {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const { user, isAuthenticated, openLoginModal } = useAuthStore();

  const [currentStep, setCurrentStep] = useState<CheckoutStep>('cart');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  // Form state
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: '',
    street: '',
    apartment: '',
    city: '',
    postalCode: '',
    company: '',
    nip: '',
  });
  const [isCompanyOrder, setIsCompanyOrder] = useState(false);
  const [selectedShipping, setSelectedShipping] = useState<string>('inpost');
  const [selectedPayment, setSelectedPayment] = useState<string>('blik');
  const [blikCode, setBlikCode] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptNewsletter, setAcceptNewsletter] = useState(false);

  // Pre-fill form if user is authenticated
  useEffect(() => {
    if (user) {
      setShippingAddress((prev) => ({
        ...prev,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      }));
    }
  }, [user]);

  // Calculate totals
  const subtotal = getTotalPrice();
  const shippingCost = subtotal >= 150 ? 0 : SHIPPING_METHODS.find((m) => m.id === selectedShipping)?.price || 0;
  const total = subtotal + shippingCost;

  // Redirect if cart is empty
  if (items.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto text-center">
            <ShoppingBag className="w-20 h-20 text-muted-foreground/30 mx-auto mb-6" />
            <h1 className="text-2xl font-bold text-foreground mb-2">Koszyk jest pusty</h1>
            <p className="text-muted-foreground mb-6">
              Dodaj produkty do koszyka, aby kontynuować zakupy.
            </p>
            <Button onClick={() => navigate('/configure')} size="lg">
              Zaprojektuj etui
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const steps = [
    { id: 'cart', label: 'Koszyk', icon: ShoppingBag },
    { id: 'shipping', label: 'Dostawa', icon: Truck },
    { id: 'payment', label: 'Płatność', icon: CreditCard },
    { id: 'confirmation', label: 'Potwierdzenie', icon: Check },
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);

  const handleAddressChange = (field: keyof ShippingAddress, value: string) => {
    setShippingAddress((prev) => ({ ...prev, [field]: value }));
  };

  const validateShipping = () => {
    const required = ['firstName', 'lastName', 'email', 'phone', 'street', 'city', 'postalCode'];
    return required.every((field) => shippingAddress[field as keyof ShippingAddress].trim() !== '');
  };

  const handleProcessPayment = async () => {
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Generate order number
    const orderNum = `CS-${Date.now().toString().slice(-8)}`;
    setOrderNumber(orderNum);
    setOrderComplete(true);
    setCurrentStep('confirmation');
    setIsProcessing(false);

    // Clear cart after successful order
    clearCart();
  };

  // Order Complete View
  if (orderComplete) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle2 className="w-12 h-12 text-white" />
            </motion.div>

            <h1 className="text-3xl font-bold text-foreground mb-2">
              Dziękujemy za zamówienie!
            </h1>
            <p className="text-muted-foreground mb-6">
              Twoje zamówienie zostało przyjęte do realizacji.
            </p>

            <div className="bg-card border border-border rounded-xl p-6 mb-6">
              <p className="text-sm text-muted-foreground mb-1">Numer zamówienia</p>
              <p className="text-2xl font-bold text-primary">{orderNumber}</p>
            </div>

            <div className="bg-accent/30 border border-border rounded-xl p-6 mb-8 text-left">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary" />
                Co dalej?
              </h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Potwierdzenie zamówienia zostało wysłane na {shippingAddress.email}
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Otrzymasz powiadomienie gdy zamówienie zostanie wysłane
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Możesz śledzić status zamówienia w zakładce "Moje zamówienia"
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={() => navigate('/')} variant="outline" className="flex-1">
                Wróć do sklepu
              </Button>
              {isAuthenticated && (
                <Button onClick={() => navigate('/account/orders')} className="flex-1">
                  Moje zamówienia
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Wróć
        </button>

        {/* Progress steps */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={cn(
                    'flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all',
                    index < currentStepIndex
                      ? 'bg-primary border-primary text-primary-foreground'
                      : index === currentStepIndex
                      ? 'border-primary text-primary'
                      : 'border-border text-muted-foreground'
                  )}
                >
                  {index < currentStepIndex ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <step.icon className="w-5 h-5" />
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      'hidden sm:block w-16 md:w-24 h-0.5 mx-2',
                      index < currentStepIndex ? 'bg-primary' : 'bg-border'
                    )}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            {steps.map((step) => (
              <span key={step.id} className="text-xs text-muted-foreground hidden sm:block">
                {step.label}
              </span>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Main content */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {/* Step 1: Cart Review */}
              {currentStep === 'cart' && (
                <motion.div
                  key="cart"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-foreground">Twój koszyk</h2>

                  <div className="space-y-4">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="bg-card border border-border rounded-xl p-4 flex gap-4"
                      >
                        <div className="w-20 h-20 bg-accent rounded-lg flex items-center justify-center">
                          <ShoppingBag className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-foreground">
                            {item.phoneSelection.manufacturerName} {item.phoneSelection.modelName}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {item.phoneSelection.caseTypeName}
                          </p>
                          {item.personalization.uploadedImage && (
                            <span className="inline-block text-xs bg-primary/10 text-primary px-2 py-0.5 rounded mt-1">
                              + własna grafika
                            </span>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">{formatPrice(item.totalPrice * item.quantity, 'PLN')}</p>
                          <p className="text-sm text-muted-foreground">x{item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {!isAuthenticated && (
                    <div className="bg-accent/50 border border-border rounded-xl p-4">
                      <p className="text-sm text-foreground mb-2">
                        Masz już konto? Zaloguj się, aby przyspieszyć składanie zamówienia.
                      </p>
                      <Button variant="outline" size="sm" onClick={() => openLoginModal('login')}>
                        Zaloguj się
                      </Button>
                    </div>
                  )}

                  <Button onClick={() => setCurrentStep('shipping')} size="lg" className="w-full gap-2">
                    Kontynuuj do dostawy
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </motion.div>
              )}

              {/* Step 2: Shipping */}
              {currentStep === 'shipping' && (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-foreground">Dane dostawy</h2>

                  {/* Company toggle */}
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isCompanyOrder}
                      onChange={(e) => setIsCompanyOrder(e.target.checked)}
                      className="w-5 h-5 rounded border-border text-primary focus:ring-primary"
                    />
                    <span className="text-foreground">Zamówienie na firmę</span>
                  </label>

                  {/* Address form */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        <User className="w-4 h-4 inline mr-1" />
                        Imię *
                      </label>
                      <input
                        type="text"
                        value={shippingAddress.firstName}
                        onChange={(e) => handleAddressChange('firstName', e.target.value)}
                        className="w-full px-4 py-3 bg-accent/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Nazwisko *
                      </label>
                      <input
                        type="text"
                        value={shippingAddress.lastName}
                        onChange={(e) => handleAddressChange('lastName', e.target.value)}
                        className="w-full px-4 py-3 bg-accent/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        <Mail className="w-4 h-4 inline mr-1" />
                        Email *
                      </label>
                      <input
                        type="email"
                        value={shippingAddress.email}
                        onChange={(e) => handleAddressChange('email', e.target.value)}
                        className="w-full px-4 py-3 bg-accent/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        <Phone className="w-4 h-4 inline mr-1" />
                        Telefon *
                      </label>
                      <input
                        type="tel"
                        value={shippingAddress.phone}
                        onChange={(e) => handleAddressChange('phone', e.target.value)}
                        placeholder="+48 000 000 000"
                        className="w-full px-4 py-3 bg-accent/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>

                    {isCompanyOrder && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            <Building className="w-4 h-4 inline mr-1" />
                            Nazwa firmy
                          </label>
                          <input
                            type="text"
                            value={shippingAddress.company}
                            onChange={(e) => handleAddressChange('company', e.target.value)}
                            className="w-full px-4 py-3 bg-accent/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            NIP
                          </label>
                          <input
                            type="text"
                            value={shippingAddress.nip}
                            onChange={(e) => handleAddressChange('nip', e.target.value)}
                            placeholder="000-000-00-00"
                            className="w-full px-4 py-3 bg-accent/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                      </>
                    )}

                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-foreground mb-2">
                        <MapPin className="w-4 h-4 inline mr-1" />
                        Ulica i numer domu *
                      </label>
                      <input
                        type="text"
                        value={shippingAddress.street}
                        onChange={(e) => handleAddressChange('street', e.target.value)}
                        className="w-full px-4 py-3 bg-accent/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Nr mieszkania / lokalu
                      </label>
                      <input
                        type="text"
                        value={shippingAddress.apartment}
                        onChange={(e) => handleAddressChange('apartment', e.target.value)}
                        className="w-full px-4 py-3 bg-accent/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Kod pocztowy *
                      </label>
                      <input
                        type="text"
                        value={shippingAddress.postalCode}
                        onChange={(e) => handleAddressChange('postalCode', e.target.value)}
                        placeholder="00-000"
                        className="w-full px-4 py-3 bg-accent/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Miasto *
                      </label>
                      <input
                        type="text"
                        value={shippingAddress.city}
                        onChange={(e) => handleAddressChange('city', e.target.value)}
                        className="w-full px-4 py-3 bg-accent/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                  </div>

                  {/* Shipping methods */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Metoda dostawy</h3>
                    <div className="space-y-3">
                      {SHIPPING_METHODS.filter((m) => subtotal >= 150 ? true : m.id !== 'free').map((method) => (
                        <label
                          key={method.id}
                          className={cn(
                            'flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all',
                            selectedShipping === method.id
                              ? 'border-primary bg-primary/5'
                              : 'border-border hover:border-primary/50'
                          )}
                        >
                          <input
                            type="radio"
                            name="shipping"
                            value={method.id}
                            checked={selectedShipping === method.id}
                            onChange={() => setSelectedShipping(method.id)}
                            className="w-5 h-5 text-primary"
                          />
                          <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center text-foreground">
                            {method.icon}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-foreground">{method.name}</p>
                            <p className="text-sm text-muted-foreground">{method.description}</p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                              <Clock className="w-3 h-3" />
                              {method.estimatedDays}
                            </p>
                          </div>
                          <div className="text-right">
                            {method.price === 0 ? (
                              <span className="text-green-500 font-semibold">Gratis</span>
                            ) : (
                              <span className="font-semibold">{formatPrice(method.price, 'PLN')}</span>
                            )}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setCurrentStep('cart')} className="flex-1">
                      Wstecz
                    </Button>
                    <Button
                      onClick={() => setCurrentStep('payment')}
                      disabled={!validateShipping()}
                      size="lg"
                      className="flex-1 gap-2"
                    >
                      Kontynuuj do płatności
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Payment */}
              {currentStep === 'payment' && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-foreground">Metoda płatności</h2>

                  <div className="space-y-3">
                    {PAYMENT_METHODS.map((method) => (
                      <label
                        key={method.id}
                        className={cn(
                          'flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all relative',
                          selectedPayment === method.id
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        )}
                      >
                        {method.popular && (
                          <span className="absolute -top-2 right-4 text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                            Popularne
                          </span>
                        )}
                        <input
                          type="radio"
                          name="payment"
                          value={method.id}
                          checked={selectedPayment === method.id}
                          onChange={() => setSelectedPayment(method.id)}
                          className="w-5 h-5 text-primary"
                        />
                        <div>{method.icon}</div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{method.name}</p>
                          <p className="text-sm text-muted-foreground">{method.description}</p>
                        </div>
                      </label>
                    ))}
                  </div>

                  {/* BLIK Code Input */}
                  {selectedPayment === 'blik' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="bg-accent/30 border border-border rounded-xl p-6"
                    >
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Wprowadź kod BLIK
                      </label>
                      <input
                        type="text"
                        value={blikCode}
                        onChange={(e) => setBlikCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        placeholder="_ _ _ _ _ _"
                        className="w-full text-center text-3xl tracking-[0.5em] font-mono px-4 py-4 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        maxLength={6}
                      />
                      <p className="text-sm text-muted-foreground mt-2 text-center">
                        Kod znajdziesz w aplikacji bankowej
                      </p>
                    </motion.div>
                  )}

                  {/* Terms */}
                  <div className="space-y-3">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={acceptTerms}
                        onChange={(e) => setAcceptTerms(e.target.checked)}
                        className="w-5 h-5 mt-0.5 rounded border-border text-primary focus:ring-primary"
                      />
                      <span className="text-sm text-muted-foreground">
                        Akceptuję{' '}
                        <Link to="/terms" className="text-primary hover:underline">
                          Regulamin sklepu
                        </Link>{' '}
                        oraz{' '}
                        <Link to="/privacy" className="text-primary hover:underline">
                          Politykę prywatności
                        </Link>{' '}
                        *
                      </span>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={acceptNewsletter}
                        onChange={(e) => setAcceptNewsletter(e.target.checked)}
                        className="w-5 h-5 mt-0.5 rounded border-border text-primary focus:ring-primary"
                      />
                      <span className="text-sm text-muted-foreground">
                        Chcę otrzymywać informacje o promocjach i nowościach
                      </span>
                    </label>
                  </div>

                  {/* Security badges */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground bg-accent/30 rounded-xl p-4">
                    <Shield className="w-8 h-8 text-green-500" />
                    <div>
                      <p className="font-medium text-foreground">Bezpieczna płatność</p>
                      <p>Twoje dane są szyfrowane protokołem SSL</p>
                    </div>
                    <Lock className="w-5 h-5 ml-auto" />
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setCurrentStep('shipping')} className="flex-1">
                      Wstecz
                    </Button>
                    <Button
                      onClick={handleProcessPayment}
                      disabled={!acceptTerms || isProcessing || (selectedPayment === 'blik' && blikCode.length !== 6)}
                      size="lg"
                      className="flex-1 gap-2"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Przetwarzanie...
                        </>
                      ) : (
                        <>
                          Zapłać {formatPrice(total, 'PLN')}
                          <Lock className="w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order summary sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-card border border-border rounded-xl p-6 space-y-6">
              <h3 className="text-lg font-semibold text-foreground">Podsumowanie zamówienia</h3>

              {/* Items */}
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                      <ShoppingBag className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {item.phoneSelection.modelName}
                      </p>
                      <p className="text-xs text-muted-foreground">x{item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium">{formatPrice(item.totalPrice * item.quantity, 'PLN')}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Produkty</span>
                  <span>{formatPrice(subtotal, 'PLN')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Dostawa</span>
                  <span className={shippingCost === 0 ? 'text-green-500' : ''}>
                    {shippingCost === 0 ? 'Gratis' : formatPrice(shippingCost, 'PLN')}
                  </span>
                </div>
                {subtotal < 150 && (
                  <p className="text-xs text-muted-foreground">
                    Dodaj jeszcze {formatPrice(150 - subtotal, 'PLN')} do darmowej dostawy
                  </p>
                )}
              </div>

              <div className="border-t border-border pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Razem</span>
                  <span className="text-2xl font-bold text-primary">{formatPrice(total, 'PLN')}</span>
                </div>
              </div>

              {/* Promo code */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Kod rabatowy</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Wpisz kod"
                    className="flex-1 px-4 py-2 bg-accent/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Button variant="outline" size="sm">
                    Zastosuj
                  </Button>
                </div>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2">
                  <Truck className="w-5 h-5 mx-auto mb-1 text-primary" />
                  <p className="text-xs text-muted-foreground">Szybka dostawa</p>
                </div>
                <div className="p-2">
                  <Shield className="w-5 h-5 mx-auto mb-1 text-primary" />
                  <p className="text-xs text-muted-foreground">Bezpieczne płatności</p>
                </div>
                <div className="p-2">
                  <Package className="w-5 h-5 mx-auto mb-1 text-primary" />
                  <p className="text-xs text-muted-foreground">14 dni na zwrot</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
