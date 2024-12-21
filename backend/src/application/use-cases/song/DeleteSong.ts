import { ISongRepository } from '../../../domain/interfaces/ISongRepository';

export class DeleteSong {
  constructor(private songRepository: ISongRepository) {}

  async execute(id: string): Promise<boolean> {
    return this.songRepository.delete(id);
  }
}