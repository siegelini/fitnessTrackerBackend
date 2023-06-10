export async function getAllActivities() {
  try {
    const response = await fetch("/api/activities");
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function createActivity() {
  try {
    const response = await fetch("/api/activities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}
