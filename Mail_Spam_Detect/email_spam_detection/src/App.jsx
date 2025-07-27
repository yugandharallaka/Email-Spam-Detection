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
      boxSizing: "border-box",
      padding: "0",
      margin: "0",
      width: "100vw",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "#E0E5EC",
      fontFamily: "Arial, sans-serif",
    }}>
      <h2 style={{ 
        color: "#333", 
        textShadow: "2px 2px 4px rgba(0,0,0,0.1)" 
      }}>✉ Email Spam Detector</h2>

      <textarea
        rows="5"
        value={emailText}
        onChange={(e) => setEmailText(e.target.value)}
        placeholder="Enter email text..."
        style={{
          width: "90%",
          maxWidth: "600px",
          height: "120px",
          padding: "15px",
          borderRadius: "15px",
          background: "#E0E5EC",
          boxShadow: "5px 5px 10px #b3b3b3, -5px -5px 10px #ffffff",
          fontSize: "16px",
          color: "#333",
          border: "none",
          outline: "none",
          resize: "none",
          transition: "0.3s",
        }}
      />

      <button 
        onClick={handleSubmit}
        style={{
          marginTop: "20px",
          padding: "12px 25px",
          fontSize: "18px",
          color: "#333",
          background: "#E0E5EC",
          border: "none",
          borderRadius: "15px",
          cursor: "pointer",
          transition: "0.3s ease-in-out",
          boxShadow: "5px 5px 10px #b3b3b3, -5px -5px 10px #ffffff",
        }}
        onMouseOver={(e) => e.target.style.boxShadow = "inset 5px 5px 10px #b3b3b3, inset -5px -5px 10px #ffffff"}
        onMouseOut={(e) => e.target.style.boxShadow = "5px 5px 10px #b3b3b3, -5px -5px 10px #ffffff"}
      >
        🔍 Detect Spam
      </button>

      <h3 style={{
        marginTop: "20px",
        fontSize: "20px",
        fontWeight: "bold",
        color: "#333",
        textShadow: "1px 1px 3px rgba(0,0,0,0.1)",
      }}>
        Result: {result}
      </h3>
    </div>
  );
}

export default App;