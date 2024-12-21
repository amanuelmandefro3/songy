import { Song } from "../entities/Song";

export interface ISongRepository {
  create(song: Song): Promise<Song>;
  findById(id: string): Promise<Song | null>;
  findAll(
    page: number,
    limit: number,
    genre?: string
  ): Promise<{
    songs: Song[];
    total: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  }>;
  update(id: string, song: Partial<Song>): Promise<Song | null>;
  delete(id: string): Promise<boolean>;
  getStatistics(): Promise<any>;
  search(query: string): Promise<Song[]>;
}
