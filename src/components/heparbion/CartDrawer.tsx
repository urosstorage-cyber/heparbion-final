import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/hooks/useLanguage';
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight, Truck, Tag } from 'lucide-react';
import CheckoutForm from './CheckoutForm';

const PRODUCT_THUMB = 'https://d64gsuwffb70l.cloudfront.net/699afc85723b98553d778884_1771766011742_1f7093db.webp';

const CartDrawer: React.FC = () => {
  const {
    items, isDrawerOpen, isCheckout, closeDrawer, removeItem,
    updateQuantity, itemCount, subtotal, totalSavings, shippingCost, total, setIsCheckout,
  } = useCart();
  const { t } = useLanguage();

  if (!isDrawerOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-[60] bg-emerald-500/10 backdrop-blur-sm transition-opacity duration-300" onClick={closeDrawer} />
      <div className="fixed top-0 right-0 bottom-0 z-[70] w-full max-w-md bg-cream-100 shadow-2xl shadow-emerald-500/10 flex flex-col animate-slide-in-right">
        {isCheckout ? (
          <CheckoutForm />
        ) : (
          <>
            <div className="flex items-center justify-between px-6 py-4 border-b border-emerald-500/[0.06]">
              <div className="flex items-center gap-3">
                <ShoppingBag size={18} className="text-emerald-500/60" />
                <h3 className="font-serif text-lg font-semibold text-emerald-500">{t('cart.title')}</h3>
                {itemCount > 0 && (
                  <span className="text-[10px] font-semibold text-white bg-emerald-500 px-2 py-0.5 rounded-full">{itemCount}</span>
                )}
              </div>
              <button onClick={closeDrawer} className="p-2 rounded-xl hover:bg-emerald-500/5 transition-colors">
                <X size={18} className="text-emerald-500/50" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full px-6 text-center">
                  <div className="w-20 h-20 rounded-2xl bg-emerald-500/[0.04] flex items-center justify-center mb-5">
                    <ShoppingBag size={32} className="text-emerald-500/20" />
                  </div>
                  <h4 className="font-serif text-lg font-medium text-emerald-500/60 mb-2">{t('cart.empty')}</h4>
                  <p className="text-sm text-emerald-500/35 mb-6 max-w-xs">{t('cart.emptyDesc')}</p>
                  <button onClick={() => { closeDrawer(); const el = document.getElementById('pricing'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}
                    className="px-6 py-2.5 bg-emerald-500 text-white text-sm font-medium rounded-full hover:bg-emerald-600 transition-colors">
                    {t('cart.viewBundles')}
                  </button>
                </div>
              ) : (
                <div className="px-6 py-4 space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 bg-white/50 border border-emerald-500/[0.05] rounded-2xl group hover:border-emerald-500/10 transition-all">
                      <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-cream-200 overflow-hidden flex items-center justify-center">
                        <img src={item.image || PRODUCT_THUMB} alt={item.name} className="w-14 h-14 object-contain" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="text-sm font-medium text-emerald-500 leading-tight">{item.name}</h4>
                            <p className="text-[10px] text-emerald-500/35 mt-0.5">
                              {item.bottles} {item.bottles > 1 ? t('cart.bottles') : t('cart.bottle')} &middot; Heparbion Plus
                            </p>
                          </div>
                          <button onClick={() => removeItem(item.id)} className="p-1 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-50 transition-all">
                            <Trash2 size={14} className="text-red-400/60" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-0 border border-emerald-500/[0.08] rounded-lg overflow-hidden">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center hover:bg-emerald-500/5 transition-colors">
                              <Minus size={12} className="text-emerald-500/50" />
                            </button>
                            <span className="w-8 h-8 flex items-center justify-center text-xs font-semibold text-emerald-500 border-x border-emerald-500/[0.08]">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-emerald-500/5 transition-colors">
                              <Plus size={12} className="text-emerald-500/50" />
                            </button>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold text-emerald-500">{(item.price * item.quantity).toFixed(2)}</p>
                            {item.savings > 0 && <p className="text-[10px] text-gold-500 font-medium">{t('pricing.save')} {(item.savings * item.quantity).toFixed(2)}</p>}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-emerald-500/[0.06] px-6 py-5">
                {totalSavings > 0 && (
                  <div className="flex items-center gap-2 mb-4 px-3 py-2 bg-gold-400/[0.06] border border-gold-400/10 rounded-xl">
                    <Tag size={14} className="text-gold-500" />
                    <span className="text-xs font-medium text-gold-600">{t('cart.saving')} {totalSavings.toFixed(2)} {t('cart.onThisOrder')}</span>
                  </div>
                )}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs text-emerald-500/50">
                    <span>{t('cart.subtotal')}</span>
                    <span className="font-medium">{subtotal.toFixed(2)} EUR</span>
                  </div>
                  <div className="flex justify-between text-xs text-emerald-500/50">
                    <span className="flex items-center gap-1"><Truck size={11} />{t('cart.shipping')}</span>
                    <span className="font-medium">{shippingCost === 0 ? <span className="text-emerald-400">{t('cart.shippingFree')}</span> : `${shippingCost.toFixed(2)} EUR`}</span>
                  </div>
                  {shippingCost > 0 && <p className="text-[10px] text-emerald-500/25">{t('cart.shippingNote')}</p>}
                </div>
                <div className="h-[1px] bg-emerald-500/[0.06] mb-3" />
                <div className="flex justify-between items-baseline mb-5">
                  <span className="text-sm font-medium text-emerald-500">{t('cart.total')}</span>
                  <span className="font-serif text-2xl font-bold text-emerald-500">{total.toFixed(2)}<span className="text-xs font-sans font-normal text-emerald-500/40 ml-1">EUR</span></span>
                </div>
                <button onClick={() => setIsCheckout(true)}
                  className="btn-glow w-full py-3.5 bg-emerald-500 text-white text-sm font-medium tracking-wide rounded-full hover:bg-emerald-600 transition-all duration-300 flex items-center justify-center gap-2">
                  {t('cart.checkout')} <ArrowRight size={16} />
                </button>
                <div className="flex items-center justify-center gap-3 mt-4">
                  <svg viewBox="0 0 24 24" className="w-7 h-7 opacity-30"><path d="M7.076 21.337H2.47a.641.641 0 01-.633-.74L4.944 2.23A.774.774 0 015.71 1.6h6.486c2.022 0 3.625.52 4.656 1.477.962.893 1.39 2.18 1.24 3.848-.36 3.998-2.953 5.893-6.275 5.893H9.726a.775.775 0 00-.766.658l-.884 5.86z" fill="#253B80"/><path d="M19.093 7.424c-.36 3.998-2.953 5.893-6.275 5.893H10.726a.775.775 0 00-.766.658l-1.33 8.43a.505.505 0 00.498.583h3.505a.68.68 0 00.67-.576l.028-.142.53-3.36.034-.185a.68.68 0 01.67-.576h.423c2.736 0 4.878-1.112 5.504-4.33.262-1.344.126-2.467-.566-3.256a2.71 2.71 0 00-.833-.639z" fill="#179BD7"/></svg>
                  <svg viewBox="0 0 48 32" className="w-9 h-6 opacity-30"><rect width="48" height="32" rx="4" fill="#1A1F71"/><path d="M19.5 21h-3l1.88-11.5h3L19.5 21zm12.62-11.22c-.6-.23-1.53-.48-2.7-.48-2.97 0-5.07 1.58-5.08 3.83-.02 1.67 1.49 2.6 2.63 3.15 1.17.57 1.56.93 1.56 1.44-.01.78-.94 1.13-1.8 1.13-1.2 0-1.84-.18-2.83-.6l-.39-.18-.42 2.6c.7.32 2 .6 3.35.62 3.16 0 5.22-1.56 5.24-3.97.01-1.32-.79-2.33-2.52-3.16-.99-.52-1.6-.87-1.6-1.4 0-.47.52-.97 1.63-.97.93-.02 1.6.2 2.13.42l.25.13.38-2.36z" fill="#fff"/></svg>
                  <svg viewBox="0 0 48 32" className="w-9 h-6 opacity-30"><rect width="48" height="32" rx="4" fill="#252525"/><circle cx="19" cy="16" r="8" fill="#EB001B"/><circle cx="29" cy="16" r="8" fill="#F79E1B"/><path d="M24 10.34A7.97 7.97 0 0127 16a7.97 7.97 0 01-3 5.66A7.97 7.97 0 0121 16a7.97 7.97 0 013-5.66z" fill="#FF5F00"/></svg>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <style>{`
        @keyframes slide-in-right {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </>
  );
};

export default CartDrawer;
