export default function StatusBadge({ status, children }) {
  const label = children ?? status;
  const normalized = String(status ?? label).toLowerCase().replaceAll(" ", "-");
  return <span className={`status-badge status-${normalized}`}><span className="status-indicator" />{label}</span>;
}
