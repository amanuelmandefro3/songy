import { ISongRepository } from '../../../domain/interfaces/ISongRepository';

export class GetStatistics {
  constructor(private songRepository: ISongRepository) {}

  async execute(): Promise<any> {
    return this.songRepository.getStatistics();
  }
}