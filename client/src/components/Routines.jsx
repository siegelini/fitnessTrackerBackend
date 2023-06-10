import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { addRoutine, deleteRoutine, getRoutines } from "../api/routines";
import useAuth from "../hooks/useAuth";

export default function Routines({ setRoutine }) {
  const { user } = useAuth();
  const [routines, setRoutines] = useState([]);
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");

  useEffect(() => {
    async function fetchRoutines() {
      const result = await getRoutines();
      console.log("result from routines:", result);
      setRoutines(result);
    }
    fetchRoutines();
  }, []); // gave a response, need to see how to actually see the routineId in console.

  async function handleDelete(routineId) {
    const response = await deleteRoutine(routineId);
    console.log("response in handleDelete:", response);
    //invalid syntax error
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("name and goal:", name, goal);
    const response = await addRoutine();
    console.log("response in adding routine:", response);

    setName("");
    setGoal("");
  };

  return (
    <div>
      <h1>Routines!</h1>
      {/* make a form to make a routine fetching POST api/routines/ and have name, goal, creator_id, is_public */}
      <h2>Create A New Routine:</h2>
      <form>
        <input
          type="text"
          name="name"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="goal"
          name="goal"
          placeholder="goal"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
      </form>
      <h2>My Routines</h2>
      {routines.map((routine) => (
        <div key={routine.id} className="Routine-card">
          <h3>{routine.name}</h3>
          <p>Id:{routine.id}</p>
          <p>Goal:{routine.goal}</p>
          {/* {user.id === routine.creator_id && (
            <button onClick={() => handleDelete(routine.id)}>Delete</button>
          )} */}
        </div>
      ))}
      <h2>All Public Routines</h2>
      {routines.map((routine) => (
        <div key={routine.id}>
          <h3></h3>
        </div>
      ))}
    </div>
  );
}
