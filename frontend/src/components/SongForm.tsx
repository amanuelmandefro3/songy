import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addSong, updateSong, Song } from '../store/songSlice'
import { AppDispatch } from '../store'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

interface SongFormProps {
  song?: Song | null
  onClose: () => void
}

const schema = yup.object({
  title: yup.string().required('Title is required'),
  artist: yup.string().required('Artist is required'),
  album: yup.string().required('Album is required'),
  genre: yup.string().required('Genre is required'),
  releasedDate: yup.date().required('Released date is required').max(new Date(), 'Released date cannot be in the future'),
}).required()

const genres = ['Rock', 'Pop', 'Hip Hop', 'Jazz', 'Classical', 'Electronic', 'R&B', 'Country', 'Blues', 'Reggae']

const SongForm: React.FC<SongFormProps> = ({ song, onClose }) => {
  const dispatch = useDispatch<AppDispatch>()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: song ? {
      ...song,
      releasedDate: new Date(song.releasedDate).toISOString().split('T')[0]
    } : {
      title: '',
      artist: '',
      album: '',
      genre: '',
      releasedDate: '',
    },
  })

  const onSubmit = async (data: Omit<Song, 'id'>) => {
    setSubmitting(true)
    setError(null)
    try {
      if (song) {
        await dispatch(updateSong({ ...data, id: song.id })).unwrap()
      } else {
        await dispatch(addSong(data)).unwrap()
      }
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save song')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{song ? 'Edit Song' : 'Add New Song'}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  disabled={submitting}
                />
              )}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Artist
            </label>
            <Controller
              name="artist"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  disabled={submitting}
                />
              )}
            />
            {errors.artist && (
              <p className="text-red-500 text-sm mt-1">{errors.artist.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Album
            </label>
            <Controller
              name="album"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  disabled={submitting}
                />
              )}
            />
            {errors.album && (
              <p className="text-red-500 text-sm mt-1">{errors.album.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Genre
            </label>
            <Controller
              name="genre"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  disabled={submitting}
                >
                  <option value="">Select Genre</option>
                  {genres.map((genre) => (
                    <option key={genre} value={genre}>
                      {genre}
                    </option>
                  ))}
                </select>
              )}
            />
            {errors.genre && (
              <p className="text-red-500 text-sm mt-1">{errors.genre.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Release Date
            </label>
            <Controller
              name="releasedDate"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  disabled={submitting}
                />
              )}
            />
            {errors.releasedDate && (
              <p className="text-red-500 text-sm mt-1">{errors.releasedDate.message}</p>
            )}
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50"
              disabled={submitting}
            >
              {submitting ? 'Saving...' : song ? 'Update' : 'Add'} Song
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SongForm