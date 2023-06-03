import { useState, useEffect } from "react";
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
    <>
      {error && <p>{JSON.stringify(error, null, 2)}</p>}
      {healthMessage && <p>{healthMessage}</p>}
    </>
  );
}

export default App;
