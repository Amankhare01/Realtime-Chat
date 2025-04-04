import '../index.css'
import { Usechatstore } from '../store/Usechatstore'
import Sidebar from './Sidebar';
import Nochatselected from './Nochatselected';
import Chatcontainer from './Chatcontainer';
const Home = () => {
  const {selectedUser}=Usechatstore();
  return (
    <div className='h-screen bg-base-200'>
      <div className="flex items-center justify-center pt-5 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar/>
            {!selectedUser ? <Nochatselected/> : <Chatcontainer/>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
