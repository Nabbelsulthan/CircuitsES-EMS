import { useMemo, useState } from "react";
import { Activity, ArrowRight, CalendarDays, CheckCircle2, ChevronDown, CircleAlert, Clock3, Gauge, RadioTower, TrendingUp, Zap } from "lucide-react";
import PageHeader from "../components/PageHeader.jsx";
import MetricCard from "../components/MetricCard.jsx";
import StatusBadge from "../components/StatusBadge.jsx";
import ConsumptionChart from "../components/charts/ConsumptionChart.jsx";
import DemandChart from "../components/charts/DemandChart.jsx";
import { consumptionData, demandData, mockReadings } from "../data/mockData.js";

export default function DashboardPage({ meters, alerts, onNavigate, refreshCount }) {
  const [period, setPeriod] = useState("Today");
  const onlineCount = meters.filter((meter) => meter.status === "Online").length;
  const openAlerts = alerts.filter((alert) => !alert.acknowledged);
  const simulatedEnergy = (mockReadings.totalEnergy + refreshCount * 2.3).toLocaleString("en-IN", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const activePower = (mockReadings.activePower + refreshCount * 0.7).toFixed(1);

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="PLANT 01 / MAIN FACILITY"
        title="Energy at a glance"
        description="Here's what's happening across your facility."
        actions={<button className="button button-secondary"><CalendarDays size={15} /> {period} <ChevronDown size={14} /></button>}
      />
      <div className="demo-notice"><span className="notice-icon"><Activity size={16} /></span><span><strong>Prototype data</strong> — readings and trends shown here are simulated for UI development.</span><span className="notice-label">NOT LIVE</span></div>
      <section className="metric-grid" aria-label="Energy key performance indicators">
        <MetricCard label="Energy consumed" value={simulatedEnergy} unit="kWh" change="8.2%" direction="up" icon={Zap} tone="green" note="vs. previous day" />
        <MetricCard label="Active power" value={activePower} unit="kW" change="3.4%" direction="up" icon={Activity} tone="blue" note="current demo value" />
        <MetricCard label="Peak demand" value={mockReadings.demand.toFixed(1)} unit="kW" change="2.1%" direction="down" icon={TrendingUp} tone="orange" note="today's maximum" />
        <MetricCard label="Average power factor" value={mockReadings.powerFactor.toFixed(2)} unit="PF" icon={Gauge} tone="purple" note="target ≥ 0.95" />
      </section>

      <section className="dashboard-main-grid">
        <article className="panel consumption-panel">
          <div className="panel-heading">
            <div><h3>Energy consumption</h3><p>Consumption profile throughout the day</p></div>
            <button className="text-button" onClick={() => onNavigate("reports")}>View reports <ArrowRight size={14} /></button>
          </div>
          <div className="chart-legend"><span className="legend-dot green" /> Energy <span className="legend-unit">kWh per interval</span></div>
          <div className="consumption-chart"><ConsumptionChart data={consumptionData} /></div>
          <div className="chart-summary">
            <div><span>Total recorded</span><strong>{simulatedEnergy} <small>kWh</small></strong></div>
            <div><span>Peak interval</span><strong>94 <small>kWh</small></strong></div>
            <div><span>Daily baseline</span><strong>1,185 <small>kWh</small></strong></div>
          </div>
        </article>
        <article className="panel demand-panel">
          <div className="panel-heading"><div><h3>Demand profile</h3><p>Today's hourly demand</p></div><span className="panel-icon"><TrendingUp size={17} /></span></div>
          <div className="demand-kpi"><strong>208.5</strong><span>kW peak</span><StatusBadge status="Normal">Within limit</StatusBadge></div>
          <div className="demand-chart-container"><DemandChart data={demandData} /></div>
          <div className="panel-footnote"><span className="legend-dot green" /> Maximum demand <span className="footnote-muted">· Demo threshold: 250 kW</span></div>
        </article>
      </section>

      <section className="dashboard-bottom-grid">
        <article className="panel">
          <div className="panel-heading"><div><h3>Meter health</h3><p>Connectivity across monitored assets</p></div><button className="text-button" onClick={() => onNavigate("meters")}>All meters <ArrowRight size={14} /></button></div>
          <div className="meter-health-summary">
            <div className="health-ring" style={{ "--ring-value": `${(onlineCount / Math.max(meters.length, 1)) * 100}%` }}><div><strong>{onlineCount}/{meters.length}</strong><span>online</span></div></div>
            <div className="health-stats"><div><span className="health-dot green-dot" />Online <strong>{onlineCount}</strong></div><div><span className="health-dot red-dot" />Offline <strong>{meters.length - onlineCount}</strong></div><div><span className="health-dot gray-dot" />Total meters <strong>{meters.length}</strong></div></div>
          </div>
          <div className="mini-meter-list">
            {meters.slice(0, 3).map((meter) => <div className="mini-meter-row" key={meter.id}><span className={`meter-mini-icon ${meter.status === "Online" ? "" : "offline"}`}><RadioTower size={15} /></span><span className="mini-meter-name">{meter.name}<small>{meter.id}</small></span><StatusBadge status={meter.status} /></div>)}
          </div>
        </article>
        <article className="panel alerts-panel">
          <div className="panel-heading"><div><h3>Recent alerts</h3><p>Latest events requiring attention</p></div><button className="text-button" onClick={() => onNavigate("alerts")}>View all <ArrowRight size={14} /></button></div>
          {openAlerts.length === 0 ? <div className="empty-state"><CheckCircle2 size={22} /><strong>All caught up</strong><span>No unacknowledged demo alerts.</span></div> :
            <div className="recent-alert-list">{openAlerts.slice(0, 3).map((alert) => <div className="recent-alert" key={alert.id}><span className={`alert-severity-icon severity-${alert.severity.toLowerCase()}`}><CircleAlert size={16} /></span><div className="recent-alert-copy"><strong>{alert.title}</strong><span>{alert.source}</span></div><span className="alert-time"><Clock3 size={12} />{alert.time}</span></div>)}</div>}
          <button className="button button-outline full-width" onClick={() => onNavigate("alerts")}>Open alert centre <ArrowRight size={14} /></button>
        </article>
      </section>
    </div>
  );
}
