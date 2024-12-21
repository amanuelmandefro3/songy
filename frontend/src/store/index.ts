import { configureStore } from '@reduxjs/toolkit'
import songReducer from './songSlice'
import statisticsReducer from './statisticsSlice'

export const store = configureStore({
  reducer: {
    songs: songReducer,
    statistics: statisticsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch