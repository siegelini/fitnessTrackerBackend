import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { getRoutines } from "../api/routines";

export default function Routines() {
  const [routine, setRoutine] = useState([]);

  useEffect(() => {
    async function fetchRoutines() {
      const getAPIRoutines = await getRoutines();
      console.log("Fetching routines...", getAPIRoutines);
    }
    fetchRoutines();
  }, []); // gave a response, need to see how to actually see the routineId in console.

  return (
    <div>
      <Navbar />
      <h1>Routines!</h1>
      {/* make a form to make a routine fetching POST api/routines/ and have name, goal, creator_id, is_public */}
      <h2>My Routines</h2>
      {/* {routines.map((routine) => (
        <li>{routine.id}</li>
      ))} */}
      <h2>All Public Routines</h2>
    </div>
  );
}
