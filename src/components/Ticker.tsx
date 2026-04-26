const Ticker = () => {
  const items = [
    { label: 'CREATINE', value: '1000MG' },
    { label: 'SUGAR', value: '0G' },
    { label: 'CALORIES', value: '10' },
    { label: 'SERVINGS', value: '60' },
    { label: 'LAB TESTED', value: '✓' },
    { label: 'GMP CERTIFIED', value: '✓' },
    { label: 'MADE IN USA', value: '✓' },
  ];

  const doubled = [...items, ...items];

  return (
    <div className="ticker">
      <div className="tk-tr">
        {doubled.map((item, i) => (
          <div className="tki" key={i}>
            <span className="tki-dot" />
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ticker;
