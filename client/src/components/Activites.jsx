import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { getAllActivities, createActivity } from "../api/activities";
import { useNavigate } from "react-router-dom";

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [newActivityName, setNewActivityName] = useState("");
  const [newActivityDescription, setNewActivityDescription] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const activitiesData = await getAllActivities();
      setActivities(activitiesData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the activity already exists
    const exists = activities.some(
      (activity) => activity.name === newActivityName
    );

    if (exists) {
      setError("Activity already exists.");
      return;
    }

    try {
      await createActivity(newActivityName, newActivityDescription);
      setNewActivityName("");
      setNewActivityDescription("");
      fetchActivities();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Activities!</h1>
      <h2>Create a New Activity:</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="name"
          value={newActivityName}
          onChange={(e) => setNewActivityName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={newActivityDescription}
          onChange={(e) => setNewActivityDescription(e.target.value)}
        />
        <button>Submit</button>
      </form>

      <h2>All Activities:</h2>
      {activities.length > 0 ? (
        <div className="all-activities">
          {activities.map((activity) => (
            <div key={activity.id} className="Activity-card">
              <h3>{activity.name}</h3>
              <p>Description: {activity.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No activities found.</p>
      )}
    </div>
  );
}
