import { Bell, ChevronDown, Menu, RefreshCw, Search } from "lucide-react";

export default function Header({ title, subtitle, unreadAlerts, onOpenAlerts, onOpenMenu, onRefresh, activePage }) {
  return (
    <header className="topbar">
      <div className="topbar-title">
        <button className="icon-button mobile-menu" onClick={onOpenMenu} aria-label="Open navigation"><Menu size={20} /></button>
        <div><h1>{title}</h1><p>{subtitle}</p></div>
      </div>
      <div className="topbar-actions">
        <div className="environment-pill"><span /> DEMO ENVIRONMENT</div>
        <button className="icon-button header-search" aria-label="Search (visual placeholder)" title="Search is a UI placeholder"><Search size={18} /></button>
        <button className="icon-button notification-button" aria-label={`${unreadAlerts} unacknowledged alerts`} onClick={onOpenAlerts}>
          <Bell size={19} />{unreadAlerts > 0 && <span className="notification-dot" />}
        </button>
        <div className="topbar-divider" />
        <button className="profile-button" title="Demo profile">
          <span className="profile-avatar">AK</span><span className="profile-copy"><strong>Admin User</strong><small>Administrator</small></span><ChevronDown size={15} />
        </button>
        {activePage !== "settings" && <button className="button button-secondary refresh-button" onClick={onRefresh}><RefreshCw size={15} /> Refresh</button>}
      </div>
    </header>
  );
}
