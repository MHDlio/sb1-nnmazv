// components/CommunicationCenter.tsx
import React, { useState } from 'react'
import { Send, Inbox, Phone } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const CommunicationCenter: React.FC = () => {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<'email' | 'sms'>('email')

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">{t('communicationCenter.title')}</h1>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="flex border-b">
          <button
            className={`flex-1 py-4 px-6 text-center focus:outline-none ${
              activeTab === 'email' ? 'bg-gray-100 font-semibold' : ''
            }`}
            onClick={() => setActiveTab('email')}
            aria-pressed={activeTab === 'email'}
            aria-label={t('communicationCenter.emailTab')}
          >
            <Inbox className="inline-block mr-2" size={18} aria-hidden="true" />
            {t('communicationCenter.email')}
          </button>
          <button
            className={`flex-1 py-4 px-6 text-center focus:outline-none ${
              activeTab === 'sms' ? 'bg-gray-100 font-semibold' : ''
            }`}
            onClick={() => setActiveTab('sms')}
            aria-pressed={activeTab === 'sms'}
            aria-label={t('communicationCenter.smsTab')}
          >
            <Phone className="inline-block mr-2" size={18} aria-hidden="true" />
            {t('communicationCenter.sms')}
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

const EmailForm: React.FC = () => {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [content, setContent] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    if (!email || !subject || !content) {
      setError(t('communicationCenter.allFieldsRequired'))
      return
    }
    setError(null)
    setSuccess(null)
    try {
      const response = await fetch('/api/communications/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, subject, content }),
      })
      if (!response.ok) {
        throw new Error(t('communicationCenter.errorSendingEmail'))
      }
      setSuccess(t('communicationCenter.emailSent'))
      setEmail('')
      setSubject('')
      setContent('')
    } catch (error: any) {
      setError(error.message || t('communicationCenter.genericError'))
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <div>
        <label htmlFor="recipient-email" className="block text-sm font-medium text-gray-700">
          {t('communicationCenter.recipientEmail')}
        </label>
        <input
          type="email"
          id="recipient-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="email-subject" className="block text-sm font-medium text-gray-700">
          {t('communicationCenter.subject')}
        </label>
        <input
          type="text"
          id="email-subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="mt-1 w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="email-content" className="block text-sm font-medium text-gray-700">
          {t('communicationCenter.emailContent')}
        </label>
        <textarea
          id="email-content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mt-1 w-full p-2 border rounded h-40"
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 flex items-center focus:outline-none focus:ring-2 focus:ring-blue-400"
        aria-label={t('communicationCenter.sendEmail')}
      >
        <Send className="mr-2" size={18} aria-hidden="true" />
        {t('communicationCenter.sendEmail')}
      </button>
    </form>
  )
}

const SMSForm: React.FC = () => {
  const { t } = useTranslation()
  const [phoneNumber, setPhoneNumber] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    if (!phoneNumber || !message) {
      setError(t('communicationCenter.allFieldsRequired'))
      return
    }
    setError(null)
    setSuccess(null)
    try {
      const response = await fetch('/api/communications/send-sms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber, message }),
      })
      if (!response.ok) {
        throw new Error(t('communicationCenter.errorSendingSms'))
      }
      setSuccess(t('communicationCenter.smsSent'))
      setPhoneNumber('')
      setMessage('')
    } catch (error: any) {
      setError(error.message || t('communicationCenter.genericError'))
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <div>
        <label htmlFor="recipient-phone" className="block text-sm font-medium text-gray-700">
          {t('communicationCenter.recipientPhone')}
        </label>
        <input
          type="tel"
          id="recipient-phone"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="mt-1 w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="sms-content" className="block text-sm font-medium text-gray-700">
          {t('communicationCenter.smsContent')}
        </label>
        <textarea
          id="sms-content"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-1 w-full p-2 border rounded h-40"
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 flex items-center focus:outline-none focus:ring-2 focus:ring-green-400"
        aria-label={t('communicationCenter.sendSms')}
      >
        <Send className="mr-2" size={18} aria-hidden="true" />
        {t('communicationCenter.sendSms')}
      </button>
    </form>
  )
}

export default CommunicationCenter
