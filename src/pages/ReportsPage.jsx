import { useMemo, useState } from "react";
import { CalendarDays, Download, FileSpreadsheet, TrendingUp, Zap } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import PageHeader from "../components/PageHeader.jsx";
import MetricCard from "../components/MetricCard.jsx";

function downloadCsv(rows) {
  const header = ["Date", "Energy (kWh)", "Peak demand (kW)", "Average power factor", "Estimated cost (INR)"];
  const body = rows.map((row) => [row.date, row.energy, row.peak, row.avgPf, row.cost]);
  const csv = [header, ...body].map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(",")).join("\r\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "ems-demo-energy-report.csv";
  anchor.click();
  URL.revokeObjectURL(url);
}

export default function ReportsPage({ reportRows }) {
  const [period, setPeriod] = useState("Last 7 days");
  const rows = useMemo(() => period === "Last 7 days" ? reportRows : period === "Last 3 days" ? reportRows.slice(-3) : reportRows.slice(-1), [period, reportRows]);
  const totalEnergy = rows.reduce((sum, row) => sum + row.energy, 0);
  const avgPeak = rows.reduce((sum, row) => sum + row.peak, 0) / rows.length;
  const estimatedCost = rows.reduce((sum, row) => sum + row.cost, 0);

  return (
    <div className="page-stack">
      <PageHeader eyebrow="ANALYTICS & EXPORTS" title="Energy reports" description="Review historical energy performance and export sample records." actions={<button className="button button-primary" onClick={() => downloadCsv(rows)}><Download size={15} /> Export CSV</button>} />
      <div className="report-toolbar panel">
        <div><CalendarDays size={17} /><span>Reporting period</span></div>
        <select value={period} onChange={(e) => setPeriod(e.target.value)}><option>Last 7 days</option><option>Last 3 days</option><option>Today</option></select>
        <span className="report-demo-label">Sample data · estimated cost only</span>
      </div>
      <section className="metric-grid">
        <MetricCard label="Total energy" value={totalEnergy.toLocaleString("en-IN", { maximumFractionDigits: 1 })} unit="kWh" icon={Zap} tone="green" note={`${rows.length} reporting day(s)`} />
        <MetricCard label="Average peak demand" value={avgPeak.toFixed(1)} unit="kW" icon={TrendingUp} tone="blue" note="Average daily peak" />
        <MetricCard label="Estimated energy cost" value={`₹${Math.round(estimatedCost).toLocaleString("en-IN")}`} unit="" icon={FileSpreadsheet} tone="orange" note="Demo tariff: ₹8/kWh" />
      </section>
      <article className="panel">
        <div className="panel-heading"><div><h3>Daily energy consumption</h3><p>Recorded energy per day in the selected period</p></div><span className="chart-unit-pill">kWh</span></div>
        <div className="report-chart"><ResponsiveContainer width="100%" height="100%"><BarChart data={rows} margin={{ top: 8, right: 10, left: -14, bottom: 0 }}><CartesianGrid stroke="#edf0f2" strokeDasharray="4 4" vertical={false} /><XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: "#89949d", fontSize: 12 }} dy={8} /><YAxis tickLine={false} axisLine={false} tick={{ fill: "#89949d", fontSize: 11 }} /><Tooltip contentStyle={{ border: "1px solid #e7ebee", borderRadius: 10, fontSize: 12 }} formatter={(value) => [`${value} kWh`, "Energy"]} /><Bar dataKey="energy" fill="#1aa779" radius={[5, 5, 0, 0]} maxBarSize={46} /></BarChart></ResponsiveContainer></div>
      </article>
      <article className="panel table-panel">
        <div className="table-toolbar"><div><h3>Daily breakdown</h3><p>Export includes the rows shown here</p></div><button className="button button-secondary button-small" onClick={() => downloadCsv(rows)}><Download size={14} /> Download CSV</button></div>
        <div className="table-scroll"><table><thead><tr><th>Date</th><th>Energy consumed</th><th>Peak demand</th><th>Average PF</th><th>Estimated cost</th></tr></thead><tbody>{rows.map((row) => <tr key={row.date}><td><strong>{row.date}</strong></td><td>{row.energy.toLocaleString("en-IN")} kWh</td><td>{row.peak.toFixed(1)} kW</td><td>{row.avgPf.toFixed(2)}</td><td>₹{row.cost.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</td></tr>)}</tbody></table></div>
        <div className="table-footer"><span>{rows.length} day(s) included</span><span>Sample figures are not billing data</span></div>
      </article>
    </div>
  );
}
