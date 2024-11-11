// components/ChatbotAssistance.tsx
import React, { useState, useEffect, useCallback } from 'react'
import { TutorialContext } from './InteractiveTutorial'

interface Message {
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

interface ChatbotAssistanceProps {
  context: TutorialContext | null
  onClose: () => void
}

const ChatbotAssistance: React.FC<ChatbotAssistanceProps> = ({ context, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')

  useEffect(() => {
    if (context) {
      const botMessage: Message = {
        text: `Need help with ${context.fieldLabel}? ${context.explanation}`,
        sender: 'bot',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
    }
  }, [context])

  const handleSend = useCallback(async () => {
    if (input.trim()) {
      const userMessage: Message = {
        text: input.trim(),
        sender: 'user',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, userMessage])
      setInput('')

      // Here you would typically send the message to your chatbot API
      // and receive a response. For now, we'll just echo the message.
      setTimeout(() => {
        const botMessage: Message = {
          text: `You said: ${input.trim()}`,
          sender: 'bot',
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botMessage])
      }, 1000)
    }
  }, [input])

  return (
    <div className="fixed bottom-4 right-4 w-80 h-96 bg-white rounded-lg shadow-xl flex flex-col">
      <div className="p-4 border-b flex justify-between items-center">
        <h3 className="font-semibold">Chatbot Assistance</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          Close
        </button>
      </div>
      <div className="flex-grow overflow-y-auto p-4">
        {messages.map((message, index) => (
          <div key={index} className={`mb-2 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block p-2 rounded-lg ${message.sender === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
              {message.text}
            </span>
          </div>
        ))}
      </div>
      <div className="p-4 border-t flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          className="flex-grow border rounded-l-lg px-2 py-1"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-4 py-1 rounded-r-lg"
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default React.memo(ChatbotAssistance)