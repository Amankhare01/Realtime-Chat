import { useState } from 'react';
import { Useauthstore } from '../store/Useauthstore.js';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { authUser, logout } = Useauthstore();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // useEffect(() => {
  //   if (!authUser) {
  //     navigate("/login");
  //   }
  // }, [authUser, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate("/login","Welcome");
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to={'/'} className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Live Chat</span>
        </Link>

        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {/* ✅ Show Profile Section if User is Logged In */}
          {authUser ? (
            <>
              <button
                type="button"
                className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className="sr-only">Open user menu</span>
                <img
                  src={authUser.profilepic || "./default.png"}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
              </button>
              {dropdownOpen && (
                <div className="z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600 absolute right-4 top-14">
                  <div className="px-4 py-3">
                    <span className="block text-sm text-gray-900 dark:text-white">{authUser.fullName}</span>
                    <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{authUser.email}</span>
                  </div>
                  <ul className="py-2">
                    <li><Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</Link></li>
                    <li><a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a></li>
                    <li><a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Earnings</a></li>
                    <li><button onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white w-full text-left">Sign out</button></li>
                  </ul>
                </div>
              )}
            </>
          ) : (
            <Link to="/login" className="px-4 py-2 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600">Login</Link>
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
