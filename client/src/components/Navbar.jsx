import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../api/auth";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const logoutResult = await logout();
      console.log("logout result: ", logoutResult);
      setIsLoggedIn(false);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <ul className="Navbar-list">
        <li className="Navbar-link">
          <Link to="/routines">Routines</Link>
        </li>
        <li className="Navbar-link">
          <Link to="/activities/">Activities</Link>
        </li>
        <li className="Navbar-link">
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </div>
  );
}
