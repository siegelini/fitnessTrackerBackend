import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import "./App.css";
import Home from "./components/Home";
import Activites from "./components/Activites";
import { logout } from "./api/auth";
import Routines from "./components/Routines";
import Navbar from "./components/Navbar";
import useAuth from "./hooks/useAuth";

function App() {
  const [healthMessage, setHealthMessage] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
      <div className="app">
        <header>
          <Navbar />
        </header>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/activities" element={<Activites />} />
          <Route path="/logout" element={<Login />} />
          <Route path="/routines" element={<Routines />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
