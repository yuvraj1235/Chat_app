"use client"
import React from 'react' 

interface chatMessageProps {
    sender: string;
    message: string;
    myOwnMessage: boolean;
    isSystemMessage: boolean;
}

const ChatMessage = ({ sender, message, myOwnMessage, isSystemMessage }: chatMessageProps) => {
    // We are now directly using the isSystemMessage prop
    // No need to derive it from sender here if it's provided as a prop

    return (
        <div className={`flex ${myOwnMessage ? "justify-end" : "justify-start"} m-3`}>
            {/* If it's a system message, it usually takes full width or is centered. */}
            {/* Adjusting class for system message bubble. */}
            <div className={`max-w-xs px-4 py-2 rounded-lg ${
                isSystemMessage
                    ? "bg-gray-800 text-white text-center text-xs w-full sm:max-w-sm" // System messages might span wider or be centered
                    : myOwnMessage
                        ? "bg-blue-500 text-white"
                        : "bg-white text-black border border-gray-200 shadow-sm" // Added border/shadow for non-my own messages for better distinction
            }`}>
                {
                    // Only show sender if it's not a system message
                    // And typically, you don't show sender for your own message bubble either
                    !isSystemMessage && !myOwnMessage && (
                        <p className='text-sm font-bold mb-1'>{sender}</p> // Added mb-1 for slight spacing
                    )
                }
                <p>{message}</p>
            </div>
        </div>
    );
};

export default ChatMessage;