import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import { Usechatstore } from '../store/Usechatstore';
import { Useauthstore } from '../store/Useauthstore';
import Sidebar from './Sidebar';
import Nochatselected from './Nochatselected';
import Chatcontainer from './Chatcontainer';

const Home = () => {
  const { selectedUser } = Usechatstore();
  const { authUser, isCheckingAuth } = Useauthstore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isCheckingAuth && !authUser) {
      navigate('/login');
    }
  }, [authUser, isCheckingAuth, navigate]);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-400">Checking authentication...</p>
      </div>
    );
  }

  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-5">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(105vh-5rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />
            {!selectedUser ? <Nochatselected /> : <Chatcontainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
