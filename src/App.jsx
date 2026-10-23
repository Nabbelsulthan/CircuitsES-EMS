import { useMemo, useState } from "react";
import { Activity, Bell, Check, ChevronDown, CircleHelp, Menu, RefreshCw, Search, Settings2, Zap } from "lucide-react";
import AppShell from "./components/AppShell.jsx";
import Header from "./components/Header.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import MetersPage from "./pages/MetersPage.jsx";
import AlertsPage from "./pages/AlertsPage.jsx";
import ReportsPage from "./pages/ReportsPage.jsx";
import UsersPage from "./pages/UsersPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import { initialAlerts, initialMeters, mockReadings, reportRows, users as initialUsers } from "./data/mockData.js";

const pageTitles = {
  overview: ["Energy overview", "Monitor plant-wide energy performance at a glance."],
  meters: ["Meters", "Review connected meters and their latest readings."],
  alerts: ["Alerts & events", "Review exceptions and acknowledge simulated events."],
  reports: ["Energy reports", "Explore consumption summaries and export demo data."],
  users: ["Users & access", "View example users and their assigned access roles."],
  settings: ["Settings", "Configure local prototype preferences."],
};

export default function App() {
  const [activePage, setActivePage] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [alerts, setAlerts] = useState(initialAlerts);
  const [meters, setMeters] = useState(initialMeters);
  const [refreshCount, setRefreshCount] = useState(0);
  const [settings, setSettings] = useState({ energyUnit: "kWh", refreshInterval: "30", notifications: true, compactMode: false });
  const [toast, setToast] = useState("");

  const title = pageTitles[activePage] ?? pageTitles.overview;
  const unreadAlerts = alerts.filter((alert) => !alert.acknowledged).length;

  const handleRefresh = () => {
    setRefreshCount((count) => count + 1);
    setMeters((current) => current.map((meter, index) => ({
      ...meter,
      power: meter.status === "Offline" ? null : Math.max(2, meter.power + ((index + refreshCount) % 2 === 0 ? 1.7 : -1.1)),
    })));
    setToast("Demo readings refreshed");
    window.setTimeout(() => setToast(""), 2400);
  };

  const acknowledgeAlert = (id) => {
    setAlerts((current) => current.map((alert) => alert.id === id ? { ...alert, acknowledged: true } : alert));
  };

  const renderPage = () => {
    const common = { meters, alerts, users: initialUsers, settings, setSettings, onNavigate: setActivePage, onAcknowledge: acknowledgeAlert };
    switch (activePage) {
      case "meters": return <MetersPage {...common} />;
      case "alerts": return <AlertsPage {...common} />;
      case "reports": return <ReportsPage reportRows={reportRows} meters={meters} />;
      case "users": return <UsersPage users={initialUsers} />;
      case "settings": return <SettingsPage settings={settings} setSettings={setSettings} />;
      default: return <DashboardPage {...common} refreshCount={refreshCount} />;
    }
  };

  return (
    <AppShell activePage={activePage} onNavigate={setActivePage} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
      <Header
        title={title[0]}
        subtitle={title[1]}
        unreadAlerts={unreadAlerts}
        onOpenAlerts={() => setActivePage("alerts")}
        onOpenMenu={() => setSidebarOpen(true)}
        onRefresh={handleRefresh}
        activePage={activePage}
      />
      <main className={`page-content ${settings.compactMode ? "compact-mode" : ""}`}>
        {renderPage()}
        <footer className="app-footer">
          <span><span className="demo-dot" /> Demo environment · simulated data only</span>
          <span>CircuitsES EMS <span className="footer-divider">/</span> Prototype v0.1</span>
        </footer>
      </main>
      {toast && <div className="toast"><Check size={16} />{toast}</div>}
    </AppShell>
  );
}
