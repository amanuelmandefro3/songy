import { Request, Response } from 'express';
import { CreateSong } from '../../application/use-cases/song/CreateSong';
import { GetSong } from '../../application/use-cases/song/GetSong';
import { UpdateSong } from '../../application/use-cases/song/UpdateSong';
import { DeleteSong } from '../../application/use-cases/song/DeleteSong';
import { GetAllSongs } from '../../application/use-cases/song/GetAllSongs';
import { GetStatistics } from '../../application/use-cases/song/GetStatistics';
import { SearchSongs } from '../../application/use-cases/song/SearchSongs';
import { ZodError } from 'zod';

export class SongController {
  constructor(
    private createSong: CreateSong,
    private getSong: GetSong,
    private updateSong: UpdateSong,
    private deleteSong: DeleteSong,
    private getAllSongs: GetAllSongs,
    private getStatistics: GetStatistics,
    private searchSongs: SearchSongs
  ) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      const song = await this.createSong.execute(req.body);
      res.status(201).json(song);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: 'Validation failed', details: error.errors });
      } else {
        console.error('Error creating song:', error);
        res.status(500).json({ error: 'Failed to create song' });
      }
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const song = await this.getSong.execute(req.params.id);
      if (song) {
        res.json(song);
      } else {
        res.status(404).json({ error: 'Song not found' });
      }
    } catch (error) {
      console.error('Error getting song:', error);
      res.status(500).json({ error: 'Failed to get song' });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const song = await this.updateSong.execute(req.params.id, req.body);
      if (song) {
        res.json(song);
      } else {
        res.status(404).json({ error: 'Song not found' });
      }
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: 'Validation failed', details: error.errors });
      } else {
        console.error('Error updating song:', error);
        res.status(500).json({ error: 'Failed to update song' });
      }
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.deleteSong.execute(req.params.id);
      if (result) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'Song not found' });
      }
    } catch (error) {
      console.error('Error deleting song:', error);
      res.status(500).json({ error: 'Failed to delete song' });
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const genre = req.query.genre as string | undefined;
      const result = await this.getAllSongs.execute(page, limit, genre);
      res.json(result);
    } catch (error) {
      console.error('Error getting all songs:', error);
      res.status(500).json({ error: 'Failed to get songs' });
    }
  }

  async search(req: Request, res: Response): Promise<void> {
    try {
      const query = req.query.q as string;
      const songs = await this.searchSongs.execute(query);
      res.json(songs);
    } catch (error) {
      console.error('Error searching songs:', error);
      res.status(500).json({ error: 'Failed to search songs' });
    }
  }

  async getStats(req: Request, res: Response): Promise<void> {
    try {
      const statistics = await this.getStatistics.execute();
      res.json(statistics);
    } catch (error) {
      console.error('Error getting statistics:', error);
      res.status(500).json({ error: 'Failed to get statistics' });
    }
  }
}