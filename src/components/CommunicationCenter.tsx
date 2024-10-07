import React, { useState } from 'react'
import { Send, Inbox, Phone } from 'lucide-react'

const CommunicationCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState('email')

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Communication Center</h1>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="flex border-b">
          <button
            className={`flex-1 py-4 px-6 text-center ${activeTab === 'email' ? 'bg-gray-100 font-semibold' : ''}`}
            onClick={() => setActiveTab('email')}
          >
            <Inbox className="inline-block mr-2" size={18} /> Email
          </button>
          <button
            className={`flex-1 py-4 px-6 text-center ${activeTab === 'sms' ? 'bg-gray-100 font-semibold' : ''}`}
            onClick={() => setActiveTab('sms')}
          >
            <Phone className="inline-block mr-2" size={18} /> SMS
          </button>
        </div>
        <div className="p-6">
          {activeTab === 'email' && <EmailForm />}
          {activeTab === 'sms' && <SMSForm />}
        </div>
      </div>
    </div>
  )
}

const EmailForm: React.FC = () => (
  <form className="space-y-4">
    <input
      type="email"
      placeholder="Recipient Email"
      className="w-full p-2 border rounded"
    />
    <input
      type="text"
      placeholder="Subject"
      className="w-full p-2 border rounded"
    />
    <textarea
      placeholder="Email Content"
      className="w-full p-2 border rounded h-40"
    ></textarea>
    <button
      type="submit"
      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 flex items-center"
    >
      <Send className="mr-2" size={18} /> Send Email
    </button>
  </form>
)

const SMSForm: React.FC = () => (
  <form className="space-y-4">
    <input
      type="tel"
      placeholder="Recipient Phone Number"
      className="w-full p-2 border rounded"
    />
    <textarea
      placeholder="SMS Content"
      className="w-full p-2 border rounded h-40"
    ></textarea>
    <button
      type="submit"
      className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 flex items-center"
    >
      <Send className="mr-2" size={18} /> Send SMS
    </button>
  </form>
)

export default CommunicationCenter