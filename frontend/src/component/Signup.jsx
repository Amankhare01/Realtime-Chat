import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Link } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles
import "../index.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSuccess = (credentialResponse) => {
    console.log("Google Login successful", credentialResponse);
    
    toast.success("Google Login successful! Redirecting...", { position: "top-right" });

    // Redirect to home after 2 seconds
    setTimeout(() => {
      navigate("/home");
    }, 2000);
  };

  const handleError = (error) => {
    console.log("Google Login failed", error);
    toast.error("Google Login failed. Please try again.", { position: "top-right" });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!", { position: "top-right" });
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Signup successful! Redirecting...", { position: "top-right" });

        // Redirect to home page after 2 seconds
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      } else {
        toast.error(`Signup failed: ${data.message}`, { position: "top-right" });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", { position: "top-right" });
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
      <p>or</p>
      <center>
        <GoogleOAuthProvider clientId="495911988941-8k5a3ef8o7njd6u678vt6nliifs5ne98.apps.googleusercontent.com">
          <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
        </GoogleOAuthProvider>
      </center>
      <ToastContainer />
    </div>
  );
};

export default Signup;
