import React, { useState } from "react";
import "./App.css";
import ProductSelector from "./components/ProductSelector";
import Dashboard from "./components/Dashboard";
import { saveData, loadData } from "./utils/storage";

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [penaltyRateUSD, setPenaltyRateUSD] = useState(1);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    // Reset logs and totalPenalty when switching product
    saveData("logs", []);
    saveData("totalPenalty", 0);
  };

  if (!selectedProduct) {
    return (
      <div className="app-container">
        <h1>FocusPrice — punish distractions with dollars & BTC</h1>
        <label>
          Penalty per distraction ($):
          <input
            type="number"
            value={penaltyRateUSD}
            onChange={(e) => setPenaltyRateUSD(parseFloat(e.target.value))}
          />
        </label>
        <p>Select a product to track your progress:</p>
        <ProductSelector onSelect={handleProductSelect} />
      </div>
    );
  }

  return (
    <div className="app-container">
      <Dashboard selectedProduct={selectedProduct} penaltyRateUSD={penaltyRateUSD} />
      <button
        className="secondary-btn"
        style={{ marginTop: "20px" }}
        onClick={() => {
          setSelectedProduct(null);
          saveData("logs", []);
          saveData("totalPenalty", 0);
        }}
      >
        Switch Product / Start Over
      </button>
    </div>
  );
}

export default App;
