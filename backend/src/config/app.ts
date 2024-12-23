import express from 'express';
import { songRouter } from '../interfaces/routes/songRoutes';
import { errorMiddleware } from '../interfaces/middlewares/errorMiddleware';
import { SongController } from '../interfaces/controllers/SongController';
import { SongRepository } from '../infrastructure/repositories/SongRepository';
import { CreateSong } from '../application/use-cases/song/CreateSong';
import { GetSong } from '../application/use-cases/song/GetSong';
import { UpdateSong } from '../application/use-cases/song/UpdateSong';
import { DeleteSong } from '../application/use-cases/song/DeleteSong';
import { GetAllSongs } from '../application/use-cases/song/GetAllSongs';
import { GetStatistics } from '../application/use-cases/song/GetStatistics';
import { SearchSongs } from '../application/use-cases/song/SearchSongs';
import { setupSwagger } from './swagger';

export const createApp = (): express.Application => {
  const app = express();
  app.use(express.json());

  const songRepository = new SongRepository();
  const songController = new SongController(
    new CreateSong(songRepository),
    new GetSong(songRepository),
    new UpdateSong(songRepository),
    new DeleteSong(songRepository),
    new GetAllSongs(songRepository),
    new GetStatistics(songRepository),
    new SearchSongs(songRepository)
  );

  app.use('/api/songs', songRouter(songController));
  app.use(errorMiddleware);

  setupSwagger(app)

  return app;
};