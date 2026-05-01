import type { CartItem } from '@/data/pureload';
import { createCheckout, SELLING_PLAN_IDS } from '@/lib/shopify';
import { toast } from '@/hooks/use-toast';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQty: (index: number, delta: number) => void;
}

const CartDrawer = ({ open, onClose, cart, onUpdateQty }: CartDrawerProps) => {
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const handleCheckout = async () => {
    if (cart.length === 0) return;

    const lineItems = cart.map(item => {
      let sellingPlanId: string | undefined;
      if (item.isSubscription && item.subscriptionInterval) {
        sellingPlanId = SELLING_PLAN_IDS[item.subscriptionInterval];
        if (!sellingPlanId) {
          console.warn(
            `No selling plan ID found for interval ${item.subscriptionInterval} days. ` +
            `Subscription will not be applied at checkout.`
          );
        }
      }
      return {
        variantId: item.variantId || '51797145682206',
        quantity: item.qty,
        sellingPlanId,
      };
    });

    // iOS Safari blocks window.open() inside async functions because by the
    // time the await resolves, it's no longer treated as a direct user gesture.
    // Fix: open the window synchronously BEFORE the async call, then set its URL.
    // Android Chrome handles both approaches fine.
    const checkoutWindow = window.open('', '_blank');

    try {
      const checkoutUrl = await createCheckout(lineItems);
      if (checkoutUrl && checkoutWindow) {
        checkoutWindow.location.href = checkoutUrl;
      } else if (checkoutUrl) {
        // Popup was blocked — navigate current tab instead
        window.location.href = checkoutUrl;
      } else {
        checkoutWindow?.close();
        throw new Error('No checkout URL returned');
      }
    } catch {
      checkoutWindow?.close();
      toast({
        title: 'Checkout Error',
        description: 'Please try again or contact support.',
        variant: 'destructive',
      });
    }
  };

  return (
    <>
      <div className={`overlay ${open ? 'on' : ''}`} onClick={onClose} />
      <div className={`cart-dr ${open ? 'on' : ''}`}>
        <div className="cdr-hd">
          <div className="cdr-t">YOUR STASH</div>
          <button className="cdr-x" onClick={onClose}>✕</button>
        </div>
        <div style={{ overflowY: 'auto', flex: 1 }}>
          {cart.length === 0 ? (
            <p style={{
              color: '#444', textAlign: 'center', padding: '38px 0',
              fontFamily: 'var(--font-ui)', letterSpacing: 2, fontSize: 13
            }}>
              YOUR STASH IS EMPTY.
            </p>
          ) : (
            cart.map((item, i) => (
              <div className="cdi" key={i}>
                <div className="cdi-img" style={{ overflow: 'hidden' }}>
                  {item.img ? (
                    <img src={item.img} alt={item.label} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="hsl(24,100%,50%)" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /></svg>
                  )}
                </div>
                <div className="cdi-info">
                  <div className="cdi-name">PURELOAD</div>
                  <div className="cdi-sub">{item.label.toUpperCase()}</div>
                  {item.isSubscription && (
                    <div style={{ fontSize: 9, color: 'hsl(var(--primary))', letterSpacing: 1, marginTop: 2, fontFamily: 'var(--font-ui)' }}>
                      SUBSCRIPTION · EVERY {item.subscriptionInterval} DAYS
                    </div>
                  )}
                  <div className="cdi-qty">
                    <button className="cdqb" onClick={() => onUpdateQty(i, -1)}>−</button>
                    <span style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, color: '#fff' }}>{item.qty}</span>
                    <button className="cdqb" onClick={() => onUpdateQty(i, 1)}>+</button>
                  </div>
                </div>
                <div className="cdi-price">${(item.price * item.qty).toFixed(2)}</div>
              </div>
            ))
          )}
        </div>
        <div className="cdr-ft">
          <div className="cdr-row"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
          <div className="cdr-row"><span>Shipping</span><span className="free">Free</span></div>
          <div className="cdr-tot"><span>Total</span><span>${subtotal.toFixed(2)}</span></div>
          <button className="ckout" onClick={handleCheckout}>CHECKOUT</button>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;