// src/store/songSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SongDTO } from '../services/api'
import { AppDispatch } from '.'
import api from '../services/api'

export interface Song {
  id: string
  title: string
  artist: string
  album: string
  genre: string
  releasedDate: string
}

interface SongState {
  songs: Song[]
  loading: boolean
  error: string | null
}

const initialState: SongState = {
  songs: [],
  loading: false,
  error: null
}

const songSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    setSongs: (state, action: PayloadAction<SongDTO[]>) => {
      state.songs = action.payload.map(song => ({
        id: song._id,
        title: song.title,
        artist: song.artist,
        album: song.album,
        genre: song.genre,
        releasedDate: song.releaseDate
      }));
      state.loading = false;
      state.error = null;
    },
    addSongSuccess: (state, action: PayloadAction<SongDTO>) => {
      const newSong: Song = {
        id: action.payload._id,
        title: action.payload.title,
        artist: action.payload.artist,
        album: action.payload.album,
        genre: action.payload.genre,
        releasedDate: action.payload.releaseDate
      };
      state.songs.push(newSong);
    },
    updateSongSuccess: (state, action: PayloadAction<SongDTO>) => {
      const index = state.songs.findIndex(song => song.id === action.payload._id);
      if (index !== -1) {
        state.songs[index] = {
          id: action.payload._id,
          title: action.payload.title,
          artist: action.payload.artist,
          album: action.payload.album,
          genre: action.payload.genre,
          releasedDate: action.payload.releaseDate
        };
      }
    },
    deleteSongSuccess: (state, action: PayloadAction<string>) => {
      state.songs = state.songs.filter(song => song.id !== action.payload);
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

// Async thunk actions
export const addSong = (songData: Omit<Song, 'id'>) => async (dispatch: AppDispatch) => {
  try {
    const response = await api.addSong({
      ...songData,
      releaseDate: songData.releasedDate
    });
    dispatch(addSongSuccess(response));
    return response;
  } catch (error) {
    dispatch(setError(error instanceof Error ? error.message : 'Failed to add song'));
    throw error;
  }
};

export const updateSong = (song: Song) => async (dispatch: AppDispatch) => {
  try {
    const response = await api.updateSong(song.id, {
      title: song.title,
      artist: song.artist,
      album: song.album,
      genre: song.genre,
      releaseDate: song.releasedDate
    });
    dispatch(updateSongSuccess(response));
    return response;
  } catch (error) {
    dispatch(setError(error instanceof Error ? error.message : 'Failed to update song'));
    throw error;
  }
};

export const {
  setSongs,
  addSongSuccess,
  updateSongSuccess,
  deleteSongSuccess,
  setLoading,
  setError
} = songSlice.actions;

export default songSlice.reducer;