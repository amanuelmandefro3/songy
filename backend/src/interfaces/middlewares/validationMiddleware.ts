import { Request, Response, NextFunction } from 'express';
import { SongSchema } from '../../domain/entities/Song';
import { ZodError } from 'zod';

export const validateSongInput = (req: Request, res: Response, next: NextFunction): void => {
  try {
    SongSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ error: 'Validation failed', details: error.errors });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
};