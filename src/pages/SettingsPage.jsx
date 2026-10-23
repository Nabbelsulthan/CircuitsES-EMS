import { Bell, Check, Clock3, Database, Gauge, Save, ShieldCheck, SlidersHorizontal } from "lucide-react";
import PageHeader from "../components/PageHeader.jsx";

export default function SettingsPage({ settings, setSettings }) {
  const update = (key, value) => setSettings((current) => ({ ...current, [key]: value }));
  const save = () => window.alert("Preferences are applied to this browser session only. Persistence will be added later.");
  return (
    <div className="page-stack">
      <PageHeader eyebrow="CONFIGURATION" title="Settings" description="Adjust the local prototype's display preferences." actions={<button className="button button-primary" onClick={save}><Save size={15} /> Save preferences</button>} />
      <div className="settings-layout">
        <div className="settings-nav panel">
          <div className="settings-nav-item active"><SlidersHorizontal size={17} /> General</div>
          <div className="settings-nav-item"><Bell size={17} /> Notifications <span className="settings-coming">Demo</span></div>
          <div className="settings-nav-item"><ShieldCheck size={17} /> Security <span className="settings-coming">Planned</span></div>
          <div className="settings-nav-item"><Database size={17} /> Data & devices <span className="settings-coming">Planned</span></div>
        </div>
        <div className="settings-content">
          <article className="panel settings-panel">
            <div className="settings-section-heading"><span className="settings-icon"><Gauge size={18} /></span><div><h3>Display preferences</h3><p>Choose how measurements and dashboard updates appear.</p></div></div>
            <div className="setting-row"><div><strong>Energy unit</strong><span>Unit used for energy totals in the UI</span></div><select value={settings.energyUnit} onChange={(e) => update("energyUnit", e.target.value)}><option value="kWh">Kilowatt-hour (kWh)</option><option value="MWh">Megawatt-hour (MWh)</option></select></div>
            <div className="setting-row"><div><strong>Demo refresh interval</strong><span>Visual refresh preference (not connected to a server)</span></div><select value={settings.refreshInterval} onChange={(e) => update("refreshInterval", e.target.value)}><option value="10">10 seconds</option><option value="30">30 seconds</option><option value="60">60 seconds</option></select></div>
            <div className="setting-row"><div><strong>Compact dashboard</strong><span>Reduce vertical spacing between dashboard sections</span></div><button className={`toggle ${settings.compactMode ? "toggle-on" : ""}`} role="switch" aria-checked={settings.compactMode} onClick={() => update("compactMode", !settings.compactMode)}><span /></button></div>
          </article>
          <article className="panel settings-panel">
            <div className="settings-section-heading"><span className="settings-icon"><Bell size={18} /></span><div><h3>Notifications</h3><p>Notification preferences for the local prototype.</p></div></div>
            <div className="setting-row"><div><strong>In-app notification indicators</strong><span>Show the unread indicator for demo alerts</span></div><button className={`toggle ${settings.notifications ? "toggle-on" : ""}`} role="switch" aria-checked={settings.notifications} onClick={() => update("notifications", !settings.notifications)}><span /></button></div>
            <div className="settings-info"><Clock3 size={16} /><span>Push notifications, email delivery and alert thresholds will be configured after the backend is available.</span></div>
          </article>
          <article className="panel settings-panel">
            <div className="settings-section-heading"><span className="settings-icon"><Database size={18} /></span><div><h3>System information</h3><p>Current application environment.</p></div></div>
            <div className="system-info-row"><span>Application</span><strong>CircuitsES EMS</strong></div><div className="system-info-row"><span>Version</span><strong>0.1.0 · Frontend prototype</strong></div><div className="system-info-row"><span>Data source</span><strong><span className="demo-inline-dot" /> Simulated data</strong></div><div className="system-info-row"><span>Backend connection</span><strong className="text-muted">Not configured</strong></div>
          </article>
        </div>
      </div>
    </div>
  );
}
