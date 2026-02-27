import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

export interface CartItem {
  id: string;
  name: string;
  bottles: number;
  price: number;
  originalPrice: number;
  perBottle: string;
  savings: number;
  quantity: number;
  image: string;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export type PaymentMethod = 'paypal' | 'visa' | 'mastercard';

interface CartContextType {
  items: CartItem[];
  isDrawerOpen: boolean;
  isCheckout: boolean;
  paymentMethod: PaymentMethod;
  shippingAddress: ShippingAddress;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  setIsCheckout: (val: boolean) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  setShippingAddress: (address: ShippingAddress) => void;
  itemCount: number;
  subtotal: number;
  totalSavings: number;
  shippingCost: number;
  total: number;
}

const defaultShipping: ShippingAddress = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  postalCode: '',
  country: 'Slovenia',
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('paypal');
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>(defaultShipping);

  const addItem = useCallback((item: Omit<CartItem, 'quantity'>) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsDrawerOpen(true);
    setIsCheckout(false);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1) {
      setItems((prev) => prev.filter((i) => i.id !== id));
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setIsCheckout(false);
  }, []);

  const openDrawer = useCallback(() => setIsDrawerOpen(true), []);
  const closeDrawer = useCallback(() => {
    setIsDrawerOpen(false);
    setIsCheckout(false);
  }, []);
  const toggleDrawer = useCallback(() => {
    setIsDrawerOpen((p) => !p);
    if (isDrawerOpen) setIsCheckout(false);
  }, [isDrawerOpen]);

  const { itemCount, subtotal, totalSavings } = useMemo(() => {
    let count = 0;
    let sub = 0;
    let sav = 0;
    items.forEach((item) => {
      count += item.quantity;
      sub += item.price * item.quantity;
      sav += item.savings * item.quantity;
    });
    return { itemCount: count, subtotal: sub, totalSavings: sav };
  }, [items]);

  const shippingCost = subtotal >= 60 ? 0 : 5.90;
  const total = subtotal + shippingCost;

  return (
    <CartContext.Provider
      value={{
        items,
        isDrawerOpen,
        isCheckout,
        paymentMethod,
        shippingAddress,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        openDrawer,
        closeDrawer,
        toggleDrawer,
        setIsCheckout,
        setPaymentMethod,
        setShippingAddress,
        itemCount,
        subtotal,
        totalSavings,
        shippingCost,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
