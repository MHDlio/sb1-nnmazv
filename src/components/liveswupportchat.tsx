
// components/LiveSupportChat.tsx
import React, { useState, useEffect } from 'react'
import { io, Socket } from 'socket.io-client'

interface Message {
  text: string
  sender: 'user' | 'agent'
  timestamp: Date
}

interface LiveSupportChatProps {
  onClose: () => void
}

const LiveSupportChat: React.FC<LiveSupportChatProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    const newSocket = io('http://localhost:4000') // Replace with your server URL
    setSocket(newSocket)

    newSocket.on('message', (message: Message) => {
      setMessages((prev) => [...prev, message])
    })

    return () => {
      newSocket.disconnect()
    }
  }, [])

  const handleSend = () => {
    if (input.trim() && socket) {
      const userMessage: Message = {
        text: input.trim(),
        sender: 'user',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, userMessage])
      setInput('')
      socket.emit('message', userMessage)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 w-80 h-96 bg-white rounded-lg shadow-xl flex flex-col">
      <div className="p-4 border-b flex justify-between items-center">
        <h3 className="font-semibold">Live Support Chat</h3>
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
          className="bg-green-500 text-white px-4 py-1 rounded-r-lg"
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default React.memo(LiveSupportChat)

// Backend - chat server (e.g., server/chatServer.js)
const io = require('socket.io')(4000, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

iO.on('connection', (socket) => {
  console.log('User connected:', socket.id)

  socket.on('message', (message) => {
    // Broadcast message to all connected clients
    io.emit('message', message)
  })

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id)
  })
})


//Here are the suggestions I intended to leave:

Environment Variables for Server URL: Instead of hardcoding the server URL, use an environment variable to make the code more flexible for different environments.

Avoid Memory Leaks: Consider using a reference (ref) for storing messages to avoid potential re-rendering issues or memory leaks when setting state in the newSocket.on('message') handler.

Input Validation: Add validation to check message length or content before sending it, which will improve user experience.

CORS Configuration: Using '*' for CORS can pose a security risk. It’s better to specify allowed origins or use environment variables to control this setting.

Keys for Rendered Messages: Using index as the key in messages.map() can lead to rendering issues. Consider using a unique identifier for each message instead.