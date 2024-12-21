import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Statistics {
  totalSongs: number
  totalArtists: number
  totalAlbums: number
  totalGenres: number
  songsPerGenre: Record<string, number>
  songsPerArtist: Record<string, number>
  albumsPerArtist: Record<string, number>
}

interface StatisticsState {
  data: Statistics
}

const initialState: StatisticsState = {
  data: {
    totalSongs: 7,
    totalArtists: 7,
    totalAlbums: 7,
    totalGenres: 3,
    songsPerGenre: {
      Rock: 4,
      Pop: 2,
      Grunge: 1,
    },
    songsPerArtist: {
      Queen: 1,
      'Michael Jackson': 1,
      Nirvana: 1,
      'Bob Dylan': 1,
      'John Lennon': 1,
      'The Beatles': 1,
      'Prince': 1,
    },
    albumsPerArtist: {
      Queen: 1,
      'Michael Jackson': 1,
      Nirvana: 1,
      'Bob Dylan': 1,
      'John Lennon': 1,
      'The Beatles': 1,
      'Prince': 1,
    },
  },
}

const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {
    updateStatistics: (state, action: PayloadAction<Statistics>) => {
      state.data = action.payload
    },
  },
})

export const { updateStatistics } = statisticsSlice.actions

export default statisticsSlice.reducer