import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../api/auth";
import useAuth from "../hooks/useAuth";

export default function Navbar() {
  const navigate = useNavigate();
  const { LoggedIn, setLoggedIn } = useAuth();

  const handleLogout = async () => {
    try {
      const logoutResult = await logout();
      console.log("logout result: ", logoutResult);
      setLoggedIn(false);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="Nav">
      <ul className="Navbar-list">
        <li className="Navbar-link">
          <Link style={{ color: "red" }} to="/home">
            Home
          </Link>
        </li>
        <li className="Navbar-link">
          <Link style={{ color: "red" }} to="/routines">
            Routines
          </Link>
        </li>
        <li className="Navbar-link">
          <Link style={{ color: "red" }} to="/activities/">
            Activities
          </Link>
        </li>
        <li className="Navbar-link">
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </div>
  );
}
