import React, { useState } from 'react';
import { useCart, PaymentMethod, ShippingAddress } from '@/contexts/CartContext';
import { ArrowLeft, Lock, Check, AlertCircle } from 'lucide-react';

const countries = [
  'Slovenia', 'Austria', 'Germany', 'Italy', 'Croatia', 'Hungary',
  'Czech Republic', 'Slovakia', 'France', 'Netherlands', 'Belgium',
  'Spain', 'Portugal', 'Poland', 'Romania', 'Bulgaria', 'Greece',
  'Sweden', 'Denmark', 'Finland', 'Ireland', 'Luxembourg',
];

interface PaymentOption {
  id: PaymentMethod;
  label: string;
  icon: React.ReactNode;
}

const paymentOptions: PaymentOption[] = [
  {
    id: 'paypal',
    label: 'PayPal',
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
        <path d="M7.076 21.337H2.47a.641.641 0 01-.633-.74L4.944 2.23A.774.774 0 015.71 1.6h6.486c2.022 0 3.625.52 4.656 1.477.962.893 1.39 2.18 1.24 3.848-.36 3.998-2.953 5.893-6.275 5.893H9.726a.775.775 0 00-.766.658l-.884 5.86z" fill="#253B80"/>
        <path d="M19.093 7.424c-.36 3.998-2.953 5.893-6.275 5.893H10.726a.775.775 0 00-.766.658l-1.33 8.43a.505.505 0 00.498.583h3.505a.68.68 0 00.67-.576l.028-.142.53-3.36.034-.185a.68.68 0 01.67-.576h.423c2.736 0 4.878-1.112 5.504-4.33.262-1.344.126-2.467-.566-3.256a2.71 2.71 0 00-.833-.639z" fill="#179BD7"/>
        <path d="M18.093 7.024a5.73 5.73 0 00-.703-.155 8.94 8.94 0 00-1.422-.104h-4.31a.68.68 0 00-.67.576l-.917 5.812-.027.168a.775.775 0 01.766-.658h2.092c3.322 0 5.915-1.895 6.275-5.893.011-.118.019-.233.025-.346a3.66 3.66 0 00-1.11-.4z" fill="#222D65"/>
      </svg>
    ),
  },
  {
    id: 'visa',
    label: 'Visa',
    icon: (
      <svg viewBox="0 0 48 32" className="w-10 h-7" fill="none">
        <rect width="48" height="32" rx="4" fill="#1A1F71"/>
        <path d="M19.5 21h-3l1.88-11.5h3L19.5 21zm12.62-11.22c-.6-.23-1.53-.48-2.7-.48-2.97 0-5.07 1.58-5.08 3.83-.02 1.67 1.49 2.6 2.63 3.15 1.17.57 1.56.93 1.56 1.44-.01.78-.94 1.13-1.8 1.13-1.2 0-1.84-.18-2.83-.6l-.39-.18-.42 2.6c.7.32 2 .6 3.35.62 3.16 0 5.22-1.56 5.24-3.97.01-1.32-.79-2.33-2.52-3.16-.99-.52-1.6-.87-1.6-1.4 0-.47.52-.97 1.63-.97.93-.02 1.6.2 2.13.42l.25.13.38-2.36zm7.76-.28h-2.33c-.72 0-1.26.21-1.58.96L31.5 21h3.16l.63-1.74h3.86l.37 1.74H42.5l-2.62-11.5zm-3.3 7.4l1.6-4.33.23-.64.37 1.78.93 3.19h-3.13zM15.5 9.5l-2.95 7.86-.31-1.62c-.55-1.86-2.26-3.87-4.17-4.88l2.69 10.13h3.18L18.68 9.5H15.5z" fill="#fff"/>
        <path d="M9.75 9.5H4.55l-.05.3c3.77.96 6.26 3.3 7.3 6.1l-1.05-5.34c-.18-.73-.71-.95-1-.96z" fill="#F9A533"/>
      </svg>
    ),
  },
  {
    id: 'mastercard',
    label: 'Mastercard',
    icon: (
      <svg viewBox="0 0 48 32" className="w-10 h-7" fill="none">
        <rect width="48" height="32" rx="4" fill="#252525"/>
        <circle cx="19" cy="16" r="8" fill="#EB001B"/>
        <circle cx="29" cy="16" r="8" fill="#F79E1B"/>
        <path d="M24 10.34A7.97 7.97 0 0127 16a7.97 7.97 0 01-3 5.66A7.97 7.97 0 0121 16a7.97 7.97 0 013-5.66z" fill="#FF5F00"/>
      </svg>
    ),
  },
];

interface FormErrors {
  [key: string]: string;
}

const CheckoutForm: React.FC = () => {
  const {
    shippingAddress,
    setShippingAddress,
    paymentMethod,
    setPaymentMethod,
    setIsCheckout,
    total,
    items,
    clearCart,
    closeDrawer,
  } = useCart();

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const updateField = (field: keyof ShippingAddress, value: string) => {
    setShippingAddress({ ...shippingAddress, [field]: value });
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!shippingAddress.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!shippingAddress.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!shippingAddress.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(shippingAddress.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!shippingAddress.address.trim()) newErrors.address = 'Address is required';
    if (!shippingAddress.city.trim()) newErrors.city = 'City is required';
    if (!shippingAddress.postalCode.trim()) newErrors.postalCode = 'Postal code is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    // Simulate processing
    await new Promise((r) => setTimeout(r, 2000));
    setIsSubmitting(false);
    setIsSuccess(true);
  };


  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6">
          <Check size={32} className="text-emerald-500" />
        </div>
        <h3 className="font-serif text-2xl font-semibold text-emerald-500 mb-3">
          Order Confirmed
        </h3>
        <p className="text-sm text-emerald-500/50 mb-2 max-w-xs">
          Thank you for your order! A confirmation email has been sent to{' '}
          <span className="font-medium text-emerald-500/70">{shippingAddress.email}</span>.
        </p>
        <p className="text-xs text-emerald-500/35 mb-8">
          Order total: <span className="font-semibold">{total.toFixed(2)} EUR</span>
        </p>
        <button
          onClick={() => {
            clearCart();
            closeDrawer();
            setIsSuccess(false);
          }}
          className="px-8 py-3 bg-emerald-500 text-white text-sm font-medium rounded-full hover:bg-emerald-600 transition-colors"
        >
          Continue Browsing
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-emerald-500/[0.06]">
        <button
          onClick={() => setIsCheckout(false)}
          className="p-1.5 rounded-lg hover:bg-emerald-500/5 transition-colors"
        >
          <ArrowLeft size={18} className="text-emerald-500/60" />
        </button>
        <h3 className="font-serif text-lg font-semibold text-emerald-500">Checkout</h3>
        <div className="ml-auto flex items-center gap-1.5 text-emerald-500/30">
          <Lock size={12} />
          <span className="text-[10px] uppercase tracking-wide">Secure</span>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
        {/* Shipping */}
        <div>
          <h4 className="text-xs font-semibold tracking-wide-elegant text-emerald-500/50 uppercase mb-4">
            Shipping Address
          </h4>
          <div className="grid grid-cols-2 gap-3">
            <FieldInput
              label="First Name"
              value={shippingAddress.firstName}
              onChange={(v) => updateField('firstName', v)}
              error={errors.firstName}
              placeholder="Aleksandra"
            />
            <FieldInput
              label="Last Name"
              value={shippingAddress.lastName}
              onChange={(v) => updateField('lastName', v)}
              error={errors.lastName}
              placeholder="Komasz"
            />
          </div>
          <div className="mt-3">
            <FieldInput
              label="Email"
              type="email"
              value={shippingAddress.email}
              onChange={(v) => updateField('email', v)}
              error={errors.email}
              placeholder="your@email.com"
              full
            />
          </div>
          <div className="mt-3">
            <FieldInput
              label="Phone (optional)"
              type="tel"
              value={shippingAddress.phone}
              onChange={(v) => updateField('phone', v)}
              placeholder="+386 ..."
              full
            />
          </div>
          <div className="mt-3">
            <FieldInput
              label="Address"
              value={shippingAddress.address}
              onChange={(v) => updateField('address', v)}
              error={errors.address}
              placeholder="Street and number"
              full
            />
          </div>
          <div className="grid grid-cols-2 gap-3 mt-3">
            <FieldInput
              label="City"
              value={shippingAddress.city}
              onChange={(v) => updateField('city', v)}
              error={errors.city}
              placeholder="Ljubljana"
            />
            <FieldInput
              label="Postal Code"
              value={shippingAddress.postalCode}
              onChange={(v) => updateField('postalCode', v)}
              error={errors.postalCode}
              placeholder="1000"
            />
          </div>
          <div className="mt-3">
            <label className="text-[11px] font-medium text-emerald-500/50 mb-1 block">Country</label>
            <select
              value={shippingAddress.country}
              onChange={(e) => updateField('country', e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white/60 border border-emerald-500/[0.08] rounded-xl text-sm text-emerald-500 focus:outline-none focus:border-emerald-500/25 focus:ring-1 focus:ring-emerald-500/10 transition-all appearance-none"
            >
              {countries.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Payment Method */}
        <div>
          <h4 className="text-xs font-semibold tracking-wide-elegant text-emerald-500/50 uppercase mb-4">
            Payment Method
          </h4>
          <div className="space-y-2.5">
            {paymentOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setPaymentMethod(option.id)}
                className={`w-full flex items-center gap-3 p-3.5 rounded-xl border transition-all duration-300 ${
                  paymentMethod === option.id
                    ? 'border-emerald-500/25 bg-emerald-500/[0.04] shadow-sm'
                    : 'border-emerald-500/[0.06] bg-white/40 hover:border-emerald-500/12'
                }`}
              >
                <div
                  className={`w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center transition-all ${

                    paymentMethod === option.id
                      ? 'border-emerald-500 bg-emerald-500'
                      : 'border-emerald-500/20'
                  }`}
                >
                  {paymentMethod === option.id && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {option.icon}
                  <span className={`text-sm ${
                    paymentMethod === option.id ? 'text-emerald-500 font-medium' : 'text-emerald-500/60'
                  }`}>
                    {option.label}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Order Summary mini */}
        <div className="bg-emerald-500/[0.03] rounded-xl p-4 border border-emerald-500/[0.05]">
          <h4 className="text-xs font-semibold text-emerald-500/50 uppercase mb-3">Order Summary</h4>
          {items.map((item) => (
            <div key={item.id} className="flex justify-between text-xs text-emerald-500/60 mb-1.5">
              <span>{item.name} x{item.quantity}</span>
              <span className="font-medium">{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="h-[1px] bg-emerald-500/[0.06] my-2.5" />
          <div className="flex justify-between text-sm font-semibold text-emerald-500">
            <span>Total</span>
            <span>{total.toFixed(2)} EUR</span>
          </div>
        </div>
      </form>

      {/* Submit */}
      <div className="px-6 py-4 border-t border-emerald-500/[0.06]">
        <button
          onClick={() => handleSubmit()}

          disabled={isSubmitting || items.length === 0}
          className={`w-full py-3.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 flex items-center justify-center gap-2 ${
            isSubmitting || items.length === 0
              ? 'bg-emerald-500/30 text-white/50 cursor-not-allowed'
              : 'btn-glow bg-emerald-500 text-white hover:bg-emerald-600'
          }`}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              Processing...
            </>
          ) : (
            <>
              <Lock size={14} />
              Pay {total.toFixed(2)} EUR
            </>
          )}
        </button>
        <p className="text-[10px] text-emerald-500/25 text-center mt-2.5">
          Your payment information is encrypted and secure.
        </p>
      </div>
    </div>
  );
};

// Reusable field input
const FieldInput: React.FC<{
  label: string;
  value: string;
  onChange: (val: string) => void;
  error?: string;
  placeholder?: string;
  type?: string;
  full?: boolean;
}> = ({ label, value, onChange, error, placeholder, type = 'text', full }) => (
  <div className={full ? '' : ''}>
    <label className="text-[11px] font-medium text-emerald-500/50 mb-1 block">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full px-3.5 py-2.5 bg-white/60 border rounded-xl text-sm text-emerald-500 placeholder:text-emerald-500/20 focus:outline-none focus:ring-1 transition-all ${
        error
          ? 'border-red-400/40 focus:border-red-400/60 focus:ring-red-400/10'
          : 'border-emerald-500/[0.08] focus:border-emerald-500/25 focus:ring-emerald-500/10'
      }`}
    />
    {error && (
      <div className="flex items-center gap-1 mt-1">
        <AlertCircle size={10} className="text-red-400" />
        <span className="text-[10px] text-red-400">{error}</span>
      </div>
    )}
  </div>
);

export default CheckoutForm;
