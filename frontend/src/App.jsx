import { Route, Routes } from 'react-router-dom';
import Signup from './component/Signup';
import Login from './component/Login';
import Home from './component/Home';
import Testh from './component/Testh';
import Learn from './component/Learn';

function App() {
  return (
      <div>
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/test" element={<Testh />} />
        <Route path="/LEARN" element={<Learn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      </div>
  );
}

export default App;
