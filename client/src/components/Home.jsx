import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function Home() {
  const [user, setUser] = useState(null);
  const [routines, setRoutines] = useState([]);
  const navigate = useNavigate();

  // This logic can live in your context
  // useEffect(() => {
  //   async function fetchUser() {
  //     try {
  //       const response = await fetch("/api/users/me", {
  //         method: "GET",
  //         headers: {
  //           "Content-type": "application/json",
  //         },
  //       });
  //       const result = await response.json();
  //       if (response.ok) {
  //         setUser(result);
  //       } else {
  //         navigate("/login");
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }

  //   fetchUser();
  // }, []);

  useEffect(() => {
    async function fetchRoutines() {
      try {
        const response = await fetch(`/api/routines`);
        const result = await response.json();
        if (response.ok) {
          setRoutines(result);
        } else {
          // Handle error still or do I even need an if/else?
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchRoutines();
  }, []);

  return (
    <div className="user-content">
      <Navbar />
      <h1 className="title">Welcome to Fitness Tracker!</h1>
      {user && <h2>Hello, {user.username}!</h2>}
      {routines.length > 0 ? (
        <div>
          <h3>Your Routines:</h3>
          <ul>
            {routines.map((routine) => (
              <li key={routine.id}>{routine.name}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No routines found.</p>
      )}
      <button
        onClick={() => {
          navigate("/login");
        }}
      >
        Logout
      </button>
    </div>
  );
}
