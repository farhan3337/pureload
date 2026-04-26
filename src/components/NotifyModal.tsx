import { useState } from 'react';

interface NotifyModalProps {
  open: boolean;
  onClose: () => void;
}

const NotifyModal = ({ open, onClose }: NotifyModalProps) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!email.trim()) return;
    console.log('[Notify] Email:', email);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEmail('');
      onClose();
    }, 2500);
  };

  return (
    <div className={`modal ${open ? 'on' : ''}`} onClick={onClose}>
      <div className="mb" onClick={e => e.stopPropagation()}>
        {!submitted ? (
          <>
            <div className="mb-ic">
              <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="hsl(24,100%,50%)" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
            </div>
            <div className="mb-t">NOTIFY ME</div>
            <div className="mb-s">Be first when this product drops — get an exclusive launch discount.</div>
            <input 
              className="mb-in" 
              type="email" 
              placeholder="Your email address" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            />
            <button className="mb-btn" onClick={handleSubmit}>Notify Me →</button>
            <button className="mb-no" onClick={onClose}>No thanks</button>
          </>
        ) : (
          <>
            <div style={{ fontSize: 36, marginBottom: 12, color: 'hsl(var(--primary))' }}>✓</div>
            <div className="mb-t">YOU'RE ON THE LIST!</div>
            <div className="mb-s">We'll email you as soon as this drops.</div>
          </>
        )}
      </div>
    </div>
  );
};

export default NotifyModal;
