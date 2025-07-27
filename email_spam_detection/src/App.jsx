import { useState } from "react";
import axios from "axios";

function App() {
  const [emailText, setEmailText] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:5000/predict", { text: emailText });
      setResult(response.data.prediction);
    } catch (error) {
      console.error("Error:", error);
      setResult("Error in prediction");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      width: "100vw",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #d3cce3, #e9e4f0)",
      fontFamily: "Segoe UI, sans-serif",
      padding: "20px",
    }}>
      <div style={{
        background: "rgba(255, 255, 255, 0.25)",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        borderRadius: "20px",
        padding: "40px",
        width: "100%",
        maxWidth: "700px",
        border: "1px solid rgba(255, 255, 255, 0.18)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
        <h2 style={{
          color: "#333",
          fontSize: "28px",
          marginBottom: "30px",
          textShadow: "1px 1px 4px rgba(0,0,0,0.2)"
        }}>
          ✉ Email Spam Detector
        </h2>

        <textarea
          rows="7"
          value={emailText}
          onChange={(e) => setEmailText(e.target.value)}
          placeholder="Paste your email content here..."
          style={{
            width: "100%",
            padding: "20px",
            borderRadius: "15px",
            background: "rgba(255, 255, 255, 0.7)",
            border: "1px solid rgba(0, 0, 0, 0.1)",
            fontSize: "16px",
            color: "#333",
            outline: "none",
            resize: "none",
            boxShadow: "inset 2px 2px 5px rgba(0,0,0,0.1)",
            marginBottom: "20px",
            transition: "all 0.3s ease"
          }}
        />

        <button
          onClick={handleSubmit}
          style={{
            padding: "12px 30px",
            fontSize: "16px",
            fontWeight: "bold",
            color: "#fff",
            background: "linear-gradient(135deg, #667eea, #764ba2)",
            border: "none",
            borderRadius: "30px",
            cursor: "pointer",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
            marginBottom: "20px"
          }}
          onMouseOver={(e) => {
            e.target.style.transform = "scale(1.05)";
            e.target.style.boxShadow = "0 6px 20px rgba(0,0,0,0.3)";
          }}
          onMouseOut={(e) => {
            e.target.style.transform = "scale(1)";
            e.target.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
          }}
        >
          🔍 Detect Spam
        </button>

        <div style={{
          fontSize: "20px",
          fontWeight: "600",
          color: result === "spam" ? "#d9534f" : result === "ham" ? "#5cb85c" : "#333",
          textShadow: "1px 1px 3px rgba(0,0,0,0.1)",
        }}>
          {result && <>Result: {result.toUpperCase()}</>}
        </div>
      </div>
    </div>
  );
}

export default App;
