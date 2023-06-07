import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

export default function Routines() {
  const [routine, setRoutine] = useState([]);

  useEffect(() => {
    async function fetchRoutines() {
      const getRoutines = await fetch("/api/routines/");
      console.log("Fetching routines...", getRoutines);
    }
    fetchRoutines();
  }, []); // gave a response, need to see how to actually see the routineId in console.

  return (
    <div>
      <Navbar />
      <h1>Routines!</h1>
      {/* make a form to make a routine fetching POST api/routines/ and have name, goal, creator_id, is_public */}
      <h2>My Routines</h2>
      <h2>All Public Routines</h2>
    </div>
  );
}
