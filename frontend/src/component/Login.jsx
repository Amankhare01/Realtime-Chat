import { useState } from "react";
import { Link } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

import "../index.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in with", email, password);
  };
  const handlesuccess=(CredentialResponse)=>{
    console.log("Loging successfuly",CredentialResponse);
  }
  const handleerror=(error)=>{
    console.log("login failed",error);
  }


  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
        <p>Don&#39;t have an account? <Link to="/signup">Sign up</Link></p>
        <p className="login">or</p><br />
      <center>
      <GoogleOAuthProvider clientId="495911988941-8k5a3ef8o7njd6u678vt6nliifs5ne98.apps.googleusercontent.com">
        <GoogleLogin
        onSuccess={handlesuccess}
        onError={handleerror}/>
      </GoogleOAuthProvider>
      </center>
    </div>
  );
};

export default Login;
