import { Link } from 'react-router-dom';

interface FullscreenMenuProps {
  open: boolean;
  onClose: () => void;
  onGotoSection: (id: string) => void;
}

const FullscreenMenu = ({ open, onClose, onGotoSection }: FullscreenMenuProps) => {
  const handleNav = (id: string) => {
    onClose();
    setTimeout(() => onGotoSection(id), 400);
  };

  return (
    <div className={`fsmenu ${open ? 'open' : ''}`}>
      <button className="fs-close" onClick={onClose}>
        <span>✕</span> CLOSE
      </button>
      <ul className="fs-links">
        <li><Link to="/collections" onClick={onClose}>Shop</Link></li>
        <li><Link to="/stacks" onClick={onClose}>Stack</Link></li>
        <li><Link to="/bundles" onClick={onClose}>Bundles</Link></li>
        <li><a onClick={() => handleNav('ch-rv')}>Results</a></li>
        <li><Link to="/system" onClick={onClose}>System</Link></li>
        <li>
          <a style={{ opacity: .5, cursor: 'not-allowed' }} onClick={(e) => e.preventDefault()}>
            Gear <span style={{ fontSize: '0.4em', letterSpacing: 3, color: 'hsl(var(--primary))', marginLeft: 8 }}>(COMING SOON)</span>
          </a>
        </li>
        <li><Link to="/account" onClick={onClose}>Account</Link></li>
        <li><Link to="/mission" onClick={onClose}>Our Mission</Link></li>
      </ul>
      <div className="fs-side">
        <p>FOLLOW US</p>
        <div className="fs-soc">
          <a href="https://instagram.com/pureloadsupps" target="_blank" rel="noopener noreferrer">IG</a>
          <a href="https://tiktok.com/@pureload" target="_blank" rel="noopener noreferrer">TT</a>
          <a href="https://youtube.com/@pureload" target="_blank" rel="noopener noreferrer">YT</a>
        </div>
      </div>
    </div>
  );
};

export default FullscreenMenu;
