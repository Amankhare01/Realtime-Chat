import { useEffect } from "react";
import { Usechatstore } from "../store/Usechatstore";
import SidebarSkeleton from "../skelton/SidebarSkelton";
import { Users } from "lucide-react";
import { Useauthstore } from "../store/Useauthstore";

const Sidebar = () => {
  const {
    getUsers,
    users,
    selectedUser,
    setSelectedUser,
    isUserLoading,
    isSidebarOpen,
    setSidebarOpen,
  } = Usechatstore();

  const { onlineUsers } = Useauthstore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  useEffect(() => {
    if (selectedUser) {
      setSidebarOpen(false); // Hide sidebar on mobile when a user is selected
    }
  }, [selectedUser, setSidebarOpen]);

  if (isUserLoading) return <SidebarSkeleton />;

  return (
    <aside
      className={`
        pt-10
        h-full border-r border-base-300 flex flex-col transition-all duration-200
        bg-base-100 absolute z-10 lg:static
        ${isSidebarOpen ? "w-full" : "w-0"} 
        lg:w-72 
        ${isSidebarOpen ? "block" : "hidden"} 
        lg:block
      `}
    >
      <div className="border-b border-base-300 w-full p-5 flex items-center gap-3">
        <Users className="size-6" />
        <span className="font-medium">Contact</span>
      </div>

      <div className="overflow-y-auto w-full py-3 flex-1 sm:p-4 lg:p-0">
        {users.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full px-4 py-3 flex items-center gap-3 text-left
              hover:bg-base-300 transition-colors
              ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
            `}
          >
            <div className="relative">
              <img
                src={user.profilepic || "/default.png"}
                alt={user.fullName}
                className="size-12 object-cover rounded-full"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="font-medium truncate">{user.fullName}</div>
              <div className="text-sm text-zinc-400">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {users.length === 0 && (
          <div className="text-center text-zinc-500 py-4">No online users</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
