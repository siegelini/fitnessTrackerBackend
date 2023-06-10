import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { getAllActivities, createActivity } from "../api/activities";
import { useNavigate } from "react-router-dom";

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [newActivityName, setNewActivityName] = useState("");
  const [newActivityDescription, setNewActivityDescription] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
    <div className="ActivitiesPost-content">
      <h1 className="ActivitiesFormTitle">Hello Power User!</h1>

      <form className="ActivitiesPost-form" onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          value={newActivityName}
          onChange={(e) => setNewActivityName(e.target.value)}
        />
        <br />

        <label>Description:</label>
        <textarea
          value={newActivityDescription}
          onChange={(e) => setNewActivityDescription(e.target.value)}
        />
        <br />

        {error && <p>{error}</p>}

        <button type="submit">Create Activity</button>
      </form>

      <div>
        <h3>All Activities:</h3>
        {activities.length > 0 ? (
          <ul>
            {activities.map((activity) => (
              <li key={activity.id}>
                <strong>{activity.name}</strong> - {activity.description}
              </li>
            ))}
          </ul>
        ) : (
          <p>No activities found.</p>
        )}
      </div>
    </div>
  );
}
