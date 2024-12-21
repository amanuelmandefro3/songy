import { Song, SongSchema } from '../../../domain/entities/Song';
import { ISongRepository } from '../../../domain/interfaces/ISongRepository';

export class UpdateSong {
  constructor(private songRepository: ISongRepository) {}

  async execute(id: string, songData: Partial<Song>): Promise<Song | null> {
    const validatedUpdate = SongSchema.partial().parse(songData);
    return this.songRepository.update(id, validatedUpdate);
  }
}