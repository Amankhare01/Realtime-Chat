import { X } from "lucide-react";
import { Usechatstore } from "../store/Usechatstore";
import { Useauthstore } from "../store/Useauthstore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = Usechatstore();
  const { onlineUsers } = Useauthstore();

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
            <img
                src={selectedUser.profilepic || "/default.png"}
                alt={selectedUser.fullName}
                className="size-10 object-fill rounded-full"
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

        {/* Close button */}
        <button onClick={() => setSelectedUser(null)}>
          <X />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;