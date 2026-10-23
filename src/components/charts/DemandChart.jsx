import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function DemandChart({ data }) {
  return (
    <div className="chart-wrap demand-chart">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 2, left: -20, bottom: 0 }}>
          <CartesianGrid stroke="#edf0f2" strokeDasharray="4 4" vertical={false} />
          <XAxis dataKey="time" tickLine={false} axisLine={false} tick={{ fill: "#89949d", fontSize: 10 }} interval={2} dy={7} />
          <YAxis tickLine={false} axisLine={false} tick={{ fill: "#89949d", fontSize: 10 }} />
          <Tooltip cursor={{ fill: "#f1f7f4" }} contentStyle={{ border: "1px solid #e7ebee", borderRadius: 10, fontSize: 12 }} formatter={(value) => [`${value} kW`, "Demand"]} />
          <Bar dataKey="demand" fill="#7ccdb0" radius={[4, 4, 0, 0]} maxBarSize={22} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
