import { Link } from 'react-router-dom'
import '../index.css'
const Home = () => {
  return (
    <div className='m-5'>
      <h1>Welcome Aman</h1><br />
      <Link to={"/login"} className='b text-blue-500 font-bold'>Login</Link>
    </div>
  )
}

export default Home
