export async function logout() {
  try {
    const response = await fetch("/api/auth/logout");
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchMe() {
  try {
    const response = await fetch("/api/users/me");
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}
