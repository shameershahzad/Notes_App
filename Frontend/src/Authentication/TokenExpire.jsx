import { useEffect } from "react";
import axios from "axios";

function TokenExpire() {
  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL;
    let timeoutId;

    const refreshAccessToken = async () => {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) return;

      try {
        const res = await axios.post(`${API_URL}/account/refreshToken`, { refreshToken });
        localStorage.setItem("token", res.data.token);
        scheduleRefresh(res.data.token);
      } catch (err) {
        console.error("Token refresh failed:", err);
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
      }
    };

    const scheduleRefresh = (token) => {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const expireTime = payload.exp * 1000; // JWT 'exp' is in seconds
        const timeLeft = expireTime - Date.now();

        if (timeLeft <= 0) {
          refreshAccessToken();
        } else {
          timeoutId = setTimeout(refreshAccessToken, timeLeft);
        }
      } catch (err) {
        console.error("Invalid token", err);
      }
    };

    const token = localStorage.getItem("token");
    if (token) scheduleRefresh(token);

    return () => clearTimeout(timeoutId);
  }, []);

  return null;
}

export default TokenExpire;
