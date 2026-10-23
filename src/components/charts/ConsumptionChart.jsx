import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const formatNumber = (value) => new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(value);

export default function ConsumptionChart({ data, compact = false }) {
  return (
    <div className={`chart-wrap ${compact ? "chart-compact" : ""}`}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
          <defs><linearGradient id="energyFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#19a879" stopOpacity={0.2} /><stop offset="95%" stopColor="#19a879" stopOpacity={0.01} /></linearGradient></defs>
          <CartesianGrid stroke="#edf0f2" strokeDasharray="4 4" vertical={false} />
          <XAxis dataKey="time" tickLine={false} axisLine={false} tick={{ fill: "#89949d", fontSize: 11 }} dy={8} minTickGap={18} />
          <YAxis tickLine={false} axisLine={false} tick={{ fill: "#89949d", fontSize: 11 }} tickFormatter={(v) => `${v}`} />
          <Tooltip cursor={{ stroke: "#cbd5dc", strokeDasharray: "4 4" }} contentStyle={{ border: "1px solid #e7ebee", borderRadius: 10, fontSize: 12, boxShadow: "0 8px 24px rgba(20,35,45,.08)" }} formatter={(value) => [`${formatNumber(value)} kWh`, "Energy"]} />
          <Area type="monotone" dataKey="energy" stroke="#159b70" strokeWidth={2.4} fill="url(#energyFill)" activeDot={{ r: 4, strokeWidth: 0, fill: "#159b70" }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
