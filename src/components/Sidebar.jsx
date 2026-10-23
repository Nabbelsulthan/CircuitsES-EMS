import { Activity, BellRing, ChartNoAxesCombined, ChevronLeft, Gauge, LayoutDashboard, Settings, ShieldCheck, Users, X, Zap } from "lucide-react";

const navGroups = [
  { label: "WORKSPACE", items: [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "meters", label: "Meters", icon: Gauge },
    { id: "alerts", label: "Alerts & events", icon: BellRing },
    { id: "reports", label: "Reports", icon: ChartNoAxesCombined },
  ]},
  { label: "ADMINISTRATION", items: [
    { id: "users", label: "Users & access", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
  ]},
];

export default function Sidebar({ activePage, onNavigate, open, onClose }) {
  return (
    <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
      <div className="brand">
        <div className="brand-mark"><Zap size={21} fill="currentColor" /></div>
        <div className="brand-copy"><strong>CircuitsES<span> EMS</span></strong><small>ENERGY INTELLIGENCE</small></div>
        <button className="icon-button sidebar-close" aria-label="Close navigation" onClick={onClose}><X size={18} /></button>
      </div>
      <div className="site-selector">
        <div className="site-avatar">P1</div>
        <div className="site-copy"><strong>Plant 01</strong><span>Main Facility</span></div>
        <ChevronLeft size={16} className="site-chevron" />
      </div>
      <nav className="sidebar-nav" aria-label="Main navigation">
        {navGroups.map((group) => (
          <div className="nav-group" key={group.label}>
            <div className="nav-group-label">{group.label}</div>
            {group.items.map(({ id, label, icon: Icon }) => (
              <button key={id} className={`nav-link ${activePage === id ? "active" : ""}`} onClick={() => { onNavigate(id); onClose(); }}>
                <Icon size={18} strokeWidth={1.9} /><span>{label}</span>
                {id === "alerts" && <span className="nav-count">2</span>}
              </button>
            ))}
          </div>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <div className="system-health"><span className="health-dot" /><div><strong>Demo system</strong><small>Local prototype</small></div></div>
        <div className="sidebar-version">CircuitsES EMS <span>v0.1.0</span></div>
      </div>
    </aside>
  );
}
