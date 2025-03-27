import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { ToastContainer } from "react-toastify";
import "../index.css";
import { Useauthstore } from "../store/Useauthstore";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoginup } = Useauthstore();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, password });
    console.log("Logging in with", email, password);
    navigate("/");
  };

  const handlesuccess = (CredentialResponse) => {
    console.log("Login successful", CredentialResponse);
  };

  const handleerror = (error) => {
    console.log("Login failed", error);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center text-gray-700">Login</h1>
        <form onSubmit={handleLogin} className="mt-4 space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={isLoginup}
            className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
          >
            {isLoginup ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Loading...
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Don&#39;t have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign up</Link>
        </p>
        <p className="mt-2 text-center">or</p>
        <div className="mt-4 flex justify-center">
          <GoogleOAuthProvider clientId="495911988941-8k5a3ef8o7njd6u678vt6nliifs5ne98.apps.googleusercontent.com">
            <GoogleLogin onSuccess={handlesuccess} onError={handleerror} />
          </GoogleOAuthProvider>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
