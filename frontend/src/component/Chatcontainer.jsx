import { useEffect } from "react";
import { Usechatstore } from "../store/Usechatstore"
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "../skelton/MessageSkeleton";
import { Useauthstore } from "../store/Useauthstore";

const Chatcontainer = () => {
  const { messages,getMessages, isMessageLoading, selectedUser,SubscribeToMessage, UnsubscribeToMessage}=Usechatstore();
  UnsubscribeToMessage
  const {authUser}=Useauthstore();
  useEffect(()=>{
    getMessages(selectedUser._id)
    SubscribeToMessage();
    return()=> UnsubscribeToMessage();
  },[selectedUser._id, getMessages,SubscribeToMessage,UnsubscribeToMessage])

  if(isMessageLoading) return (
  <div className="flex-1 flex flex-col overflow-auto">
    <ChatHeader/>
    <MessageSkeleton/>
    <MessageInput/>
  </div>
  )
  return (
<div className="flex-1 flex flex-col overflow-auto">
  <ChatHeader />

  <div className="flex-1 overflow-y-auto p-4 space-y-4">
    {Array.isArray(messages) &&
      messages.map((msg) => (
        <div
          key={msg._id}
          className={`flex items-end space-x-2 ${
            msg.senderId === authUser._id ? "justify-end" : "justify-start"
          }`}
        >
          {msg.senderId !== authUser._id && (
            <div className="w-10 h-10 rounded-full border overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={selectedUser.profilepic || "/default.png"}
                alt="Profile Pic"
              />
            </div>
          )}

          <div
            className={`max-w-[20%] p-3 rounded shadow-md ${
              msg.senderId === authUser._id
            }`}
          >
            {msg.image && (
              <img
                src={msg.image}
                alt="Attachment"
                className=" rounded-md mb-2"
              />
            )}

            {/* Text */}
            {msg.text && <p className="text-sm">{msg.text}</p>}

            {/* Timestamp */}
            <div className="text-xs text-gray-400 mt-1 text-right">
              {new Date(msg.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>

          {/* Avatar (Only for sent messages) */}
          {msg.senderId === authUser._id && (
            <div className="w-10 h-10 rounded-full border overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={authUser.profilepic || "/default.png"}
                alt="Profile Pic"
              />
            </div>
          )}
        </div>
      ))}
  </div>

  {/* Message Input */}
  <MessageInput />
</div>

  )
}

export default Chatcontainer
