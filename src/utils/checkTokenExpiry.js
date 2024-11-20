// Check if the token is expired
const isTokenExpired = () => {
  const token = localStorage.getItem("access_token");
  const expirationTime = localStorage.getItem("token_expiry");

  if (!token || !expirationTime) return true; // If no token, consider it expired

  const currentTime = Date.now(); // Current time in milliseconds

  // Check if current time is greater than expiration time
  return currentTime > expirationTime;
};

export default isTokenExpired;
