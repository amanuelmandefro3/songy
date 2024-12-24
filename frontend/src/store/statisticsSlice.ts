import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { StatisticsResponse } from '../services/api'

interface StatisticsState {
  data: {
    totalSongs: number
    totalArtists: number
    totalAlbums: number
    totalGenres: number
    songsPerGenre: Record<string, number>
    songsPerArtist: Record<string, number>
    albumsPerArtist: Record<string, number>
    latestSongs: Array<{
      _id: string
      title: string
      artist: string
      album: string
      releaseDate: string
    }>
  }
  loading: boolean
  error: string | null
}

const initialState: StatisticsState = {
  data: {
    totalSongs: 0,
    totalArtists: 0,
    totalAlbums: 0,
    totalGenres: 0,
    songsPerGenre: {},
    songsPerArtist: {},
    albumsPerArtist: {},
    latestSongs: []
  },
  loading: false,
  error: null
}

const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {
    setStatistics: (state, action: PayloadAction<StatisticsResponse>) => {
      const songsPerGenre = action.payload.songsByGenre.reduce((acc, curr) => {
        acc[curr.name] = curr.count;
        return acc;
      }, {} as Record<string, number>);

      const songsPerArtist = action.payload.songsByArtist.reduce((acc, curr) => {
        acc[curr.name] = curr.songs;
        return acc;
      }, {} as Record<string, number>);

      const albumsPerArtist = action.payload.songsByArtist.reduce((acc, curr) => {
        acc[curr.name] = curr.albums;
        return acc;
      }, {} as Record<string, number>);

      state.data = {
        totalSongs: action.payload.totalSongs,
        totalArtists: action.payload.totalArtists,
        totalAlbums: action.payload.totalAlbums,
        totalGenres: action.payload.totalGenres,
        songsPerGenre,
        songsPerArtist,
        albumsPerArtist,
        latestSongs: action.payload.latestSongs
      };
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

export const { setStatistics, setLoading, setError } = statisticsSlice.actions;

export default statisticsSlice.reducer;

