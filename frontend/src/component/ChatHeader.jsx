import { X } from "lucide-react";
import { Usechatstore } from "../store/Usechatstore";
import { Useauthstore } from "../store/Useauthstore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser, setSidebarOpen } = Usechatstore();
  const { onlineUsers } = Useauthstore();

  const handleBack = () => {
    setSelectedUser(null);
    setSidebarOpen(true);
  };

  return (
    <div className="w-full p-3 border-b border-base-300 bg-base-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img
                src={selectedUser.profilepic || "/default.png"}
                alt={selectedUser.fullName}
                className="size-10 object-cover rounded-full"
              />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close/back button */}
        <button onClick={handleBack} className="lg:hidden">
          <X />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
