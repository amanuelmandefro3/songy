import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-white shadow-sm mt-auto border-t">
      <div className="max-w-6xl mx-auto py-4 px-4 text-center text-gray-600">
        &copy; {new Date().getFullYear()} Songy. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer