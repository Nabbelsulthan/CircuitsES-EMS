import Sidebar from "./Sidebar.jsx";

export default function AppShell({ children, activePage, onNavigate, sidebarOpen, setSidebarOpen }) {
  return (
    <div className="app-shell">
      <Sidebar activePage={activePage} onNavigate={onNavigate} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      {sidebarOpen && <button className="sidebar-backdrop" aria-label="Close navigation" onClick={() => setSidebarOpen(false)} />}
      <div className="main-shell">{children}</div>
    </div>
  );
}
