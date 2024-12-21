import { Song } from '../../../domain/entities/Song';
import { ISongRepository } from '../../../domain/interfaces/ISongRepository';

export class GetSong {
  constructor(private songRepository: ISongRepository) {}

  async execute(id: string): Promise<Song | null> {
    return this.songRepository.findById(id);
  }
}