import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          <div>© 2024 BureauEase. All rights reserved.</div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-300">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300">Terms of Service</a>
            <a href="#" className="hover:text-gray-300">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer