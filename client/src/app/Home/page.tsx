'use client'
import React, { useState } from 'react';
import { ChatSidebar } from '@/components/ui/chatsidebar';
import { ChatArea } from '@/components/ui/chatarea';
import { GroupInfo } from '@/components/ui/groupinfo';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible';
import { Button } from '@/components/ui/button'; // Your custom Button component
import { X } from 'lucide-react';
import { log } from 'console';

const Home = () => {
  const [message,setMessage]=useState<{sender:string;message:string}[]>([]);
  const [isMembersOpen, setIsMembersOpen] = useState(true);
  const handleSendMessage=(message:string)=>{
    console.log(message);
    
  }
  return (
    <div className="flex h-screen bg-gray-100">
      <ChatSidebar />
      <ChatArea onSendMessage={handleSendMessage } />
      {/* <Collapsible open={isMembersOpen} onOpenChange={setIsMembersOpen}>

        <CollapsibleTrigger className="flex items-center justify-between w-full">
          <h4 className="font-medium text-lg p-5 align-middle justify-center">Group info</h4>

          <Button variant="ghost" size="icon" className="w-6 h-6" asChild>
            <X className="w-4 h-4" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <GroupInfo />
        </CollapsibleContent>
      </Collapsible> */}
    </div>
  );
};

export default Home;