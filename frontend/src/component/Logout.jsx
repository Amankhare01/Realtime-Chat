import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

const Logout = () => {
const handleLogout = async () => {

    try {
      const response = await fetch("http://localhost:4000/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Logout successful! Redirecting...", { position: "top-right" });

        // Redirect to home page after 2 seconds
        setTimeout(() => {
          Navigate("/");
        }, 2000);
      } else {
        toast.error(`Logout failed: ${data.message}`, { position: "top-right" });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", { position: "top-right" });
      console.error("Logout error:", error);
    }
    
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Logout
