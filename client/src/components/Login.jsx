import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Login() {
  const { setLoggedIn } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  //store creator_id in state?

  async function handleSubmit(e) {
    e.preventDefault();
    if (!username || !password) {
      console.log("Please enter username and password");
      return;
    }
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Login is successful, navigate to the Home page
        console.log("response in login:", response);
        setLoggedIn(true);
        navigate("/home");
      } else {
        // Login failed, display an error message to the user
        console.log("Invalid username or password");
      }
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
