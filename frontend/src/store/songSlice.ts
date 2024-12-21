import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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
}

const initialSongs: Song[] = [
  { id: '1', title: 'Bohemian Rhapsody', artist: 'Queen', album: 'A Night at the Opera', genre: 'Rock', releasedDate: '1975-10-31' },
  { id: '2', title: 'Billie Jean', artist: 'Michael Jackson', album: 'Thriller', genre: 'Pop', releasedDate: '1983-01-02' },
  { id: '3', title: 'Smells Like Teen Spirit', artist: 'Nirvana', album: 'Nevermind', genre: 'Rock', releasedDate: '1991-09-10' },
  { id: '4', title: 'Like a Rolling Stone', artist: 'Bob Dylan', album: 'Highway 61 Revisited', genre: 'Rock', releasedDate: '1965-07-20' },
  { id: '5', title: 'Imagine', artist: 'John Lennon', album: 'Imagine', genre: 'Rock', releasedDate: '1971-10-11' },
  { id: '6', title: 'Hey Jude', artist: 'The Beatles', album: 'The Beatles (White Album)', genre: 'Rock', releasedDate: '1968-08-26' },
  { id: '7', title: 'Purple Rain', artist: 'Prince', album: 'Purple Rain', genre: 'Pop', releasedDate: '1984-06-25' },
]

const initialState: SongState = {
  songs: initialSongs,
}

const songSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    addSong: (state, action: PayloadAction<Omit<Song, 'id'>>) => {
      const newSong: Song = {
        ...action.payload,
        id: (state.songs.length + 1).toString(),
      }
      state.songs.push(newSong)
    },
    updateSong: (state, action: PayloadAction<Song>) => {
      const index = state.songs.findIndex((song) => song.id === action.payload.id)
      if (index !== -1) {
        state.songs[index] = action.payload
      }
    },
    deleteSong: (state, action: PayloadAction<string>) => {
      state.songs = state.songs.filter((song) => song.id !== action.payload)
    },
  },
})

export const { addSong, updateSong, deleteSong } = songSlice.actions

export default songSlice.reducer