import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
// import { getAllActivities } from "../../../db/adapters/activities";

export default function Activites() {
  const [activity, setActivity] = useState([]);

  useEffect(() => {
    async function fetchActivities() {
      const getActivities = await getAllActivities(); //fetch to /api/activities/
      //make a file in api
      console.log(getActivities);
    }
    fetchActivities();
  }, []);

  return (
    <div>
      <Navbar />
      <h1>Activities</h1>
      <form>
        <h2>Create A New Activity:</h2>
        <input type="name" name="name" placeholder="name" />
        <input
          type="description"
          name="description"
          placeholder="description"
        />
        <button>Submit</button>
      </form>
      <h2>Your Activites:</h2>
    </div>
  );
}
