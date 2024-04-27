import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        // Make a request to the logout endpoint on the server
        const response = await fetch("http://localhost:3001/users/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Include the token for authentication, if needed
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          console.error("Logout failed:", response.statusText);
          // Optionally handle failed logout
        }

        // Clear local storage items
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        // Redirect to the login page or any other desired destination
        navigate("/login");
      } catch (error) {
        console.error("Logout error:", error);
        // Optionally handle logout errors
      }
    };

    logout();
  }, [navigate]);

  return <div>Logging out...</div>;
};

export default Logout;