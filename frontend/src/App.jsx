import { Route, Routes } from 'react-router-dom';
import Signup from './component/Signup';
import Login from './component/Login';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
  );
}

export default App;
