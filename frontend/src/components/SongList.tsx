import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Song, deleteSong } from '../store/songSlice'
import { RootState, AppDispatch } from '../store'
import SongForm from './SongForm'
import Pagination from './Pagination'

const SONGS_PER_PAGE = 5

const SongList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const songs = useSelector((state: RootState) => state.songs.songs)
  const [currentPage, setCurrentPage] = useState(1)
  const [editingSong, setEditingSong] = useState<Song | null>(null)

  const totalPages = Math.ceil(songs.length / SONGS_PER_PAGE)

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages || 1)
    }
  }, [songs, currentPage, totalPages])

  const indexOfLastSong = currentPage * SONGS_PER_PAGE
  const indexOfFirstSong = indexOfLastSong - SONGS_PER_PAGE
  const currentSongs = songs.slice(indexOfFirstSong, indexOfLastSong)

  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber)

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this song?')) {
      dispatch(deleteSong(id))
    }
  }

  return (
    <div className="space-y-4">
      <ul className="space-y-4">
        {currentSongs.map((song) => (
          <li key={song.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div className="flex-1 mb-2 sm:mb-0">
              <h3 className="text-xl font-semibold">{song.title}</h3>
              <p className="text-gray-600">Artist: {song.artist} | Album: {song.album}</p>
            </div>
            <div className="flex-1 mb-2 sm:mb-0 sm:text-center">
              <p className="text-gray-600">Genre: {song.genre}</p>
              <p className="text-gray-600">Released: {new Date(song.releasedDate).toLocaleDateString()}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => setEditingSong(song)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(song.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <Pagination
        songsPerPage={SONGS_PER_PAGE}
        totalSongs={songs.length}
        paginate={handlePageChange}
        currentPage={currentPage}
      />
      {editingSong && (
        <SongForm
          song={editingSong}
          onClose={() => setEditingSong(null)}
        />
      )}
    </div>
  )
}

export default SongList

