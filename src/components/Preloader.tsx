const Preloader = ({ done }: { done: boolean }) => {
  return (
    <div className={`pl-wrap ${done ? 'out' : ''}`}>
      <div className="pl-logo">PURE<em>LOAD</em></div>
      <div className="pl-track"><div className="pl-fill" id="plFill" /></div>
      <div className="pl-pct" id="plPct">0%</div>
    </div>
  );
};

export default Preloader;
