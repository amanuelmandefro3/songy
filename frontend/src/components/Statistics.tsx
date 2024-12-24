import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../store'
import { fetchStatistics } from '../store/statisticsSlice'
import Shimmer from './Shimmer'

const Statistics: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { data: statistics, loading, error } = useSelector((state: RootState) => state.statistics)
  const { songs } = useSelector((state: RootState) => state.songs)

  useEffect(() => {
    dispatch(fetchStatistics())
  }, [dispatch, songs.length])

  if (error) {
    return <div className="text-red-500">Error: {error}</div>
  }

  const renderShimmer = () => (
    <div className="space-y-2">
      <Shimmer className="h-4 w-3/4" />
      <Shimmer className="h-4 w-1/2" />
      <Shimmer className="h-4 w-5/6" />
      <Shimmer className="h-4 w-2/3" />
    </div>
  )

  return (
    <div className="bg-white rounded-lg shadow-md sm:p-6">
      <h2 className="text-2xl font-semibold text-green-600 mb-6">Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2 ">General</h3>
            {loading ? (
              renderShimmer()
            ) : (
              <ul className="space-y-2">
                <li>Total Songs: {statistics?.totalSongs}</li>
                <li>Total Artists: {statistics?.totalArtists}</li>
                <li>Total Albums: {statistics?.totalAlbums}</li>
                <li>Total Genres: {statistics?.totalGenres}</li>
              </ul>
            )}
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 ">Songs per Genre</h3>
            {loading ? (
              renderShimmer()
            ) : (
              <ul className="space-y-2">
                {statistics?.songsByGenre?.map((genre) => (
                  <li key={`${genre._id}-${genre.name}`}>{genre.name}: {genre.count}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2 ">Songs per Artist</h3>
            {loading ? (
              renderShimmer()
            ) : (
              <ul className="space-y-2">
                {statistics?.songsByArtist?.map((artist) => (
                  <li key={`${artist._id}-${artist.name}`}>{artist.name}: {artist.songs}</li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 ">Albums per Artist</h3>
            {loading ? (
              renderShimmer()
            ) : (
              <ul className="space-y-2">
                {statistics?.songsByArtist?.map((artist) => (
                  <li key={`${artist._id}-${artist.name}`}>{artist.name}: {artist.albums}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Statistics

