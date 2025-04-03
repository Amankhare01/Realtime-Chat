import { useEffect } from "react";
import { Usechatstore } from "../store/Usechatstore"
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "../skelton/MessageSkeleton";

const Chatcontainer = () => {
  const { getMessages, isMessageLoading, selectedUser}=Usechatstore();

  useEffect(()=>{
    getMessages(selectedUser._id)
  },[selectedUser._id, getMessages])

  if(isMessageLoading) return (
  <div className="flex-1 flex flex-col overflow-auto">
    <ChatHeader/>
    <MessageSkeleton/>
    <MessageInput/>
  </div>
  )
  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader/>
      <h1>Chat Conatiner</h1>
      <MessageInput/>
    </div>
  )
}

export default Chatcontainer
