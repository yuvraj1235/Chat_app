import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Search, Bell, Archive, Calendar, File, Users, Briefcase, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Bell, label: "All chats", active: false, count: 48 },
  { icon: Briefcase, label: "Work", active: true, count: 1 },
  { icon: Users, label: "Friends", active: false },
  { icon: Calendar, label: "News", active: false },
  { icon: Archive, label: "Archive chats", active: false },
  { icon: User, label: "Profile", active: false },
];

const chats = [
  
  {
    id: 5,
    name: "Jasmin Lowery",
    avatar: "/lovable-uploads/65a4c6c3-2d34-4fef-91ed-6f5d6d13efce.png",
    lastMessage: "You: Ok! Let's discuss it on th...",
    time: "20m",
    unread: 0,
    active: false
  },
];

export const ChatSidebar = () => {
  return (
    <div className="w-80 bg-gray-900 text-white flex flex-col h-screen">
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-gray-900 rounded-sm"></div>
          </div>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input 
            placeholder="Search" 
            className="bg-gray-800 border-gray-700 text-white pl-10 placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="px-4 py-2">
        {navItems.map((item, index) => (
          <div
            key={index}
            className={cn(
              "flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors mb-1",
              item.active ? "bg-gray-800 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"
            )}
          >
            <div className="flex items-center gap-3">
              <item.icon className="w-4 h-4" />
              <span className="text-sm">{item.label}</span>
            </div>
            {item.count && (
              <Badge variant="secondary" className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {item.count}
              </Badge>
            )}
          </div>
        ))}
      </div>

      {/* Chat List */}
      <ScrollArea className="flex-1 px-4">
        <div className="space-y-1">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors",
                chat.active ? "bg-gray-800" : "hover:bg-gray-800"
              )}
            >
              <div className="relative">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={chat.avatar} />
                  <AvatarFallback className="bg-purple-500 text-white">
                    {chat.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                {chat.id === 1 && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm truncate">{chat.name}</h4>
                  <span className="text-xs text-gray-400">{chat.time}</span>
                </div>
                <p className="text-xs text-gray-400 truncate">{chat.lastMessage}</p>
              </div>
              
              {chat.unread > 0 && (
                <Badge variant="secondary" className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {chat.unread}
                </Badge>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Bottom */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-3 text-gray-400 hover:text-white cursor-pointer">
          <Archive className="w-4 h-4" />
          <span className="text-sm">Log out</span>
        </div>
      </div>
    </div>
  );
};
