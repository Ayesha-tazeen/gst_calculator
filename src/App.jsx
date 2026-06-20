import { useState } from "react";
import "./App.css";

function App() {
  const [amount, setAmount] = useState("");
  const [gst, setGst] = useState("");
  const [mode, setMode] = useState("exclusive");
  const [result, setResult] = useState(null);

  const calculateGST = () => {
    const amt = parseFloat(amount);
    const gstRate = parseFloat(gst);

    // Validation
    if (amount === "" || gst === "") {
      alert("Please enter all fields");
      return;
    }

    if (amt <= 0) {
      alert("Amount must be greater than 0");
      return;
    }

    if (gstRate <= 0 || gstRate > 100) {
      alert("GST rate must be between 1 and 100");
      return;
    }

    let gstAmount, totalAmount, baseAmount;

    if (mode === "exclusive") {
      gstAmount = (amt * gstRate) / 100;
      totalAmount = amt + gstAmount;
      baseAmount = amt;
    } else {
      baseAmount = amt / (1 + gstRate / 100);
      gstAmount = amt - baseAmount;
      totalAmount = amt;
    }

    setResult({
      baseAmount: baseAmount.toFixed(2),
      gstAmount: gstAmount.toFixed(2),
      totalAmount: totalAmount.toFixed(2),
    });
  };

  const resetCalculator = () => {
    setAmount("");
    setGst("");
    setResult(null);
    setMode("exclusive");
  };

  return (
    <div className="app">
      <div className="card">
        <h1>Digital GST Calculator</h1>
        <p className="subtitle">
          Calculate GST instantly with inclusive & exclusive modes
        </p>

        <div className="input-group">
          <label>Amount (₹)</label>
          <input
            type="number"
            min="0.01"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>GST Rate (%)</label>
          <input
            type="number"
            min="1"
            max="100"
            placeholder="Enter GST percentage"
            value={gst}
            onChange={(e) => {
              const value = e.target.value;

              if (value === "" || Number(value) <= 100) {
                setGst(value);
              }
            }}
          />
        </div>

        <div className="mode-box">
          <button
            className={mode === "exclusive" ? "active" : ""}
            onClick={() => setMode("exclusive")}
          >
            GST Exclusive
          </button>

          <button
            className={mode === "inclusive" ? "active" : ""}
            onClick={() => setMode("inclusive")}
          >
            GST Inclusive
          </button>
        </div>

        <div className="btns">
          <button className="calculate-btn" onClick={calculateGST}>
            Calculate
          </button>

          <button className="reset-btn" onClick={resetCalculator}>
            Refresh
          </button>
        </div>

        {result && (
          <div className="result">
            <div className="result-card">
              <span>Base Amount</span>
              <strong>₹ {result.baseAmount}</strong>
            </div>

            <div className="result-card">
              <span>GST Amount</span>
              <strong>₹ {result.gstAmount}</strong>
            </div>

            <div className="result-card">
              <span>Total Amount</span>
              <strong>₹ {result.totalAmount}</strong>
            </div>
          </div>
        )}

        <div className="footer">
          <h3>Ayesha Tazeen</h3>
          <p>ayesha.khann9864@gmail.com</p>

          <a
            href="https://digitalheroesco.com"
            target="_blank"
            rel="noreferrer"
            className="digital-btn"
          >
            Built for Digital Heroes
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;