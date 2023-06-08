import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { getRoutines } from "../api/routines";

export default function Routines() {
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    async function fetchRoutines() {
      const result = await getRoutines();
      console.log("result from routines:", result);
      setRoutines(result);
    }
    fetchRoutines();
  }, []); // gave a response, need to see how to actually see the routineId in console.

  return (
    <div>
      <h1>Routines!</h1>
      {/* make a form to make a routine fetching POST api/routines/ and have name, goal, creator_id, is_public */}
      <h2>My Routines</h2>
      {routines.map((routine) => (
        <div key={routine.id} className="Routine-card">
          <h3>{routine.name}</h3>
          <p>Id:{routine.id}</p>
          <p>Goal:{routine.goal}</p>
          <button>Delete</button>
        </div>
      ))}
      <h2>All Public Routines</h2>
    </div>
  );
}
