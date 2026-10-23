import { useMemo, useState } from "react";
import { Download, Filter, MoreHorizontal, RadioTower, Search, SlidersHorizontal } from "lucide-react";
import PageHeader from "../components/PageHeader.jsx";
import StatusBadge from "../components/StatusBadge.jsx";

export default function MetersPage({ meters }) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const filteredMeters = useMemo(() => meters.filter((meter) => {
    const matchesQuery = `${meter.name} ${meter.id} ${meter.location}`.toLowerCase().includes(query.toLowerCase());
    return matchesQuery && (statusFilter === "All statuses" || meter.status === statusFilter);
  }), [meters, query, statusFilter]);

  return (
    <div className="page-stack">
      <PageHeader eyebrow="ASSET MANAGEMENT" title="Meters" description="Monitor meter connectivity and review the latest available readings." actions={<button className="button button-secondary" onClick={() => window.alert("Demo only: meter export will be connected in a later phase.")}><Download size={15} /> Export list</button>} />
      <div className="metric-grid compact-metric-grid">
        <div className="mini-stat-card"><span>Total meters</span><strong>{meters.length}</strong><small>Configured in demo</small></div>
        <div className="mini-stat-card"><span>Online</span><strong className="text-green">{meters.filter(m => m.status === "Online").length}</strong><small>Reporting status (simulated)</small></div>
        <div className="mini-stat-card"><span>Offline</span><strong className="text-red">{meters.filter(m => m.status === "Offline").length}</strong><small>Requires review</small></div>
        <div className="mini-stat-card"><span>Communication</span><strong>Modbus*</strong><small>*Planned, not connected</small></div>
      </div>
      <article className="panel table-panel">
        <div className="table-toolbar">
          <div><h3>Meter inventory</h3><p>{filteredMeters.length} of {meters.length} meters</p></div>
          <div className="table-tools">
            <label className="search-field"><Search size={16} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search meters..." /></label>
            <label className="select-field"><Filter size={15} /><select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}><option>All statuses</option><option>Online</option><option>Offline</option></select></label>
          </div>
        </div>
        <div className="table-scroll"><table><thead><tr><th>Meter</th><th>Location</th><th>Status</th><th>Voltage</th><th>Current</th><th>Active power</th><th>Power factor</th><th>Energy total</th><th>Last seen</th><th /></tr></thead>
          <tbody>{filteredMeters.map((meter) => <tr key={meter.id}>
            <td><div className="asset-cell"><span className={`asset-icon ${meter.status === "Offline" ? "asset-offline" : ""}`}><RadioTower size={16} /></span><span><strong>{meter.name}</strong><small>{meter.id}</small></span></div></td>
            <td>{meter.location}</td><td><StatusBadge status={meter.status} /></td>
            <td>{meter.voltage == null ? "—" : `${meter.voltage.toFixed(1)} V`}</td><td>{meter.current == null ? "—" : `${meter.current.toFixed(1)} A`}</td>
            <td><strong className="table-value">{meter.power == null ? "—" : `${meter.power.toFixed(1)} kW`}</strong></td><td>{meter.pf == null ? "—" : meter.pf.toFixed(2)}</td><td>{meter.energy.toLocaleString("en-IN", { maximumFractionDigits: 1 })} kWh</td><td>{meter.lastSeen}</td>
            <td><button className="icon-button table-more" aria-label={`More actions for ${meter.name}`} onClick={() => window.alert("Meter actions are a UI placeholder in this prototype.")}><MoreHorizontal size={18} /></button></td>
          </tr>)}</tbody>
        </table></div>
        {filteredMeters.length === 0 && <div className="empty-state"><Search size={22} /><strong>No meters found</strong><span>Try another search or status filter.</span></div>}
        <div className="table-footer"><span>Showing {filteredMeters.length} meter records</span><span>All readings are simulated</span></div>
      </article>
    </div>
  );
}
