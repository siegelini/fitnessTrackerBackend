export async function getAllActivities() {
  try {
    const response = await fetch("/api/activities");
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function createActivity(name, description) {
  try {
    console.log("req.body in createActivity api:", name);
    const response = await fetch("/api/activities/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, description }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}
