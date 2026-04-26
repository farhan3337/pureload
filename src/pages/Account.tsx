import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createCustomerAccount, customerLogin, customerLogout, getCustomerOrders, getCustomerSubscriptions, pauseSubscription, resumeSubscription } from '@/lib/shopify';
import type { SubscriptionContract } from '@/lib/shopify';
import { toast } from '@/hooks/use-toast';
import { getToken, setToken, clearToken } from '@/lib/auth';

interface Order {
  id: string;
  name: string;
  processedAt: string;
  financialStatus: string;
  fulfillmentStatus: string;
  totalPriceV2: { amount: string; currencyCode: string };
  lineItems: { edges: { node: { title: string; quantity: number; variant?: { image?: { url: string } } } }[] };
}

interface CustomerData {
  firstName: string;
  lastName: string;
  email: string;
  orders: { edges: { node: Order }[] };
}

const statusColor: Record<string, string> = {
  PAID: '#22c55e', PENDING: '#f59e0b', REFUNDED: '#ef4444',
  FULFILLED: '#22c55e', UNFULFILLED: '#f59e0b', PARTIALLY_FULFILLED: '#3b82f6',
  ACTIVE: '#22c55e', PAUSED: '#f59e0b', CANCELLED: '#ef4444', FAILED: '#ef4444', EXPIRED: '#888',
};

const Account = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [customer, setCustomer] = useState<CustomerData | null>(null);
  const [loadingDashboard, setLoadingDashboard] = useState(false);
  const [activeTab, setActiveTab] = useState<'orders' | 'subscription'>('orders');
  const [subscriptions, setSubscriptions] = useState<SubscriptionContract[]>([]);
  const [loadingSubscriptions, setLoadingSubscriptions] = useState(false);
  const [pauseLoadingId, setPauseLoadingId] = useState<string | null>(null);

  useEffect(() => {
    const token = getToken(); // validates expiry automatically
    if (token) loadCustomer(token);
  }, []);

  useEffect(() => {
    if (activeTab === 'subscription' && customer && subscriptions.length === 0) {
      const token = getToken();
      if (token) fetchSubscriptions(token);
    }
  }, [activeTab, customer]);

  const loadCustomer = async (token: string) => {
    setLoadingDashboard(true);
    const data = await getCustomerOrders(token);
    setLoadingDashboard(false);
    if (data) {
      setCustomer(data);
    } else {
      clearToken(); // token invalid — show login form
    }
  };

  const fetchSubscriptions = async (token: string) => {
    setLoadingSubscriptions(true);
    const subs = await getCustomerSubscriptions(token);
    setLoadingSubscriptions(false);
    setSubscriptions(subs);
  };

  const handleLogin = async () => {
    if (!email || !password) return;
    setLoading(true);
    const result = await customerLogin(email, password);
    setLoading(false);
    if (result?.customerAccessToken) {
      const { accessToken, expiresAt } = result.customerAccessToken;
      setToken(accessToken, expiresAt);
      toast({ title: 'Welcome back!', description: 'You are now logged in.' });
      loadCustomer(accessToken);
    } else {
      toast({ title: 'Login failed', description: result?.customerUserErrors?.[0]?.message || 'Invalid credentials', variant: 'destructive' });
    }
  };

  const handleSignup = async () => {
    if (!email || !password || !firstName || !lastName) return;
    setLoading(true);
    const result = await createCustomerAccount(email, password, firstName, lastName);
    setLoading(false);
    if (result?.customer) {
      toast({ title: 'Account created!', description: 'You can now log in.' });
      setIsLogin(true);
    } else {
      toast({ title: 'Signup failed', description: result?.customerUserErrors?.[0]?.message || 'Please try again', variant: 'destructive' });
    }
  };

  const handleLogout = async () => {
    const token = getToken();
    if (token) await customerLogout(token);
    clearToken();
    setCustomer(null);
    setSubscriptions([]);
    setEmail('');
    setPassword('');
    toast({ title: 'Logged out', description: 'See you next time!' });
  };

  const handleTogglePause = async (contract: SubscriptionContract) => {
    const token = getToken();
    if (!token) return;
    setPauseLoadingId(contract.id);
    const isPausing = contract.status === 'ACTIVE';
    const success = isPausing
      ? await pauseSubscription(token, contract.id)
      : await resumeSubscription(token, contract.id);
    setPauseLoadingId(null);

    if (success) {
      setSubscriptions(prev => prev.map(s => s.id === contract.id ? { ...s, status: isPausing ? 'PAUSED' : 'ACTIVE' } : s));
      toast({
        title: isPausing ? 'Subscription Paused' : 'Subscription Resumed',
        description: isPausing ? 'Paused. Resume anytime.' : 'Your subscription is active again!',
      });
    } else {
      toast({ title: 'Action failed', description: 'Could not update subscription. Please contact support.', variant: 'destructive' });
    }
  };

  if (loadingDashboard) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'hsl(var(--pl-black))' }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: 32, color: 'hsl(var(--pl-white))', marginBottom: 16 }}>LOADING...</div>
          <p style={{ color: 'rgba(255,255,255,0.4)' }}>Fetching your account data</p>
        </motion.div>
      </div>
    );
  }

  if (customer) {
    const orders = customer.orders?.edges?.map(e => e.node) || [];
    return (
      <div className="min-h-screen pt-[90px] pb-16" style={{ background: 'hsl(var(--pl-black))' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 40 }}>
            <div className="sec-ey" style={{ opacity: 1, transform: 'none' }}>My Account</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
              <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 48, color: 'hsl(var(--pl-white))', margin: 0 }}>
                WELCOME, {customer.firstName?.toUpperCase() || 'BACK'}
              </h1>
              <button className="btn-p" style={{ fontSize: 13, padding: '10px 24px' }} onClick={handleLogout}>LOG OUT</button>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.45)', marginTop: 8, fontSize: 14 }}>{customer.email}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.1 } }}>
            <div style={{ display: 'flex', gap: 4, marginBottom: 32, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              {(['orders', 'subscription'] as const).map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} style={{
                  background: 'none', border: 'none', cursor: 'pointer', padding: '12px 24px',
                  fontFamily: 'var(--font-heading)', fontSize: 14, letterSpacing: 2, textTransform: 'uppercase',
                  color: activeTab === tab ? 'hsl(var(--pl-white))' : 'rgba(255,255,255,0.35)',
                  borderBottom: activeTab === tab ? '2px solid #c8f135' : '2px solid transparent',
                  transition: 'all 0.2s', marginBottom: -1,
                }}>
                  {tab === 'orders' ? `Orders (${orders.length})` : `Subscriptions (${subscriptions.length})`}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'orders' && (
                <motion.div key="orders" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  {orders.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '60px 0', color: 'rgba(255,255,255,0.3)' }}>
                      <div style={{ fontSize: 48, marginBottom: 16 }}>📦</div>
                      <p style={{ fontFamily: 'var(--font-heading)', fontSize: 20, letterSpacing: 2 }}>NO ORDERS YET</p>
                      <p style={{ fontSize: 14, marginTop: 8 }}>Your order history will appear here.</p>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                      {orders.map(order => (
                        <div key={order.id} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '20px 24px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 14 }}>
                            <div>
                              <div style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--pl-white))', fontSize: 18, letterSpacing: 1 }}>{order.name}</div>
                              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>
                                {new Date(order.processedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                              </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                              <div style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--pl-white))', fontSize: 20 }}>
                                {order.totalPriceV2.currencyCode} {parseFloat(order.totalPriceV2.amount).toFixed(2)}
                              </div>
                              <div style={{ display: 'flex', gap: 8, marginTop: 6, justifyContent: 'flex-end' }}>
                                {[order.financialStatus, order.fulfillmentStatus || 'UNFULFILLED'].map((s, i) => (
                                  <span key={i} style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1, padding: '3px 10px', borderRadius: 20, background: `${statusColor[s] || '#888'}22`, color: statusColor[s] || '#888', border: `1px solid ${statusColor[s] || '#888'}44` }}>{s}</span>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {order.lineItems.edges.map(({ node: item }, idx) => (
                              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                {item.variant?.image?.url && <img src={item.variant.image.url} alt={item.title} style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 6 }} />}
                                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>{item.title} <span style={{ color: 'rgba(255,255,255,0.3)' }}>× {item.quantity}</span></span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'subscription' && (
                <motion.div key="subscription" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  {loadingSubscriptions ? (
                    <div style={{ textAlign: 'center', padding: '60px 0', color: 'rgba(255,255,255,0.3)' }}>
                      <p style={{ fontFamily: 'var(--font-heading)', fontSize: 18, letterSpacing: 2 }}>LOADING SUBSCRIPTIONS...</p>
                    </div>
                  ) : subscriptions.length === 0 ? (
                    <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '48px 32px', textAlign: 'center' }}>
                      <div style={{ fontSize: 48, marginBottom: 16 }}>🔄</div>
                      <p style={{ fontFamily: 'var(--font-heading)', fontSize: 20, letterSpacing: 2, color: 'hsl(var(--pl-white))' }}>NO ACTIVE SUBSCRIPTIONS</p>
                      <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', marginTop: 8 }}>
                        Subscribe to a product from our shop to manage it here.
                      </p>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                      {subscriptions.map(contract => {
                        const isLoading = pauseLoadingId === contract.id;
                        const isPaused = contract.status === 'PAUSED';
                        const isActive = contract.status === 'ACTIVE';
                        const canToggle = isActive || isPaused;
                        return (
                          <div key={contract.id} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '28px 32px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 20 }}>
                              <div>
                                <div style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--pl-white))', fontSize: 20, letterSpacing: 1, marginBottom: 10 }}>PURELOAD SUBSCRIPTION</div>
                                <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, letterSpacing: 1.5, padding: '4px 14px', borderRadius: 20, marginBottom: 12, background: `${statusColor[contract.status] || '#888'}22`, color: statusColor[contract.status] || '#888', border: `1px solid ${statusColor[contract.status] || '#888'}44` }}>
                                  {contract.status === 'ACTIVE' ? '● ACTIVE' : contract.status === 'PAUSED' ? '⏸ PAUSED' : contract.status}
                                </span>
                                {contract.nextBillingDate && (
                                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, marginBottom: 12 }}>
                                    Next billing: {new Date(contract.nextBillingDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                  </p>
                                )}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                  {contract.lines.edges.map(({ node: line }, idx) => (
                                    <div key={idx} style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>
                                      {line.title} × {line.quantity}
                                      <span style={{ color: 'rgba(255,255,255,0.3)', marginLeft: 8 }}>
                                        {line.currentPrice.currencyCode} {parseFloat(line.currentPrice.amount).toFixed(2)}/ea
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              {canToggle && (
                                <button className="btn-p" style={{ background: isActive ? 'transparent' : undefined, border: isActive ? '1px solid rgba(255,255,255,0.25)' : undefined, color: isActive ? 'hsl(var(--pl-white))' : undefined, opacity: isLoading ? 0.6 : 1, cursor: isLoading ? 'not-allowed' : 'pointer', minWidth: 200, fontSize: 13 }} onClick={() => handleTogglePause(contract)} disabled={isLoading}>
                                  {isLoading ? 'UPDATING...' : isActive ? '⏸ PAUSE SUBSCRIPTION' : '▶ RESUME SUBSCRIPTION'}
                                </button>
                              )}
                            </div>
                            <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', lineHeight: 1.7 }}>
                                {isActive ? 'Pause anytime — no cancellation needed.' : isPaused ? 'Resume whenever you\'re ready.' : `Status: ${contract.status}`}
                                {' '}Need help? <a href="mailto:support@pureload.com" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'underline' }}>support@pureload.com</a>
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'hsl(var(--pl-black))' }}>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ width: '100%', maxWidth: 420, padding: '0 24px' }}>
        <div className="pt-[100px]">
          <div className="sec-ey" style={{ opacity: 1, transform: 'none', textAlign: 'center', marginBottom: 16 }}>{isLogin ? 'Welcome Back' : 'Join PURELOAD'}</div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 56, letterSpacing: 2, color: 'hsl(var(--pl-white))', textAlign: 'center', marginBottom: 32 }}>{isLogin ? 'LOG IN' : 'SIGN UP'}</h1>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {!isLogin && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <input className="mb-in" type="text" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} />
                <input className="mb-in" type="text" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} />
              </div>
            )}
            <input className="mb-in" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <input className="mb-in" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && (isLogin ? handleLogin() : handleSignup())} />
            <button className="mb-btn" onClick={isLogin ? handleLogin : handleSignup} disabled={loading}>{loading ? 'LOADING...' : isLogin ? 'LOG IN →' : 'CREATE ACCOUNT →'}</button>
            <button className="mb-no" onClick={() => setIsLogin(!isLogin)}>{isLogin ? "Don't have an account? Sign up" : 'Already have an account? Log in'}</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Account;
