export async function getRoutines() {
  try {
    const response = await fetch("/api/routines/");
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}
