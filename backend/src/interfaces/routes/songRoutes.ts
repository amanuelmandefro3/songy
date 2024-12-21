import { Router } from 'express';
import { SongController } from '../controllers/SongController';
import { validateSongInput } from '../middlewares/validationMiddleware';

export const songRouter = (songController: SongController): Router => {
  const router = Router();

  router.post('/', validateSongInput, songController.create.bind(songController));
  router.get('/', songController.getAll.bind(songController));
  router.get('/search', songController.search.bind(songController));
  router.get('/statistics', songController.getStats.bind(songController));
  router.get('/:id', songController.getById.bind(songController));
  router.put('/:id', validateSongInput, songController.update.bind(songController));
  router.delete('/:id', songController.delete.bind(songController));

  return router;
};