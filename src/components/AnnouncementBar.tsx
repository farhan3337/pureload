const AnnouncementBar = () => {
  const items = [
    '📦 FREE SHIPPING ON ALL ORDERS',
    '🔬 LAB TESTED · GMP CERTIFIED',
    '🇺🇸 MADE IN USA',
    '🔥 BEST SELLERS SELLING FAST',
    '💰 USE CODE BEAST20 FOR 20% OFF',
    '⏱ SUBSCRIBE & SAVE UP TO 15%',
  ];

  const doubled = [...items, ...items];

  return (
    <div className="abar">
      <div className="atrack">
        {doubled.map((item, i) => (
          <span key={i}>
            {i > 0 && <span className="adot">◆</span>}
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementBar;
