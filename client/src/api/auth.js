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
  const response = await fetch("/api/auth/me");
  const { success, message, user } = await response.json();
  if (!success) {
    throw {
      message,
    };
  }
  return {
    success,
    message,
    user,
  };
}
