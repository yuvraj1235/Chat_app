"use client";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Send, Phone, EllipsisVertical } from "lucide-react";
import { io } from "socket.io-client";

/* 👉 point to your backend */
const socket = io("http://localhost:5000");

/** Message schema coming from the server */
type ChatMessage = {
  _id: string;
  content: string;
  timestamp: string;            // ISO string from Mongo
};

export const ChatArea = ({
  onSendMessage,
}: {
  onSendMessage: (message: string) => void;
}) => {
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  /* 1️⃣  Register & clean up listeners */
  useEffect(() => {
    /** First load – history */
    socket.on("previous-messages", (msgs: ChatMessage[]) => {
      setChat(msgs);
    });

    /** Real‑time new message */
    socket.on("receive-message", (msg: ChatMessage) => {
      setChat((prev) => [...prev, msg]);
    });

    /* Clean listeners on unmount */
    return () => {
      socket.off("previous-messages");
      socket.off("receive-message");
    };
  }, []);

  /* 2️⃣  Auto‑scroll when chat updates */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [chat]);

  /* 3️⃣  Send message */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = message.trim();
    if (!trimmed) return;

    socket.emit("send-message", trimmed); // server saves & re‑broadcasts
    onSendMessage(trimmed);               // in case parent needs it
    setMessage("");
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-white">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold">Design chat</h2>
          <span className="text-sm text-gray-500">23 members, 10 online</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon"><Search className="w-4 h-4" /></Button>
          <Button variant="ghost" size="icon"><Phone className="w-4 h-4" /></Button>
          <Button variant="ghost" size="icon"><EllipsisVertical className="w-4 h-4" /></Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4 space-y-2">
        {chat.map((msg) => (
          <div key={msg._id} className="bg-gray-100 rounded-xl px-4 py-2 max-w-xs">
            <p className="text-sm">{msg.content}</p>
            {/* small timestamp if you like */}
            {/* <span className="text-[10px] text-gray-500">{new Date(msg.timestamp).toLocaleTimeString()}</span> */}
          </div>
        ))}
        <div ref={bottomRef} />
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t bg-white">
        <form onSubmit={handleSubmit} className="flex items-center gap-2 relative">
          <Input
            placeholder="Your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="pr-12"
          />
          <Button
            type="submit"
            size="icon"
            disabled={!message.trim()}
            className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};
