import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function AnalyticsChart({ logs }) {
  const data = logs.map((log) => ({
    time: new Date(log.id).toLocaleTimeString(),
    penalty: log.penalty,
    duration: log.duration,
  }));

  return (
    <div className="card fade-in">
      <h2>Distraction History</h2>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip
            formatter={(value, name, props) => {
              const log = props.payload;
              return [`$${log.penalty.toFixed(2)}`, `${log.duration} min`];
            }}
          />
          <Bar dataKey="penalty" fill="#38bdf8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
