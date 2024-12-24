import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'
import SongList from './components/SongList'
import Statistics from './components/Statistics'
import SongForm from './components/SongForm'

const NavLink: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => {
  const location = useLocation()
  const isActive = location.pathname === to

  return (
    <Link
      to={to}
      className={`text-lg font-medium transition-colors ${
        isActive ? 'text-green-500' : 'text-gray-600 hover:text-green-400'
      }`}
    >
      {children}
    </Link>
  )
}

const App: React.FC = () => {
  const [isAddFormOpen, setIsAddFormOpen] = React.useState(false)

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-center h-16">
              <Link to="/" className="text-2xl font-bold text-green-500">
                Songy
              </Link>
              <nav className="flex items-center space-x-8">
                <NavLink to="/">Songs</NavLink>
                <NavLink to="/statistics">Statistics</NavLink>
                <button
                  onClick={() => setIsAddFormOpen(true)}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors text-sm font-medium"
                >
                  Add New Song
                </button>
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <Routes>
                <Route path="/" element={<SongList />} />
                <Route path="/statistics" element={<Statistics />} />
              </Routes>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white mt-auto border-t">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-500">
                © 2023 Songy. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-gray-500 transition-colors"
                  aria-label="Facebook"
                >
                  <FaFacebook className="h-5 w-5" />
                </a>
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-gray-500 transition-colors"
                  aria-label="Instagram"
                >
                  <FaInstagram className="h-5 w-5" />
                </a>
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-gray-500 transition-colors"
                  aria-label="Twitter"
                >
                  <FaTwitter className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </footer>

        {/* Modal */}
        {isAddFormOpen && (
          <SongForm onClose={() => setIsAddFormOpen(false)} />
        )}
        
        {/* Toast Container */}
        <ToastContainer 
          position="top-right" 
          autoClose={3000} 
          hideProgressBar={false} 
          newestOnTop={false} 
          closeOnClick 
          rtl={false} 
          pauseOnFocusLoss 
          draggable 
          pauseOnHover 
        />
      </div>
    </Router>
  )
}

export default App

