import axios, { AxiosError } from 'axios'

const API_BASE_URL = 'https://songy-gbt1.onrender.com/api'

export interface SongDTO {
  _id: string
  title: string
  artist: string
  album: string
  genre: string
  releaseDate: string
  __v: number
}

export interface StatisticsResponse {
  totalSongs: number
  totalArtists: number
  totalAlbums: number
  totalGenres: number
  songsByGenre: Array<{ count: number; _id: string; name: string }>
  songsByArtist: Array<{ songs: number; _id: string; name: string; albums: number }>
  songsByAlbum: Array<{ count: number; artist: string; _id: string; name: string }>
  topArtists: Array<{ songCount: number; _id: string; name: string }>
  latestSongs: Array<SongDTO>
}

class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public originalError?: Error
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

const handleApiError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    throw new ApiError(
      axiosError.response?.data?.message || 'An error occurred while calling the API',
      axiosError.response?.status,
      axiosError
    );
  }
  throw new ApiError('An unexpected error occurred');
};

class SongyApi {
  private baseUrl: string;

  constructor(baseUrl = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  async getSongs(page = 1, limit = 10): Promise<SongDTO[]> {
    try {
      const response = await axios.get<SongDTO[]>(`${this.baseUrl}/songs`, {
        params: { page, limit }
      });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  async addSong(songData: Omit<SongDTO, '_id' | '__v'>): Promise<SongDTO> {
    try {
      const response = await axios.post<SongDTO>(`${this.baseUrl}/songs`, songData);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  async updateSong(id: string, songData: Omit<SongDTO, '_id' | '__v'>): Promise<SongDTO> {
    try {
      const response = await axios.put<SongDTO>(`${this.baseUrl}/songs/${id}`, songData);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  async deleteSong(id: string): Promise<void> {
    try {
      await axios.delete(`${this.baseUrl}/songs/${id}`);
    } catch (error) {
      handleApiError(error);
    }
  }

  async getStatistics(): Promise<StatisticsResponse> {
    try {
      const response = await axios.get<StatisticsResponse>(`${this.baseUrl}/songs/statistics`);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }
}

export default new SongyApi();