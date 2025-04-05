import React, { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Card } from "../../../../components/ui/card";
import { cn } from "../../../../lib/utils";

interface Message {
  id: number;
  type: 'assistant' | 'user';
  content: string;
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: 1,
    type: 'assistant',
    content: `I've detected some discrepancies in the Bill of Lading. Here are the issues I found:

1. The vessel number doesn't match the booking reference
2. The container count is inconsistent with booking details
3. The EB/L number sequence doesn't follow carrier's format

Would you like me to explain any of these issues in detail?`,
    timestamp: new Date(),
  },
];

export const DocumentVerificationChat = (): JSX.Element => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages(prev => [...prev, {
      id: Date.now(),
      type: 'user',
      content: input,
      timestamp: new Date(),
    }]);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 py-4 border-b border-[#eff0f2]">
        <h2 className="text-lg font-semibold text-neutraltextbold">
          Document Verification AI Assistant
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex",
                message.type === 'user' ? "justify-end" : "justify-start"
              )}
            >
              <Card
                className={cn(
                  "max-w-[80%] p-4",
                  message.type === 'assistant' 
                    ? "bg-accentbackgroundbold/10 border-none text-neutraltextbold" 
                    : "bg-accentbackgroundbold text-white border-none ml-auto"
                )}
              >
                <div className="flex flex-col gap-2">
                  <div className="text-sm whitespace-pre-wrap">
                    {message.content}
                  </div>
                  <div className={cn(
                    "text-[10px] self-end",
                    message.type === 'assistant' 
                      ? "text-neutraltextsoft" 
                      : "text-white/70"
                  )}>
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <div className="sticky bottom-0 p-4 bg-white border-t border-[#eff0f2]">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button
            onClick={handleSend}
            className="bg-accentbackgroundbold hover:bg-accentbackgroundbold/90"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};