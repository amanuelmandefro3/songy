import React from 'react'
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
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: song || {
      title: '',
      artist: '',
      album: '',
      genre: '',
      releasedDate: '',
    },
  })

  const onSubmit = (data: Omit<Song, 'id'>) => {
    if (song) {
      dispatch(updateSong({ ...data, id: song.id }))
    } else {
      dispatch(addSong(data))
    }
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">{song ? 'Edit Song' : 'Add New Song'}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="Title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              )}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>
          <div>
            <Controller
              name="artist"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="Artist"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              )}
            />
            {errors.artist && <p className="text-red-500 text-sm mt-1">{errors.artist.message}</p>}
          </div>
          <div>
            <Controller
              name="album"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="Album"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              )}
            />
            {errors.album && <p className="text-red-500 text-sm mt-1">{errors.album.message}</p>}
          </div>
          <div>
            <Controller
              name="genre"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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
            {errors.genre && <p className="text-red-500 text-sm mt-1">{errors.genre.message}</p>}
          </div>
          <div>
            <Controller
              name="releasedDate"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              )}
            />
            {errors.releasedDate && <p className="text-red-500 text-sm mt-1">{errors.releasedDate.message}</p>}
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              {song ? 'Update' : 'Add'} Song
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SongForm