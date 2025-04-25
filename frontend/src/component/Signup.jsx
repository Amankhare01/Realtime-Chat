import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { ToastContainer, toast } from "react-toastify";
import { EyeOff, Eye } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
import "../index.css";
const BASE_URL =
import.meta.env.MODE === "development"
  ? "http://localhost:4000"
  : "https://your-backend-name.onrender.com";

const Signup = () => {
  const [showpassword, setShowpassword] = useState(false);
  const [email, setEmail] = useState("");
  const [fullName, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  // const handleSuccess = (credentialResponse) => {
  //   console.log("Google Login successful", credentialResponse);
  //   toast.success("Google Login successful! Redirecting...", { position: "top-right" });

  //   setTimeout(() => {
  //     navigate("/");
  //   }, 2000);
  // };

  // const handleError = (error) => {
  //   console.log("Google Login failed", error);
  //   toast.error("Google Login failed. Please try again.", { position: "top-right" });
  // };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!", { position: "top-right" });
      return;
    }

    try { // Replace with your Render URL

const response = await fetch(`${BASE_URL}/api/auth/signup`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ fullName, email, password }),
  credentials: "include", // 👈 Very important for cookies
});


      const data = await response.json();

      if (response.ok) {
        toast.success("Signup successful! Redirecting...", { position: "top-right" });
        setTimeout(() => {
          navigate("/");
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
  <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 space-y-4">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center text-gray-700">Sign Up</h2>

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            placeholder="Password"
            value={password}
            type={showpassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type={showpassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="text-right">
            <button
              type="button"
              onClick={() => setShowpassword(!showpassword)}
              className="text-sm text-blue-600 hover:underline flex items-center gap-1"
            >
              Show Password {showpassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>

        {/* <div className="text-center text-gray-500 text-sm">or</div>

        <div className="flex justify-center">
          <GoogleOAuthProvider clientId="495911988941-8k5a3ef8o7njd6u678vt6nliifs5ne98.apps.googleusercontent.com">
            <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
          </GoogleOAuthProvider>
        </div> */}
      </div>

      <ToastContainer />
    </div>
  );
};

export default Signup;
