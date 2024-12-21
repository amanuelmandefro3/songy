import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom'
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
      <div className="font-sans bg-gray-100 min-h-screen">
        <header className="p-4 shadow-sm">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center">
            <Link to="/" className="text-3xl font-bold text-green-500 mb-2 sm:mb-0">Songy</Link>
            <nav className="flex items-center space-x-6">
              <NavLink to="/">Songs</NavLink>
              <NavLink to="/statistics">Statistics</NavLink>
              <button
                onClick={() => setIsAddFormOpen(true)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors text-sm font-medium"
              >
                Add New Song
              </button>
            </nav>
          </div>
        </header>
        <main className="max-w-6xl mx-auto  sm:p-8">
          <Routes>
            <Route path="/" element={<SongList />} />
            <Route path="/statistics" element={<Statistics />} />
          </Routes>
        </main>
        {isAddFormOpen && (
          <SongForm onClose={() => setIsAddFormOpen(false)} />
        )}
      </div>
    </Router>
  )
}

export default App

