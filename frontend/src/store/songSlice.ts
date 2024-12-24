import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getSongs, createSong, updateSong, deleteSong, Song } from '../api/songApi';

export interface SongState {
  songs: Song[];
  totalSongs: number;
  totalPages: number;
  currentPage: number;
  loading: boolean;
  error: string | null;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  currentPage: number;
}

const initialState: SongState = {
  songs: [],
  totalSongs: 0,
  totalPages: 0,
  currentPage: 1,
  loading: false,
  error: null,
};

export const fetchSongs = createAsyncThunk(
  'songs/fetchSongs',
  async ({ page, limit }: { page: number; limit: number }) => {
    const response = await getSongs(page, limit);
    return response;
  }
);

export const addSong = createAsyncThunk(
  'songs/addSong',
  async (song: Omit<Song, '_id'>, { dispatch, getState }) => {
    await createSong(song);
    const state = getState() as { songs: SongState };
    await dispatch(fetchSongs({ page: state.songs.currentPage, limit: 5 }));
  }
);

export const updateSongAction = createAsyncThunk(
  'songs/updateSong',
  async ({ id, song }: { id: string; song: Omit<Song, '_id'> }, { dispatch, getState }) => {
    await updateSong(id, song);
    const state = getState() as { songs: SongState };
    await dispatch(fetchSongs({ page: state.songs.currentPage, limit: 5 }));
  }
);

export const deleteSongAction = createAsyncThunk(
  'songs/deleteSong',
  async (id: string, { dispatch, getState }) => {
    await deleteSong(id);
    const state = getState() as { songs: SongState };
    await dispatch(fetchSongs({ page: state.songs.currentPage, limit: 5 }));
  }
);

const songSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSongs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSongs.fulfilled, (state, action) => {
        state.loading = false;
        state.songs = action.payload.songs;
        state.totalSongs = action.payload.total;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.error = null;
      })
      .addCase(fetchSongs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch songs';
      })
      .addCase(addSong.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSong.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add song';
      })
      .addCase(updateSongAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSongAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update song';
      })
      .addCase(deleteSongAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSongAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete song';
      });
  },
});

export default songSlice.reducer;

