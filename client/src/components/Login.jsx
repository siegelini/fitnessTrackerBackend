import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const Navigate = useNavigate();

  // {setToken, user} = useAuth() hooks

  async function handleSubmit(e) {
    console.log("Username and Password", username, password);
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const result = await response.json();
      console.log("Result for login:", result);
      Navigate("/home");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="user-content">
      <h1 className="title">Welcome to Fitness Tracker!</h1>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="username"
          name="username"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Submit</button>
        <Link to="/signup">Don't have an account? Sign Up</Link>
      </form>
    </div>
  );
}
