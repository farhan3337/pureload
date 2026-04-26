import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { isLoggedIn, AUTH_EVENT } from '@/lib/auth';

interface NavbarProps {
  onOpenMenu: () => void;
  onOpenCart: () => void;
  cartCount: number;
  onGotoSection: (id: string) => void;
}

const Navbar = ({ onOpenMenu, onOpenCart, cartCount, onGotoSection }: NavbarProps) => {
  const [stuck, setStuck] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const handler = () => setStuck(window.scrollY > 50);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Instantly react to login/logout via custom event + storage (cross-tab)
  useEffect(() => {
    const check = () => setLoggedIn(isLoggedIn());
    check(); // run on mount
    window.addEventListener(AUTH_EVENT, check);     // same-tab changes
    window.addEventListener('storage', check);       // cross-tab changes
    return () => {
      window.removeEventListener(AUTH_EVENT, check);
      window.removeEventListener('storage', check);
    };
  }, []);

  return (
    <nav className={`main-nav ${stuck ? 'stuck' : ''}`} id="mainNav">
      <button className="hamburger" onClick={onOpenMenu}>
        <span /><span />
      </button>
      <Link to="/" className="nav-logo">PURE<em>LOAD</em></Link>
      <div className="nav-links">
        <Link to="/collections">Shop</Link>
        <Link to="/stacks">Stack</Link>
        <Link to="/bundles">Bundles</Link>
        <a onClick={() => onGotoSection('ch-rv')}>Results</a>
        <Link to="/system">System</Link>
      </div>
      <div className="nav-r">
        <Link
          to="/account"
          className="btn-nav"
          style={loggedIn ? { position: 'relative', paddingLeft: 28 } : {}}
        >
          {loggedIn && (
            <span style={{
              position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)',
              width: 7, height: 7, borderRadius: '50%', background: '#22c55e',
              display: 'inline-block',
            }} />
          )}
          {loggedIn ? 'My Account' : 'Account'}
        </Link>
        <button className="btn-nav" onClick={() => onGotoSection('ch-ord')}>Shop Now</button>
        <button className="cart-btn" onClick={onOpenCart}>
          🛒
          {cartCount > 0 && <span className="cbadge">{cartCount}</span>}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
