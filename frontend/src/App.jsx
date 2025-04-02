import { Route, Routes } from 'react-router-dom';
import Signup from './component/Signup';
import Login from './component/Login';
import Home from './component/Home';
import Testh from './component/Testh';
import Network from './component/Network';
import Timer from './component/Timer';
import Navbar from './component/Navbar';
import { useEffect } from 'react';
import { Useauthstore } from './store/Useauthstore';
import {Loader} from "lucide-react"
import Profile from './component/Profile';
function App() {
  const {authUser, checkAuth, isCheckingAuth} = Useauthstore();
  useEffect(()=>{
    checkAuth();
  },[checkAuth]);
  console.log({authUser});

  if(isCheckingAuth && !authUser) return (
    <div className='flex items-center justify-center h-screen'>
      <Loader className="size-10 animate-spin" />
    </div>
  )
  return (
      <div>
        <Navbar/>
        <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/test" element={<Testh />} />
        <Route path="/Network" element={<Network />} />
        <Route path="/timer" element={<Timer />} />
        {/* <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} /> */}
        <Route path="/signup" element={<Signup />} />
      </Routes>
      </div>
  );
}

export default App;
