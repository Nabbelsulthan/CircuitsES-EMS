import { ArrowDownRight, ArrowUpRight } from "lucide-react";

export default function MetricCard({ label, value, unit, change, direction = "up", icon: Icon, tone = "green", note }) {
  return (
    <article className="metric-card">
      <div className="metric-top">
        <span className="metric-label">{label}</span>
        <span className={`metric-icon tone-${tone}`}><Icon size={18} strokeWidth={2} /></span>
      </div>
      <div className="metric-value-row"><strong>{value}</strong><span>{unit}</span></div>
      <div className="metric-bottom">
        {change && <span className={`metric-change ${direction === "down" ? "change-down" : ""}`}>{direction === "down" ? <ArrowDownRight size={14} /> : <ArrowUpRight size={14} />}{change}</span>}
        <span className="metric-note">{note}</span>
      </div>
    </article>
  );
}
