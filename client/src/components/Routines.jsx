import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import {
  addRoutine,
  deleteRoutine,
  editRoutine,
  getRoutines,
} from "../api/routines";
import useAuth from "../hooks/useAuth";

export default function Routines({ setRoutine }) {
  const [routines, setRoutines] = useState([]);
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");

  useEffect(() => {
    // console.log("user.id:", user); <--- undefined
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
    const responseRoutine = await getRoutines();
    console.log("result from deleting post:", responseRoutine);
    setRoutines([...responseRoutine]);
  }

  async function handleEdit(routineId) {
    const response = await editRoutine(routineId);
    console.log("response in handleEdit:", response);
    // can not edit routine, I get an error
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("name and goal:", name, goal);
    const response = await addRoutine(name, goal);
    console.log("response in adding routine:", response);
    setRoutines([...routines, response]); //...routines copy the old routines

    setName("");
    setGoal("");
  };

  return (
    <div className="routines-content">
      <h1>Routines!</h1>
      {/* make a form to make a routine fetching POST api/routines/ and have name, goal, creator_id, is_public */}
      <h2>Create A New Routine:</h2>
      <form onSubmit={handleSubmit}>
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
        <button>Submit</button>
      </form>
      <h2>My Routines</h2>
      <div className="all-routine-cards">
        {routines.map((routine) => (
          <div key={routine.id} className="routine-card">
            <h3>{routine.name}</h3>
            <h5>Goal:</h5>
            <p>{routine.goal}</p>
            <button onClick={() => handleDelete(routine.id)}>Delete</button>
            <button onClick={() => handleEdit(routine.id)}>Edit</button>
            {/* {user.id === routine.creator_id && (
            <button onClick={() => handleDelete(routine.id)}>Delete</button>
          )} <--- allows user to delete a post(this did not work)*/}
          </div>
        ))}
      </div>
      <h2>All Public Routines:</h2>
      {routines.map((routine) => (
        <div key={routine.id}>
          <h3></h3>
        </div>
      ))}
    </div>
  );
}
