import { Song, SongSchema } from '../../../domain/entities/Song';
import { ISongRepository } from '../../../domain/interfaces/ISongRepository';

export class CreateSong {
  constructor(private songRepository: ISongRepository) {}

  async execute(songData: Song): Promise<Song> {
    const validatedSong = SongSchema.parse(songData);
    return this.songRepository.create(validatedSong);
  }
}