import axios from 'axios';

const API_BASE_URL = 'https://songy-gbt1.onrender.com/api';

export interface Song {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
  releaseDate: string;
}

export interface PaginatedResponse<T> {
  songs: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  currentPage: number;
}

export const getSongs = async (page: number, limit: number): Promise<PaginatedResponse<Song>> => {
  const response = await axios.get(`${API_BASE_URL}/songs`, { params: { page, limit } });
  return response.data;
};

export const createSong = async (song: Omit<Song, '_id'>): Promise<Song> => {
  const response = await axios.post(`${API_BASE_URL}/songs`, song);
  return response.data;
};

export const updateSong = async (id: string, song: Omit<Song, '_id'>): Promise<Song> => {
  const response = await axios.put(`${API_BASE_URL}/songs/${id}`, song);
  return response.data;
};

export const deleteSong = async (id: string): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/songs/${id}`);
};

export const getStatistics = async () => {
  const response = await axios.get(`${API_BASE_URL}/songs/statistics`);
  return response.data;
};

