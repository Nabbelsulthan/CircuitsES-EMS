import { useMemo, useState } from "react";
import { BellRing, CheckCheck, CircleAlert, Clock3, Filter, Info, ShieldAlert } from "lucide-react";
import PageHeader from "../components/PageHeader.jsx";
import StatusBadge from "../components/StatusBadge.jsx";

const SeverityIcon = ({ severity }) => {
  const Icon = severity === "Critical" ? ShieldAlert : severity === "Warning" ? CircleAlert : Info;
  return <span className={`alert-severity-icon severity-${severity.toLowerCase()}`}><Icon size={17} /></span>;
};

export default function AlertsPage({ alerts, onAcknowledge }) {
  const [severity, setSeverity] = useState("All severities");
  const [state, setState] = useState("All alerts");
  const filtered = useMemo(() => alerts.filter((alert) => {
    const severityMatch = severity === "All severities" || alert.severity === severity;
    const stateMatch = state === "All alerts" || (state === "Unacknowledged" ? !alert.acknowledged : alert.acknowledged);
    return severityMatch && stateMatch;
  }), [alerts, severity, state]);
  const pending = alerts.filter((alert) => !alert.acknowledged).length;

  return (
    <div className="page-stack">
      <PageHeader eyebrow="EVENT MONITORING" title="Alerts & events" description="Track simulated exceptions and review their acknowledgement status." actions={<button className="button button-secondary" onClick={() => window.alert("Alert rules will be configurable when the backend is implemented.")}><BellRing size={15} /> Alert rules</button>} />
      <div className="alert-summary-grid">
        <div className="alert-summary-card"><span className="alert-summary-icon critical"><ShieldAlert size={17} /></span><div><span>Critical</span><strong>{alerts.filter(a => a.severity === "Critical" && !a.acknowledged).length}</strong></div></div>
        <div className="alert-summary-card"><span className="alert-summary-icon warning"><CircleAlert size={17} /></span><div><span>Warnings</span><strong>{alerts.filter(a => a.severity === "Warning" && !a.acknowledged).length}</strong></div></div>
        <div className="alert-summary-card"><span className="alert-summary-icon info"><Info size={17} /></span><div><span>Information</span><strong>{alerts.filter(a => a.severity === "Info" && !a.acknowledged).length}</strong></div></div>
        <div className="alert-summary-card"><span className="alert-summary-icon pending"><Clock3 size={17} /></span><div><span>Awaiting review</span><strong>{pending}</strong></div></div>
      </div>
      <article className="panel table-panel">
        <div className="table-toolbar">
          <div><h3>Event log</h3><p>Newest events first · sample records</p></div>
          <div className="table-tools">
            <label className="select-field"><Filter size={15} /><select value={severity} onChange={(e) => setSeverity(e.target.value)}><option>All severities</option><option>Critical</option><option>Warning</option><option>Info</option></select></label>
            <label className="select-field"><select value={state} onChange={(e) => setState(e.target.value)}><option>All alerts</option><option>Unacknowledged</option><option>Acknowledged</option></select></label>
          </div>
        </div>
        <div className="event-list">
          {filtered.map((alert) => <div className={`event-row ${alert.acknowledged ? "event-acknowledged" : ""}`} key={alert.id}>
            <SeverityIcon severity={alert.severity} />
            <div className="event-main"><div className="event-title-line"><strong>{alert.title}</strong><StatusBadge status={alert.severity} /></div><p>{alert.detail}</p><div className="event-meta"><span>{alert.id}</span><span>{alert.source}</span><span><Clock3 size={12} /> {alert.date}, {alert.time}</span></div></div>
            <div className="event-actions">{alert.acknowledged ? <span className="acknowledged-label"><CheckCheck size={15} /> Acknowledged</span> : <button className="button button-outline button-small" onClick={() => onAcknowledge(alert.id)}>Acknowledge</button>}</div>
          </div>)}
          {filtered.length === 0 && <div className="empty-state"><BellRing size={22} /><strong>No matching alerts</strong><span>Try changing the filters.</span></div>}
        </div>
        <div className="table-footer"><span>{filtered.length} event records</span><span>Acknowledgements are local demo state only</span></div>
      </article>
    </div>
  );
}
