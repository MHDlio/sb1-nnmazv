import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import CommunicationCenter from './components/CommunicationCenter'
import ProcessNavigator from './components/ProcessNavigator'
import TemplateEditor from './components/TemplateEditor'
import Header from './components/Header'
import Footer from './components/Footer'
import AutomatedFormFilling from './components/AutomatedFormFilling'
import InteractiveTutorial from './components/InteractiveTutorial'
import ChatbotAssistance from './components/ChatbotAssistance'
import FormLibrary from './components/FormLibrary'

function App() {
  const [activeTab, setActiveTab] = useState<'download' | 'upload'>('download')

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/communication" element={<CommunicationCenter />} />
            <Route path="/process" element={<ProcessNavigator />} />
            <Route path="/templates" element={<TemplateEditor />} />
            <Route path="/form-filling" element={
              <div>
                <div className="flex space-x-4 mb-4">
                  <button
                    onClick={() => setActiveTab('download')}
                    className={`py-2 px-4 rounded ${activeTab === 'download' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                  >
                    Download Forms
                  </button>
                  <button
                    onClick={() => setActiveTab('upload')}
                    className={`py-2 px-4 rounded ${activeTab === 'upload' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                  >
                    Upload Document
                  </button>
                </div>
                {activeTab === 'download' && <FormLibrary />}
                {activeTab === 'upload' && <AutomatedFormFilling />}
              </div>
            } />
          </Routes>
        </main>
        <Footer />
        <InteractiveTutorial />
        <ChatbotAssistance />
      </div>
    </Router>
  )
}

export default App