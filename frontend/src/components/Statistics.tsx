import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'

const Statistics: React.FC = () => {
  const statistics = useSelector((state: RootState) => state.statistics.data)

  return (
    <div className="bg-white rounded-lg shadow-md sm:p-6">
      <h2 className="text-2xl font-semibold text-green-600 mb-6">Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2 text-green-500">General</h3>
            <ul className="space-y-2">
              <li>Total Songs: {statistics.totalSongs}</li>
              <li>Total Artists: {statistics.totalArtists}</li>
              <li>Total Albums: {statistics.totalAlbums}</li>
              <li>Total Genres: {statistics.totalGenres}</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-green-500">Songs per Genre</h3>
            <ul className="space-y-2">
              {Object.entries(statistics.songsPerGenre).map(([genre, count]) => (
                <li key={genre}>{genre}: {count}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2 text-green-500">Songs per Artist</h3>
            <ul className="space-y-2">
              {Object.entries(statistics.songsPerArtist).map(([artist, count]) => (
                <li key={artist}>{artist}: {count}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-green-500">Albums per Artist</h3>
            <ul className="space-y-2">
              {Object.entries(statistics.albumsPerArtist).map(([artist, count]) => (
                <li key={artist}>{artist}: {count}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Statistics

