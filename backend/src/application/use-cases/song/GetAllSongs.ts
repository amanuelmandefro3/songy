import { ISongRepository } from '../../../domain/interfaces/ISongRepository';
import { Song } from '../../../domain/entities/Song';

export class GetAllSongs {
  constructor(private songRepository: ISongRepository) {}

  async execute(page: number, limit: number = 10, genre?: string): Promise<{
    songs: Song[];
    total: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  }> {
    return this.songRepository.findAll(page, limit, genre);
  }
}