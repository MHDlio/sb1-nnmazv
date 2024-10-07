import React, { useState, useRef, useEffect } from 'react'
import { Send, MessageCircle, X } from 'lucide-react'

interface Message {
  text: string
  sender: 'user' | 'bot'
}

const ChatbotAssistance: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = { text: input, sender: 'user' }
    setMessages(prev => [...prev, userMessage])
    setInput('')

    // Simulating AI response
    setTimeout(() => {
      const botMessage: Message = { text: "Thank you for your question. I'm here to help with any bureaucratic process queries you may have.", sender: 'bot' }
      setMessages(prev => [...prev, botMessage])
    }, 1000)
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 bg-green-500 text-white p-2 rounded-full shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
        aria-label="Open Chatbot"
      >
        <MessageCircle size={24} />
      </button>
      {isOpen && (
        <div className="fixed bottom-4 left-4 w-80 h-96 bg-white rounded-lg shadow-xl flex flex-col">
          <div className="bg-green-500 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">BureauEase Assistant</h3>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200">
              <X size={20} />
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
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 border-t">
            <div className="flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-grow mr-2 p-2 border rounded"
              />
              <button
                onClick={handleSend}
                className="bg-green-500 text-white p-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ChatbotAssistance