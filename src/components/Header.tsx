import React from 'react'
import { Link } from 'react-router-dom'
import { FileText, MessageSquare, Navigation, Layout, Upload } from 'lucide-react'

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="text-xl font-semibold text-gray-700">
            <Link to="/" className="flex items-center">
              <FileText className="mr-2" />
              BureauEase
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link to="/" className="flex items-center text-gray-600 hover:text-gray-900">
              <Layout className="mr-1" size={18} />
              Dashboard
            </Link>
            <Link to="/communication" className="flex items-center text-gray-600 hover:text-gray-900">
              <MessageSquare className="mr-1" size={18} />
              Communication
            </Link>
            <Link to="/process" className="flex items-center text-gray-600 hover:text-gray-900">
              <Navigation className="mr-1" size={18} />
              Process
            </Link>
            <Link to="/templates" className="flex items-center text-gray-600 hover:text-gray-900">
              <FileText className="mr-1" size={18} />
              Templates
            </Link>
            <Link to="/form-filling" className="flex items-center text-gray-600 hover:text-gray-900">
              <Upload className="mr-1" size={18} />
              Form Filling
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header