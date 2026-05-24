export default function MetricsGrid({ meters }) {
  return (
    <section className="metrics-grid" aria-label="Current instrument state">
      {meters.map((meter) => (
        <div className={`metric ${meter.tone}`} key={meter.label}>
          <span>{meter.label}</span>
          <strong>{meter.value}</strong>
        </div>
      ))}
    </section>
  );
}
