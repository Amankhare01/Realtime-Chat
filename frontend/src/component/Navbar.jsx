import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { Useauthstore } from "../store/Useauthstore";
import { axiosInstance } from "../lib/axios";
import { Usechatstore } from "../store/Usechatstore"; // make sure you import this
const Navbar = () => {
  const { authUser, logout, isCheckingAuth } = Useauthstore();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!search.trim()) {
        setResults([]);
        return;
      }
  
      try {
        const res = await axiosInstance.get(`/auth/search?userId=${search}`);
        console.log("Search API Response:", res.data); // ✅ Log here
        setResults(res.data);
      } catch (error) {
        console.error("Search error:", error.message);
      }
    };
  
    const delayDebounce = setTimeout(fetchUsers, 400);
    return () => clearTimeout(delayDebounce);
  }, [search]);


const { setSelectedUser } = Usechatstore();

const handleChat = (user) => {
  setSelectedUser(user);
  setShowSearch(false);
  setSearch("");
  navigate("/"); // redirect to home/chatbox
};

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  if (isCheckingAuth) {
    return (
      <div className="p-4 text-center text-sm text-gray-400">
        Checking authentication...
      </div>
    );
  }

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Live Chat
          </span>
        </Link>

        <div className="flex items-center space-x-3 md:space-x-4 md:order-2 relative">
          {authUser && (
            <>
              {showSearch ? (
                <div className="relative">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search by ID..."
                      autoFocus
                      className="w-20 sm:w-60 px-3 py-1.5 border text-gray-100 border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={() => {
                        setShowSearch(false);
                        setSearch("");
                        setResults([]);
                      }}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {results.length > 0 && (
  <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-md shadow z-50 max-h-64 overflow-y-auto">
    {results.map((user) => (
      <div
        key={user._id}
        onClick={() => handleChat(user)}
        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer"
      >
        <img
          src={user.profilepic || "/default.png"}
          alt={user.fullName}
          className="w-10 h-10 rounded-full object-cover border"
        />
        <div className="flex-1">
          <p className="font-medium text-sm text-gray-800">{user.fullName}</p>
          <p className="text-xs text-gray-500 truncate">{user._id}</p>
        </div>
        <button
          className="text-xs px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Chat
        </button>
      </div>
    ))}
  </div>
)}


                </div>
              ) : (
                <button
                  onClick={() => setShowSearch(true)}
                  className="text-gray-100 hover:text-blue-500"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </>
          )}

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
                <div className="z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600 absolute right-0 top-14">
                  <div className="px-4 py-3">
                    <span className="block text-sm text-gray-900 dark:text-white">
                      {authUser.fullName}
                    </span>
                    <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                      {authUser.email}
                    </span>
                  </div>
                  <ul className="py-2">
                    <li>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
                      >
                        Sign out
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;