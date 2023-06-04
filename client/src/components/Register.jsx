import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // {setToken, user} = useAuth() hooks
  // we chould change this page to be called the login page

  async function handleSubmit(e) {
    console.log("Username and Password", username, password);
    e.preventDefault();
    try {
      //const result = await login(username, password);
      //console.log("result in component", result)
      /*if (result.success === true) {
        setToken(result.data.token)
        localStorage.setItem("token", result.data.token)
        navigate("/home")
      } else {
        alert("login failed")
      }
      */
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="user-content">
      <h1 className="title">Welcome to Fitness Tracker!</h1>
      <h2>Login</h2>
      <form>
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
