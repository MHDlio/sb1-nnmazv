import React, { useState } from 'react';
import { MessageCircle, HelpCircle } from 'lucide-react';
import ChatbotAssistance from './ChatbotAssistance';
import LiveSupportChat from './LiveSupportChat';

const SupportWidget: React.FC = () => {
  const [activeSupport, setActiveSupport] = useState<'chatbot' | 'liveChat' | null>(null);

  const handleChatbotOpen = () => {
    setActiveSupport('chatbot');
  };

  const handleLiveChatOpen = () => {
    setActiveSupport('liveChat');
  };

  const handleClose = () => {
    setActiveSupport(null);
  };

  return (
    <>
      <div className="fixed bottom-4 right-4 flex flex-col space-y-2">
        {!activeSupport && (
          <>
            <button
              onClick={handleChatbotOpen}
              className="bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label="Chatbot Assistance"
            >
              <HelpCircle size={24} />
            </button>
            <button
              onClick={handleLiveChatOpen}
              className="bg-green-500 text-white p-2 rounded-full shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
              aria-label="Live Support Chat"
            >
              <MessageCircle size={24} />
            </button>
          </>
        )}
        {activeSupport === 'chatbot' && (
          <ChatbotAssistance context={null} onClose={handleClose} />
        )}
        {activeSupport === 'liveChat' && (
          <LiveSupportChat context={null} onClose={handleClose} />
        )}
      </div>
    </>
  );
};

export default SupportWidget;
