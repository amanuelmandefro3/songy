import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getStatistics } from '../api/songApi'

export interface Statistics {
  totalSongs: number
  totalArtists: number
  totalAlbums: number
  totalGenres: number
  songsByGenre: { count: number; _id: string; name: string }[]
  songsByArtist: { songs: number; _id: string; name: string; albums: number }[]
  songsByAlbum: { count: number; artist: string; _id: string; name: string }[]
  topArtists: { songCount: number; _id: string; name: string }[]
  latestSongs: { _id: string; title: string; artist: string; album: string; releaseDate: string }[]
}

interface StatisticsState {
  data: Statistics | null
  loading: boolean
  error: string | null
}

const initialState: StatisticsState = {
  data: null,
  loading: false,
  error: null,
}

export const fetchStatistics = createAsyncThunk(
  'statistics/fetchStatistics',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getStatistics()
      return response
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      }
      return rejectWithValue('Failed to fetch statistics')
    }
  }
)

const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStatistics.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchStatistics.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        state.error = null
      })
      .addCase(fetchStatistics.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch statistics'
      })
  },
})

export default statisticsSlice.reducer

