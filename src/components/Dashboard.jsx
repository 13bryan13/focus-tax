import React, { useState, useEffect } from "react";
import BreakLogger from "./BreakLogger";
import AnalyticsChart from "./AnalyticsChart";
import { fetchBTCPrice } from "../utils/api";
import { saveData, loadData } from "../utils/storage";

export default function Dashboard({ selectedProduct, penaltyRateUSD }) {
  const [btcPrice, setBTCPrice] = useState(0);
  const [logs, setLogs] = useState(loadData("logs", []));
  const [totalPenalty, setTotalPenalty] = useState(loadData("totalPenalty", 0));

  useEffect(() => {
    fetchBTCPrice().then(setBTCPrice).catch(console.error);
  }, []);

  const logBreak = (breakData) => {
    const newLogs = [...logs, breakData];
    const newTotal = totalPenalty + breakData.penalty;
    setLogs(newLogs);
    setTotalPenalty(newTotal);
    saveData("logs", newLogs);
    saveData("totalPenalty", newTotal);
  };

  const clearLogs = () => {
    setLogs([]);
    setTotalPenalty(0);
    saveData("logs", []);
    saveData("totalPenalty", 0);
  };

  const totalMinutes = logs.reduce((sum, log) => sum + parseFloat(log.duration), 0);

  return (
    <div className="dashboard-grid">
      <BreakLogger logBreak={logBreak} penaltyRate={penaltyRateUSD} />
      <div className="card fade-in">
        <h2>Summary</h2>
        <p>Total Penalty: ${totalPenalty.toFixed(2)} (~{(totalPenalty / btcPrice || 0).toFixed(6)} BTC)</p>
        <p>Total Minutes Distracted: {totalMinutes.toFixed(1)} min</p>
        <p>Goal Product: {selectedProduct.title}</p>
        <p>Current Price: ${(selectedProduct.price + totalPenalty).toFixed(2)}</p>
        <button className="secondary-btn" onClick={clearLogs} style={{ marginTop: "10px" }}>
          Clear Breaks
        </button>
      </div>
      <AnalyticsChart logs={logs} />
    </div>
  );
}
