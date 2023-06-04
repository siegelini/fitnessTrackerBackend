import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import SignUp from "./components/Signup";
import "./App.css";

function App() {
  const [healthMessage, setHealthMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function checkAPIHealth() {
      try {
        const response = await fetch("/api/health");
        console.log("response:", response);
        const result = await response.json();
        setHealthMessage(result.message);
      } catch (error) {
        setError(error);
      }
    }
    checkAPIHealth();
  }, []);

  return (
    <div>
      <p>
        {error && <p>{JSON.stringify(error, null, 2)}</p>}
        {healthMessage && <p>{healthMessage}</p>}
      </p>
      <div className="app">
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Register />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
