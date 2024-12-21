import { ISongRepository } from '../../../domain/interfaces/ISongRepository';

export class SearchSongs {
  constructor(private songRepository: ISongRepository) {}

  async execute(query: string) {
    return this.songRepository.search(query);
  }
}