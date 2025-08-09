import { useEffect } from "react";

function TokenExpire() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expireTime = payload.exp * 1000; // JWT 'exp' is in seconds
      const timeLeft = expireTime - Date.now();

      if (timeLeft <= 0) {
        alert("Session expired. Please login again.");
        localStorage.removeItem("token");
        window.location.href = "/";
      } else {
        // Set timeout to auto-alert when expired
        const timeout = setTimeout(() => {
          alert("Session expired. Please login again.");
          localStorage.removeItem("token");
          window.location.href = "/";
        }, timeLeft);

        return () => clearTimeout(timeout);
      }
    } catch (err) {
      console.error("Invalid token");
      localStorage.removeItem("token");
      window.location.href = "/";
    }
  }, []);

  return null;
}

export default TokenExpire;
