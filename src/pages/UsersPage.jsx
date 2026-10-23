import { useState } from "react";
import { Mail, MoreHorizontal, Plus, Search, ShieldCheck, UserRound, UsersRound } from "lucide-react";
import PageHeader from "../components/PageHeader.jsx";
import StatusBadge from "../components/StatusBadge.jsx";

export default function UsersPage({ users }) {
  const [query, setQuery] = useState("");
  const filtered = users.filter((user) => `${user.name} ${user.email} ${user.role}`.toLowerCase().includes(query.toLowerCase()));
  return (
    <div className="page-stack">
      <PageHeader eyebrow="ACCESS CONTROL" title="Users & access" description="Example account directory and role assignments for the UI prototype." actions={<button className="button button-primary" onClick={() => window.alert("Inviting users will be implemented with the backend and authentication.")}><Plus size={16} /> Invite user</button>} />
      <div className="demo-notice"><span className="notice-icon"><ShieldCheck size={16} /></span><span><strong>Display-only prototype</strong> — no real accounts, invitations, sessions or permissions are configured.</span></div>
      <div className="metric-grid compact-metric-grid">
        <div className="mini-stat-card"><span>Total users</span><strong>{users.length}</strong><small>Sample directory</small></div>
        <div className="mini-stat-card"><span>Active</span><strong className="text-green">{users.filter(u => u.status === "Active").length}</strong><small>Demo status</small></div>
        <div className="mini-stat-card"><span>Administrators</span><strong>{users.filter(u => u.role === "Administrator").length}</strong><small>Example roles</small></div>
        <div className="mini-stat-card"><span>Access model</span><strong>RBAC</strong><small>Planned for backend</small></div>
      </div>
      <article className="panel table-panel">
        <div className="table-toolbar"><div><h3>Team members</h3><p>Manage who can view energy data and configure the system</p></div><label className="search-field"><Search size={16} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search users..." /></label></div>
        <div className="table-scroll"><table><thead><tr><th>User</th><th>Role</th><th>Status</th><th>Last active</th><th>Actions</th></tr></thead><tbody>{filtered.map((user) => <tr key={user.id}><td><div className="user-cell"><span className="user-avatar">{user.initials}</span><span><strong>{user.name}</strong><small><Mail size={12} />{user.email}</small></span></div></td><td><span className="role-pill"><ShieldCheck size={13} />{user.role}</span></td><td><StatusBadge status={user.status} /></td><td>{user.lastActive}</td><td><button className="icon-button table-more" aria-label={`Actions for ${user.name}`} onClick={() => window.alert("User actions require a real user-management backend.")}><MoreHorizontal size={18} /></button></td></tr>)}</tbody></table></div>
        {filtered.length === 0 && <div className="empty-state"><UsersRound size={22} /><strong>No users found</strong><span>Try another search term.</span></div>}
        <div className="table-footer"><span>{filtered.length} user record(s)</span><span>Example data only</span></div>
      </article>
    </div>
  );
}
