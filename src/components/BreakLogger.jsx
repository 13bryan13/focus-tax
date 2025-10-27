import React, { useState } from "react";

export default function BreakLogger({ logBreak, penaltyRate }) {
  const [duration, setDuration] = useState(1); // default 1 minute

  const handleBreak = () => {
    const penalty = parseFloat(duration) * parseFloat(penaltyRate || 0);
    logBreak({ id: Date.now(), duration: parseFloat(duration), penalty });
    setDuration(1); // reset input after logging
  };

  return (
    <div className="card fade-in">
      <h2>Log a distraction</h2>
      <label>
        Duration (minutes):
        <input
          type="number"
          value={duration}
          min={0.1}
          step={0.1}
          onChange={(e) => setDuration(e.target.value)}
          style={{ marginLeft: "8px", width: "60px" }}
        />
      </label>
      <button className="primary-btn" onClick={handleBreak}>
        I got distracted!
      </button>
    </div>
  );
}
