export async function getRoutines() {
  try {
    const response = await fetch("/api/routines");
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteRoutine(routineId) {
  try {
    const response = await fetch(`/api/routines/${routineId}`, {
      method: "DELETE",
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
