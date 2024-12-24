import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { fetchSongs, deleteSongAction } from '../store/songSlice'
import { Song } from '../api/songApi'
import { RootState, AppDispatch } from '../store'
import SongForm from './SongForm'
import Pagination from './Pagination'
import DeleteConfirmationModal from './DeleteConfirmationModal'
import Shimmer from './Shimmer'

const SONGS_PER_PAGE = 5

const SongList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { songs, totalSongs, currentPage, totalPages, loading, error } = useSelector((state: RootState) => state.songs)
  const [editingSong, setEditingSong] = useState<Song | null>(null)
  const [deletingSongId, setDeletingSongId] = useState<string | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [songToDelete, setSongToDelete] = useState<Song | null>(null)

  useEffect(() => {
    dispatch(fetchSongs({ page: currentPage, limit: SONGS_PER_PAGE }))
  }, [dispatch, currentPage])

  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error}`)
    }
  }, [error])

  const handlePageChange = (pageNumber: number) => {
    dispatch(fetchSongs({ page: pageNumber, limit: SONGS_PER_PAGE }))
  }

  const handleDelete = async () => {
    if (songToDelete) {
      setDeletingSongId(songToDelete._id)
      try {
        await dispatch(deleteSongAction(songToDelete._id)).unwrap()
        toast.success('Song deleted successfully')
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error(`Failed to delete song: ${error.message}`)
        } else {
          toast.error('Failed to delete song: unknown error')
        }
      } finally {
        setDeletingSongId(null)
        setSongToDelete(null)
        setIsDeleteModalOpen(false)
      }
    }
  }

  const renderShimmer = () => (
    <li className="bg-white rounded-lg shadow-md p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
      <div className="flex-1 mb-2 sm:mb-0 space-y-2">
        <Shimmer className="h-6 w-3/4" />
        <Shimmer className="h-4 w-1/2" />
        <Shimmer className="h-4 w-2/3" />
      </div>
      <div className="flex-1 mb-2 sm:mb-0 sm:text-center space-y-2">
        <Shimmer className="h-4 w-1/2  justify-self-start" />
        <Shimmer className="h-4 w-2/3 justify-self-start" />
      </div>
      <div className="space-x-2">
        <Shimmer className="h-10 w-20 inline-block" />
        <Shimmer className="h-10 w-20 inline-block" />
      </div>
    </li>
  )

  return (
    <div className="space-y-4">
      {loading ? ( 
        <ul className="space-y-4">
          {[...Array(SONGS_PER_PAGE)].map((_, index) => (
            <React.Fragment key={index}>
              {renderShimmer()}
            </React.Fragment>
          ))}
        </ul>
      ) : songs && songs.length > 0 ? (
        <>
          <ul className="space-y-4">
            {songs.map((song) => (
              <li key={song._id} className="bg-white rounded-lg shadow-md p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div className="flex-1 mb-2 sm:mb-0">
                  <h3 className="text-xl font-semibold">{song.title}</h3>
                  <p className="text-gray-600">Artist:{song.artist}</p>
                  <p className="text-gray-600">Album: {song.album}</p>
                </div>
                <div className="flex-1 mb-2 sm:mb-0 sm:text-center">
                  <p className="text-gray-600 justify-self-start">Genre: {song.genre}</p>
                  <p className="text-gray-600 justify-self-start">Released: {new Date(song.releaseDate).toLocaleDateString()}</p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => setEditingSong(song)}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors disabled:opacity-50"
                    disabled={loading}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setSongToDelete(song)
                      setIsDeleteModalOpen(true)
                    }}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors disabled:opacity-50"
                    disabled={loading || deletingSongId === song._id}
                  >
                    {deletingSongId === song._id ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <Pagination
            songsPerPage={SONGS_PER_PAGE}
            totalSongs={totalSongs}
            totalPages={totalPages}
            paginate={handlePageChange}
            currentPage={currentPage}
          />
        </>
      ) : (
        <div>No songs found.</div>
      )}
      {editingSong && (
        <SongForm song={editingSong} onClose={() => setEditingSong(null)} />
      )}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false)
          setSongToDelete(null)
        }}
        onConfirm={handleDelete}
        songTitle={songToDelete?.title || ''}
      />
    </div>
  )
}

export default SongList