import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSongs, setLoading, setError, deleteSongSuccess } from '../store/songSlice'
import { RootState, AppDispatch } from '../store'
import SongForm from './SongForm'
import api from '../services/api'
import { Song } from '../store/songSlice'

const SONGS_PER_PAGE = 10

const SongList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { songs, loading, error } = useSelector((state: RootState) => state.songs)
  const [currentPage, setCurrentPage] = useState(1)
  const [editingSong, setEditingSong] = useState<Song | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)

  useEffect(() => {
    const fetchSongs = async () => {
      dispatch(setLoading(true))
      try {
        const data = await api.getSongs(currentPage, SONGS_PER_PAGE)
        dispatch(setSongs(data))
      } catch (err) {
        dispatch(setError(err instanceof Error ? err.message : 'Failed to fetch songs'))
      }
    }
    fetchSongs()
  }, [currentPage, dispatch])

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this song?')) {
      try {
        await api.deleteSong(id)
        dispatch(deleteSongSuccess(id))
      } catch (err) {
        dispatch(setError(err instanceof Error ? err.message : 'Failed to delete song'))
      }
    }
  }

  const handleEdit = (song: Song) => {
    setEditingSong(song)
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setEditingSong(null)
    setIsFormOpen(false)
  }

  if (loading) return <div>Loading songs...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-green-600">Songs List</h2>
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Add New Song
        </button>
      </div>

      <ul className="space-y-4">
        {songs.map((song) => (
          <li key={song.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div className="flex-1 mb-2 sm:mb-0">
              <h3 className="text-xl font-semibold">{song.title}</h3>
              <p className="text-gray-600">Artist: {song.artist} | Album: {song.album}</p>
              <p className="text-gray-500">Genre: {song.genre} | Released: {new Date(song.releasedDate).toLocaleDateString()}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(song)}
                className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(song.id)}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {isFormOpen && (
        <SongForm
          song={editingSong}
          onClose={handleCloseForm}
        />
      )}
    </div>
  )
}

export default SongList