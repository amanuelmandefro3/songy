import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import { Song } from '../api/songApi'
import { addSong, updateSongAction } from '../store/songSlice'
import { AppDispatch } from '../store'

interface SongFormProps {
  song?: Song | null
  onClose: () => void
}

interface SongFormValues {
  title: string
  artist: string
  album: string
  genre: string
  releaseDate: string
}

const schema = yup.object({
  title: yup.string().required('Title is required').max(100, 'Title must be 100 characters or less'),
  artist: yup.string().required('Artist is required'),
  album: yup.string().required('Album is required'),
  genre: yup.string().required('Genre is required'),
  releaseDate: yup.string()
    .required('Release date is required')
    .test('is-valid-date', 'Release date must be a valid date', value => !isNaN(Date.parse(value)))
    .test('not-in-future', 'Release date cannot be in the future', value => new Date(value) <= new Date()),
}).required()

const genres = ['Rock', 'Pop', 'Hip Hop', 'Jazz', 'Classical', 'Electronic', 'R&B', 'Country', 'Blues', 'Reggae']

const SongForm: React.FC<SongFormProps> = ({ song, onClose }) => {
  const dispatch = useDispatch<AppDispatch>()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { control, handleSubmit, formState: { errors } } = useForm<SongFormValues>({
    resolver: yupResolver(schema),
    defaultValues: song ? {
      ...song,
      releaseDate: new Date(song.releaseDate).toISOString().split('T')[0]
    } : {
      title: '',
      artist: '',
      album: '',
      genre: '',
      releaseDate: new Date().toISOString().split('T')[0],
    },
  })

  const onSubmit = async (data: SongFormValues) => {
    setIsSubmitting(true)
    try {
      if (song) {
        await dispatch(updateSongAction({ id: song._id, song: data })).unwrap()
        toast.success('Song updated successfully')
      } else {
        await dispatch(addSong(data)).unwrap()
        toast.success('Song added successfully')
      }
      onClose()
    } catch (error) {
      toast.error(`Failed to save song: ${(error as Error).message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">{song ? 'Edit Song' : 'Add New Song'}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  {...field}
                  type="text"
                  id="title"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
              </div>
            )}
          />
          <Controller
            name="artist"
            control={control}
            render={({ field }) => (
              <div>
                <label htmlFor="artist" className="block text-sm font-medium text-gray-700">Artist</label>
                <input
                  {...field}
                  type="text"
                  id="artist"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
                {errors.artist && <p className="text-red-500 text-sm mt-1">{errors.artist.message}</p>}
              </div>
            )}
          />
          <Controller
            name="album"
            control={control}
            render={({ field }) => (
              <div>
                <label htmlFor="album" className="block text-sm font-medium text-gray-700">Album</label>
                <input
                  {...field}
                  type="text"
                  id="album"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
                {errors.album && <p className="text-red-500 text-sm mt-1">{errors.album.message}</p>}
              </div>
            )}
          />
          <Controller
            name="genre"
            control={control}
            render={({ field }) => (
              <div>
                <label htmlFor="genre" className="block text-sm font-medium text-gray-700">Genre</label>
                <select
                  {...field}
                  id="genre"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">Select a genre</option>
                  {genres.map((genre) => (
                    <option key={genre} value={genre}>
                      {genre}
                    </option>
                  ))}
                </select>
                {errors.genre && <p className="text-red-500 text-sm mt-1">{errors.genre.message}</p>}
              </div>
            )}
          />
          <Controller
            name="releaseDate"
            control={control}
            render={({ field }) => (
              <div>
                <label htmlFor="releaseDate" className="block text-sm font-medium text-gray-700">Release Date</label>
                <input
                  {...field}
                  type="date"
                  id="releaseDate"
                  max={new Date().toISOString().split('T')[0]}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
                {errors.releaseDate && <p className="text-red-500 text-sm mt-1">{errors.releaseDate.message}</p>}
              </div>
            )}
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 disabled:opacity-50"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? (song ? 'Updating...' : 'Adding...') : (song ? 'Update' : 'Add') + ' Song'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SongForm

