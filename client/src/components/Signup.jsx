import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("username and password:", newUsername, newPassword);

    try {
      // Make a POST request to server endpoint for creating a new user
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: newUsername, password: newPassword }),
      });
      const result = await response.json();
      console.log("Result???", result);
      navigate("/home");
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="user-content">
      <h1 className="title">Welcome to Fitness Tracker!</h1>
      <h2>Sign up to be part of something awesome!</h2>
      <form className="user-form" onSubmit={handleSubmit}>
        <label>Username:</label>
        <input
          type="text"
          name="newUsername"
          placeholder="Enter new username"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
        />
        <label>Password:</label>
        <input
          type="password"
          name="newPassword"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
        <br></br>
        <Link to="/login">Already have an account? Login</Link>
      </form>
    </div>
  );
}