'use client'
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { X, File } from "lucide-react";

const members = [
 { name: "Lukas Mcgowan", role: "", avatar: "/lovable-uploads/65a4c6c3-2d34-4fef-91ed-6f5d6d13efce.png" }
];

const files = [
  { name: "Project_Brief_2024.pdf", size: "2.4 MB", type: "pdf" },
  { name: "Design_System_V2.fig", size: "15.7 MB", type: "figma" },
  { name: "Team_Photo.jpg", size: "3.2 MB", type: "image" }
];

export const GroupInfo = () => {
  const [isPhotosOpen, setIsPhotosOpen] = useState(true);
  const [isVideosOpen, setIsVideosOpen] = useState(false);
  const [isFilesOpen, setIsFilesOpen] = useState(false);
  const [isAudioOpen, setIsAudioOpen] = useState(false);
  const [isLinksOpen, setIsLinksOpen] = useState(false);
  const [isMembersOpen, setIsMembersOpen] = useState(true);

  return (
    <div className="w-80 bg-white border-l flex flex-col h-screen">
      {/* Header */}
    
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {/* Files Section */}
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Files</h4>
            
            <Collapsible open={isPhotosOpen} onOpenChange={setIsPhotosOpen}>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-gray-50 rounded">
                <div className="flex items-center gap-2">
                  <File className="w-4 h-4" />
                  <span className="text-sm">265 photos</span>
                </div>
                <div className="w-4 h-4 transform transition-transform" style={{ rotate: isPhotosOpen ? '90deg' : '0deg' }}>
                  <div className="w-0 h-0 border-l-4 border-l-gray-400 border-y-2 border-y-transparent"></div>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-2 mt-2">
                <div className="grid grid-cols-3 gap-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                      <img 
                        src="/lovable-uploads/65a4c6c3-2d34-4fef-91ed-6f5d6d13efce.png" 
                        alt={`Photo ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible open={isVideosOpen} onOpenChange={setIsVideosOpen}>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-gray-50 rounded">
                <div className="flex items-center gap-2">
                  <File className="w-4 h-4" />
                  <span className="text-sm">13 videos</span>
                </div>
                <div className="w-4 h-4 transform transition-transform" style={{ rotate: isVideosOpen ? '90deg' : '0deg' }}>
                  <div className="w-0 h-0 border-l-4 border-l-gray-400 border-y-2 border-y-transparent"></div>
                </div>
              </CollapsibleTrigger>
            </Collapsible>

            <Collapsible open={isFilesOpen} onOpenChange={setIsFilesOpen}>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-gray-50 rounded">
                <div className="flex items-center gap-2">
                  <File className="w-4 h-4" />
                  <span className="text-sm">378 files</span>
                </div>
                <div className="w-4 h-4 transform transition-transform" style={{ rotate: isFilesOpen ? '90deg' : '0deg' }}>
                  <div className="w-0 h-0 border-l-4 border-l-gray-400 border-y-2 border-y-transparent"></div>
                </div>
              </CollapsibleTrigger>
            </Collapsible>

            <Collapsible open={isAudioOpen} onOpenChange={setIsAudioOpen}>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-gray-50 rounded">
                <div className="flex items-center gap-2">
                  <File className="w-4 h-4" />
                  <span className="text-sm">21 audio files</span>
                </div>
                <div className="w-4 h-4 transform transition-transform" style={{ rotate: isAudioOpen ? '90deg' : '0deg' }}>
                  <div className="w-0 h-0 border-l-4 border-l-gray-400 border-y-2 border-y-transparent"></div>
                </div>
              </CollapsibleTrigger>
            </Collapsible>

            <Collapsible open={isLinksOpen} onOpenChange={setIsLinksOpen}>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-gray-50 rounded">
                <div className="flex items-center gap-2">
                  <File className="w-4 h-4" />
                  <span className="text-sm">45 shared links</span>
                </div>
                <div className="w-4 h-4 transform transition-transform" style={{ rotate: isLinksOpen ? '90deg' : '0deg' }}>
                  <div className="w-0 h-0 border-l-4 border-l-gray-400 border-y-2 border-y-transparent"></div>
                </div>
              </CollapsibleTrigger>
            </Collapsible>

            <div className="flex items-center gap-2 p-2">
              <File className="w-4 h-4" />
              <span className="text-sm">2 589 voice messages</span>
            </div>
          </div>

          {/* Members Section */}
          <div className="space-y-2">
            <Collapsible open={isMembersOpen} onOpenChange={setIsMembersOpen}>
              <CollapsibleTrigger className="flex items-center justify-between w-full">
                <h4 className="font-medium text-sm">23 members</h4>
                <Button variant="ghost" size="icon" className="w-6 h-6">
                  <X className="w-4 h-4" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-2 mt-2">
                {members.map((member, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback className="bg-purple-500 text-white text-xs">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium truncate">{member.name}</span>
                        {member.role && (
                          <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                            {member.role}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};
