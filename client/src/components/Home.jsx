import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function Home() {
  const [user, setUser] = useState(null);
  const [routines, setRoutines] = useState([]);
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();

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
  //
  useEffect(() => {
    async function fetchRoutines() {
      try {
        const response = await fetch(`/api/routines`);
        const result = await response.json();
        if (response.ok) {
          setRoutines(result);
        } else {
        }
      } catch (error) {
        console.error(error);
      }
    }

    async function fetchActivities() {
      try {
        const response = await fetch("/api/activities");
        const result = await response.json();
        setActivities(result);
        console.log("result in activitis:", result);
      } catch (error) {
        console.error(error);
      }
    }
    fetchActivities();
    fetchRoutines();
  }, []);

  //
  return (
    <div className="user-content">
      <h1 className="title">Welcome to Fitness Tracker!</h1>
      {user && <h2>Hello, {user.username}!</h2>}
      <div className="routine-activity-section">
        {routines.length > 0 ? (
          <div className="routines-section">
            <h3>Your Routines:</h3>
            <ul className="list">
              {routines.map((routine) => (
                <li key={routine.id} className="RA-li">
                  {routine.name}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No routines found.</p>
        )}
        <div className="activities-section">
          <h3>Your Activities:</h3>
          <ul className="list">
            {activities.map((activity) => (
              <li key={activity.id} className="RA-li">
                {activity.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
